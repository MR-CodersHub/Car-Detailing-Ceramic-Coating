import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Desktop nav
    content = re.sub(
        r'(<li><a href="index\.html" class="nav-link[^"]*">HOME</a></li>)',
        r'\1\n                    <li><a href="home-2.html" class="nav-link">HOME 2</a></li>',
        content
    )

    # Mobile nav
    content = re.sub(
        r'(<li><a href="index\.html" class="mobile-link[^"]*".*?>HOME</a></li>)',
        r'\1\n            <li><a href="home-2.html" class="mobile-link">HOME 2</a></li>',
        content
    )
    
    # In home-2.html, we need to make HOME 2 active instead of HOME
    if file == 'home-2.html':
        content = content.replace(
            '<li><a href="index.html" class="nav-link active">HOME</a></li>',
            '<li><a href="index.html" class="nav-link">HOME</a></li>'
        )
        content = content.replace(
            '<li><a href="home-2.html" class="nav-link">HOME 2</a></li>',
            '<li><a href="home-2.html" class="nav-link active">HOME 2</a></li>'
        )
        content = content.replace(
            '<li><a href="index.html" class="mobile-link" style="color:var(--color-accent);">HOME</a></li>',
            '<li><a href="index.html" class="mobile-link">HOME</a></li>'
        )
        content = content.replace(
            '<li><a href="home-2.html" class="mobile-link">HOME 2</a></li>',
            '<li><a href="home-2.html" class="mobile-link" style="color:var(--color-accent);">HOME 2</a></li>'
        )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Added HOME 2 to {file}")
