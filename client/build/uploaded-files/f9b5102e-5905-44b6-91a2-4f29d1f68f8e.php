<?php
get_template_part('includes/header');
get_template_part('includes/navbar');
?>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v11.0" nonce="lrDq1VqV"></script>
<main class="front-page">
    <div class="container-fluid">
        <div class="main-carousel">
            <?php dynamic_sidebar("carousel") ?>
        </div>
    </div>
    <div class="introduction">
        <div class="container">
            <div class="info-line">
                <div class="desc">
                    <p>
                        <span class="number"><span>0</span>&nbsp;%</span>
                        <?= get_field("veta_pod_carouselem") ?>
                    </p>
                </div>
                <a href="#" class="organisations" aria-label="Členství v profesních organizacích">
                    <div class="image">
                        <img src="<?= get_template_directory_uri(); ?>/img/komora-danovych-poradcu.png" alt="Logo">
                    </div>
                    <div class="image">
                        <img src="<?= get_template_directory_uri(); ?>/img/sdruzeni-ucetnich-a-danovych-poradcu.png" alt="Logo">
                    </div>
                    <div class="image">
                        <img src="<?= get_template_directory_uri(); ?>/img/hospodarska-komora.png" alt="Logo">
                    </div>
                    <div class="image">
                        <img src="<?= get_template_directory_uri(); ?>/img/cfe.png" alt="Logo">
                    </div>
                </a>
            </div>
        </div>
    </div>
    <section class="container information">
        <div class="card">
            <?php the_content(); ?>
        </div>
    </section>
    <section class="container info-graphic">
        <div class="grid-boxes">
            <div class="box">
                <a href="<?= get_field("pole1")["odkaz"] ?>">
                    <div class="image">
                        <?= get_field("pole1")["ikona"] ?>
                    </div>
                </a>
                <a href="<?= get_field("pole1")["odkaz"] ?>">
                    <div class="desc">
                        <?= get_field("pole1")["text"] ?>
                    </div>
                </a>
            </div>
            <div class="box">
                <a href="<?= get_field("pole2")["odkaz"] ?>">
                    <div class="image">
                        <?= get_field("pole2")["ikona"] ?>
                    </div>
                </a>
                <a href="<?= get_field("pole2")["odkaz"] ?>">
                    <div class="desc">
                        <?= get_field("pole2")["text"] ?>
                    </div>
                </a>
            </div>
            <div class="box">
                <a href="<?= get_field("pole3")["odkaz"] ?>">
                    <div class="image">
                        <?= get_field("pole3")["ikona"] ?>
                    </div>
                </a>
                <a href="<?= get_field("pole3")["odkaz"] ?>">
                    <div class="desc">
                        <?= get_field("pole3")["text"] ?>
                    </div>
                </a>
            </div>
            <div class="box">
                <a href="<?= get_field("pole4")["odkaz"] ?>">
                    <div class="image">
                        <?= get_field("pole4")["ikona"] ?>
                    </div>
                </a>
                <a href="<?= get_field("pole4")["odkaz"] ?>">
                    <div class="desc">
                        <?= get_field("pole4")["text"] ?>
                    </div>
                </a>
            </div>
            <div class="box">
                <a href="<?= get_field("pole5")["odkaz"] ?>">
                    <div class="image">
                        <?= get_field("pole5")["ikona"] ?>
                    </div>
                </a>
                <a href="<?= get_field("pole5")["odkaz"] ?>">
                    <div class="desc">
                        <?= get_field("pole5")["text"] ?>
                    </div>
                </a>
            </div>
            <div class="box">
                <a href="<?= get_field("pole6")["odkaz"] ?>">
                    <div class="image">
                        <?= get_field("pole6")["ikona"] ?>
                    </div>
                </a>
                <a href="<?= get_field("pole6")["odkaz"] ?>">
                    <div class="desc">
                        <?= get_field("pole6")["text"] ?>
                    </div>
                </a>
            </div>
        </div>
        <a href="#" class="btn btn-primary">Celý přehled služeb</a>
    </section>
    <section class="cards">
        <span class="triangle"></span>
        <div class="cards-inner container">
            <div class="cards-carousel">
                <?php
                $cards = get_field("skupina_karet");
                foreach ($cards as $card) :
                ?>
                    <div class="carousel-cell">
                        <div class="card">
                            <div class="image">
                                <img src="<?= $card["obrazek"] ?>" alt="<?= $card["nadpis"] ?>">
                            </div>
                            <div class="content">
                                <h2 class="subtitle"><?= $card["nadpis"] ?></h2>
                                <p class="desc"><?= $card["text"] ?></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach ?>
            </div>
        </div>
        <div class="reference container">
            <h2 class="title">Vybrané reference</h2>
            <div class="reference-carousel">
                <?php
                $cards = get_field("reference_-_karty");
                foreach ($cards as $card) :
                ?>
                    <div class="carousel-cell">
                        <div class="content">
                            <div class="content-header">
                                <div class="image">
                                    <img src="<?= $card["obrazek"] ?>" alt="Reference">
                                </div>
                            </div>
                            <p><?= $card["text"] ?></p>
                        </div>
                    </div>
                <?php endforeach ?>
            </div>
        </div>
    </section>
    <section class="facebook-api container">
        <div class="grid-cards">
            <div class="card">
                <?= get_field("prispevky")["prispevek1"] ?>
            </div>
            <div class="card">
                <?= get_field("prispevky")["prispevek2"] ?>
            </div>
            <div class="card">
                <?= get_field("prispevky")["prispevek3"] ?>
            </div>
        </div>
        <a href="#" class="btn btn-primary">Přejděte na na archiv novinek</a>
    </section>
    <section class="counters">
        <div class="container">
            <div class="counter">
                <div class="counter-inner">
                    <div class="image">
                        <?= get_field("skupina_poli")["pole1"]["ikona"] ?>
                    </div>
                    <div class="number clients" data-max="<?= get_field("skupina_poli")["pole1"]["hodnota"] ?>">0</div>
                    <div class=" desc"><?= get_field("skupina_poli")["pole1"]["text"] ?></div>
                </div>
            </div>
            <div class="counter">
                <div class="counter-inner">
                    <div class="image">
                        <?= get_field("skupina_poli")["pole2"]["ikona"] ?>
                    </div>
                    <div class="number statements" data-max="<?= get_field("skupina_poli")["pole2"]["hodnota"] ?>">0</div>
                    <div class=" desc"><?= get_field("skupina_poli")["pole2"]["text"] ?></div>
                </div>
            </div>
            <div class="counter">
                <div class="counter-inner">
                    <div class="image">
                        <?= get_field("skupina_poli")["pole3"]["ikona"] ?>
                    </div>
                    <div class="number employees" data-max="<?= get_field("skupina_poli")["pole3"]["hodnota"] ?>">0</div>
                    <div class=" desc"><?= get_field("skupina_poli")["pole3"]["text"] ?></div>
                </div>
            </div>
        </div>
        <span class="box-shadow bottom"></span>
    </section>
    <section class="contact-form">
        <div class="container">
            <h2 class="title">Kontaktujte nás!</h2>
            <?= do_shortcode('[contact-form-7 id="187" title="Kontaktní formulář 1"]'); ?>
        </div>
    </section>
    <section class="maps">
        <span class="box-shadow"></span>
        <div class="container">
            <h2 class="title">Kde nás najdete?</h2>
            <div class="flex-maps">
                <div class="map">
                    <h3 class="subtitle">Brno</h3>
                    <?= get_theme_mod('main_outpost_brno_map', '<iframe title="Mapa Brno" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.4998779760513!2d16.621297415567557!3d49.191076079321405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471294fbb46bfad3%3A0xb007735be11def2c!2zU0xVVE8gLi4ubmVqZW4gw7rEjWV0bmljdHbDrQ!5e0!3m2!1scs!2scz!4v1624211797775!5m2!1scs!2scz" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'); ?>
                    <ul class="list">
                        <li>
                            <a href="https://mapy.cz/zakladni?id=2464436&source=firm&x=16.6234913&y=49.1910936&z=17">
                                <i class="fas fa-map-marked-alt fa-fw"></i>
                                <?= get_theme_mod('main_outpost_brno_address', "Křenová 186/60, 602 00 Brno-střed"); ?>
                            </a>
                        </li>
                        <li>
                            <a href="tel:<?= get_theme_mod('main_outpost_brno_phone', "530 500 900"); ?>">
                                <i class="fas fa-phone-alt fa-fw"></i>
                                <?= get_theme_mod('main_outpost_brno_phone', "530 500 900"); ?>
                            </a>
                        </li>
                        <li>
                            <a href="mailTo:sekretariat@sluto.cz">
                                <i class="fas fa-envelope fa-fw"></i>
                                <?= get_theme_mod('main_outpost_brno_email', "sekretariat@sluto.cz"); ?>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="map">
                    <h3 class="subtitle">Praha</h3>
                    <?= get_theme_mod('main_outpost_praha_map', '<iframe title="Mapa Praha" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1243.492743698147!2d14.423688986025924!3d50.08891446335142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94ea297593a3%3A0x212640522f7dabf9!2zU0xVVE8gLi4ubmVqZW4gw7rEjWV0bmljdHbDrQ!5e0!3m2!1scs!2scz!4v1624211726130!5m2!1scs!2scz" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'); ?>
                    <ul class="list">
                        <li>
                            <a href="https://www.google.cz/maps/place/T%C3%BDnsk%C3%A1+21,+110+00+Star%C3%A9+M%C4%9Bsto/@50.088786,14.423933,15z/data=!4m5!3m4!1s0x470b94ea297593a5:0x44fd955e1c485694!8m2!3d50.0888414!4d14.4239679?hl=cs">
                                <i class="fas fa-map-marked-alt fa-fw"></i>
                                <?= get_theme_mod('main_outpost_praha_address', "Týnská 21, 110 00 Staré Město"); ?>
                            </a>
                        </li>
                        <li>
                            <a href="tel:226203700">
                                <i class="fas fa-phone-alt fa-fw"></i>
                                <?= get_theme_mod('main_outpost_praha_phone', "530 500 900"); ?>
                            </a>
                        </li>
                        <li>
                            <a href="mailTo:<?= get_theme_mod('main_outpost_praha_email', "sekretariat@sluto.cz"); ?>">
                                <i class="fas fa-envelope fa-fw"></i>
                                <?= get_theme_mod('main_outpost_praha_email', "sekretariat@sluto.cz"); ?>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <span class="box-shadow bottom"></span>
    </section>
</main>
<?php get_template_part('includes/footer'); ?>