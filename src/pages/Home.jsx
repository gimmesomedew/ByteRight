import { Link } from 'react-router-dom';
import { Hero } from '../components/animated-hero';
import { Features } from '../components/features';
import { ErrorBoundary } from '../components/error-boundary';

const Home = () => {
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
