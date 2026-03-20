#!/usr/bin/env python3
"""
Generate hero images for articles using Gemini API
"""

import os
import sys
import base64
import requests
import time
from pathlib import Path

API_KEY = os.environ.get('GEMINI_API_KEY', 'AIzaSyDgCUEU2hr8ECgy3OXYZThKbPv3Dz9FX3o')
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key={API_KEY}"

IMAGES_DIR = Path(__file__).parent / 'src' / 'assets' / 'images' / 'faq'
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# Map article slugs to image generation prompts
IMAGE_PROMPTS = {
    "bundna-eller-rorlig-ranta-2026": "Professional minimalist illustration of a Swedish house with two paths diverging, one labeled fixed and one variable interest rate concept, modern flat design, blue and green color scheme, clean white background, no text",
    "nar-amortera-extra": "Piggy bank with house and upward arrows, financial growth concept, modern minimalist illustration, green and blue tones, no text",
    "omforhandla-bolan-2026": "Professional handshake over house documents, negotiation concept illustration, clean business style, blue and green colors, modern flat design, no text",
    "riksbanken-mars-2026": "Swedish central bank building with interest rate symbol, professional illustration, modern flat design, blue color palette, clean white background, no text"
}

def generate_image(prompt, output_path):
    """Generate image using Gemini API"""
    
    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"]
        }
    }
    
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(API_URL, json=payload, headers=headers, timeout=120)
        response.raise_for_status()
        
        data = response.json()
        
        # Extract image data from response
        if 'candidates' in data and len(data['candidates']) > 0:
            candidate = data['candidates'][0]
            if 'content' in candidate and 'parts' in candidate['content']:
                for part in candidate['content']['parts']:
                    if 'inlineData' in part:
                        image_data = base64.b64decode(part['inlineData']['data'])
                        with open(output_path, 'wb') as f:
                            f.write(image_data)
                        return True
        
        print(f"   No image in response: {data.get('error', 'Unknown error')}")
        return False
        
    except Exception as e:
        print(f"   Error: {e}")
        return False

def find_missing_images():
    """Find articles that need hero images"""
    content_dir = Path(__file__).parent / 'src' / 'content' / 'faq'
    
    missing = []
    for article_file in content_dir.glob('*.md'):
        slug = article_file.stem
        image_path = IMAGES_DIR / f"{slug}.jpg"
        
        if not image_path.exists() and slug in IMAGE_PROMPTS:
            missing.append((slug, IMAGE_PROMPTS[slug], image_path))
    
    return missing

def main():
    print("🎨 Generating Images with Gemini")
    print("=" * 80)
    
    # Find missing images
    to_generate = find_missing_images()
    
    if not to_generate:
        print("✅ All images already exist!")
        return
    
    print(f"📊 Found {len(to_generate)} images to generate\n")
    
    generated = []
    failed = []
    
    for slug, prompt, output_path in to_generate:
        print(f"🎨 {slug}.jpg")
        print(f"   Prompt: {prompt[:60]}...")
        
        if generate_image(prompt, output_path):
            print(f"   ✅ Saved")
            generated.append(slug)
        else:
            print(f"   ❌ Failed")
            failed.append(slug)
        
        # Rate limiting
        time.sleep(3)
    
    print("\n" + "=" * 80)
    print(f"📊 Generated: {len(generated)}, Failed: {len(failed)}")
    
    if failed:
        print(f"❌ Failed: {', '.join(failed)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
