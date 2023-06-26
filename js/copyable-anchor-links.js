/**
 * Simple implementation of the djb2 hash function
 * @param {string} str 
 * @returns 
 */
function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Ensure the hash is a positive 32-bit integer
}

/**
 * Hash the header text to generate a permalink hash
 * @param {string} str 
 * @returns string
 */
function generateShortHash(str) {
  const hash = djb2Hash(str).toString(16);
  return hash;
}

/**
 * Add anchor links to headers that are children of the .cal-linkable element
 */
function addAnchorsToHeaders() {
  jQuery(".cal-linkable")
    .find("h1, h2, h3, h4, h5, h6")
    .each(function () {
      var headerText = jQuery(this).text();
      var headerHash =
        "cal-h" +
        this.tagName.toLowerCase().substr(1) +
        "-" +
        generateShortHash(headerText);
      var $header = jQuery(this);
      var $anchor = jQuery("<a>", {
        class: "cal-anchor-link",
        href: "#" + headerHash,
        title: "Click to Copy",
      });

      $header.attr("id", headerHash);
      $header.append($anchor);

      $header.on("mouseenter", function () {
        $header.addClass("cal-header-hover");
      });

      $header.on("mouseleave", function () {
        $header.removeClass("cal-header-hover");
      });

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
  jQuery('html, body').animate({
    scrollTop: offset - offsetAdjustment
  }, 500);
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
