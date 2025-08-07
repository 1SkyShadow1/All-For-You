import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Star, Award, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Award, label: 'Years Experience', value: '5+' },
    { icon: Star, label: 'Product Rating', value: '4.9/5' },
    { icon: Heart, label: 'Products Sold', value: '50,000+' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Creative Director',
      image: '/products/team-1.jpg',
      bio: 'With over 10 years in design, Sarah brings creativity and vision to every product.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Production',
      image: '/products/team-2.jpg',
      bio: 'Michael ensures every product meets our high standards of quality and craftsmanship.'
    },
    {
      name: 'Emma Davis',
      role: 'Customer Experience Lead',
      image: '/products/team-3.jpg',
      bio: 'Emma is passionate about creating exceptional experiences for our customers.'
    }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on quality. Every product is carefully crafted using premium materials.',
      icon: '🎯'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to sustainable practices and eco-friendly production methods.',
      icon: '🌱'
    },
    {
      title: 'Customer Focused',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.',
      icon: '❤️'
    },
    {
      title: 'Innovation',
      description: 'We constantly innovate to bring you the latest trends and cutting-edge designs.',
      icon: '💡'
    }
  ];

  return (
    <div className="min-h-screen bg-premium-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-premium-black via-rich-black to-black-marble">
        <div className="absolute inset-0 bg-gold-500/5"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold gold-foil mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded with a passion for excellence, All for You represents the pinnacle 
              of lifestyle products. We believe in creating pieces that not only look 
              exceptional but also tell a story.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-rich-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold gold-foil mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  What started as a small passion project in 2019 has grown into a 
                  beloved brand that serves customers worldwide. Our journey began 
                  with a simple belief: everyone deserves products that make them 
                  feel special.
                </p>
                <p>
                  From our humble beginnings in a small studio to our current 
                  state-of-the-art facility, we've never lost sight of our core 
                  mission - creating exceptional products that bring joy to everyday life.
                </p>
                <p>
                  Today, we're proud to be a trusted name in lifestyle products, 
                  known for our attention to detail, premium quality, and 
                  commitment to customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-gold-600/20">
                <img
                  src="/products/hero-1.jpg"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold-500/10 border border-gold-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-gold-400" />
                </div>
                <div className="text-3xl font-bold gold-foil mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-rich-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gold-foil mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape the way we 
              create products and serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-premium-black rounded-xl p-8 border border-gold-600/20 hover:border-gold-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gold-400 mb-3">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gold-foil mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The talented individuals behind All for You, each bringing their 
              unique expertise and passion to create something extraordinary.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold-600/30 group-hover:border-gold-400 transition-all duration-300">
                  <img
                    src="/products/hero-2.jpg" // Fallback image since team images don't exist
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-gold-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-600/10 to-gold-400/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold gold-foil mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made All for You 
            their trusted choice for premium lifestyle products.
          </p>
          <Link 
            to="/shop"
            className="bg-gold-500 text-premium-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-gold-500/30"
          >
            Shop Our Collections
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
