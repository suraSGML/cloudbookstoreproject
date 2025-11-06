import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import type { Book } from '@/data/books';

const SharedWishlist = () => {
  const { shareCode } = useParams();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (shareCode) {
      fetchSharedWishlist(shareCode);
    }
  }, [shareCode]);

  const fetchSharedWishlist = async (code: string) => {
    try {
      const { data, error } = await supabase
        .from('shared_wishlists')
        .select('wishlist_data')
        .eq('share_code', code)
        .single();

      if (error) {
        setError(true);
        setLoading(false);
        return;
      }

      if (data && data.wishlist_data) {
        setWishlist(data.wishlist_data as unknown as Book[]);
      }
    } catch (err) {
      console.error('Error fetching shared wishlist:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Wishlist Not Found</h1>
            <p className="text-muted-foreground">
              This wishlist link may be invalid or has expired.
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
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Shared Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlist.length} {wishlist.length === 1 ? 'book' : 'books'} in this wishlist
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(book => (
          <ProductCard key={book.id} book={book} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default SharedWishlist;
