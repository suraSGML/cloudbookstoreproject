import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';
import type { Book } from '@/data/books';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

const ProductCard = ({ book, onAddToCart }: ProductCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(book.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/book/${book.id}`} className="block relative">
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${
              inWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`}
          />
        </button>
      </Link>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Link to={`/book/${book.id}`}>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(book.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            ({book.rating})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${book.price}</span>
          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(book);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {book.inStock < 10 && (
          <p className="text-xs text-destructive font-medium">
            Only {book.inStock} left in stock!
          </p>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
