import os
import re

def extract_section(content, section_id):
    # Extracts a section based on its id, e.g., <section class="before-after" id="before-after"> ... </section>
    pattern = rf'(<section[^>]*id="{section_id}"[^>]*>.*?</section>)'
    match = re.search(pattern, content, flags=re.DOTALL)
    if match:
        return match.group(1)
    return ""

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

before_after_html = extract_section(index_content, "before-after")
testimonials_html = extract_section(index_content, "testimonials")

if not before_after_html or not testimonials_html:
    print("Error: Could not extract sections from index.html")
    exit(1)

# Generate "Why Choose Our Ceramic Coating"
why_choose_html = """
    <!-- WHY CHOOSE CERAMIC COATING -->
    <section class="features section-padding" id="why-choose">
        <div class="section-container">
            <div class="features-header animate-on-scroll" style="text-align: center; margin-bottom: 60px;">
                <span class="section-subhead">THE ULTIMATE SHIELD</span>
                <h2 class="section-title">Why Choose Our <span class="highlight">Ceramic Coating</span></h2>
                <p style="color: var(--color-text-light); max-width: 650px; margin: 0 auto;">Experience the pinnacle of automotive preservation. Our 9H nanoceramic formulas bond with your vehicle's clear coat on a molecular level, offering unparalleled protection and a permanent mirror finish.</p>
            </div>

            <div class="features-grid animate-on-scroll" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px;">
                <!-- Feature 1 -->
                <div class="service-card" style="margin-bottom: 0;">
                    <div class="service-icon"><i class="fas fa-shield-alt"></i></div>
                    <h3>Extreme Durability</h3>
                    <p>Forms a permanent, rigid, flexible glass shield with 9H hardness, effectively preventing minor scratches, wash marring, and daily wear.</p>
                </div>
                <!-- Feature 2 -->
                <div class="service-card" style="margin-bottom: 0;">
                    <div class="service-icon"><i class="fas fa-sun"></i></div>
                    <h3>Advanced UV Protection</h3>
                    <p>Blocks 100% of harmful ultraviolet rays, completely preventing paint oxidation, fading, and clear-coat degradation over time.</p>
                </div>
                <!-- Feature 3 -->
                <div class="service-card" style="margin-bottom: 0;">
                    <div class="service-icon"><i class="fas fa-tint"></i></div>
                    <h3>Super Hydrophobic</h3>
                    <p>Creates an intense water-repelling surface. Dirt, grime, and environmental contaminants simply slide off, making maintenance washing effortless.</p>
                </div>
                <!-- Feature 4 -->
                <div class="service-card" style="margin-bottom: 0;">
                    <div class="service-icon"><i class="fas fa-gem"></i></div>
                    <h3>Long-lasting Shine</h3>
                    <p>Enhances gloss and optical clarity beyond factory levels, locking in a permanent, deep mirror-like finish that never requires waxing.</p>
                </div>
            </div>
        </div>
    </section>
"""

# Combine all three
new_sections = f"{why_choose_html}\n\n{before_after_html}\n\n{testimonials_html}\n\n"

# Inject into home-2.html
with open('home-2.html', 'r', encoding='utf-8') as f:
    home2_content = f.read()

# We will replace '    <!-- STATISTICS -->' with the new sections + '    <!-- STATISTICS -->'
if '    <!-- STATISTICS -->' in home2_content:
    new_home2 = home2_content.replace('    <!-- STATISTICS -->', new_sections + '    <!-- STATISTICS -->')
    with open('home-2.html', 'w', encoding='utf-8') as f:
        f.write(new_home2)
    print("Successfully injected 3 new sections into home-2.html")
else:
    print("Error: Could not find insertion point '<!-- STATISTICS -->' in home-2.html")
