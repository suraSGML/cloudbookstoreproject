import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribing(true);
    
    try {
      const { error } = await (supabase
        .from('newsletter_subscriptions' as any)
        .insert([{ email }]) as any);

      if (error) {
        if (error.code === '23505') {
          toast.error('This email is already subscribed!');
        } else {
          throw error;
        }
      } else {
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-serif">Modern BookStore</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your destination for discovering remarkable books and authors.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Book Street, Reading City</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@modernbookstore.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/?filter=new" className="hover:text-foreground transition-colors">New Releases</Link></li>
              <li><Link to="/?filter=bestseller" className="hover:text-foreground transition-colors">Best Sellers</Link></li>
              <li><Link to="/?filter=staff" className="hover:text-foreground transition-colors">Staff Picks</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Browse All</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-foreground transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-foreground transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for book recommendations and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribing}
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 shrink-0"
                disabled={subscribing}
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Modern BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
