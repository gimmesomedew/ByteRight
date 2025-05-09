import { useEffect, useRef } from 'react';

const AnimatedHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = ev;
      heroRef.current.style.setProperty("--x", `${clientX}px`);
      heroRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-black overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255,255,255,0.1) 0%,
            transparent 25%
          )
        `
      }}
    >
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            WordPress Development
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              {" "}Done Right
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
            Expert WordPress solutions tailored to your business needs. We build fast, secure, and scalable websites that drive results.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-delay-2">
            <a
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </a>
            <a
              href="/services"
              className="border border-gray-500 hover:border-white text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
        aria-hidden="true"
      />
    </section>
  );
};

export default AnimatedHero;
