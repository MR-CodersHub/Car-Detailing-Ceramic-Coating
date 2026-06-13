/* ==========================================================================
   TRAVICE - INNER PAGES JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- GALLERY FILTERING --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    // Reset display for animation trigger
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';

                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        // Small timeout to allow display:block to apply before animating opacity
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    }
                });
            });
        });
    }

    /* --- GALLERY LIGHTBOX --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').getAttribute('src');
                // Use a higher quality version if needed, or just the same source
                // Replacing 'w=800' or 'w=1000' with 'w=1600' for better lightbox resolution
                const hqImgSrc = imgSrc.replace(/w=\d+/, 'w=1600');
                
                lightboxImg.setAttribute('src', hqImgSrc);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close when clicking the close button
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* --- MOBILE DROPDOWN TOGGLE --- */
    // Ensure dropdowns work nicely on mobile devices
    const mobileDropdowns = document.querySelectorAll('.mobile-nav .nav-item-dropdown > a');
    if (mobileDropdowns.length > 0) {
        mobileDropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.preventDefault();
                const menu = dropdown.nextElementSibling;
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                } else {
                    menu.style.display = 'block';
                }
            });
        });
    }

    /* --- MULTI-LAYER NANO SHIELD VISUALIZER --- */
    const layerItems = document.querySelectorAll('.layer-item');
    const layerIcon = document.getElementById('layer-icon');
    const layerTitleDisplay = document.getElementById('layer-title-display');
    const layerDescDisplay = document.getElementById('layer-desc-display');
    const layerSpecsDisplay = document.getElementById('layer-specs-display');

    const layerData = {
        topcoat: {
            icon: 'fa-gem',
            title: 'Graphene Diamond 10H / 9H Ceramic Topcoat',
            desc: 'The sacrificial outer boundary layer. Delivers extreme water contact angles (>110°) for absolute hydrophobic self-cleaning performance, blocks UV rays, and prevents wash marring or environmental etching.',
            specs: `
                <div class="layer-spec-item"><i class="fas fa-certificate"></i> <span>Hardness: 9H - 10H Rated</span></div>
                <div class="layer-spec-item"><i class="fas fa-thermometer-half"></i> <span>IR Curing: 60°C Thermals</span></div>
                <div class="layer-spec-item"><i class="fas fa-tint"></i> <span>Contact Angle: >110° Hydrophobic</span></div>
                <div class="layer-spec-item"><i class="fas fa-sun"></i> <span>UV Filter: 99.9% Absorption</span></div>
            `
        },
        basecoat: {
            icon: 'fa-shield-alt',
            title: 'Nanoceramic Chemical Basecoat',
            desc: 'A rigid glass layer that molecularly cross-links directly to the paint\'s clear coat. Provides a durable base that protects against chemical spotting, bird droppings, road salts, and fine surface scratches.',
            specs: `
                <div class="layer-spec-item"><i class="fas fa-compress-arrows-alt"></i> <span>Thickness: ~1.5 µm</span></div>
                <div class="layer-spec-item"><i class="fas fa-link"></i> <span>Bonding: Covalent Matrix</span></div>
                <div class="layer-spec-item"><i class="fas fa-flask"></i> <span>Chemical Resist: pH 2 - pH 12</span></div>
                <div class="layer-spec-item"><i class="fas fa-shield-alt"></i> <span>Warranty: Registered Lifetime</span></div>
            `
        },
        clearcoat: {
            icon: 'fa-car-side',
            title: 'Factory Clear Coat (Pristine Condition)',
            desc: 'The factory protective paint lacquer. We clean, clay, and polish this layer to sub-micron accuracy, removing defects before applying chemical nano-coatings.',
            specs: `
                <div class="layer-spec-item"><i class="fas fa-ruler-vertical"></i> <span>Original Depth: ~35-50 µm</span></div>
                <div class="layer-spec-item"><i class="fas fa-tachometer-alt"></i> <span>Polishing Limit: 5-8 µm Max</span></div>
                <div class="layer-spec-item"><i class="fas fa-magic"></i> <span>Refraction Index: High Gloss</span></div>
                <div class="layer-spec-item"><i class="fas fa-check-circle"></i> <span>Status: Corrected & Refined</span></div>
            `
        },
        paint: {
            icon: 'fa-paint-brush',
            title: 'Base Color Paint Coat',
            desc: 'The color pigment layer that defines your vehicle\'s appearance. It has zero weather resistance on its own and requires clearcoat protection to prevent rapid fading and oxidation.',
            specs: `
                <div class="layer-spec-item"><i class="fas fa-palette"></i> <span>Pigment: Metallic/Matte/Solid</span></div>
                <div class="layer-spec-item"><i class="fas fa-ruler-horizontal"></i> <span>Thickness: ~15-25 µm</span></div>
                <div class="layer-spec-item"><i class="fas fa-sun"></i> <span>UV Sensitivity: Extreme</span></div>
                <div class="layer-spec-item"><i class="fas fa-microscope"></i> <span>Chemistry: Acrylic Poly</span></div>
            `
        },
        steel: {
            icon: 'fa-microchip',
            title: 'Automotive Metal / Carbon Fiber Panel',
            desc: 'The underlying structural vehicle frame. Made of steel alloys, high-strength aluminum, or carbon fiber composites. Must be protected from moisture to prevent rust or fiber degradation.',
            specs: `
                <div class="layer-spec-item"><i class="fas fa-cogs"></i> <span>Substrate: Metal / Composite</span></div>
                <div class="layer-spec-item"><i class="fas fa-anchor"></i> <span>Corrosion Risk: High (Unsealed)</span></div>
                <div class="layer-spec-item"><i class="fas fa-weight-hanging"></i> <span>Profile: Rigid & Lightweight</span></div>
                <div class="layer-spec-item"><i class="fas fa-shield-alt"></i> <span>Core: Base Chassis Frame</span></div>
            `
        }
    };

    if (layerItems.length > 0 && layerTitleDisplay) {
        layerItems.forEach(item => {
            const handleActivation = () => {
                // Remove active class
                layerItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                const layerKey = item.getAttribute('data-layer');
                const data = layerData[layerKey];

                if (data) {
                    // Update content with transition helper
                    layerTitleDisplay.style.opacity = '0';
                    layerDescDisplay.style.opacity = '0';
                    layerSpecsDisplay.style.opacity = '0';
                    layerIcon.style.transform = 'scale(0.8) rotate(-10deg)';

                    setTimeout(() => {
                        layerIcon.className = 'fas ' + data.icon;
                        layerTitleDisplay.textContent = data.title;
                        layerDescDisplay.textContent = data.desc;
                        layerSpecsDisplay.innerHTML = data.specs;

                        layerTitleDisplay.style.opacity = '1';
                        layerDescDisplay.style.opacity = '1';
                        layerSpecsDisplay.style.opacity = '1';
                        layerIcon.style.transform = 'scale(1) rotate(0deg)';
                    }, 200);
                }
            };

            item.addEventListener('click', handleActivation);
            item.addEventListener('mouseenter', handleActivation);
        });

        // Add soft transitions to displays
        layerTitleDisplay.style.transition = 'opacity 0.2s ease';
        layerDescDisplay.style.transition = 'opacity 0.2s ease';
        layerSpecsDisplay.style.transition = 'opacity 0.2s ease';
        layerIcon.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    /* --- PAINT DEFECT DIAGNOSTIC ASSISTANT --- */
    const diagTabs = document.querySelectorAll('.diagnostic-tab-btn');
    const diagPanels = document.querySelectorAll('.diagnostic-panel');

    if (diagTabs.length > 0 && diagPanels.length > 0) {
        diagTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Toggle tabs
                diagTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const symptomKey = tab.getAttribute('data-symptom');

                // Toggle panels
                diagPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.getAttribute('id') === 'diag-' + symptomKey) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    /* --- REAL-TIME ENVIRONMENTAL TELEMETRY SIMULATION --- */
    const tempEl = document.getElementById('telemetry-temp');
    const humidityEl = document.getElementById('telemetry-humidity');
    const dustEl = document.getElementById('telemetry-dust');

    if (tempEl || humidityEl || dustEl) {
        setInterval(() => {
            if (tempEl) {
                const currentTemp = parseFloat(tempEl.textContent);
                const delta = (Math.random() - 0.5) * 0.2;
                const newTemp = Math.min(22.5, Math.max(21.5, currentTemp + delta));
                tempEl.textContent = newTemp.toFixed(1);
            }
            if (humidityEl) {
                const currentHumidity = parseFloat(humidityEl.textContent);
                const delta = (Math.random() - 0.5) * 0.4;
                const newHumidity = Math.min(47.0, Math.max(43.0, currentHumidity + delta));
                humidityEl.textContent = newHumidity.toFixed(1);
            }
            if (dustEl) {
                const currentDust = parseInt(dustEl.textContent);
                const delta = Math.round((Math.random() - 0.5) * 6);
                const newDust = Math.min(1010, Math.max(960, currentDust + delta));
                dustEl.textContent = newDust;
            }
        }, 3000);
    }

    /* --- CCTV CLOCK TICKER --- */
    const cctvClock = document.getElementById('cctv-clock');
    if (cctvClock) {
        setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            cctvClock.textContent = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
});

