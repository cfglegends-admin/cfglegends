#!/bin/bash
# Normalisiert alle Karten-PNGs:
# - Beschneidet transparente Ränder
# - Ensures konsistente 1742×2539 (59:86)
# - Keine Eck-Rundung im PNG — das macht CSS

INPUT_DIR="public/cards"
OUTPUT_DIR="public/cards-normalized"

mkdir -p "$OUTPUT_DIR"

count=0
total=$(ls -1 "$INPUT_DIR"/*.png 2>/dev/null | wc -l | xargs)

for file in "$INPUT_DIR"/*.png; do
  [ -f "$file" ] || continue
  filename=$(basename "$file")
  count=$((count + 1))
  echo "[$count/$total] $filename"

  magick "$file" \
    -trim +repage \
    -background none \
    -gravity center \
    -resize 1742x2539 \
    -extent 1742x2539 \
    "$OUTPUT_DIR/$filename"
done

echo ""
echo "Fertig. $count Karten normalisiert in $OUTPUT_DIR/"
echo ""
echo "Pruefung der neuen Groessen:"
sips -g pixelWidth -g pixelHeight "$OUTPUT_DIR"/*.png | grep -E "pixel" | sort -u
