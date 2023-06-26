/**
 * Generate a sanitized ID from the header text
 * @param {string} text
 * @returns {string}
 */
function generateIdFromText(text) {
  const sanitizedText = sanitizeTitleWithDashes(text);
  let id = sanitizedText.substring(0, 100);
  if (id.endsWith('-')) {
    id = id.slice(0, -1);
  }
  return id;
}

/**
 * Sanitize text using WordPress' sanitize_title_with_dashes() function
 * @param {string} text
 * @returns {string}
 */
function sanitizeTitleWithDashes(text) {
  // Assuming you're working within a WordPress environment
  if (typeof window.wp !== 'undefined' && typeof window.wp.sanitize !== 'undefined') {
    return window.wp.sanitize.titleWithDashes(text);
  }

  // Fallback to a basic implementation if WordPress function is not available
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Display a toast message
 * @param {string} message
 * @param {string} type
 */
function displayToast(message, type) {
  // Create a toast container
  var toastContainer = jQuery('<div class="cal-toast-container"></div>');

  // Create the toast element
  var toast = jQuery('<div class="cal-toast ' + type + '">' + message + '</div>');

  // Append the toast to the container
  toastContainer.append(toast);

  // Append the container to the body
  jQuery('body').append(toastContainer);

  toast.css({ visibility: 'visible' })
  // Show the toast with animation
  toast.animate({ opacity: 1 }, 300, function () {
    // Delay for a few seconds and then fade out
    setTimeout(function () {
      toast.animate({ opacity: 0 }, 300, function () {
        // Remove the toast from the DOM
        toast.css({ opacity: 0, visibility: 'hidden' })
        toastContainer.remove();
      });
    }, 3000); // Adjust the delay as needed
  });
}

/**
 * Add anchor links to headers that are children of the .cal-linkable element
 */
function addAnchorsToHeaders() {
  jQuery(".cal-linkable")
    .find("h1, h2, h3, h4, h5, h6")
    .each(function () {
      var headerText = jQuery(this).text();
      var headerHash = generateIdFromText(headerText);
      var $header = jQuery(this);
      var $anchor = jQuery("<a>", {
        class: "cal-anchor-link",
        href: "#" + headerHash,
        title: "Click to Copy",
      });

      $header.attr("id", headerHash);
      $header.prepend($anchor);

      $anchor.click(function (e) {
        e.preventDefault();
        var link = window.location.href.split("#")[0] + "#" + headerHash;

        // Copy the full link to the clipboard using the Clipboard API
        navigator.clipboard
          .writeText(link)
          .then(function () {
            $anchor.addClass("cal-link-copied");
            setTimeout(function () {
              $anchor.removeClass("cal-link-copied");
            }, 2000);

            // Display toast message when link is copied
            displayToast("Link copied to clipboard!", "success");
          })
          .catch(function (error) {
            console.error("Failed to copy link:", error);
          });

        // Update the URL with the anchor
        history.pushState(null, null, "#" + headerHash);

        // Scroll to the anchor
        var offset = $header.offset().top;
        scrollToOffset(offset);
      });
    });
}

/**
 * Adjust the offset to give some space from the top bar
 * @param {number} offset
 */
function scrollToOffset(offset) {
  var offsetAdjustment = 110;
  jQuery('html, body').animate(
    {
      scrollTop: offset - offsetAdjustment,
    },
    500
  );
}

/**
 * Scroll to the anchor on page load if the URL contains a hash
 */
function scrollToAnchorOnLoad() {
  var hash = window.location.hash;
  if (hash) {
    var $targetHeader = jQuery(hash);
    if ($targetHeader.length) {
      var offset = $targetHeader.offset().top;
      scrollToOffset(offset);
    }
  }
}

jQuery(document).ready(function () {
  addAnchorsToHeaders();
  scrollToAnchorOnLoad();
});
