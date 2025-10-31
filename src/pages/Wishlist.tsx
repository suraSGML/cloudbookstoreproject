import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

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
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlist.length} {wishlist.length === 1 ? 'book' : 'books'} saved
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

export default Wishlist;
