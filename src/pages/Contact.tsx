
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-iso-accent mb-6 text-center glow-text">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold text-iso-accent mb-4">Get in Touch</h2>
            <p className="text-iso-text mb-6">
              Have questions about ISO 27001 compliance or need specialized assistance?
              Our team of security experts is here to help.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-iso-accent font-medium">Email</h3>
                <p className="text-iso-text">contact@isoguardian.com</p>
              </div>
              
              <div>
                <h3 className="text-iso-accent font-medium">Phone</h3>
                <p className="text-iso-text">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="text-iso-accent font-medium">Office Hours</h3>
                <p className="text-iso-text">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold text-iso-accent mb-4">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-iso-text mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-iso-medium bg-opacity-50 border border-iso-light rounded focus:outline-none focus:ring-1 focus:ring-iso-accent text-iso-text"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-iso-text mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-iso-medium bg-opacity-50 border border-iso-light rounded focus:outline-none focus:ring-1 focus:ring-iso-accent text-iso-text"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm text-iso-text mb-1">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 bg-iso-medium bg-opacity-50 border border-iso-light rounded focus:outline-none focus:ring-1 focus:ring-iso-accent text-iso-text"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-iso-text mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 bg-iso-medium bg-opacity-50 border border-iso-light rounded focus:outline-none focus:ring-1 focus:ring-iso-accent text-iso-text"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-iso-accent text-iso-dark font-medium rounded hover:bg-opacity-90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
