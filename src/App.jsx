import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogLayout from './components/blog/BlogLayout';
import Auth0ProviderWithNavigate from './components/auth/Auth0Provider';

function App() {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 md:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogLayout />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;
