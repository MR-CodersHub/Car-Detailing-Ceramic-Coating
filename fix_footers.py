import os
import re

footer_content = """    <!-- FOOTER SECTION -->
    <footer class="footer">

        <div class="footer-top">
            <div class="section-container">
                <div class="footer-grid">

                    <!-- Col 1: About -->
                    <div class="footer-col about-col">
                        <a href="index.html" class="logo footer-logo">
                            <div class="logo-icon">
                                <svg viewBox="0 0 100 40" width="80" height="32" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10,28 L25,28 L32,20 L65,20 L75,28 L90,28 L93,25 L80,14 L60,14 C58,14 42,12 35,16 L12,23 Z"
                                        fill="none" stroke="#FFB800" stroke-width="3" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <circle cx="30" cy="28" r="4" fill="#FFB800" />
                                    <circle cx="70" cy="28" r="4" fill="#FFB800" />
                                </svg>
                            </div>
                            <span class="logo-text">TRAVICE</span>
                        </a>
                        <p class="footer-text">State-of-the-art detailing laboratorial chambers specializing in
                            ultra-gloss correction and quartz barrier preservation.</p>
                    </div>

                    <!-- Col 2: Services Quick Links -->
                    <div class="footer-col links-col">
                        <h3>Our Services</h3>
                        <ul>
                            <li><a href="services.html"><i class="fas fa-chevron-right"></i> Exterior Detailing</a></li>
                            <li><a href="services.html"><i class="fas fa-chevron-right"></i> Interior Rejuvenation</a>
                            </li>
                            <li><a href="services.html"><i class="fas fa-chevron-right"></i> Multi-Stage Correction</a>
                            </li>
                            <li><a href="index.html#pricing"><i class="fas fa-chevron-right"></i> 9H Ceramic Quartz
                                    Coating</a>
                            </li>
                            <li><a href="services.html"><i class="fas fa-chevron-right"></i> Engine Bay Steam Prep</a>
                            </li>
                            <li><a href="services.html"><i class="fas fa-chevron-right"></i> Alloy Caliper Coating</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Col 3: Quick Navigation -->
                    <div class="footer-col links-col">
                        <h3>Quick Navigation</h3>
                        <ul>
                            <li><a href="index.html"><i class="fas fa-chevron-right"></i> Homepage</a></li>
                            <li><a href="about.html"><i class="fas fa-chevron-right"></i> About Us Portfolio</a></li>
                            <li><a href="services.html"><i class="fas fa-chevron-right"></i> Luxury Detailing
                                    Services</a>
                            </li>
                            <li><a href="index.html#pricing"><i class="fas fa-chevron-right"></i> Ceramic Coating
                                    Plans</a></li>
                            <li><a href="index.html#faq"><i class="fas fa-chevron-right"></i> Detailing FAQ Center</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Col 4: Working Hours & Socials -->
                    <div class="footer-col hours-col">
                        <h3>Laboratory Hours</h3>
                        <ul class="hours-list">
                            <li><span>Monday:</span> <span>08.00 AM - 17.00 PM</span></li>
                            <li><span>Tuesday:</span> <span>08.00 AM - 17.00 PM</span></li>
                            <li><span>Wednesday:</span> <span>08.00 AM - 17.00 PM</span></li>
                            <li><span>Thursday:</span> <span>08.00 AM - 17.00 PM</span></li>
                            <li><span>Friday:</span> <span>08.00 AM - 17.00 PM</span></li>
                            <li><span>Saturday:</span> <span>08.00 AM - 16.00 PM</span></li>
                            <li class="closed"><span>Sunday:</span> <span>Closed Concierge</span></li>
                        </ul>

                        <div class="footer-socials">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>

                    <!-- Col 5: Newsletter -->
                    <div class="footer-col newsletter-col">
                        <div class="newsletter-wrapper">
                            <h3>Newsletter</h3>
                            <p class="footer-text" style="margin-bottom: 20px;">Subscribe to receive exclusive insights and premium detailing offers.</p>
                            <form id="newsletter-form">
                                <div class="newsletter-input-group">
                                    <input type="email" placeholder="Your email address" aria-label="Newsletter email"
                                        required>
                                    <button type="submit" aria-label="Subscribe"><i
                                            class="fas fa-chevron-right"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="section-container">
                <div class="footer-bottom-flex">
                    <p>&copy; 2026 TRAVICE Detailing Lab. All Rights Reserved. Crafted with absolute automotive
                        precision.</p>
                    <div class="footer-legal-links">
                        <a href="#">Privacy Policy</a>
                        <span>|</span>
                        <a href="#">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>"""

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # We will replace from <footer class="footer"> to </footer>
    clean_footer = footer_content.split('    <footer class="footer">')[1]
    replacement = '    <footer class="footer">\n' + clean_footer

    new_content = re.sub(r' *<footer class="footer">.*?</footer>', replacement, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Updated {file}")
