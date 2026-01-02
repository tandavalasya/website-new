# Dance Pose Image Extraction Guide

## Current Status

You have 7 dance pose images in `public/images/resume-backgrounds/`:
- 0072.jpg
- 0085.jpg
- 039.jpg
- 068.jpg
- 211.jpg
- 240.jpg
- 308.jpg

The resume page is **ready to use these images** once you extract the person from the background and save as transparent PNGs.

## Why Extraction is Needed

Browser-based background removal would require:
- Heavy machine learning libraries (100+ MB)
- Significant processing time
- Poor quality results
- Performance issues

**Server-side extraction** (using professional tools) gives you:
- High-quality results
- Clean edges
- Perfect transparency
- Fast loading times

## Step-by-Step Extraction Process

### Option 1: Using remove.bg (Easiest - Recommended)

1. **Go to remove.bg**
   - Visit: https://www.remove.bg/
   - Free for personal use (up to 50 images/month)

2. **Upload Each Image**
   - Click "Upload Image"
   - Select one of your JPG files (e.g., `0072.jpg`)
   - Wait 5 seconds for automatic processing

3. **Download the Result**
   - Click "Download" button
   - Save as PNG with transparent background

4. **Rename the Files**
   - Choose your 2 favorite poses
   - Rename them to: `pose1.png` and `pose2.png`

5. **Place in Folder**
   - Move the renamed files to: `tandavalasya-website/public/images/resume-backgrounds/`
   - Keep the original JPGs if you want (they won't be used)

### Option 2: Using Photoshop

1. **Open Image in Photoshop**
   - File → Open → Select your JPG

2. **Use Quick Selection or Magic Wand**
   - Select the person (not the background)
   - Refine edges: Select → Select and Mask
   - Adjust edge detection, feathering, and smoothness

3. **Delete Background**
   - Invert selection: Select → Inverse
   - Press Delete
   - You should see a checkerboard pattern (transparency)

4. **Export as PNG**
   - File → Export → Export As
   - Format: PNG
   - Check "Transparency"
   - Save as `pose1.png` or `pose2.png`

5. **Place in Folder**
   - Move to: `tandavalasya-website/public/images/resume-backgrounds/`

### Option 3: Using GIMP (Free Alternative)

1. **Open Image in GIMP**
   - File → Open → Select your JPG

2. **Add Alpha Channel**
   - Layer → Transparency → Add Alpha Channel

3. **Select Person**
   - Use "Fuzzy Select Tool" (magic wand) or "Select by Color"
   - Click on background areas to select them
   - Use Select → Grow/Shrink to refine

4. **Delete Background**
   - Press Delete
   - You should see a checkerboard pattern

5. **Export as PNG**
   - File → Export As
   - Name: `pose1.png` or `pose2.png`
   - Format: PNG
   - Save

6. **Place in Folder**
   - Move to: `tandavalasya-website/public/images/resume-backgrounds/`

## Which Images to Choose?

Look for poses that:
- ✅ Have clear silhouettes
- ✅ Show interesting dance positions
- ✅ Have good contrast with background
- ✅ Are visually balanced (one upright, one dynamic)
- ✅ Won't interfere with text when placed as background

**Recommended combinations:**
- **pose1.png**: An elegant, upright pose (for top-right)
- **pose2.png**: A dynamic, extended pose (for bottom-left)

## File Naming Convention

The BackgroundPoses component looks for:
- `pose1.png` - Will be positioned at top-right
- `pose2.png` - Will be positioned at bottom-left

**Important**: 
- Must be named exactly `pose1.png` and `pose2.png`
- Must be PNG format with transparent background
- Place in `public/images/resume-backgrounds/` folder

## How They'll Appear

Once you add the extracted PNGs:

### On Screen:
- Very subtle (15% opacity)
- Grayscale filter (80%)
- Slight rotation for artistic effect
- Won't interfere with text readability

### In Print/PDF:
- Even more subtle (8% opacity)
- Barely visible watermark effect
- Professional appearance
- Won't distract from content

## Testing

After adding your PNG files:

1. **Refresh the page** (Ctrl+R or Cmd+R)
2. **Check the browser console** - should see: "Found extracted pose images"
3. **View the resume** - poses should appear as subtle backgrounds
4. **Test print** - Click "Download PDF" to verify print appearance

## Fallback Behavior

If no PNG files are found, the page will automatically use:
- Subtle gradient orbs
- Decorative curved lines
- Professional appearance
- No errors or broken images

## Quick Checklist

- [ ] Choose 2 favorite dance pose images from the 7 JPGs
- [ ] Extract person from background using remove.bg, Photoshop, or GIMP
- [ ] Save as PNG with transparent background
- [ ] Rename to `pose1.png` and `pose2.png`
- [ ] Place in `tandavalasya-website/public/images/resume-backgrounds/`
- [ ] Refresh browser to see results
- [ ] Test print/PDF output

## Need Help?

If you encounter issues:
1. Check that files are named exactly `pose1.png` and `pose2.png` (lowercase)
2. Verify they're in the correct folder
3. Make sure they're PNG format (not JPG renamed to PNG)
4. Check browser console for any errors
5. Try a hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Current Implementation

The BackgroundPoses component (`src/components/ui/BackgroundPoses.tsx`) is already configured to:
- ✅ Automatically detect pose1.png and pose2.png
- ✅ Position them artistically (top-right and bottom-left)
- ✅ Apply grayscale and opacity filters
- ✅ Optimize for print output
- ✅ Fall back to gradient background if images not found

**No code changes needed** - just add your extracted PNG files!
