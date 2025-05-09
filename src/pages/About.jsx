const About = () => {
  const team = [
    {
      name: 'John Smith',
      role: 'Founder & Lead Developer',
      bio: '10+ years of WordPress development experience. Passionate about creating efficient and scalable web solutions.',
    },
    {
      name: 'Emily Chen',
      role: 'WooCommerce Specialist',
      bio: 'Expert in e-commerce solutions and optimization. Helping businesses succeed in online retail.',
    },
    {
      name: 'David Wilson',
      role: 'Frontend Developer',
      bio: 'Crafting beautiful and responsive user interfaces with modern web technologies.',
    },
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in every project we undertake, ensuring the highest quality solutions.',
    },
    {
      title: 'Innovation',
      description: 'Staying ahead of the curve with the latest WordPress technologies and best practices.',
    },
    {
      title: 'Reliability',
      description: 'Building long-term relationships through dependable service and consistent results.',
    },
  ];

  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About ByteRight</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're a team of WordPress experts passionate about creating powerful digital solutions
            that help businesses succeed online.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 mb-4">
              Founded in 2020, ByteRight emerged from a vision to provide exceptional WordPress
              and WooCommerce solutions to businesses of all sizes. What started as a small
              team of passionate developers has grown into a full-service WordPress agency.
            </p>
            <p className="text-gray-600">
              Today, we pride ourselves on delivering cutting-edge web solutions that help
              our clients achieve their business goals. Our commitment to quality and
              customer satisfaction has made us a trusted partner for businesses worldwide.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                <p className="text-primary text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
