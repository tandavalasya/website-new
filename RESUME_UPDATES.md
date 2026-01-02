# Resume Design Updates - Transparent Background

## Changes Made

### Problem
The resume content tiles (left sidebar and right content area) had solid backgrounds that were hiding the dance pose background image. The image appeared below the tiles, making it invisible.

### Solution
Made the resume content areas semi-transparent with backdrop blur effects, allowing the dance pose background to show through elegantly.

## Specific Changes

### 1. Resume Page (`src/pages/Resume.tsx`)

**Background Container:**
- Changed from solid `bg-white` to subtle gradient `bg-gradient-to-br from-slate-50/50 via-gray-50/30 to-amber-50/20`
- This creates a very light, barely visible background that doesn't compete with the dance pose

**Left Sidebar:**
- Changed from solid `bg-gradient-to-b from-slate-800 to-slate-900` to semi-transparent `bg-slate-900/90`
- Added `backdrop-blur-lg` for frosted glass effect
- Added subtle border `border-r border-white/5` for definition
- Changed skill boxes to `bg-white/10` with `backdrop-blur-sm`
- Updated text colors to `text-slate-300` for better contrast on transparent background

**Right Content Area:**
- Changed from `bg-white/90` to more transparent `bg-white/75`
- Added `backdrop-blur-md` for readability while showing background
- Added subtle `drop-shadow-sm` to headings for better legibility
- Updated text to `text-gray-800` for stronger contrast

**Print Button:**
- Made semi-transparent: `bg-slate-800/90 backdrop-blur-md`
- Added subtle border: `border border-white/10`

### 2. Background Poses (`src/components/ui/BackgroundPoses.tsx`)

**Dance Pose Image:**
- Increased opacity from `0.15` to `0.20` (more visible on screen)
- Print opacity increased from `0.12` to `0.15`
- Adjusted grayscale filter from `75%` to `65%` (less gray, more natural)
- Adjusted brightness from `92%` to `95%` (slightly brighter)
- Reduced overlay gradient opacity from `30%` to `25%` (less white wash)

**Container:**
- Added `print:opacity-[0.08]` to the main container for better print visibility

### 3. Resume Section (`src/components/resume/ResumeSection.tsx`)

**Timeline Design:**
- Added left border: `border-l-2 border-amber-100`
- Added timeline dots: `absolute -left-[18px] w-2 h-2 bg-amber-400 rounded-full`
- This creates an elegant timeline effect that works well with the transparent background

## Visual Result

### On Screen:
- Dance pose is clearly visible through the semi-transparent content areas
- Frosted glass effect (backdrop blur) maintains text readability
- Professional and artistic appearance
- Dark sidebar contrasts beautifully with light content area
- Timeline dots and amber accents add visual interest

### In Print/PDF:
- Background image is subtle but visible (15% opacity)
- Content remains highly readable with solid white backgrounds
- Professional appearance maintained
- Single-page layout preserved

## Technical Details

**Transparency Levels:**
- Page background: 20-50% opacity (very subtle)
- Left sidebar: 90% opacity + backdrop blur
- Right content: 75% opacity + backdrop blur
- Dance pose: 20% opacity on screen, 15% in print

**Backdrop Blur:**
- Creates frosted glass effect
- Maintains readability over background image
- Modern, elegant aesthetic

**Mix Blend Mode:**
- `multiply` on dance pose creates sketch-like effect
- Integrates naturally with page colors

## Files Modified

1. `src/pages/Resume.tsx` - Main resume layout with transparent backgrounds
2. `src/components/ui/BackgroundPoses.tsx` - Increased visibility of dance pose
3. `src/components/resume/ResumeSection.tsx` - Added timeline design (already done previously)

## Testing

To see the changes:
1. Refresh the browser (Ctrl+R or Cmd+R)
2. The dance pose should now be visible through the content areas
3. Test print preview (Ctrl+P or Cmd+P) to verify PDF appearance

## Next Steps

If you want to adjust the transparency levels:
- **More visible background**: Decrease content opacity (e.g., `bg-white/65`)
- **Less visible background**: Increase content opacity (e.g., `bg-white/85`)
- **Stronger blur**: Change `backdrop-blur-md` to `backdrop-blur-lg`
- **Lighter blur**: Change `backdrop-blur-md` to `backdrop-blur-sm`

The current settings provide a good balance between showing the artistic dance pose and maintaining professional readability.
