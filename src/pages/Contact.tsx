import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@allforyou.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Design Street, Creative City, CC 12345',
      description: 'Come see our showroom'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 8am-5pm',
      description: 'Weekend: 10am-3pm'
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original packaging. Custom orders are final sale.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide! International shipping times vary by location (7-14 business days typically).'
    },
    {
      question: 'Can I customize my order?',
      answer: 'Absolutely! Visit our Custom Design page to create personalized products with your own designs.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email to monitor your package.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.'
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? 
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-20 bg-rich-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-premium-black rounded-xl p-6 border border-gold-600/20 hover:border-gold-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10 text-center">
                <div className="w-16 h-16 bg-gold-500/10 border border-gold-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
                <p className="text-gold-400 font-medium mb-2">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold gold-foil mb-6">Send us a Message</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gold-400 font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-rich-black border border-gold-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gold-400 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-rich-black border border-gold-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gold-400 font-medium mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-rich-black border border-gold-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="custom">Custom Design</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gold-400 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-rich-black border border-gold-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gold-500 text-premium-black px-6 py-4 rounded-lg font-semibold text-lg hover:bg-gold-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-gold-500/30 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-3xl font-bold gold-foil mb-6">Find Us</h2>
              <div className="bg-rich-black rounded-xl border border-gold-600/20 overflow-hidden h-96 mb-8">
                <div className="w-full h-full bg-gradient-to-br from-gold-500/10 to-gold-600/5 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <p className="text-gold-400 font-semibold">Interactive Map</p>
                    <p className="text-gray-400">123 Design Street, Creative City</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
                <h3 className="text-xl font-semibold text-white mb-4">Visit Our Showroom</h3>
                <p className="text-gray-300 mb-4">
                  Come see our products in person! Our showroom features the full range 
                  of our collections, and our team is available to help you find the 
                  perfect items for your needs.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">
                    <strong className="text-gold-400">Monday - Friday:</strong> 8:00 AM - 5:00 PM
                  </p>
                  <p className="text-gray-400">
                    <strong className="text-gold-400">Saturday:</strong> 10:00 AM - 3:00 PM
                  </p>
                  <p className="text-gray-400">
                    <strong className="text-gold-400">Sunday:</strong> Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-rich-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gold-foil mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find quick answers to common questions. If you don't see what you're 
              looking for, feel free to contact us directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-premium-black rounded-xl p-6 border border-gold-600/20">
                <h3 className="text-lg font-semibold text-gold-400 mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
