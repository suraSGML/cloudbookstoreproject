import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Loader2 } from 'lucide-react';
import BookReviews from '@/components/BookReviews';
import BookPreview from '@/components/BookPreview';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  format: string;
  genre: string;
  cover: string | null;
  description: string | null;
  isbn: string | null;
  publication_date: string | null;
  publicationDate?: string;
  in_stock: boolean;
  inStock?: number;
  preview_url?: string | null;
  download_url?: string | null;
  pages_preview?: number;
}

const BookDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const fetchBook = async (bookId: string) => {
    const { data: bookData, error: bookError } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .single();

    if (bookError || !bookData) {
      setLoading(false);
      return;
    }

    const bookWithInStock = {
      ...bookData,
      inStock: bookData.in_stock ? 10 : 0,
      publicationDate: bookData.publication_date || undefined
    };

    setBook(bookWithInStock);

    // Fetch related books
    const { data: relatedData } = await supabase
      .from('books')
      .select('*')
      .eq('genre', bookData.genre)
      .neq('id', bookId)
      .limit(4);

    if (relatedData) {
      const transformedRelated = relatedData.map(b => ({
        ...b,
        inStock: b.in_stock ? 10 : 0,
        publicationDate: b.publication_date || undefined
      }));
      setRelatedBooks(transformedRelated);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(book.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book as any);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="relative">
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted sticky top-24">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

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
              </div>

              <div className="text-4xl font-bold mb-6">${book.price}</div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Availability:</span>
                <span className={book.inStock > 0 ? 'text-green-600 font-medium' : 'text-destructive font-medium'}>
                  {book.inStock > 0 ? `In Stock (${book.inStock} available)` : 'Out of Stock'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-medium">{book.format}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">ISBN:</span>
                <span className="font-medium">{book.isbn || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Published:</span>
                <span className="font-medium">{book.publication_date || 'N/A'}</span>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-accent hover:bg-accent/90"
                onClick={() => addToCart(book as any)}
                disabled={book.inStock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={toggleWishlist}
                className="px-6"
              >
                <Heart
                  className={`h-5 w-5 ${
                    inWishlist ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </Button>
            </div>

            <Separator />

            <BookPreview
              bookId={book.id}
              bookTitle={book.title}
              previewUrl={book.preview_url}
              downloadUrl={book.download_url}
              pagesPreview={book.pages_preview}
            />

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="h-8 w-8 text-primary" />
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

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">About This Book</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{book.description}</p>
        </div>

        <div className="mb-16">
          <BookReviews bookId={book.id} />
        </div>

        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map(relatedBook => (
                <ProductCard key={relatedBook.id} book={relatedBook as any} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
