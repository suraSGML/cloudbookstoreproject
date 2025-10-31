import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';
import type { Book } from '@/data/books';

interface ProductCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

const ProductCard = ({ book, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/book/${book.id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
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
