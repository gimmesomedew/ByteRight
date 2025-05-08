import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Hero } from '../components/animated-hero';
import { Features } from '../components/features';
import { ErrorBoundary } from '../components/error-boundary';
import FeaturedPosts from '../components/blocks/FeaturedPosts';
import { getAllPosts } from '../utils/blogUtils';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const { posts } = await getAllPosts({ page: 1, limit: 3 });
        setFeaturedPosts(posts);
      } catch (error) {
        console.error('Error loading featured posts:', error);
      }
    };
    loadFeaturedPosts();
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'E-commerce Owner',
      content: 'ByteRight transformed our online store with their WooCommerce expertise. Sales have increased by 40% since the redesign.',
    },
    {
      name: 'Mike Chen',
      role: 'Marketing Director',
      content: 'The team at ByteRight delivered exactly what we needed. Their WordPress development skills are top-notch.',
    },
  ];

  return (
    <div className="flex flex-col">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <Features />

      {/* Featured Posts Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest insights on WordPress development, WooCommerce, and digital solutions.
            </p>
          </div>
          <FeaturedPosts posts={featuredPosts} />
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
            >
              View All Posts
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Let's discuss how we can help grow your business with our WordPress expertise.
          </p>
          <Link to="/contact" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
