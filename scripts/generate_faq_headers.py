import os
import glob
import re
import json
import base64
import urllib.request
import sys
from urllib.error import HTTPError

# Use environment variable for the API key to avoid hardcoding secrets
API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY_HERE")


def generate_visual_prompt(title, description):
    """Uses Gemini text model to create a purely visual prompt based on the article context."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

    instruction = f"""
    You are an expert photographer. Given the following article title and description about the Swedish housing market, 
    generate a purely visual, abstract description for a high-quality hero image. 
    The image MUST NOT contain any text, letters, or numbers. 
    It should be professional and attention grabbing. no abstract art, regular photos.
    swedish architecture, swedish houses, swedish appartments.
    
    Title: {title}
    Description: {description}
    
    Respond ONLY with the visual image prompt. Keep it under 40 words. Do not include introductory text.
    """

    data = {"contents": [{"parts": [{"text": instruction}]}]}

    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )

    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
            return text
    except Exception as e:
        print(f"Error generating text prompt: {e}")
        return " modern Swedish housing architecture, soft cinematic lighting, professional real estate photography"


def generate_image(visual_concept, output_path):
    """Uses Imagen model to generate the actual image."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key={API_KEY}"

    # Enforce the strict no-text constraint on top of the AI's visual concept
    prompt = f"Professional  photography. {visual_concept}. Extremely important: ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO NUMBERS ANYWHERE IN THE IMAGE. Purely visual scene."

    print(f"Prompting Imagen with: '{prompt}'")
    data = {"instances": [{"prompt": prompt}], "parameters": {"sampleCount": 1}}

    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )

    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            b64_img = result["predictions"][0]["bytesBase64Encoded"]
            img_data = base64.b64decode(b64_img)

            # Ensure the directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            with open(output_path, "wb") as f:
                f.write(img_data)
            print(f"Saved {output_path}")
            return True
    except HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False


def process_markdown_file(filepath):
    # Determine paths relative to src/content to mirror in src/assets/images
    rel_path = os.path.relpath(filepath, "src/content")
    rel_dir = os.path.dirname(rel_path)
    filename = os.path.basename(filepath)
    base_name = os.path.splitext(filename)[0]

    # Images go to src/assets/images/ so Astro optimizes them at build time
    if rel_dir and rel_dir != ".":
        image_fs_path = f"src/assets/images/{rel_dir}/{base_name}.jpg"
    else:
        image_fs_path = f"src/assets/images/{base_name}.jpg"

    # Relative path from the markdown file to the image (for Astro image processing)
    image_rel_path = os.path.relpath(image_fs_path, os.path.dirname(filepath))

    # ogImage frontmatter still uses the old /images/ URL path for OG meta tags
    if rel_dir and rel_dir != ".":
        image_url_path = f"/images/{rel_dir}/{base_name}.jpg"
    else:
        image_url_path = f"/images/{base_name}.jpg"

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Match frontmatter
    match = re.match(r"^---\n(.*?)\n---\n", content, re.DOTALL)
    if not match:
        return

    frontmatter = match.group(1)
    body = content[match.end() :]

    title_match = re.search(r'title:\s*"(.*?)"', frontmatter)
    title = title_match.group(1) if title_match else base_name.replace("-", " ")

    desc_match = re.search(r'description:\s*"(.*?)"', frontmatter)
    desc = desc_match.group(1) if desc_match else ""

    # Generate image if it doesn't exist
    if not os.path.exists(image_fs_path):
        print(f"\nProcessing '{title}' ({filepath})...")
        # 1. Ask Gemini Text to formulate a visual concept
        visual_concept = generate_visual_prompt(title, desc)

        # 2. Ask Gemini Imagen to generate the image based on the concept
        success = generate_image(visual_concept, image_fs_path)
        if not success:
            print(f"Failed to generate image for {filepath}")
            return
    else:
        print(f"Image {image_fs_path} already exists. Ensuring markdown is updated.")

    # Update frontmatter to include ogImage
    if "ogImage:" not in frontmatter:
        new_frontmatter = frontmatter + f'\nogImage: "{image_url_path}"'
    else:
        # replace existing
        new_frontmatter = re.sub(
            r"ogImage:.*", f'ogImage: "{image_url_path}"', frontmatter
        )

    # We remove old markdown image injections just in case, to prevent duplicates
    clean_body = re.sub(r"!\[.*?\]\((?:\.\./|/images/).*?\.(jpg|png|webp)\)\n\n", "", body)

    # Add image to body using relative path so Astro optimizes it at build time
    img_markdown = f"![{title}]({image_rel_path})\n\n"
    new_body = img_markdown + clean_body

    new_content = f"---\n{new_frontmatter}\n---\n{new_body}"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)


if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY_HERE":
        print("Error: Please set the GEMINI_API_KEY environment variable.")
        sys.exit(1)

    print("Scanning src/content for markdown files...")
    # Find all markdown files anywhere inside src/content
    md_files = glob.glob("src/content/**/*.md", recursive=True)
    mdx_files = glob.glob("src/content/**/*.mdx", recursive=True)

    all_files = md_files + mdx_files

    if not all_files:
        print("No markdown files found in src/content.")
        sys.exit(0)

    print(f"Found {len(all_files)} markdown file(s).")

    for filepath in all_files:
        process_markdown_file(filepath)

    print("\nDone! All files processed.")
