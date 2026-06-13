/* ==========================================================================
   TRAVICE - LUXURY AUTOMOTIVE DETAILING & CERAMIC COATING SERVICE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SCROLL-TRIGGERED ANIMATIONS & ON-LOAD INITIALIZATION
       ========================================================================== */
    // Trigger on-load elements in the hero banner
    const loadAnimators = document.querySelectorAll('.animate-on-load');
    setTimeout(() => {
        loadAnimators.forEach(element => {
            element.classList.add('ready');
        });
    }, 100);

    // Scroll animation Observer (Fade in and lift cards)
    const scrollObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // If it is a progress bar container, animate the bar width
                if (entry.target.classList.contains('about-content')) {
                    animateAboutProgressBars();
                }
                
                // If it is the stats section, animate the counters
                if (entry.target.classList.contains('stats-grid') || entry.target.closest('.stats')) {
                    animateStatsCounters();
                }

                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, scrollObserverOptions);

    // Register all elements to observe
    document.querySelectorAll('.animate-on-scroll, .stats-grid, .about-content').forEach(element => {
        scrollObserver.observe(element);
    });


    /* ==========================================================================
       2. STICKY UTILITY HEADER & BACK TO TOP BUTTON
       ========================================================================== */
    const headerElement = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Sticky navigation trigger
        if (scrollPosition > 50) {
            headerElement.classList.add('scrolled');
        } else {
            headerElement.classList.remove('scrolled');
        }

        // Back to top indicator trigger
        if (backToTopBtn) {
            if (scrollPosition > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });



    /* ==========================================================================
       4. MOBILE DROPDOWN HAMBURGER MENU DRAWER
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile drawer when clicking any link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });


    /* ==========================================================================
       4. ACTIVE PAGE NAVIGATION LINK HIGHLIGHTER (URL-based, no scrollspy)
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-link');

    // Determine the current page filename from the URL
    function getCurrentPageName() {
        const path = window.location.pathname;
        const pageName = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
        // Treat empty path or bare slash as index.html
        if (!pageName || pageName === '/') {
            return 'index.html';
        }
        return pageName;
    }

    const currentPage = getCurrentPageName();

    // Resolve which nav href should be active for the current page.
    // Special cases:
    //   gallery-page-2.html  → gallery.html (sub-page of gallery)
    //   index.html or ''     → index.html
    //   home-2.html          → home-2.html (its own dedicated page)
    function resolveActiveHref(pageName) {
        if (pageName === 'gallery-page-2.html') return 'gallery.html';
        return pageName;
    }

    const activeHref = resolveActiveHref(currentPage);

    // Set active class based purely on the URL — called once, never changes on scroll
    function setActivePageLink() {
        // Desktop nav links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === activeHref) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Mobile nav links
        mobileLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === activeHref) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActivePageLink();


    /* ==========================================================================
       4b. FLOATING NAV PILL HIGHLIGHTER
       ========================================================================== */
    (function initNavPill() {
        const navMenu = document.querySelector('.nav-menu ul');
        if (!navMenu) return;

        // Create the pill element
        const pill = document.createElement('div');
        pill.className = 'nav-pill';
        navMenu.insertBefore(pill, navMenu.firstChild);

        // Get all li items (pill should track the <a> inside each <li>)
        const navItems = navMenu.querySelectorAll('.nav-link');

        function movePillTo(linkEl) {
            const ulRect   = navMenu.getBoundingClientRect();
            const linkRect = linkEl.getBoundingClientRect();
            const hPad = 14; // horizontal padding inside the pill
            pill.style.left  = (linkRect.left - ulRect.left - hPad) + 'px';
            pill.style.width = (linkRect.width + hPad * 2) + 'px';
        }

        // On load: snap pill to the currently active link (no animation)
        function snapToActive() {
            const active = navMenu.querySelector('.nav-link.active');
            if (active) {
                pill.style.transition = 'none';
                movePillTo(active);
                pill.classList.add('pill-active');
                // Re-enable transitions next frame
                requestAnimationFrame(() => {
                    pill.style.transition = '';
                });
            } else {
                pill.classList.remove('pill-active');
            }
        }

        snapToActive();

        // Hover: slide pill to hovered link
        navItems.forEach(link => {
            link.addEventListener('mouseenter', () => movePillTo(link));
        });

        // Mouse leave the whole nav: snap back to active link
        navMenu.addEventListener('mouseleave', () => snapToActive());

        // Re-snap whenever active class changes (scrollspy updates)
        const observer = new MutationObserver(snapToActive);
        navItems.forEach(link => {
            observer.observe(link, { attributes: true, attributeFilter: ['class'] });
        });

        // Re-position on window resize
        window.addEventListener('resize', snapToActive);
    })();


    /* ==========================================================================
       5. ABOUT SECTION PROGRESS BAR WIDTH ANIMATION
       ========================================================================== */
    function animateAboutProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar-fill');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress');
            bar.style.width = targetWidth;
        });
    }


    /* ==========================================================================
       6. LIVE TARGET COUNTERS STATS ANIMATOR
       ========================================================================== */
    let statsAnimated = false;

    function animateStatsCounters() {
        if (statsAnimated) return; // Prevent duplicate triggers
        statsAnimated = true;

        const statNumbers = document.querySelectorAll('.stat-num');
        const duration = 2200; // Animation length in milliseconds

        statNumbers.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-target'), 10);
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progressRatio = Math.min(elapsedTime / duration, 1);
                
                // Easing formula (quadratic out)
                const easedProgress = progressRatio * (2 - progressRatio);
                const currentCount = Math.floor(easedProgress * targetValue);

                // Format numbers over 1000 with commas (e.g. 15,420)
                if (targetValue > 1000) {
                    stat.textContent = currentCount.toLocaleString();
                } else if (stat.getAttribute('data-target') === '999') {
                    // Treat 999 as 99.9%
                    stat.textContent = (currentCount / 10).toFixed(1) + '%';
                } else {
                    stat.textContent = currentCount;
                }

                if (progressRatio < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    // Enforce precise target at completion
                    if (targetValue > 1000) {
                        stat.textContent = targetValue.toLocaleString() + '+';
                    } else if (stat.getAttribute('data-target') === '999') {
                        stat.textContent = '99.9%';
                    } else {
                        stat.textContent = targetValue + '+';
                    }
                }
            }

            requestAnimationFrame(updateCount);
        });
    }


    /* ==========================================================================
       7. BEFORE & AFTER INTERACTIVE SLIDER (TOUCH & MOUSE DRAGGABLE)
       ========================================================================== */
    const baSliders = document.querySelectorAll('.ba-slider');

    if (baSliders.length > 0) {
        baSliders.forEach(slider => {
            const afterImageLayer = slider.querySelector('.after-img');
            const sliderHandle = slider.querySelector('.slider-handle');
            let isDragging = false;

            function setSliderPosition(xCoordinate) {
                const sliderBoundingRect = slider.getBoundingClientRect();
                let relativeX = xCoordinate - sliderBoundingRect.left;
                
                // Constrain position between 0 and slider width bounds
                if (relativeX < 0) relativeX = 0;
                if (relativeX > sliderBoundingRect.width) relativeX = sliderBoundingRect.width;

                const percentageOffset = (relativeX / sliderBoundingRect.width) * 100;
                
                // Update handle location and overlay crop width
                sliderHandle.style.left = `${percentageOffset}%`;
                afterImageLayer.style.width = `${percentageOffset}%`;
            }

            // --- Mouse Action Triggers ---
            sliderHandle.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault();
                document.body.style.cursor = 'ew-resize';
            });

            window.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    document.body.style.cursor = '';
                }
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                setSliderPosition(e.clientX);
            });

            // --- Touch Action Triggers for Mobile Screens ---
            sliderHandle.addEventListener('touchstart', (e) => {
                isDragging = true;
                document.body.style.cursor = 'ew-resize';
            }, { passive: true });

            window.addEventListener('touchend', () => {
                if (isDragging) {
                    isDragging = false;
                    document.body.style.cursor = '';
                }
            });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                if (e.touches.length > 0) {
                    setSliderPosition(e.touches[0].clientX);
                }
            }, { passive: true });

            // Enable clicking anywhere on the slider container to move it immediately
            slider.addEventListener('click', (e) => {
                // Prevent trigger if the user was clicking directly on the handle button
                if (e.target.closest('.slider-handle')) return;
                setSliderPosition(e.clientX);
            });
        });
    }


    /* ==========================================================================
       8. CUSTOMER TESTIMONIALS SLIDER SECTION (FADE & SLIDE DYNAMIC CAROUSEL)
       ========================================================================== */
    const testimonialSlider = document.getElementById('testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('slider-dots-container');
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');
    let currentSlideIndex = 0;
    let autoRotateInterval;

    if (slides.length > 0) {
        
        // Dynamic dots creation matching slides length
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dotSpan = document.createElement('span');
            dotSpan.classList.add('dot');
            if (idx === 0) dotSpan.classList.add('active');
            dotSpan.addEventListener('click', () => {
                goToSlide(idx);
                resetAutoRotation();
            });
            dotsContainer.appendChild(dotSpan);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(slideIndex) {
            // Remove active classes
            slides[currentSlideIndex].classList.remove('active');
            dots[currentSlideIndex].classList.remove('active');

            // Apply new slide index
            currentSlideIndex = slideIndex;

            // Loop parameters
            if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
            if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

            // Apply active classes
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        }

        function triggerNextSlide() {
            goToSlide(currentSlideIndex + 1);
        }

        function triggerPrevSlide() {
            goToSlide(currentSlideIndex - 1);
        }

        // Navigation button listeners
        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                triggerNextSlide();
                resetAutoRotation();
            });

            prevBtn.addEventListener('click', () => {
                triggerPrevSlide();
                resetAutoRotation();
            });
        }

        // Auto-rotation parameters (Rotates every 6 seconds)
        function startAutoRotation() {
            autoRotateInterval = setInterval(triggerNextSlide, 6000);
        }

        function resetAutoRotation() {
            clearInterval(autoRotateInterval);
            startAutoRotation();
        }

        // Pause auto-rotation when hovering over the testimonial card to read
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
            testimonialSlider.addEventListener('mouseleave', startAutoRotation);
        }

        startAutoRotation(); // Initialize carousel cycle
    }


    /* ==========================================================================
       9. FAQ ACCORDION COMPONENT WITH HEIGHT TRANSITION SLIDES
       ========================================================================== */
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem = trigger.parentElement;
            const faqPanel = faqItem.querySelector('.faq-panel');
            const isActive = faqItem.classList.contains('active');

            // Close all other active FAQ blocks for clean accordion structure
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-panel').style.maxHeight = '0px';
                }
            });

            // Toggle selected panel height
            if (isActive) {
                faqItem.classList.remove('active');
                faqPanel.style.maxHeight = '0px';
            } else {
                faqItem.classList.add('active');
                // Calculate scrollHeight dynamically to enable fluid transition
                faqPanel.style.maxHeight = `${faqPanel.scrollHeight}px`;
            }
        });
    });


    /* ==========================================================================
       10. FORM SUBMISSION VALIDATION & INTERACTIVE ALERTS
       ========================================================================== */
    
    // Auxiliary helper function to display a custom luxury toast notification
    function showNotification(type, messageTitle, messageBody) {
        // Create premium notification card node
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '30px';
        toast.style.backgroundColor = '#0A1120';
        toast.style.border = '2px solid #FFB800';
        toast.style.borderRadius = '8px';
        toast.style.padding = '20px 25px';
        toast.style.zIndex = '9999';
        toast.style.width = '340px';
        toast.style.boxShadow = '0 15px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255, 184, 0, 0.2)';
        toast.style.fontFamily = 'Outfit, sans-serif';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(30px)';
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        const toastHeader = document.createElement('div');
        toastHeader.style.display = 'flex';
        toastHeader.style.alignItems = 'center';
        toastHeader.style.gap = '10px';
        toastHeader.style.marginBottom = '8px';

        const toastIcon = document.createElement('i');
        toastIcon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
        toastIcon.style.color = '#FFB800';
        toastIcon.style.fontSize = '1.3rem';

        const toastTitle = document.createElement('h4');
        toastTitle.textContent = messageTitle;
        toastTitle.style.color = '#FFFFFF';
        toastTitle.style.fontWeight = '800';
        toastTitle.style.margin = '0';
        toastTitle.style.fontSize = '0.95rem';

        toastHeader.appendChild(toastIcon);
        toastHeader.appendChild(toastTitle);

        const toastText = document.createElement('p');
        toastText.textContent = messageBody;
        toastText.style.color = '#BAC4D6';
        toastText.style.fontSize = '0.8rem';
        toastText.style.lineHeight = '1.5';
        toastText.style.margin = '0';

        toast.appendChild(toastHeader);
        toast.appendChild(toastText);
        document.body.appendChild(toast);

        // Slide In Animation
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        // Slide Out and Destroy
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(30px)';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 5500);
    }

    // --- QUICK ABOUT REQUEST FORM ---
    const quickBookingForm = document.getElementById('quick-booking-form');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userName = document.getElementById('quick-name').value;
            
            showNotification(
                'success',
                'SERVICE INQUIRY SENT!',
                `Thank you ${userName}. Our executive concierge will call you within 15 minutes for details.`
            );
            
            quickBookingForm.reset();
        });
    }

    // --- MASTER APPOINTMENT BOOKING FORM ---
    const masterBookingForm = document.getElementById('master-booking-form');
    if (masterBookingForm) {
        masterBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientName = document.getElementById('book-name').value;
            const vehicle = document.getElementById('book-vehicle').value;
            
            showNotification(
                'success',
                'APPOINTMENT REGISTERED!',
                `Excellent choice, ${clientName}! A custom paint analysis voucher is sent to your phone for your ${vehicle}.`
            );
            
            masterBookingForm.reset();
        });
    }

    // --- NEWSLETTER FORM ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            showNotification(
                'success',
                'SUBSCRIBED SUCCESSFULLY!',
                `Thank you for joining. You are now registered to receive premium automotive care guides and exclusive studio discounts.`
            );
            
            newsletterForm.reset();
        });
    }

    // --- THEME SWITCHER CONTROLLER ---
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // --- RTL LAYOUT CONTROLLER ---
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            const newRTL = !isRTL;
            
            if (newRTL) {
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.classList.add('rtl-active');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.classList.remove('rtl-active');
            }
            localStorage.setItem('rtl', newRTL ? 'true' : 'false');
        });
    });


    /* ==========================================================================
       11. PREMIUM NEW DYNAMIC MODULES (CALCULATOR, ZONES & STEPPER MODAL)
       ========================================================================== */

    // -------------------------------------------------------------
    // MODULE A: PRICING CALCULATOR CONTROLLER
    // -------------------------------------------------------------
    const calcSection = document.getElementById('pricing-calculator');
    let selectedMode = 'studio'; // Studio mode by default

    if (calcSection) {
        const calcVehicle = document.getElementById('calc-vehicle-type');
        const calcPackage = document.getElementById('calc-package');
        const calcCoating = document.getElementById('calc-coating');
        const calcCorrection = document.getElementById('calc-correction');
        const calcModeStudio = document.getElementById('calc-mode-studio');
        const calcModeMobile = document.getElementById('calc-mode-mobile');

        // Toggle Addon checkbox active state
        calcSection.querySelectorAll('.addon-card').forEach(card => {
            const checkbox = card.querySelector('.addon-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                    updateCalculator();
                });
            }

            // Click anywhere on card to toggle
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                }
            });
        });

        // Mode triggers
        if (calcModeStudio && calcModeMobile) {
            calcModeStudio.addEventListener('click', () => {
                calcModeStudio.classList.add('active');
                calcModeMobile.classList.remove('active');
                selectedMode = 'studio';
                updateCalculator();
            });
            calcModeMobile.addEventListener('click', () => {
                calcModeMobile.classList.add('active');
                calcModeStudio.classList.remove('active');
                selectedMode = 'mobile';
                updateCalculator();
            });
        }

        // Dropdowns and slider events
        if (calcVehicle) calcVehicle.addEventListener('change', updateCalculator);
        if (calcPackage) calcPackage.addEventListener('change', updateCalculator);
        if (calcCoating) calcCoating.addEventListener('change', updateCalculator);
        if (calcCorrection) {
            calcCorrection.addEventListener('input', updateCalculator);
        }

        // Calculator Formula Logic
        function updateCalculator() {
            if (!calcVehicle) return;

            // 1. Vehicle base price
            const vehicleOption = calcVehicle.options[calcVehicle.selectedIndex];
            const vehiclePrice = parseFloat(vehicleOption.getAttribute('data-price') || 0);
            const vehicleText = vehicleOption.text.split(' ($')[0];

            // 2. Package price
            const packageOption = calcPackage.options[calcPackage.selectedIndex];
            const packagePrice = parseFloat(packageOption.getAttribute('data-price') || 0);
            const packageText = packageOption.text.split(' ($')[0];

            // 3. Coating price
            const coatingOption = calcCoating.options[calcCoating.selectedIndex];
            const coatingPrice = parseFloat(coatingOption.getAttribute('data-price') || 0);
            const coatingText = coatingOption.text.split(' (+$')[0];

            // 4. Paint Correction stages
            const correctionValue = parseInt(calcCorrection.value);
            let correctionPrice = 0;
            let correctionText = "None";
            if (correctionValue === 1) {
                correctionPrice = 150;
                correctionText = "Stage 1: Swirl Polish";
            } else if (correctionValue === 2) {
                correctionPrice = 300;
                correctionText = "Stage 2: Multi-Pass";
            } else if (correctionValue === 3) {
                correctionPrice = 500;
                correctionText = "Stage 3: Concourse Level";
            }

            // Update paint correction text above slider
            const calcSliderValueDisplay = document.getElementById('calc-slider-value-display');
            if (calcSliderValueDisplay) {
                calcSliderValueDisplay.textContent = correctionText + " (+$" + correctionPrice + ")";
            }

            // Ticks highlighting
            calcSection.querySelectorAll('.calc-tick').forEach((tick, i) => {
                if (i === correctionValue) {
                    tick.classList.add('active');
                } else {
                    tick.classList.remove('active');
                }
            });

            // 5. Addons
            let addonsPrice = 0;
            let selectedAddonsList = [];
            calcSection.querySelectorAll('.addon-checkbox').forEach(checkbox => {
                if (checkbox.checked) {
                    const card = checkbox.closest('.addon-card');
                    const price = parseFloat(card.getAttribute('data-price') || 0);
                    addonsPrice += price;
                    selectedAddonsList.push(card.querySelector('.addon-name').textContent);
                }
            });
            const addonsText = selectedAddonsList.length > 0 ? selectedAddonsList.join(', ') : "None Selected";

            // 6. Mode Surcharge
            let modePrice = selectedMode === 'mobile' ? 50 : 0;
            let modeText = selectedMode === 'mobile' ? "Doorstep Mobile" : "HQ Studio Lab";

            // Dynamic sum
            const total = vehiclePrice + packagePrice + coatingPrice + correctionPrice + addonsPrice + modePrice;

            // Render to summary fields
            const sumVehicle = document.getElementById('sum-vehicle');
            const sumPackage = document.getElementById('sum-package');
            const sumCoating = document.getElementById('sum-coating');
            const sumCorrection = document.getElementById('sum-correction');
            const sumAddons = document.getElementById('sum-addons');
            const sumMode = document.getElementById('sum-mode');
            const totalDisplay = document.getElementById('calc-total-display');

            if (sumVehicle) sumVehicle.textContent = `${vehicleText} (+$${vehiclePrice})`;
            if (sumPackage) sumPackage.textContent = `${packageText} ($${packagePrice})`;
            if (sumCoating) sumCoating.textContent = `${coatingText} (+$${coatingPrice})`;
            if (sumCorrection) sumCorrection.textContent = `${correctionText} (+$${correctionPrice})`;
            if (sumAddons) sumAddons.textContent = `${addonsText} (+$${addonsPrice})`;
            if (sumMode) sumMode.textContent = `${modeText} (+$${modePrice})`;

            if (totalDisplay) {
                totalDisplay.innerHTML = `$${total.toLocaleString()}<span>*</span>`;
            }
        }

        // Initialize calculator math immediately
        updateCalculator();
    }


    // -------------------------------------------------------------
    // MODULE B: INTERACTIVE DISTRICT SERVICE ZONES MAP CONTROLLER
    // -------------------------------------------------------------
    const mapSection = document.getElementById('mobile-service-zones');
    if (mapSection) {
        const regionBadges = mapSection.querySelectorAll('.region-badge');
        const mapMarkers = mapSection.querySelectorAll('.map-pulse-marker');
        const activeRegionName = document.getElementById('active-region-name');

        const regionNamesMapping = {
            central: "HQ Studio Lab (Central HQ)",
            north: "North Shore Region & Suburbs",
            west: "West Hills Region & Lakeside",
            south: "South Coast & Bay Area",
            east: "East Valley & Highpoint District"
        };

        function selectRegion(regionId) {
            // Remove active classes
            regionBadges.forEach(badge => badge.classList.remove('active'));
            mapMarkers.forEach(marker => marker.classList.remove('active'));

            // Add active classes
            const targetBadge = mapSection.querySelector(`.region-badge[data-region="${regionId}"]`);
            const targetMarker = mapSection.querySelector(`.map-pulse-marker[data-region="${regionId}"]`);

            if (targetBadge) targetBadge.classList.add('active');
            if (targetMarker) targetMarker.classList.add('active');

            // Update region name title
            if (activeRegionName) {
                activeRegionName.textContent = regionNamesMapping[regionId] || regionId;
            }
        }

        // Add click events to badges
        regionBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                const regionId = badge.getAttribute('data-region');
                selectRegion(regionId);
            });
        });

        // Add hover/click events to pulsing map markers
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const regionId = marker.getAttribute('data-region');
                selectRegion(regionId);
            });
            marker.addEventListener('mouseenter', () => {
                const regionId = marker.getAttribute('data-region');
                selectRegion(regionId);
            });
        });
    }


    // -------------------------------------------------------------
    // MODULE C: DYNAMIC MULTI-STEP ONLINE STEPPER BOOKING MODAL
    // -------------------------------------------------------------
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('close-booking-modal');
    const modalForm = document.getElementById('modal-booking-form');

    const stepPanes = document.querySelectorAll('.step-pane');
    const stepIndicators = document.querySelectorAll('.stepper-step');
    const progressBar = document.getElementById('stepper-progress-bar');
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const modalLoading = document.getElementById('booking-loading');
    const confirmationReceipt = document.getElementById('confirmation-receipt');
    const modalStepperFooter = document.getElementById('modal-stepper-footer');

    let currentStep = 1;

    function openModal() {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
        resetModal();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Connect close events
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Reset modal fields and steppers
    function resetModal() {
        currentStep = 1;
        if (modalForm) modalForm.reset();

        if (modalLoading) modalLoading.classList.remove('active');
        if (confirmationReceipt) confirmationReceipt.classList.remove('active');
        if (modalStepperFooter) modalStepperFooter.style.display = 'flex';

        // Clear active class from modal addon cards
        modal.querySelectorAll('.addon-card').forEach(card => card.classList.remove('active'));

        const addressGroup = document.getElementById('modal-address-group');
        if (addressGroup) addressGroup.style.display = 'none';

        goToStep(1);
    }

    // Progress stepper indicators
    function goToStep(step) {
        currentStep = step;

        stepPanes.forEach((pane, idx) => {
            if (idx + 1 === step) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        if (progressBar) {
            const width = ((step - 1) / 2) * 100;
            progressBar.style.width = `${width}%`;
        }

        stepIndicators.forEach((indicator, idx) => {
            const num = idx + 1;
            if (num < step) {
                indicator.className = 'stepper-step completed';
                indicator.querySelector('.step-number').innerHTML = '<i class="fas fa-check"></i>';
            } else if (num === step) {
                indicator.className = 'stepper-step active';
                indicator.querySelector('.step-number').textContent = num;
            } else {
                indicator.className = 'stepper-step';
                indicator.querySelector('.step-number').textContent = num;
            }
        });

        // Prev and Next CTA button updates
        if (prevStepBtn) {
            prevStepBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
        }
        if (nextStepBtn) {
            nextStepBtn.querySelector('span').textContent = step === 3 ? 'SUBMIT RESERVE' : 'NEXT STEP';
        }
    }

    // Stepper navigation clicks
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            const activePane = modal.querySelector('.step-pane.active');
            if (!activePane) return;

            const inputs = activePane.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    isValid = false;
                }
            });

            if (!isValid) return;

            if (currentStep < 3) {
                goToStep(currentStep + 1);
            } else {
                submitBooking();
            }
        });
    }

    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    }

    // Simulated speedometer loading and database receipt creation
    function submitBooking() {
        if (modalLoading) modalLoading.classList.add('active');
        if (modalStepperFooter) modalStepperFooter.style.display = 'none';

        const nameVal = document.getElementById('modal-name').value;
        const vehicleSelect = document.getElementById('modal-vehicle-type');
        const vehicleVal = vehicleSelect.options[vehicleSelect.selectedIndex].text;
        
        const packageSelect = document.getElementById('modal-package');
        const packageVal = packageSelect.options[packageSelect.selectedIndex].text;

        const coatingSelect = document.getElementById('modal-coating');
        const coatingVal = coatingSelect.options[coatingSelect.selectedIndex].text;

        const dateVal = document.getElementById('modal-date').value;
        const timeVal = document.getElementById('modal-time').value;
        const modeSelect = document.getElementById('modal-service-mode');
        const modeVal = modeSelect.options[modeSelect.selectedIndex].text;
        const addressVal = document.getElementById('modal-address').value || 'HQ Detailing Lab, 99 Roving St.';

        // Surcharges mapping for receipt
        const vehiclePrices = { sedan: 0, suv: 50, truck: 100, exotic: 150 };
        const packagePrices = { none: 0, bronze: 399, silver: 699, gold: 1199 };
        const coatingPrices = { none: 0, 'nano-9h': 200, 'self-healing': 399, graphene: 599 };

        const selVehicle = document.getElementById('modal-vehicle-type').value;
        const selPackage = document.getElementById('modal-package').value;
        const selCoating = document.getElementById('modal-coating').value;

        let total = 0;
        total += (vehiclePrices[selVehicle] || 0);
        total += (packagePrices[selPackage] || 0);
        total += (coatingPrices[selCoating] || 0);

        if (document.getElementById('modal-addon-leather').checked) total += 150;
        if (document.getElementById('modal-addon-wheels').checked) total += 250;

        const selMode = document.getElementById('modal-service-mode').value;
        total += (selMode === 'mobile' ? 50 : 0);

        let formattedDate = dateVal;
        if (dateVal) {
            const dateObj = new Date(dateVal + 'T00:00:00');
            formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }

        // Simulate 2.2 seconds dial speed spinner and speedometer wiggling
        setTimeout(() => {
            if (modalLoading) modalLoading.classList.remove('active');

            // Set dynamic values in receipt
            const recName = document.getElementById('rec-name');
            const recVehicle = document.getElementById('rec-vehicle');
            const recPackage = document.getElementById('rec-package');
            const recCoating = document.getElementById('rec-coating');
            const recDateTime = document.getElementById('rec-date-time');
            const recMode = document.getElementById('rec-mode');
            const recAddress = document.getElementById('rec-address');
            const recPrice = document.getElementById('rec-price');

            if (recName) recName.textContent = nameVal;
            if (recVehicle) recVehicle.textContent = vehicleVal;
            if (recPackage) recPackage.textContent = packageVal;
            if (recCoating) recCoating.textContent = coatingVal;
            if (recDateTime) recDateTime.textContent = `${formattedDate} at ${timeVal}`;
            if (recMode) recMode.textContent = modeVal;
            if (recAddress) recAddress.textContent = addressVal;
            if (recPrice) recPrice.textContent = `$${total.toLocaleString()}`;

            // Show Confirmation Receipt card
            if (confirmationReceipt) confirmationReceipt.classList.add('active');

            // Complete progress row indices
            stepIndicators.forEach(indicator => {
                indicator.className = 'stepper-step completed';
                indicator.querySelector('.step-number').innerHTML = '<i class="fas fa-check"></i>';
            });
            if (progressBar) progressBar.style.width = '100%';

            // Trigger floating upcoming appointment toast reminder in bottom-right
            triggerAppointmentToast(nameVal, vehicleVal, formattedDate, timeVal, modeVal, addressVal);

        }, 2200);
    }

    // Intercept clicking header and hero CTAs to open the stepper modal
    const bookingTriggers = document.querySelectorAll('.btn-header, .btn-hero, .btn-pricing, .btn-pricing-select, .btn-pricing-action');
    bookingTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (modal) {
                e.preventDefault();

                // Pre-populate package in Step 1 if selecting package cards
                const text = trigger.textContent.toUpperCase();
                const modalPackage = document.getElementById('modal-package');
                if (modalPackage) {
                    if (text.includes('BRONZE') || text.includes('SELECT BRONZE')) {
                        modalPackage.value = 'bronze';
                    } else if (text.includes('SILVER') || text.includes('SELECT SILVER')) {
                        modalPackage.value = 'silver';
                    } else if (text.includes('GOLD') || text.includes('SELECT GOLD')) {
                        modalPackage.value = 'gold';
                    }
                }

                openModal();
            }
        });
    });

    // Make clicking the calculator's Book button copy values to Step 1 & open modal
    const calcBookBtn = document.getElementById('calc-book-btn');
    if (calcBookBtn) {
        calcBookBtn.addEventListener('click', () => {
            const vehicleVal = document.getElementById('calc-vehicle-type').value;
            const packageVal = document.getElementById('calc-package').value;
            const coatingVal = document.getElementById('calc-coating').value;

            const modalVehicle = document.getElementById('modal-vehicle-type');
            const modalPackage = document.getElementById('modal-package');
            const modalCoating = document.getElementById('modal-coating');

            if (modalVehicle) modalVehicle.value = vehicleVal;
            if (modalPackage) modalPackage.value = packageVal;
            if (modalCoating) modalCoating.value = coatingVal;

            // Optional add-ons
            const leatherChecked = document.getElementById('addon-leather').checked;
            const wheelsChecked = document.getElementById('addon-wheels').checked;
            
            const modalLeather = document.getElementById('modal-addon-leather');
            const modalWheels = document.getElementById('modal-addon-wheels');

            if (modalLeather) {
                modalLeather.checked = leatherChecked;
                const modalAddonCardLeather = document.getElementById('modal-addon-card-leather');
                if (modalAddonCardLeather) {
                    if (leatherChecked) modalAddonCardLeather.classList.add('active');
                    else modalAddonCardLeather.classList.remove('active');
                }
            }
            if (modalWheels) {
                modalWheels.checked = wheelsChecked;
                const modalAddonCardWheels = document.getElementById('modal-addon-card-wheels');
                if (modalAddonCardWheels) {
                    if (wheelsChecked) modalAddonCardWheels.classList.add('active');
                    else modalAddonCardWheels.classList.remove('active');
                }
            }

            // Detailing mode location
            const modalMode = document.getElementById('modal-service-mode');
            if (modalMode) {
                modalMode.value = selectedMode;
                const modalAddressGroup = document.getElementById('modal-address-group');
                if (modalAddressGroup) {
                    modalAddressGroup.style.display = selectedMode === 'mobile' ? 'block' : 'none';
                    const modalAddressInput = document.getElementById('modal-address');
                    if (modalAddressInput) modalAddressInput.required = selectedMode === 'mobile';
                }
            }

            openModal();
        });
    }

    // Toggle Modal address input block dynamically
    const modalServiceMode = document.getElementById('modal-service-mode');
    const modalAddressGroup = document.getElementById('modal-address-group');
    const modalAddress = document.getElementById('modal-address');
    if (modalServiceMode && modalAddressGroup && modalAddress) {
        modalServiceMode.addEventListener('change', () => {
            if (modalServiceMode.value === 'mobile') {
                modalAddressGroup.style.display = 'block';
                modalAddress.required = true;
            } else {
                modalAddressGroup.style.display = 'none';
                modalAddress.required = false;
                modalAddress.value = '';
            }
        });
    }

    // Handle interactive click events for step 1 addon cards inside modal
    if (modal) {
        modal.querySelectorAll('.addon-card').forEach(card => {
            const checkbox = card.querySelector('.addon-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) card.classList.add('active');
                    else card.classList.remove('active');
                });
            }
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                }
            });
        });
    }


    // -------------------------------------------------------------
    // MODULE D: CONDITIONALLY TOGGLE ADDRESS INPUT ON CONTACT PAGE FORM
    // -------------------------------------------------------------
    const bookServiceMode = document.getElementById('book-service-mode');
    const bookAddressGroup = document.getElementById('book-address-group');
    const bookAddress = document.getElementById('book-address');
    if (bookServiceMode && bookAddressGroup && bookAddress) {
        bookServiceMode.addEventListener('change', () => {
            if (bookServiceMode.value === 'mobile') {
                bookAddressGroup.style.display = 'block';
                bookAddress.required = true;
            } else {
                bookAddressGroup.style.display = 'none';
                bookAddress.required = false;
                bookAddress.value = '';
            }
        });
    }


    // -------------------------------------------------------------
    // MODULE E: DYNAMIC APPOINTMENT REMINDER TOAST NOTIFICATION CARD
    // -------------------------------------------------------------
    const reminderToast = document.getElementById('reminder-toast');
    const reminderToastBody = document.getElementById('reminder-toast-body');
    const reminderDismissBtn = document.getElementById('reminder-dismiss-btn');
    const reminderSnoozeBtn = document.getElementById('reminder-snooze-btn');

    let snoozeCount = 0;
    let savedToastData = {};

    function triggerAppointmentToast(name, vehicle, date, time, mode, address) {
        if (!reminderToast) return;

        savedToastData = { name, vehicle, date, time, mode, address };

        if (reminderToastBody) {
            reminderToastBody.innerHTML = `UPCOMING DETAILING APPOINTMENT:<br>Your <strong>${vehicle}</strong> detailing is scheduled for <strong>${date}</strong> at <strong>${time}</strong> in <strong>${mode}</strong> location mode.<br>Lab rig fully ready!`;
        }

        // Animate slide-up toast after 1.5 seconds delay
        setTimeout(() => {
            reminderToast.classList.add('active');
        }, 1500);
    }

    if (reminderDismissBtn) {
        reminderDismissBtn.addEventListener('click', () => {
            reminderToast.classList.remove('active');
        });
    }

    if (reminderSnoozeBtn) {
        reminderSnoozeBtn.addEventListener('click', () => {
            reminderToast.classList.remove('active');
            snoozeCount++;

            // Trigger simulated snooze notification alert
            showNotification(
                'success',
                'APPOINTMENT SNOOZED',
                `Your upcoming detailing reminder is snoozed by 1 hour (Simulated: reappearing in 5 seconds).`
            );

            // Re-trigger snooze notification after 5 seconds to simulate reminder cycle
            setTimeout(() => {
                if (reminderToastBody) {
                    reminderToastBody.innerHTML = `[SNOOZED ${snoozeCount}x] DETAILING SLOT REMINDER:<br>Laboratory rig schedule shifted for your <strong>${savedToastData.vehicle || 'automobile'}</strong> detailing. clearcoats stabilized.`;
                }
                reminderToast.classList.add('active');
            }, 5000);
        });
    }


    // -------------------------------------------------------------
    // MODULE F: ENHANCE MASTER APPOINTMENT BOOKING FORM IN CONTACT US PAGE
    // -------------------------------------------------------------
    const contactBookingForm = document.getElementById('master-booking-form');
    if (contactBookingForm) {
        // Clone and replace to clean default submit handler
        const parent = contactBookingForm.parentElement;
        const newForm = contactBookingForm.cloneNode(true);
        contactBookingForm.replaceWith(newForm);

        // Re-read service mode reference for conditional toggling on the cloned form
        const newModeSelect = document.getElementById('book-service-mode');
        const newAddressGroup = document.getElementById('book-address-group');
        const newAddressInput = document.getElementById('book-address');
        if (newModeSelect && newAddressGroup && newAddressInput) {
            newModeSelect.addEventListener('change', () => {
                if (newModeSelect.value === 'mobile') {
                    newAddressGroup.style.display = 'block';
                    newAddressInput.required = true;
                } else {
                    newAddressGroup.style.display = 'none';
                    newAddressInput.required = false;
                    newAddressInput.value = '';
                }
            });
        }

        newForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameVal = document.getElementById('book-name').value;
            const vehicleVal = document.getElementById('book-vehicle').value;
            const dateVal = document.getElementById('book-date').value;
            const timeVal = document.getElementById('book-time').value;
            
            const modeSelect = document.getElementById('book-service-mode');
            const modeVal = modeSelect ? modeSelect.options[modeSelect.selectedIndex].text : 'HQ Studio Lab';
            const addressVal = document.getElementById('book-address') ? document.getElementById('book-address').value : 'HQ Lab';

            let formattedDate = dateVal;
            if (dateVal) {
                const dateObj = new Date(dateVal + 'T00:00:00');
                formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            }

            // Estimate custom pricing dynamically for direct form
            const vehiclePrices = { sedan: 0, suv: 50, truck: 100, exotic: 150 };
            const packagePrices = { none: 0, bronze: 399, silver: 699, gold: 1199 };
            const coatingPrices = { none: 0, 'nano-9h': 200, 'self-healing': 399, graphene: 599 };

            const selVehicle = document.getElementById('book-vehicle-type') ? document.getElementById('book-vehicle-type').value : 'sedan';
            const selPackage = document.getElementById('book-package') ? document.getElementById('book-package').value : 'none';
            const selCoating = document.getElementById('book-coating') ? document.getElementById('book-coating').value : 'none';
            const selMode = document.getElementById('book-service-mode') ? document.getElementById('book-service-mode').value : 'studio';

            let total = 0;
            total += (vehiclePrices[selVehicle] || 0);
            total += (packagePrices[selPackage] || 0);
            total += (coatingPrices[selCoating] || 0);
            total += (selMode === 'mobile' ? 50 : 0);

            showNotification(
                'success',
                'APPOINTMENT REGISTERED!',
                `Thank you ${nameVal}! Your detailing reservation for your ${vehicleVal} has been processed at $${total.toLocaleString()}.`
            );

            // Trigger upcoming appointment toast card
            triggerAppointmentToast(nameVal, vehicleVal, formattedDate, timeVal, modeVal, addressVal);

            newForm.reset();
            if (newAddressGroup) newAddressGroup.style.display = 'none';
        });
    }


    // -------------------------------------------------------------
    // MODULE G: DYNAMIC CALENDAR SYNC AND RECEIPT COMPLETION CLOSER
    // -------------------------------------------------------------
    const recCloseBtn = document.getElementById('rec-close-btn');
    // We dynamically attach the click action to receipt close button in Module C when generating it.
    const receiptCard = document.querySelector('.receipt-card');
    if (receiptCard && !document.getElementById('rec-close-btn')) {
        const closeBtnEl = document.createElement('button');
        closeBtnEl.type = 'button';
        closeBtnEl.id = 'rec-close-btn';
        closeBtnEl.className = 'btn-primary';
        closeBtnEl.style.width = '100%';
        closeBtnEl.style.marginTop = '20px';
        closeBtnEl.style.display = 'flex';
        closeBtnEl.style.alignItems = 'center';
        closeBtnEl.style.justifyContent = 'center';
        closeBtnEl.style.gap = '8px';
        closeBtnEl.innerHTML = '<span>ADD TO CALENDAR & CLOSE</span><i class="far fa-calendar-plus"></i>';
        closeBtnEl.addEventListener('click', () => {
            showNotification(
                'success',
                'CALENDAR SYNC COMPLETE',
                `A high-priority laboratory detailing slot has been successfully added to your device calendar.`
            );
            closeModal();
        });
        receiptCard.appendChild(closeBtnEl);
    }

});
