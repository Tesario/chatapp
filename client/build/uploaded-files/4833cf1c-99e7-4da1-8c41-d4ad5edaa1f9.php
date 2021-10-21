<?php
/* Template Name: Novinky */

get_template_part('includes/header');
get_template_part('includes/navbar');
?>
<main id="news">
    <section class="container">
        <div class="news-flex">
            <?php
            $paged = (get_query_var('paged')) ? absint(get_query_var('paged')) : 1;
            $args = array(
                'orderby' => 'meta_value_num',
                'posts_per_page' => 3,
                'paged' => $paged,
                'category_name' => 'nezarazene',
            );
            $my_query = new WP_Query($args);
            // $posts = get_posts($args);
            while ($my_query->have_posts()) : $my_query->the_post(); ?>
                <div class="new">
                    <div class="date"><?php the_time('d.m.Y'); ?></div>
                    <h2 class="subtitle">
                        <?php the_title(); ?>
                    </h2>
                    <article>
                        <?= wp_trim_words(get_the_content(), 50) ?>
                    </article>
                    <a href="<?= get_permalink(get_the_ID()); ?>" class="btn btn-primary">Číst více</a>
                </div>
            <?php
            endwhile;
            wp_reset_postdata();
            echo pagination($my_query);
            ?>
        </div>
    </section>
</main>
<?php get_template_part('includes/footer'); ?>