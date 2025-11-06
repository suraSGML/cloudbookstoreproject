import { Heart, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleShareWishlist = async () => {
    if (!user) {
      toast.error('Please sign in to share your wishlist');
      return;
    }

    setGenerating(true);

    try {
      // Get share code from database function
      const { data: codeData, error: codeError } = await supabase
        .rpc('generate_share_code');

      if (codeError) throw codeError;

      const shareCode = codeData;

      // Save wishlist to database
      const { error: insertError } = await supabase
        .from('shared_wishlists')
        .insert([{
          user_id: user.id,
          share_code: shareCode,
          wishlist_data: wishlist as any,
        }]);

      if (insertError) throw insertError;

      const url = `${window.location.origin}/shared-wishlist/${shareCode}`;
      setShareUrl(url);
      setShareDialogOpen(true);
      toast.success('Wishlist shared successfully!');
    } catch (error) {
      console.error('Error sharing wishlist:', error);
      toast.error('Failed to share wishlist');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground">
              Save your favorite books to your wishlist and come back to them later.
            </p>
          </div>
          <Link to="/">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? 'book' : 'books'} saved
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleShareWishlist}
            disabled={generating || !user}
          >
            <Share2 className="mr-2 h-4 w-4" />
            {generating ? 'Generating...' : 'Share Wishlist'}
          </Button>
        </div>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Wishlist</DialogTitle>
            <DialogDescription>
              Share this link with friends so they can view your wishlist
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} variant="outline">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(book => (
          <ProductCard key={book.id} book={book} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
