<?php
/**
 * Template Name: Visaelo Landing Page
 * 
 * This is a custom page template for the Visaelo landing page
 */

get_header(); ?>

<div class="main-layout">
    <main class="layout-main">
        <div class="home-page">
            <!-- Hero Section -->
            <div class="hero">
                <div class="hero-top">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/backgrounds/hero_top.png" alt="" class="hero-top-bg">
                    <div class="hero-container-wrapper">
                        <!-- Navbar -->
                        <nav class="hero-navbar">
                            <div class="navbar-container">
                                <div class="navbar-logo">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icons/logo.png" alt="visaelo" class="logo-img">
                                </div>
                                <div class="navbar-right">
                                    <div class="navbar-lang-currency">
                                        <span class="lang-currency-item">en</span>
                                        <span class="lang-currency-item">usd</span>
                                    </div>
                                    <button class="icon-btn icon-btn-primary icon-btn-md hero-signup-btn">
                                        <span class="icon-btn-icon icon-btn-icon-left">
                                            <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_turn_right.png" alt="" style="width: 16px; height: 16px;">
                                        </span>
                                        <span class="icon-btn-text">Sign up</span>
                                    </button>
                                </div>
                            </div>
                        </nav>
                        <div class="hero-container">
                            <div class="hero-content">
                                <h1 class="hero-headline">
                                    The quickest way to get your
                                    <span class="hero-headline-underline">travel visa</span>
                                </h1>
                                <p class="hero-subheadline">
                                    From application to approval, we handle the hard part.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Card Background -->
                <div class="hero-form-card-bg"></div>

                <!-- Form Card -->
                <div class="hero-form-card">
                    <div class="hero-form-row">
                        <div class="custom-select hero-select">
                            <label class="select-label">My passport</label>
                            <div class="custom-select-wrapper">
                                <button class="custom-select-button" id="passport-select">
                                    <span class="select-button-content">
                                        <img src="https://flagcdn.com/w20/us.png" alt="" class="select-flag">
                                        <span>United States</span>
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <div class="custom-select-dropdown" id="passport-dropdown" style="display: none;"></div>
                            </div>
                        </div>
                        <div class="custom-select hero-select">
                            <label class="select-label">Destination</label>
                            <div class="custom-select-wrapper">
                                <button class="custom-select-button" id="destination-select">
                                    <span class="select-button-content">
                                        <span>Select country</span>
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <div class="custom-select-dropdown" id="destination-dropdown" style="display: none;"></div>
                            </div>
                        </div>
                        <div class="hero-form-button">
                            <button class="icon-btn icon-btn-secondary icon-btn-md hero-get-started-btn">
                                <span class="icon-btn-icon icon-btn-icon-left">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_turn_right.png" alt="" style="width: 16px; height: 16px;">
                                </span>
                                <span class="icon-btn-text">Get started</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Bottom Section -->
                <div class="hero-bottom">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/backgrounds/hero_bottom.png" alt="" class="hero-bottom-bg">
                </div>
            </div>

            <!-- Brand Icon -->
            <div class="home-brand-icon-wrapper">
                <div class="brand-icon home-brand-icon">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_trust.png" alt="Trust icon">
                </div>
            </div>

            <!-- Why Choose Us Section -->
            <div class="why-choose-us">
                <img src="<?php echo get_template_directory_uri(); ?>/images/backgrounds/thousand_bg.png" alt="" class="why-choose-us-bg">
                <div class="why-choose-us-container">
                    <div class="why-choose-us-header">
                        <p class="why-choose-us-tagline">Don't risk delays or rejection.</p>
                        <h2 class="why-choose-us-title">
                            Why <span class="why-choose-us-title-highlight"> thousands </span> apply<br>through us every day
                        </h2>
                    </div>

                    <div class="why-choose-us-comparison">
                        <div class="comparison-column">
                            <h3 class="comparison-title">Do it yourself</h3>
                            <div class="comparison-items">
                                <div class="comparison-item">
                                    <div class="cross-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_cross.png" alt="cross">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">Confusing Forms</h4>
                                        <p class="comparison-item-description">Government websites are unclear and hard to follow.</p>
                                    </div>
                                </div>
                                <div class="comparison-item">
                                    <div class="cross-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_cross.png" alt="cross">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">One Mistake = Delay</h4>
                                        <p class="comparison-item-description">A small error can cause rejection or long wait times.</p>
                                    </div>
                                </div>
                                <div class="comparison-item">
                                    <div class="cross-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_cross.png" alt="cross">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">No Real Support</h4>
                                        <p class="comparison-item-description">Government websites are unclear and hard to follow.</p>
                                    </div>
                                </div>
                                <div class="comparison-item">
                                    <div class="cross-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_cross.png" alt="cross">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">Limited & Rigid</h4>
                                        <p class="comparison-item-description">Few payment options, fixed hours, and no progress saving.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="comparison-column">
                            <h3 class="comparison-title">
                                With Visaelo<span class="brand-name">.</span>
                            </h3>
                            <div class="comparison-items">
                                <div class="comparison-item">
                                    <div class="check-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_check.png" alt="check">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">Fast & Simple</h4>
                                        <p class="comparison-item-description">Guided applications you can complete in minutes.</p>
                                    </div>
                                </div>
                                <div class="comparison-item">
                                    <div class="check-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_check.png" alt="check">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">Expert Review</h4>
                                        <p class="comparison-item-description">We check every detail to help you get approved first try.</p>
                                    </div>
                                </div>
                                <div class="comparison-item">
                                    <div class="check-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_check.png" alt="check">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">Support 24/7</h4>
                                        <p class="comparison-item-description">Chat, WhatsApp, and email help whenever you need it.</p>
                                    </div>
                                </div>
                                <div class="comparison-item">
                                    <div class="check-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_check.png" alt="check">
                                    </div>
                                    <div class="comparison-item-content">
                                        <h4 class="comparison-item-title">Flexible & Secure</h4>
                                        <p class="comparison-item-description">Save progress, apply anytime, and pay your way.</p>
                                    </div>
                                </div>
                                <div class="why-choose-us-cta">
                                    <button class="icon-btn icon-btn-primary icon-btn-md why-choose-us-btn">
                                        <span class="icon-btn-icon icon-btn-icon-left">
                                            <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_turn_right.png" alt="" style="width: 16px; height: 16px;">
                                        </span>
                                        <span class="icon-btn-text">Get started</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats Section -->
            <div class="stats-section">
                <div class="stats-section-container">
                    <div class="stats-card">
                        <h3 class="stats-card-title">Worldwide approval rate</h3>
                        <div class="stats-card-content">
                            <span class="stats-card-value">99<span class="stats-card-value-unit">%</span></span>
                            <div class="brand-icon stats-card-icon">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_worldwide.png" alt="Worldwide icon">
                            </div>
                        </div>
                    </div>
                    <div class="stats-card">
                        <h3 class="stats-card-title">Years of experience</h3>
                        <div class="stats-card-content">
                            <span class="stats-card-value">12<span class="stats-card-value-unit">+</span></span>
                            <div class="brand-icon stats-card-icon">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_shield.png" alt="Shield icon">
                            </div>
                        </div>
                    </div>
                    <div class="stats-card">
                        <h3 class="stats-card-title">Assistance in your language</h3>
                        <div class="stats-card-content">
                            <span class="stats-card-value">24<span class="stats-card-value-unit">/7</span></span>
                            <div class="brand-icon stats-card-icon">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_chat.png" alt="Chat icon">
                            </div>
                        </div>
                    </div>
                    <div class="stats-card">
                        <h3 class="stats-card-title">Passport nationalities served</h3>
                        <div class="stats-card-content">
                            <span class="stats-card-value">200<span class="stats-card-value-unit">+</span></span>
                            <div class="brand-icon stats-card-icon">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_passport.png" alt="Passport icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Easy Process Section -->
            <div class="easy-process">
                <div class="easy-process-container">
                    <div class="easy-process-image-wrapper">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/backgrounds/couple_image.png" alt="Happy couple ready for travel" class="easy-process-image">
                    </div>
                    <div class="easy-process-content">
                        <div class="easy-process-header">
                            <div class="brand-icon">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_trust.png" alt="Shield icon">
                            </div>
                            <h2 class="easy-process-title">Our easy process</h2>
                        </div>
                        <div class="easy-process-steps">
                            <div class="easy-process-step">
                                <div class="easy-process-step-number">01</div>
                                <div class="easy-process-step-content">
                                    <h3 class="easy-process-step-title">Find the right visa</h3>
                                    <p class="easy-process-step-description">Use our smart visa finder to know exactly what you need —no confusion, no guessing.</p>
                                </div>
                                <div class="easy-process-step-connector"></div>
                            </div>
                            <div class="easy-process-step">
                                <div class="easy-process-step-number">02</div>
                                <div class="easy-process-step-content">
                                    <h3 class="easy-process-step-title">Just fill, click, and go</h3>
                                    <p class="easy-process-step-description">Fill out your travel details and pay securely. Then, upload any other required docs.</p>
                                </div>
                                <div class="easy-process-step-connector"></div>
                            </div>
                            <div class="easy-process-step">
                                <div class="easy-process-step-number">03</div>
                                <div class="easy-process-step-content">
                                    <h3 class="easy-process-step-title">We'll handle the rest</h3>
                                    <p class="easy-process-step-description">Our AI technology + human experts check everything to ensure a smooth approval.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Testimonials Section -->
            <div class="testimonials-section">
                <div class="grid-decorator"></div>
                <div class="testimonials-section-header">
                    <div class="testimonials-section-title-wrapper">
                        <div class="testimonials-section-icon-wrapper">
                            <div class="brand-icon">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_shield.png" alt="Shield icon">
                            </div>
                            <span class="testimonials-section-label">Stories worldwide</span>
                        </div>
                        <div class="testimonials-section-title-row">
                            <h2 class="testimonials-section-title">
                                Trusted by more than <span class="testimonials-section-title-highlight">50,000</span> reviewers
                            </h2>
                            <div class="testimonials-section-navigation">
                                <button class="testimonials-nav-button testimonials-nav-button-prev" id="testimonials-prev" aria-label="Previous testimonials">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button class="testimonials-nav-button testimonials-nav-button-next" id="testimonials-next" aria-label="Next testimonials">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonials-carousel">
                    <div class="testimonials-carousel-track" id="testimonials-track">
                        <div class="testimonials-carousel-slide">
                            <div class="testimonial-card">
                                <div class="testimonial-card-stars">
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                </div>
                                <p class="testimonial-card-text">The whole process was <span class="testimonial-card-highlight">incredibly simple</span> and much faster than I expected.</p>
                                <div class="testimonial-card-separator"></div>
                                <p class="testimonial-card-reviewer">- Jacob T.</p>
                            </div>
                        </div>
                        <div class="testimonials-carousel-slide">
                            <div class="testimonial-card">
                                <div class="testimonial-card-stars">
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                </div>
                                <p class="testimonial-card-text">I usually get stressed with paperwork, but this was <span class="testimonial-card-highlight">smooth</span> from start to finish.</p>
                                <div class="testimonial-card-separator"></div>
                                <p class="testimonial-card-reviewer">- Jacob T.</p>
                            </div>
                        </div>
                        <div class="testimonials-carousel-slide">
                            <div class="testimonial-card">
                                <div class="testimonial-card-stars">
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                </div>
                                <p class="testimonial-card-text">I didn't have to worry about forms or mistakes. Everything was handled perfectly.</p>
                                <div class="testimonial-card-separator"></div>
                                <p class="testimonial-card-reviewer">- Jacob T.</p>
                            </div>
                        </div>
                        <div class="testimonials-carousel-slide">
                            <div class="testimonial-card">
                                <div class="testimonial-card-stars">
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                </div>
                                <p class="testimonial-card-text"><span class="testimonial-card-highlight">Outstanding</span> service and support throughout the entire process.</p>
                                <div class="testimonial-card-separator"></div>
                                <p class="testimonial-card-reviewer">- Sarah M.</p>
                            </div>
                        </div>
                        <div class="testimonials-carousel-slide">
                            <div class="testimonial-card">
                                <div class="testimonial-card-stars">
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                    <div class="testimonial-card-star-wrapper"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_star.png" alt="Star" class="testimonial-card-star"></div>
                                </div>
                                <p class="testimonial-card-text"><span class="testimonial-card-highlight">Quick</span>, efficient, and <span class="testimonial-card-highlight">hassle-free</span>. Highly recommend!</p>
                                <div class="testimonial-card-separator"></div>
                                <p class="testimonial-card-reviewer">- Michael R.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonials-pagination" id="testimonials-pagination">
                    <!-- Dots will be populated by JS -->
                </div>
            </div>

            <!-- When The World Section -->
            <div class="when-the-world">
                <div class="when-the-world-container">
                    <div class="when-the-world-content">
                        <div class="when-the-world-top-section">
                            <div class="when-the-world-header">
                                <div class="brand-icon">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_shield.png" alt="Shield icon">
                                </div>
                                <span class="when-the-world-header-text">Itinerary in the world</span>
                            </div>
                            <h2 class="when-the-world-headline">
                                When the world was the itinerary, we delivered.
                            </h2>
                        </div>
                        <div class="when-the-world-bottom-section">
                            <div class="when-the-world-cta">
                                <button class="icon-btn icon-btn-primary icon-btn-md when-the-world-btn">
                                    <span class="icon-btn-icon icon-btn-icon-left">
                                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_turn_right.png" alt="" style="width: 16px; height: 16px;">
                                    </span>
                                    <span class="icon-btn-text">Get started</span>
                                </button>
                            </div>
                            <p class="when-the-world-text">
                                Someone visited every country on Earth in just 499 days — with our visa support. Your plan doesn't have to be that extreme, but we'll treat it like it is.
                            </p>
                        </div>
                    </div>
                    <div class="when-the-world-image-wrapper">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/backgrounds/when_the_world.png" alt="Traveler in mountains" class="when-the-world-image">
                    </div>
                </div>
            </div>

            <!-- INC 5000 Banner Section -->
            <div class="inc-5000-banner">
                <div class="inc-5000-container">
                    <div class="inc-5000-content">
                        <h2 class="inc-5000-title">Officially Ranked on the INC 5000</h2>
                        <p class="inc-5000-subtitle">Our growth isn't just impressive—it's nationally recognized.</p>
                    </div>
                </div>
            </div>

            <!-- Email Signup CTA Banner -->
            <div class="email-signup-banner">
                <img src="<?php echo get_template_directory_uri(); ?>/images/backgrounds/signup_for_travel.png" alt="Travel illustration" class="email-signup-image">
                <div class="email-signup-container">
                    <div class="email-signup-left">
                        <div class="email-signup-content">
                            <h2 class="email-signup-title">Travel easy, go anywhere</h2>
                            <p class="email-signup-subtitle">Sign up for travel tips, visa alerts, and exclusive deals.</p>
                        </div>
                    </div>
                    <div class="email-signup-form-wrapper">
                        <form class="email-signup-form">
                            <input type="email" placeholder="Write your email" class="email-signup-input" required>
                            <button type="submit" class="email-signup-submit">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/icons/icon_paper_plane.png" alt="Submit" class="email-signup-icon">
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Footer Section -->
            <footer class="visaelo-footer">
                <div class="footer-container">
                    <div class="footer-brand">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/icons/footer_logo.png" alt="visaelo" class="footer-logo">
                        <p class="footer-description">Visaelo makes global travel simpler with fast, reliable visa processing and expert support.</p>
                    </div>
                    <div class="footer-nav">
                        <div class="footer-nav-column">
                            <h3 class="footer-nav-title">Popular Travel Visas</h3>
                            <ul class="footer-nav-links">
                                <li><a href="#" class="footer-nav-link">Visaelo Plus</a></li>
                            </ul>
                        </div>
                        <div class="footer-nav-column">
                            <h3 class="footer-nav-title">Company</h3>
                            <ul class="footer-nav-links">
                                <li><a href="#" class="footer-nav-link">About Us</a></li>
                                <li><a href="#" class="footer-nav-link">Careers</a></li>
                                <li><a href="#" class="footer-nav-link">Get visa updates</a></li>
                                <li><a href="#" class="footer-nav-link">Contact Us</a></li>
                            </ul>
                        </div>
                        <div class="footer-nav-column">
                            <h3 class="footer-nav-title">Help Center</h3>
                            <ul class="footer-nav-links">
                                <li><a href="#" class="footer-nav-link">Testimonials</a></li>
                                <li><a href="#" class="footer-nav-link">Partnerships</a></li>
                                <li><a href="#" class="footer-nav-link">Refer a Friend</a></li>
                                <li><a href="#" class="footer-nav-link">Privacy Choices</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-separator"></div>
                <p class="footer-copyright">© 2014-2025 Visaelo. All rights reserved.</p>
            </footer>
        </div>
    </main>
</div>

<?php get_footer(); ?>

