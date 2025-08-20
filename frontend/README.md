# Fitlink Frontend - Landing Site

A modern, energetic landing website for Fitlink - Nigeria's premier gym discovery and subscription platform. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Energetic fitness-themed design with bold colors and strong typography
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Fast Performance**: Optimized with Next.js App Router and modern web technologies
- **SEO Optimized**: Built-in SEO features and meta tags
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Lead Capture**: Integrated form for gym owner applications
- **Brand Identity**: Custom Fitlink logo and brand color palette

## 🎨 Design System

### Brand Colors
- **Primary Green**: `#22c55e` - Main brand color representing growth and energy
- **Accent Orange**: `#f97316` - Energetic accent color for calls-to-action
- **Neutral Grays**: Complete neutral palette for text and backgrounds

### Typography
- **Display Font**: Poppins (headings and brand elements)
- **Body Font**: Inter (body text and UI elements)
- **Monospace**: JetBrains Mono (code elements)

### Components
- Custom Logo SVG with animated elements
- Responsive Navbar with mobile menu
- Hero section with compelling CTAs
- Feature showcase with interactive cards
- Lead capture form with validation
- Footer with contact information and social links

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inter, Poppins, JetBrains Mono)
- **Icons**: Heroicons (SVG)
- **Deployment**: GitHub Pages ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitlink_gym/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
   NEXT_PUBLIC_APP_NAME=Fitlink
   NEXT_PUBLIC_CONTACT_EMAIL=hello@fitlink.com
   NEXT_PUBLIC_CONTACT_PHONE=+234 XXX XXX XXXX
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── become-partner/    # Partner application page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── Logo.tsx          # Fitlink logo component
│   │   ├── Navbar.tsx        # Navigation component
│   │   ├── Hero.tsx          # Hero section component
│   │   └── Footer.tsx        # Footer component
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🎯 Pages

### Homepage (`/`)
- Hero section with app download links
- Feature showcase with 6 key benefits
- Call-to-action section
- Trust indicators

### Become a Partner (`/become-partner`)
- Lead capture form for gym owners
- Form validation and error handling
- Success/error feedback
- Benefits section for partners

### Planned Pages
- Features (`/features`) - Detailed feature breakdown
- About (`/about`) - Company story and mission
- Contact (`/contact`) - Contact information and form

## 🔧 Configuration

### Tailwind CSS
Custom configuration includes:
- Brand color palette
- Custom fonts (Inter, Poppins, JetBrains Mono)
- Custom animations and keyframes
- Responsive breakpoints
- Custom shadows and gradients

### Environment Variables
- `NEXT_PUBLIC_API_BASE_URL`: Backend API endpoint
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_CONTACT_EMAIL`: Contact email
- `NEXT_PUBLIC_CONTACT_PHONE`: Contact phone number
- Social media URLs
- App store links

## 🚀 Deployment

### GitHub Pages
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Export static files**
   ```bash
   npm run export
   ```

3. **Deploy to GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Set source to GitHub Actions or main branch

### Vercel (Recommended)
1. **Connect to Vercel**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

2. **Environment Variables**
   - Add environment variables in Vercel dashboard
   - Set production API URL

3. **Deploy**
   - Vercel will automatically deploy on push to main branch

### Netlify
1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `out`

2. **Environment variables**
   - Add in Netlify dashboard

## 🔗 API Integration

The frontend integrates with the Laravel backend API:

- **Lead Capture**: POST to `/api/v1/gym-applications`
- **Environment**: Uses `NEXT_PUBLIC_API_BASE_URL` for API calls
- **Error Handling**: Comprehensive error handling and user feedback

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to modify the brand colors:
```typescript
colors: {
  primary: {
    500: '#22c55e', // Main brand green
    // ... other shades
  },
  accent: {
    500: '#f97316', // Energetic orange
    // ... other shades
  }
}
```

### Logo
Replace the SVG in `src/components/Logo.tsx` with your custom logo.

### Content
Update text content in the component files:
- `src/app/page.tsx` - Homepage content
- `src/app/become-partner/page.tsx` - Partner page content
- `src/components/Footer.tsx` - Footer information

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly buttons and interactions
- Optimized images and assets
- Fast loading on mobile networks
- PWA-ready structure

## 🔍 SEO Features

- Meta tags for all pages
- Open Graph and Twitter Card support
- Structured data markup
- Sitemap generation
- Robots.txt configuration
- Fast Core Web Vitals

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run build test
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Fitlink platform. All rights reserved.

## 📞 Support

For support and questions:
- Email: hello@fitlink.com
- Phone: +234 XXX XXX XXXX
- Location: Asaba, Delta State, Nigeria

---

**Fitlink** - Connecting fitness enthusiasts with the best gyms in Nigeria. Starting in Asaba, expanding nationwide.
