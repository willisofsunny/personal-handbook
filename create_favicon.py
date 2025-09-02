from PIL import Image, ImageDraw, ImageFont
import os

# Create a 32x32 favicon
size = 32
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Draw a gradient background circle
for i in range(size//2):
    alpha = int(255 * (1 - i / (size//2)))
    color = (99, 102, 241, alpha)  # Purple gradient
    draw.ellipse([i, i, size-i-1, size-i-1], fill=color)

# Draw the letter X in the center
try:
    font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 18)
except:
    font = ImageFont.load_default()

# Calculate text position for centering
text = "X"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
x = (size - text_width) // 2
y = (size - text_height) // 2 - 2

# Draw white text with shadow
draw.text((x+1, y+1), text, font=font, fill=(0, 0, 0, 128))  # Shadow
draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))  # Text

# Save as PNG and ICO
img.save('favicon-32.png')
img.save('favicon.ico')
print("Favicon created successfully!")