import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Book } from '@/data/books';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlist: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Book[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (book: Book) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === book.id)) {
        toast.info(`"${book.title}" is already in your wishlist`);
        return prev;
      }
      toast.success(`"${book.title}" added to wishlist!`);
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== bookId));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (bookId: string) => {
    return wishlist.some(item => item.id === bookId);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
