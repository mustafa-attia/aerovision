import os
import zipfile

EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.cache', '__pycache__', '.system_generated'}
EXCLUDE_FILES = {'aero-clear-project.zip'}

os.makedirs('public', exist_ok=True)
zip_path = 'public/aero-clear-project.zip'

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
        for f in files:
            if f in EXCLUDE_FILES or f.endswith('.zip'):
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, '.')
            z.write(full_path, rel_path)

print('Zip created successfully. Size:', os.path.getsize(zip_path))
