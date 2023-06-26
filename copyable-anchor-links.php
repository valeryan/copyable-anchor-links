<?php
/*
Plugin Name: Copyable Anchor Links
Description: Automatically adds copyable anchor links to header tags in elements with class "cal-linkable".
Version: 1.0.0
Author: Samuel Hilson
Author URI: Your Website URL
License: GPL2+
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

/**
 * Enqueue the scripts and styles
 *
 * @return void
 */
function cal_enqueue_scripts() {
    wp_enqueue_style('dashicons');
    wp_enqueue_script('copyable-anchor-links', plugin_dir_url(__FILE__) . 'js/copyable-anchor-links.js', array('jquery'), '1.0.0', true);
    wp_enqueue_style('copyable-anchor-links', plugin_dir_url(__FILE__) . 'css/copyable-anchor-links.css');
}
add_action('wp_enqueue_scripts', 'cal_enqueue_scripts');


/**
 * Add the toggle control to the elements advanced tab
 *
 * @param object $element
 * @return void
 */
function add_cal_linkable_control($element) {
    // Check if the elementor editor is being used
    if ( \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
        // Add the toggle control to the advanced tab
        $element->start_controls_section(
            'cal_linkable_section',
            [
                'label' => __( 'Copyable Anchor Links', 'cal' ),
                'tab' => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $element->add_control(
            'cal_linkable_toggle',
            [
                'label' => __( 'Enable Header Links', 'cal' ),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => true,
            ]
        );

        $element->end_controls_section();
    }
}

// Register the control for the column & section element
add_action('elementor/element/column/section_advanced/after_section_end', 'add_cal_linkable_control', 10, 2);
add_action('elementor/element/section/section_advanced/after_section_end', 'add_cal_linkable_control', 10, 2);

/**
 * Add the cal-linkable class to the element wrapper
 *
 * @param object $element
 * @return void
 */
add_action('elementor/frontend/before_render', function($element) {
    if ( ! $element->get_settings( 'cal_linkable_toggle' ) ) {
        return;
    }
    $element->add_render_attribute(
        '_wrapper',
        [
            'class' => 'cal-linkable',
        ]
    );
}, 10, 3);
