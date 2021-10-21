<?php /* Template Name: Content */ ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <?php
        get_template_part('includes/header');
        get_template_part('includes/navbar');
        ?>
        <main>
            <h1><?php the_title() ?></h1>
            <?php the_content(); ?>¨
        </main>
        <?php get_template_part('includes/footer'); ?>
    <?php endwhile; ?>
<?php else : wp_redirect(get_bloginfo('siteurl') . '/404', 404);
    exit;
endif; ?>