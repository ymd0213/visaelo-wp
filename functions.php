<?php
/**
 * Visaelo Theme Functions
 */

// Enqueue styles and scripts
function visaelo_enqueue_assets() {
    // Enqueue main stylesheet
    wp_enqueue_style(
        'visaelo-styles',
        get_template_directory_uri() . '/css/styles.css',
        array(),
        '1.0.0'
    );

    // Enqueue main JavaScript
    wp_enqueue_script(
        'visaelo-script',
        get_template_directory_uri() . '/js/main.js',
        array(),
        '1.0.0',
        true // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'visaelo_enqueue_assets');

// Add theme support
function visaelo_theme_setup() {
    // Add support for post thumbnails
    add_theme_support('post-thumbnails');
    
    // Add support for title tag
    add_theme_support('title-tag');
    
    // Add support for HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
}
add_action('after_setup_theme', 'visaelo_theme_setup');

