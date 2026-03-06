# 3D Frontend Site

A React-based 3D website featuring an animated dog model using Three.js and React Three Fiber.

## Features

- Interactive 3D dog model with animations
- 3D scene rendering with React Three Fiber
- GSAP-powered animations and scroll triggers
- Responsive design with fixed canvas overlay
- Custom materials and textures for realistic rendering

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **GSAP** - Animation library with ScrollTrigger plugin

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd 3d-frontend-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/
│   └── Dog.jsx          # Main 3D dog component
├── App.jsx              # Main application component
├── App.css              # Application styles
└── main.jsx             # Application entry point

public/
├── models/              # 3D model files
├── matcap/              # Material capture textures
└── ...                  # Static assets (images, textures)
```

## Development

This project uses Vite for fast development and building. The 3D scene is rendered using React Three Fiber, which provides a declarative way to work with Three.js in React.

The dog model includes animations that are controlled via GSAP and ScrollTrigger for smooth scroll-based interactions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
