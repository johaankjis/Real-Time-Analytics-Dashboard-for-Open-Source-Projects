# Real-Time Analytics Dashboard for Open Source Projects

A modern, real-time analytics platform for monitoring and visualizing open-source project activity. Built with Next.js and React, this dashboard provides comprehensive insights into repository health, event streams, performance metrics, and API status.

## ✨ Features

- **📊 Overview Dashboard**: Get a bird's-eye view of all your analytics with key metrics and trending data
- **⚡ Real-Time Events Stream**: Monitor live events and activities across repositories
- **🏥 Repository Health**: Track the health and vitality of your open-source projects
- **📈 Performance Monitoring**: Analyze response times, throughput, and system performance
- **🔌 API Status**: Real-time monitoring of API endpoints and service health
- **🎨 Beautiful UI**: Modern, responsive interface built with shadcn/ui components
- **🌙 Dark Mode Support**: Built-in theme support for light and dark modes

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **UI Library**: [React 19](https://react.dev/) - Latest React with concurrent features
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality UI components built on Radix UI
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Type-safe form validation
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## 📁 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── api-status/          # API status monitoring page
│   ├── events/              # Events stream page
│   ├── performance/         # Performance metrics page
│   ├── repositories/        # Repository health page
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page (Overview)
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard-layout.tsx # Main dashboard layout with navigation
│   ├── overview-page.tsx    # Overview dashboard component
│   ├── events-stream-page.tsx
│   ├── repository-health-page.tsx
│   ├── performance-page.tsx
│   ├── api-status-page.tsx
│   └── theme-provider.tsx   # Theme management
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and helpers
├── public/                  # Static assets
├── styles/                  # Additional stylesheets
└── package.json            # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Real-Time-Analytics-Dashboard-for-Open-Source-Projects.git
   cd Real-Time-Analytics-Dashboard-for-Open-Source-Projects
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## 🎯 Usage

### Navigation

The dashboard features a sidebar navigation with the following sections:

- **Overview**: Main dashboard with key metrics and charts
- **Events Stream**: Real-time feed of repository events
- **Repository Health**: Health scores and metrics for tracked repositories
- **Performance**: System performance and latency monitoring
- **API Status**: Status and uptime for API endpoints

### Customization

The application uses CSS variables for theming. You can customize colors and appearance by modifying the theme configuration in `app/globals.css`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for use and modification.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.dev/) - Vercel's AI-powered UI generator
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Happy Monitoring! 📊✨**
