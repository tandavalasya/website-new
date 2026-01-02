# Resume Page Testing Guide

## Overview
The resume page is now complete and ready for testing! This guide will help you verify all features are working correctly.

## What's Been Implemented

### ✅ Core Features
- **Resume Page Component** (`src/pages/Resume.tsx`)
  - Loads resume data from markdown file
  - Displays loading state with spinner
  - Shows error state with retry button
  - Renders complete resume with all sections

- **Resume Components**
  - `ResumeHeader`: Name, title, and contact info with gradient styling
  - `ResumeSummary`: Professional summary section
  - `ResumeSection`: Reusable component for all resume sections
  - Supports: Education, Experience, Performances, Awards, Certifications, Skills

- **Background System** (`BackgroundPoses`)
  - Auto-discovers images in `public/images/resume-backgrounds/`
  - Intelligent positioning based on image count (1-4+ images)
  - Beautiful fallback with gradient artwork when no images present
  - Translucent effect (opacity 0.08) for subtle background
  - Print-optimized (very subtle in print mode)

- **Print Optimization**
  - "Download as PDF" button (top-right, hidden in print)
  - Single-page A4 layout with 0.5in margins
  - Optimized typography for print (10pt body, 24pt h1, etc.)
  - Removes animations and interactive elements in print
  - High contrast colors for readability

- **Responsive Design**
  - Mobile: Single column, smaller fonts
  - Tablet: Optimized spacing
  - Desktop: Full design with animations
  - Breakpoints: 640px, 1024px

## Testing Instructions

### 1. Start the Development Server
```bash
cd tandavalasya-website
npm run dev
```

The server should start at `http://localhost:5173/`

### 2. View the Resume Page
- Open your browser to `http://localhost:5173/`
- You should be automatically redirected to `/resume`
- The page should load with:
  - Gradient background (orange → pink → purple)
  - "Download as PDF" button in top-right
  - Resume content with gradient header
  - Artistic background (gradient circles and lines)

### 3. Test Responsive Design
Open browser DevTools (F12) and test at different screen sizes:
- **Mobile (375px)**: Content should be single column, smaller fonts
- **Tablet (768px)**: Optimized spacing
- **Desktop (1024px+)**: Full design with animations

### 4. Test Print Functionality
Click the "Download as PDF" button or press `Ctrl+P` (Windows) / `Cmd+P` (Mac)

**Expected Print Preview:**
- Single page A4 layout
- No "Download as PDF" button visible
- Very subtle background (almost invisible)
- Clean, professional typography
- All content fits on one page
- High contrast for readability

**To save as PDF:**
- In print dialog, select "Save as PDF" as destination
- Click "Save"

### 5. Test Background Images (Optional)
To test the dance pose background feature:

**Current Status**: You have 7 dance pose JPG images in the folder. To use them as backgrounds, you need to extract the person from the background first.

**See `IMAGE_EXTRACTION_GUIDE.md` for detailed instructions.**

Quick steps:
1. Use remove.bg, Photoshop, or GIMP to extract the person from 2 of your favorite poses
2. Save as transparent PNG files named `pose1.png` and `pose2.png`
3. Place in `public/images/resume-backgrounds/`
4. Refresh the page

The images will appear as:
- Very subtle backgrounds (15% opacity on screen, 8% in print)
- Grayscale filtered for professional look
- Positioned at top-right and bottom-left
- Won't interfere with text readability

**Fallback**: If no PNG files are found, the page uses elegant gradient orbs and decorative lines instead.

### 6. Test Error Handling
To test error handling, temporarily rename the resume file:
```bash
mv public/content/resume/resume.md public/content/resume/resume.md.bak
```

Refresh the page. You should see:
- Error message: "Failed to Load Resume"
- Error details
- "Retry" button

Restore the file:
```bash
mv public/content/resume/resume.md.bak public/content/resume/resume.md
```

### 7. Test Animations
Scroll down the page slowly. You should see:
- Sections fade in and slide up as they enter viewport
- Staggered animations for list items
- Smooth transitions (unless you have "prefers-reduced-motion" enabled)

## Customizing Resume Content

The resume content is stored in `public/content/resume/resume.md`

### Structure:
```markdown
---
personalInfo:
  name: "Your Name"
  title: "Your Title"
  email: "your@email.com"
  phone: "+1 (XXX) XXX-XXXX"
  location: "City, State"
  website: "https://yourwebsite.com"
---

## Professional Summary
Your summary text here...

## Education
### Degree Name
**Institution** | Year
Details about the degree...

## Experience
### Job Title
**Organization** | Period
Description of role...
- Achievement 1
- Achievement 2

## Performances
### Performance Title
**Venue** | Date
Description...

## Awards & Recognition
- Award Name, Organization (Year)

## Certifications
- Certification Name, Issuer (Year)

## Skills
- Skill 1
- Skill 2
```

## Known Limitations

1. **Image Discovery**: Currently checks for predefined image names (`pose1.jpg` through `pose4.jpg`). In production, you may want to implement a backend endpoint to list all files in the directory.

2. **Single Page Fit**: The print layout is optimized for typical resume content. If you add significantly more content, you may need to adjust font sizes or spacing in `src/index.css` under the `@media print` section.

3. **Browser Print Dialog**: The "Download as PDF" button uses the browser's native print dialog. The exact appearance and options depend on the user's browser.

## Next Steps

Once you've tested the resume page and are satisfied:

1. **Add Your Dance Pose Images**: Extract person from 2 of your JPG images and save as `pose1.png` and `pose2.png` (see `IMAGE_EXTRACTION_GUIDE.md`)

2. **Update Resume Content**: Edit `public/content/resume/resume.md` with your actual information

3. **Fine-tune Print Layout**: If needed, adjust print styles in `src/index.css`

4. **Ready for Other Pages**: The foundation is set! We can now build:
   - Home page
   - About page
   - Events/Gallery page
   - Blog system
   - Contact page
   - And more...

## Troubleshooting

### Issue: Page shows loading spinner forever
- Check browser console for errors
- Verify `public/content/resume/resume.md` exists and is valid YAML/Markdown
- Check network tab to see if file is being fetched

### Issue: Print layout doesn't fit on one page
- Reduce content in resume.md
- Or adjust print font sizes in `src/index.css` (search for `@media print`)

### Issue: Background images not showing
- Verify PNG files are named exactly `pose1.png` and `pose2.png` (lowercase)
- Check they're in `public/images/resume-backgrounds/`
- Make sure they're actual PNG files with transparency (not JPG renamed to PNG)
- See `IMAGE_EXTRACTION_GUIDE.md` for extraction instructions
- Check browser console for messages about image detection
- Try hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### Issue: Animations not working
- Check if you have "prefers-reduced-motion" enabled in OS settings
- This is intentional for accessibility - animations are disabled for users who prefer reduced motion

## Questions?

If you encounter any issues or have questions, let me know and I'll help troubleshoot!
