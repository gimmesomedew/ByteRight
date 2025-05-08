import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Custom WordPress Development',
      description: 'Tailored WordPress solutions that match your unique business requirements. We build fast, secure, and scalable websites that drive results.',
      features: [
        'Custom theme development',
        'Plugin development',
        'Performance optimization',
        'Security implementation',
      ],
    },
    {
      title: 'WooCommerce Solutions',
      description: 'Transform your online business with our expert WooCommerce development services. We create seamless shopping experiences that convert.',
      features: [
        'Custom shop development',
        'Payment gateway integration',
        'Inventory management',
        'Shipping configuration',
      ],
    },
    {
      title: 'Website Maintenance',
      description: 'Keep your WordPress website secure, updated, and performing at its best with our comprehensive maintenance services.',
      features: [
        'Regular updates & backups',
        'Security monitoring',
        'Performance optimization',
        'Technical support',
      ],
    },
    {
      title: 'WordPress Consulting',
      description: 'Get expert advice on your WordPress project from our experienced team. We help you make informed decisions for your online presence.',
      features: [
        'Technical consultation',
        'Platform migration planning',
        'Performance audits',
        'Security assessments',
      ],
    },
  ];

  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive WordPress and WooCommerce solutions to help your business thrive online.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Let's discuss how we can help you achieve your online goals.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
