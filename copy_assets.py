import shutil
import os

src = r"C:\Users\Jabir\.gemini\antigravity\brain\b6afc95f-db27-4e24-be1f-e7627a614953\jabx_brand_icon_1774430248669.png"
public_dir = r"f:\PieceOfShit\Projects\JabX\public"

dests = [
    "icon.png",
    "apple-icon.png",
    "favicon.ico"
]

if not os.path.exists(src):
    print(f"Source file not found: {src}")
    exit(1)

for dest_name in dests:
    dest_path = os.path.join(public_dir, dest_name)
    try:
        shutil.copy2(src, dest_path)
        print(f"Successfully copied to {dest_path}")
    except Exception as e:
        print(f"Error copying to {dest_path}: {e}")
