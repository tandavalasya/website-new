# TandavaLasya Website

A professional website for TandavaLasya - Classical Indian Dance Academy, featuring a sophisticated resume/CV generator with YAML-based configuration.

## 🎭 Features

### Resume/CV Generator
- **YAML-Based Configuration**: Highly configurable resume system using separate config and data files
- **Classic Design**: Elegant two-column layout with maroon (#7a1f1f) and muted gold (#bfa668) color scheme
- **Print-Optimized**: Professional PDF export with minimal margins and proper page breaks
- **Responsive Layout**: Adapts beautifully from mobile to desktop
- **Grayscale Images**: Soft pencil sketch effect on all images for artistic elegance
- **Dynamic Sections**: Enable/disable sections via YAML configuration
- **Markdown Support**: Parse **bold** and *italic* formatting in content

### Design Highlights
- **Typography**: Cinzel (headings), Playfair Display (subheadings), Lato (body), JetBrains Mono (technical)
- **Two-Column Layout**: 30% dark sidebar + 70% main content
- **Image Styling**: Soft grayscale filter with enhanced brightness and reduced contrast
- **Left-Aligned Content**: All text properly left-aligned for professional appearance
- **Compact Spacing**: Optimized padding and margins for efficient space usage

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: YAML + Markdown
- **Fonts**: Google Fonts (Cinzel, Playfair Display, Lato, JetBrains Mono)
- **Deployment**: Netlify

## 📁 Project Structure

```
tandavalasya-website/
├── .kiro/                        # Kiro specs and requirements
│   └── specs/
│       └── tandavalasya-website/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── .vscode/                      # VSCode settings
├── public/
│   ├── content/
│   │   └── resume/
│   │       ├── resume-config.yaml    # Resume configuration
│   │       └── resume-data.yaml      # Resume content data
│   ├── images/
│   │   └── resume-backgrounds/       # Profile and background images
│   └── _redirects                    # Netlify SPA routing
├── src/
│   ├── components/
│   │   ├── resume/
│   │   │   └── ResumeSection.tsx    # Dynamic section renderer
│   │   └── ui/
│   │       ├── AnimationWrapper.tsx
│   │       └── BackgroundPoses.tsx
│   ├── pages/
│   │   └── Resume.tsx               # Main resume page
│   ├── services/
│   │   └── content.service.ts       # YAML/content loader
│   ├── utils/
│   │   ├── yaml-parser.ts           # YAML parsing utility
│   │   └── text-formatter.tsx       # Markdown formatter
│   └── types/
│       └── index.ts                 # TypeScript definitions
├── netlify.toml                     # Netlify configuration
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Configuration

### Resume Configuration (`public/content/resume/resume-config.yaml`)

Controls which sections are displayed, their order, colors, fonts, and layout settings.

```yaml
resume:
  profile: "artistic"
  layout:
    colors:
      primary: "#7a1f1f"
      gold: "#bfa668"
  sections:
    enabled:
      - professional_summary
      - guru_parampara
      - professional_experience
```

### Resume Data (`public/content/resume/resume-data.yaml`)

Contains all resume content including personal info, experience, education, awards, etc.

```yaml
personal_info:
  name: "Your Name"
  title: "Your Title"
  contact:
    location: "City, Country"
    email: "email@example.com"
```

## 🎨 Customization

### Colors
Update colors in `resume-config.yaml` or directly in components:
- Primary: `#7a1f1f` (Deep Classical Red)
- Gold: `#bfa668` (Muted Gold)
- Background: `#FAFAFA` (Off-white)
- Sidebar: `#161616` (Dark)

### Fonts
Configured in `tailwind.config.js`:
- `font-serif`: Cinzel
- `font-display`: Playfair Display
- `font-sans`: Lato
- `font-mono`: JetBrains Mono

### Image Effects
CSS classes in `src/index.css`:
- `.soft-grayscale`: Soft gray for profile images
- `.sketch-effect`: Black & white sketch
- `.pencil-sketch-effect`: Pencil drawing with blur
- `.oil-paint-effect`: Color oil painting style

## 📄 Print/PDF Export

Click the "Download PDF" button to generate a print-optimized PDF with:
- Minimal margins (0.15in top/bottom, 0.2in left/right)
- Proper page breaks
- Preserved colors and styling
- Optimized font sizes

## 🚀 Deployment

### Netlify (Automatic)

The project includes `netlify.toml` for automatic configuration:

1. **Connect to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select your repository
   - Netlify auto-detects settings from `netlify.toml`
   - Click "Deploy site"

3. **Custom Domain** (optional):
   - Site Settings → Domain Management
   - Add your custom domain

### Manual Deployment Settings

If needed, configure manually in Netlify UI:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (or latest LTS)

## 🔧 Development

### Adding New Sections

1. Update `public/content/resume/resume-data.yaml` with new section data
2. Add section type to `src/types/index.ts`
3. Create renderer in `src/components/resume/ResumeSection.tsx`
4. Enable in `public/content/resume/resume-config.yaml`

### Styling Guidelines

- Use exact hex colors from sample HTML
- All main content must be left-aligned
- Sidebar content flush left (no borders/padding)
- Maintain consistent spacing (gap-6, space-y-3)
- Use print-specific classes for PDF optimization

## 📋 Requirements

See `.kiro/specs/tandavalasya-website/requirements.md` for detailed specifications including:
- 43 acceptance criteria
- Anti-hallucination rules
- Data integrity requirements
- Layout specifications
- Print requirements

## 🤝 Contributing

This is a personal project for TandavaLasya Classical Dance Academy. For inquiries, please contact through the website.

## 📜 License

Private - All Rights Reserved

---

**Built with ❤️ for preserving and promoting Indian Classical Dance**
