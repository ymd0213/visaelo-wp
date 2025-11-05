<?php
/**
 * Main template file
 * This is required by WordPress
 */

get_header(); ?>

<div class="main-layout">
    <main class="layout-main">
        <?php
        if (have_posts()) {
            while (have_posts()) {
                the_post();
                the_content();
            }
        }
        ?>
    </main>
</div>

<?php get_footer(); ?>

