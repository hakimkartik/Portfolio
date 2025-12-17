# Portfolio JSON - Interactive Resume Website

A modern, interactive portfolio website that displays resume data in multiple formats (JSON, YAML, TOML) and a beautiful Netflix-inspired card view. Built with Vue 3, TypeScript, and Vuetify.

## 🎯 Project Overview

This portfolio website presents resume data in a unique, developer-friendly way. Instead of a traditional static resume, it offers:

- **Multiple Data Formats**: View your resume as JSON, YAML, or TOML with syntax highlighting
- **Card View**: A beautiful, Netflix-style card layout for a visual presentation
- **Interactive Features**: Copy to clipboard, download files, theme switching
- **Fully Responsive**: Optimized for iOS, Android, tablets, and desktops

## ✨ Features

### Format Views
- **JSON View**: Standard JSON format with syntax highlighting
- **YAML View**: Human-readable YAML format
- **TOML View**: TOML configuration format
- **Card View**: Netflix-inspired visual card layout with:
  - Hero section with contact information
  - Horizontal scrolling experience rows
  - Project cards in a responsive grid
  - Skills displayed as organized chips
  - Education and certifications sections

### Interactive Features
- **Copy to Clipboard**: One-click copy of any format
- **Download**: Download resume as JSON, YAML, or TOML file
- **PDF Export**: Export card view as PDF
- **Search/Filter**: Search across experience, projects, skills, education, and certifications with text highlighting
- **Theme Toggle**: Switch between dark and light themes (persisted in localStorage)
- **Syntax Highlighting**: Beautiful code highlighting for all formats
- **Toast Notifications**: User-friendly feedback for actions
- **Keyboard Shortcuts**: Press `j` for JSON, `y` for YAML, `t` for TOML, `c` for Card view, `Esc` to clear search
- **Scroll to Top**: Button appears when scrolling down

### Responsive Design
- **Mobile-First**: Optimized for phones (iOS & Android)
- **Tablet Support**: Perfect layout for tablets
- **Desktop Experience**: Enhanced features for larger screens
- **Touch-Friendly**: 44x44px minimum touch targets
- **iOS Safe Area**: Support for notched devices
- **Smooth Scrolling**: Momentum scrolling on mobile devices

### Card View Enhancements
- **Netflix-Style Layout**: Multiple horizontal scrolling rows
- **Timeline with Emojis**: Visual timeline with company emojis/logos connected via branches
- **Year Labels**: Year ranges displayed on timeline branches
- **Hover Effects**: Cards magnify (1.08x scale) with backlight glow on hover
- **Centered Alignment**: All sections (experience, projects, skills, education, certifications) are centered
- **Education Logos**: School logos/emojis displayed in education cards
- **Spacing**: Generous spacing prevents overlap when cards magnify

## 📚 Libraries & Technologies

### Core Framework
- **Vue 3.5.18** - Progressive JavaScript framework
  - *Why*: Modern, performant, and excellent developer experience with Composition API
- **TypeScript 5.8.3** - Type-safe JavaScript
  - *Why*: Better code quality, IDE support, and catch errors at compile time
- **Vite 7.1.2** - Next-generation build tool
  - *Why*: Lightning-fast HMR, optimized builds, and excellent DX

### UI Framework
- **Vuetify 3.11.4** - Material Design component framework
  - *Why*: Comprehensive component library, built-in theming, accessibility, and responsive design
- **@mdi/font 7.4.47** - Material Design Icons
  - *Why*: Extensive icon library that integrates seamlessly with Vuetify

### Data Format Libraries
- **js-yaml 4.1.1** - YAML parser and stringifier
  - *Why*: Convert JavaScript objects to YAML format for display
- **@ltd/j-toml 1.38.0** - TOML parser and stringifier
  - *Why*: Convert JavaScript objects to TOML format, supports TOML 1.0.0 specification

### Code Highlighting
- **prismjs 1.30.0** - Syntax highlighter
  - *Why*: Lightweight, extensible, supports JSON, YAML, and TOML syntax highlighting
  - Includes custom theme colors for both dark and light modes

### PDF Export
- **html2canvas** - Convert HTML to canvas
- **jspdf** - Generate PDF from canvas
  - *Why*: Enable users to export their resume as PDF from the card view

### Development Tools
- **vue-tsc 3.0.5** - TypeScript type checking for Vue
- **@vitejs/plugin-vue 6.0.1** - Vue SFC support for Vite
- **vite-plugin-vuetify 2.1.2** - Vuetify auto-import plugin

## 🎨 Themes

### Dark Theme (Default)
- **Background**: Deep grey (`#121212`) - Easy on the eyes for extended viewing
- **Surface**: Dark grey (`#1E1E1E`) - Subtle contrast for cards and components
- **Text**: White and light grey - High contrast for readability
- **Accents**: Blue primary color (`#1976D2`) - Material Design standard
- **Syntax Highlighting**: Tomorrow Night inspired colors
  - Strings: Green (`#a6e22e`)
  - Keywords: Cyan (`#66d9ef`)
  - Numbers/Booleans: Pink (`#f92672`)
  - Comments: Muted green (`#6a9955`)

### Light Theme
- **Background**: Light grey (`#FFFFFF`) - Clean, professional look
- **Surface**: White - Maximum contrast for content
- **Text**: Dark grey and black - Traditional document styling
- **Accents**: Blue primary color (`#1976D2`) - Consistent branding
- **Syntax Highlighting**: Default Prism colors
  - Strings: Green (`#690`)
  - Keywords: Blue (`#07a`)
  - Numbers/Booleans: Maroon (`#905`)
  - Comments: Slate grey

### Theme Features
- **Automatic Detection**: Respects system preference on first load
- **Manual Toggle**: Sun/moon icon in header to switch themes
- **Persistent**: Theme preference saved to localStorage
- **Smooth Transitions**: All color changes are animated

## 🖼️ Visual Design

### Card View Layout
1. **Hero Section**
   - Large name and title
   - Contact chips (email, location, LinkedIn, GitHub)
   - Professional summary paragraph

2. **Experience Section**
   - Multiple horizontal scrolling rows (Netflix-style)
   - Each card shows:
     - Company name and role
     - Location with icon
     - Date range
     - Achievement bullets
   - Hover effect: 8% scale increase with blue backlight glow

3. **Projects Section**
   - Responsive grid (1 column mobile, 2 tablet, 3 desktop)
   - Tech stack chips
   - Project descriptions

4. **Skills Section**
   - Organized by category
   - Skills displayed as outlined chips
   - Easy to scan and read

5. **Education & Certifications**
   - Centered layout with side-by-side cards on desktop
   - School logos/emojis displayed
   - Stacked on mobile
   - Clean card design
   - Sections hidden when no search matches

### Code View Layout
- **Monospace Font**: Courier New for code readability
- **Syntax Highlighting**: Color-coded tokens
- **Line Wrapping**: Text wraps for mobile viewing
- **Scrollable**: Long content scrolls smoothly

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (recommended: 18+)
- npm, yarn, or pnpm

### Installation

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

### Development

The app will be available at `http://localhost:5173/`

## 📱 Responsive Breakpoints

- **Extra Small** (< 480px): Mobile phones in portrait
- **Small** (480px - 599px): Larger phones
- **Medium** (600px - 959px): Tablets
- **Large** (960px - 1279px): Desktops
- **Extra Large** (1280px+): Large desktops

## 🎯 What Can Be Improved

### Short-term Enhancements
1. ~~**Theme Persistence**: Save theme preference to localStorage~~ ✅ Implemented
2. ~~**Search/Filter**: Add search functionality in card view~~ ✅ Implemented
3. ~~**Print Styles**: Optimize print stylesheet for resume printing~~ ✅ Implemented
4. **Loading States**: Add skeleton loaders for better perceived performance
5. **Error Boundaries**: Better error handling and user feedback
6. ~~**Accessibility**: 
   - ARIA labels for screen readers~~ ✅ Implemented
   - Keyboard navigation improvements
   - Focus indicators

### Medium-term Features
1. ~~**Data Source**: Load resume data from API or JSON file~~ ✅ Implemented (JSON file)
2. ~~**Export Options**: PDF export functionality~~ ✅ Implemented
3. **Animation**: More sophisticated page transitions
4. **Internationalization**: Multi-language support
5. **Analytics**: Optional analytics integration
6. ~~**SEO**: Meta tags, Open Graph, structured data~~ ✅ Implemented

### Long-term Improvements
1. **Admin Panel**: Web interface to edit resume data
2. **Version Control**: Track resume changes over time
3. **Multiple Resumes**: Support for different resume versions
4. **Collaboration**: Share and collaborate on resume
5. **Integration**: Connect with LinkedIn, GitHub APIs
6. **AI Features**: Resume suggestions, skill gap analysis

### Technical Improvements
1. **Performance**:
   - Code splitting for smaller initial bundle
   - Lazy loading for card view images (if added)
   - Virtual scrolling for large skill lists

2. **Testing**:
   - Unit tests with Vitest
   - Component tests with Vue Test Utils
   - E2E tests with Playwright or Cypress

3. **Documentation**:
   - Component documentation with Storybook
   - API documentation
   - Contribution guidelines

4. **CI/CD**:
   - Automated testing pipeline
   - Automated deployments
   - Preview deployments for PRs

## 📄 License

This project is private and personal.

## 👤 Author

**Karttik Hakimm**
- Email: hakimmkarttik@zohomail.in
- LinkedIn: [kartik-hakim](https://linkedin.com/in/kartik-hakim)
- GitHub: [hakimkartik](https://github.com/hakimkartik)

---

Built with ❤️ using Vue 3, TypeScript, and Vuetify
