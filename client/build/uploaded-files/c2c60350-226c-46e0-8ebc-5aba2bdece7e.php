<?php
/* Template Name: Posts */
get_template_part('includes/header');
get_template_part('includes/navbar');
?>
<main>
    <h1><?php the_title() ?></h1>
    <div>
        <?php
        // WP Query arguments
        $args = array('numberposts' => '-1'); // -1 get all posts
        // WP Query
        $query = new WP_Query($args);
        // Get posts
        $posts = get_posts($args);
        // Loop through posts
        foreach ($posts as $post) :
            setup_postdata($post);
        ?>
            <div>
                <div>
                    <?php the_post_thumbnail(); ?>
                </div>
                <div>
                    <h2><?php the_title(); ?></h2>
                    <div><?= get_the_time('d.m.Y', $post->ID); ?></div>
                    <p><?php the_content(); ?></p>
                </div>
            </div>
        <?php
        endforeach;
        wp_reset_postdata();
        ?>
    </div>
</main>
<?php get_template_part('includes/footer'); ?>