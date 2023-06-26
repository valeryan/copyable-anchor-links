# Copyable Anchor Links (WordPress Plugin)

Copyable Anchor Links is a WordPress plugin that automatically adds copyable anchor links to header tags in elements with the class "cal-linkable". 

## Features
* Adds copyable anchor links to headers contained in any html element with the "cal-linkable" class.
* Supports Elementor page builder. A Toggle control is added to the advanced settings of sections and columns to enable adding the "cal-linkable" class.

## Installation

1. Download the plugin ZIP file from the [Copyable Anchor Links repository](https://github.com/valeryan/copyable-anchor-links).

2. In your WordPress admin dashboard, navigate to "Plugins" > "Add New".

3. Click on the "Upload Plugin" button, select the downloaded ZIP file, and click "Install Now".

4. After installation, activate the "Copyable Anchor Links" plugin.

5. Ensure that Elementor is installed and activated on your WordPress site.

## Elementor Usage

1. Edit a page or post using the Elementor editor.

2. Add a new section or column to your layout.

3. In the Elementor editor, find the "Copyable Anchor Links" control in the section or column settings.

4. Enable the "Enable Header Links" toggle to add the `cal-linkable` class to the section or column.

5. Save and publish the changes.

6. Preview or visit the published page. Headers within the section or column marked as "cal-linkable" will now have copyable anchor links.

7. When users hover over a header, the anchor link will appear. Clicking on the anchor link will copy the link to the clipboard.

## Customization

- To customize the appearance of the anchor links, header hover effects, or copied link indicator, you can modify the CSS styles in your WordPress theme's custom CSS or using a custom CSS plugin.
- For advanced customization, you can modify the JavaScript file `copyable-anchor-links.js` included with the plugin. Make sure to use caution and follow best practices when making changes to the plugin's code.

## Compatibility

Copyable Anchor Links is compatible with the latest version of WordPress and Elementor.

## Adding Support to Other WordPress Editor Implementations

If you want to contribute to the functionality of Copyable Anchor Links try adding support for toggling the `cal-linkable` class in other WordPress editor implementations. If you're familiar with a different WordPress editor, such as Gutenberg or any other page builder, here's how you can contribute:

1. Identify the relevant hooks or filters in your WordPress editor implementation that allow adding custom controls to sections or columns.

2. Add hooks to toggle the `cal-linkable` class in the editor similar to the hooks added in the Elementor implementation.

5. Submit a pull request to the [Copyable Anchor Links repository](https://github.com/valerayn/copyable-anchor-links) with your changes and a description of the editor implementation you added support for.

## Support

For any issues or questions related to the Copyable Anchor Links plugin, please create a new issue in the [GitHub repository](https://github.com/valeryan/copyable-anchor-links).

## License

This project is licensed under the [GPL-2.0+ License](https://www.gnu.org/licenses/gpl-2.0.html).
