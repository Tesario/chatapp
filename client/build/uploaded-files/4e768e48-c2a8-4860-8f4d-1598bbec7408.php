<?php
// Theme functions

require_once locate_template('/functions/customizer.php');
require_once locate_template('/functions/widgets.php');
require_once locate_template('/functions/contact-customizer.php');
require_once locate_template('/functions/footer-customizer.php');

add_theme_support('post-thumbnails');
add_theme_support('title-tag');

if (!is_admin()) {
    wp_enqueue_style(
        'bootstrap-style',
        get_template_directory_uri() . '/css/bootstrap.min.css',
        array(),
        null,
        'all'
    );

    wp_enqueue_style(
        'main-style',
        get_template_directory_uri() . '/css/style.min.css?v=1.0.2',
        array("flickity-style", "bootstrap-style", "font-open-sans"),
        null,
        'all'
    );

    wp_enqueue_style(
        'flickity-style',
        'https://unpkg.com/flickity@2/dist/flickity.min.css',
        array(),
        null,
        'all'
    );

    wp_enqueue_style(
        'font-open-sans',
        'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap',
        array(),
        null,
        'all'
    );

    wp_enqueue_style(
        'font-roboto',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap',
        array(),
        null,
        'all'
    );

    wp_enqueue_script(
        'main-js',
        get_template_directory_uri() . '/js/main.js',
        array("flickity-js", "bootstrap-js", "font-js"),
        null,
        true
    );

    wp_enqueue_script(
        'bootstrap-js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js',
        array(),
        null,
        true
    );

    wp_enqueue_script(
        'font-js',
        'https://kit.fontawesome.com/229da1aa00.js',
        array(),
        null,
        true
    );

    wp_enqueue_script(
        'flickity-js',
        'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js',
        array(),
        null,
        true
    );

    wp_localize_script('main-js', 'scriptData', array('templateUrl' => get_stylesheet_directory_uri()));

    function theme_enqueue_style()
    {
        wp_enqueue_style('flickity-style', get_stylesheet_uri());
        wp_enqueue_style('bootstrap-style', get_stylesheet_uri());
        wp_enqueue_style('font-open-sans', get_stylesheet_uri());
        wp_enqueue_style('font-roboto', get_stylesheet_uri());
        wp_enqueue_style('main-style', get_stylesheet_uri());
    }

    function theme_enqueue_scripts()
    {
        wp_enqueue_script('flickity-js', get_stylesheet_uri());
        wp_enqueue_script('bootstrap-js', get_stylesheet_uri());
        wp_enqueue_script('font-js', get_stylesheet_uri());
        wp_enqueue_script('main-js', get_stylesheet_uri());
    }

    add_action('wp_enqueue_scripts', 'theme_enqueue_style', 'theme_enqueue_scripts');
}

function searchfilter($query, $per = 8)
{
    if (!is_admin()) {
        $query->set('posts_per_page', $per);
    }

    return $query;
}

function pagination($query)
{
    // Add pagination
    $next_nav = '<i class="fas fa-angle-right"></i>';
    $prev_nav = '<i class="fas fa-angle-left"></i> ';
    $big = 99999;
    $pages = paginate_links(array(
        'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
        'format' => '?paged=%#%',
        'type' => 'array',
        'current' => max(1, get_query_var('paged')),
        'total' => $query->max_num_pages,
        'next_text' => $next_nav,
        'prev_text' => $prev_nav,
        'show_all' => FALSE, // This will make paginate not to show all links.
        'end_size' => 1, // Will show 2 numbers on either the start and the end list edges. 
        'mid_size' => 3 // So that you won't have 1,2...,3,...,7,8

    ));
    $pagination = '';
    if ($pages) {
        $pagination = '<ul class="pagination">';
        $current_page = max(1, get_query_var('paged', 1));
        $max = $query->max_num_pages;
        if (($current_page + 1) == $max) {
            $max += 1;
        }
        foreach ($pages as $page) {
            if (strpos($page, 'current')) {
                $pagination .= '<li class="page-item current">';
                $pagination .=  '<span class="page-link">';
                $pagination .=  '<span aria-current="page" class="page-numbers">' . $current_page . '</span>';
                $pagination .=  '</span>';
                $pagination .= '</li>';
            } else  if (!strpos($page, $max) && !strpos($page, "...")) {
                $pagination .= '<li class="page-item">';
                $pagination .= '<span class="page-link">' . $page . '</span>';
                $pagination .= '</li>';
            }
        }
        $pagination .= '</ul>';
    }
    return $pagination;
}


// Add class to searched terms
function highlight_results($text)
{
    if (is_search() && !is_admin()) {
        $sr = get_query_var('s');
        if (strlen($sr) < 3) {
            return $text;
        }

        $keys = explode(' ', $sr);
        $keys = array_filter($keys);

        $arr = array();
        foreach ($keys as $key) {
            if (strlen($key) >= 3) {
                array_push($arr, $key);
            }
        }

        $text = preg_replace('/(' . implode('|', $arr) . ')/iu', '<span class="search-highlight">\0</span>', $text);
    }

    return $text;
}

add_filter('the_excerpt', 'highlight_results');
add_filter('the_content', 'highlight_results');
add_filter('the_title', 'highlight_results');

function new_excerpt_more($more)
{
    return '...'; // replace the normal [...] with a ...
}
add_filter('excerpt_more', 'new_excerpt_more');
