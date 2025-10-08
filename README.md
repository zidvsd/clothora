<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <h1>🌐 Live Demo</h1>
  <p>
    Check it out on Vercel:
    <a href="https://clothora-amber.vercel.app/" target="_blank">
      https://clothora-amber.vercel.app/
    </a>
  </p>
  <h1>👕 Clothora</h1>
  <p>
    A minimalistic clothing store web app built with <strong>Next.js</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>.  
    Clothora brings a clean, modern interface designed to make fashion browsing effortless and elegant.  
    It features smooth animations, responsive layouts, and efficient state management powered by <strong>Zustand</strong>.
  </p>
  <h2>✨ Features</h2>
  <ul>
    <li><strong>Minimalist UI</strong>: Focused on simplicity and elegance with a modern design aesthetic.</li>
    <li><strong>Product Carousel</strong>: Smooth and responsive carousel built with <code>Keen Slider</code>.</li>
    <li><strong>Dynamic Loading Skeletons</strong>: Ensures a seamless browsing experience while data loads.</li>
    <li><strong>Lucide Icons</strong>: Clean, lightweight icons for navigation and actions.</li>
    <li><strong>State Management</strong>: Powered by <code>Zustand</code> for fast and reliable global state handling.</li>
    <li><strong>Motion Animations</strong>: Beautiful transitions and interactive effects using <code>Framer Motion</code>-compatible library.</li>
    <li><strong>Responsive Design</strong>: Optimized for mobile, tablet, and desktop devices.</li>
  </ul>
  <h3>🧩 Tech Stack</h3>
  <ul>
    <li>Next.js 15</li>
    <li>React 19</li>
    <li>Tailwind CSS 4</li>
    <li>TypeScript 5</li>
    <li>Zustand 5</li>
    <li>Keen Slider</li>
    <li>Lucide React</li>
    <li>React Loading Skeleton</li>
    <li>Sonner (toast notifications)</li>
  </ul>
  <h3>⚙️ Prerequisites</h3>
  <ul>
    <li>Node.js (version 18 or higher)</li>
    <li>NPM or Yarn</li>
  </ul>
  <h3>🚀 Installation</h3>
  <ol>
    <li>
      Clone the repository:
      <pre><code>git clone https://github.com/yourusername/clothora.git</code></pre>
    </li>
    <li>
      Navigate to the project directory:
      <pre><code>cd clothora</code></pre>
    </li>
    <li>
      Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>
      Start the development server:
      <pre><code>npm run dev</code></pre>
      <p>
        Then open the app at
        <a href="http://localhost:3000" target="_blank">
          http://localhost:3000
        </a>.
      </p>
    </li>
  </ol>
  <h2>🧥 Usage</h2>
  <h3>Browse Products</h3>
  <p>
    Discover clothing collections through an elegant, scroll-based interface.
    Each product features smooth hover animations and detailed previews.
  </p>
  <h3>Carousel</h3>
  <p>
    Highlight featured collections and new arrivals with the <strong>Keen Slider</strong>-powered carousel.
  </p>
  <h3>Animations</h3>
  <p>
    <code>Motion</code> provides fade, slide, and stagger effects to make transitions seamless and visually appealing.
  </p>
  <pre><code>
import { motion } from "motion/react";

const fadeUp = {
hidden: { opacity: 0, y: 30 },
visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function HeroText() {
return (
&lt;motion.h1 variants={fadeUp} initial="hidden" animate="visible"&gt;
Discover Minimalism with Clothora
&lt;/motion.h1&gt;
);
}
</code></pre>

  <h2>🤝 Contributing</h2>
  <p>Have ideas or want to improve the design? Contributions are welcome!</p>
  <h3>How to contribute:</h3>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch for your feature or fix.</li>
    <li>Make your changes and test thoroughly.</li>
    <li>Submit a pull request with a detailed description.</li>
  </ol>
  <h2>📩 Contact</h2>
  <p>
    For inquiries or collaboration, feel free to email:
    <a href="mailto:rashidvisda@gmail.com">rashidvisda@gmail.com</a>.
  </p>
  <hr />
  <p><em>Crafted with ❤️ using Next.js and Tailwind CSS.</em></p>
</body>
</html>
