import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Book Street<br />
                      Reading City, RC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      (555) 123-4567<br />
                      Mon-Fri: 9AM - 6PM EST<br />
                      Sat: 10AM - 4PM EST
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      hello@modernbookstore.com<br />
                      support@modernbookstore.com<br />
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
