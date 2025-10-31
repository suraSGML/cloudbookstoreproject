import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Package, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { books } from '@/data/books';
import { toast } from 'sonner';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const relatedBooks = books
    .filter((b) => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    toast.success(`"${book.title}" added to cart!`);
  };

  const mockReviews = [
    {
      author: 'Sarah Johnson',
      rating: 5,
      date: 'January 15, 2025',
      text: 'Absolutely captivating from start to finish. Highly recommend!',
    },
    {
      author: 'Michael Chen',
      rating: 4,
      date: 'January 10, 2025',
      text: 'Great read, though the pacing slowed in the middle. Still worth it!',
    },
    {
      author: 'Emily Rodriguez',
      rating: 5,
      date: 'January 5, 2025',
      text: "One of the best books I've read this year. The characters felt so real.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/')}>
            Home
          </span>
          {' / '}
          <span className="hover:text-foreground cursor-pointer">{book.genre}</span>
          {' / '}
          <span className="text-foreground">{book.title}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted sticky top-24 h-fit">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{book.genre}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{book.rating}</span>
                <span className="text-muted-foreground">({mockReviews.length} reviews)</span>
              </div>

              <div className="text-4xl font-bold mb-6">${book.price}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-success" />
                <span className="text-sm">
                  {book.inStock > 0 ? (
                    <span className="text-success font-medium">In Stock ({book.inStock} available)</span>
                  ) : (
                    <span className="text-destructive">Out of Stock</span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">Format:</span> {book.format}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">ISBN:</span> {book.isbn}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">Published:</span> {book.publicationDate}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleAddToCart}
                disabled={book.inStock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex flex-col items-center text-center gap-2">
                <Package className="h-8 w-8 text-primary" />
                <span className="text-xs text-muted-foreground">Free Shipping Over $50</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xs text-muted-foreground">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="h-8 w-8 text-primary" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">About This Book</h2>
          <p className="text-muted-foreground leading-relaxed">{book.description}</p>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {mockReviews.map((review, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <ProductCard
                  key={relatedBook.id}
                  book={relatedBook}
                  onAddToCart={() => toast.success(`"${relatedBook.title}" added to cart!`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
