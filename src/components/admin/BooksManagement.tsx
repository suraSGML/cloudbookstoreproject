import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus } from 'lucide-react';

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
  in_stock: boolean;
}

export default function BooksManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    rating: '0',
    format: 'paperback',
    genre: 'fiction',
    cover: '',
    description: '',
    isbn: '',
    publication_date: '',
    in_stock: true
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load books');
      return;
    }
    setBooks(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookData = {
      title: formData.title,
      author: formData.author,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      format: formData.format,
      genre: formData.genre,
      cover: formData.cover || null,
      description: formData.description || null,
      isbn: formData.isbn || null,
      publication_date: formData.publication_date || null,
      in_stock: formData.in_stock
    };

    if (editingBook) {
      const { error } = await supabase
        .from('books')
        .update(bookData)
        .eq('id', editingBook.id);

      if (error) {
        toast.error('Failed to update book');
        return;
      }
      toast.success('Book updated successfully');
    } else {
      const { error } = await supabase
        .from('books')
        .insert([bookData]);

      if (error) {
        toast.error('Failed to add book');
        return;
      }
      toast.success('Book added successfully');
    }

    setDialogOpen(false);
    resetForm();
    fetchBooks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete book');
      return;
    }

    toast.success('Book deleted successfully');
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      rating: book.rating.toString(),
      format: book.format,
      genre: book.genre,
      cover: book.cover || '',
      description: book.description || '',
      isbn: book.isbn || '',
      publication_date: book.publication_date || '',
      in_stock: book.in_stock
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      price: '',
      rating: '0',
      format: 'paperback',
      genre: 'fiction',
      cover: '',
      description: '',
      isbn: '',
      publication_date: '',
      in_stock: true
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books Management</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title*</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author*</Label>
                  <Input
                    id="author"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price*</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="format">Format*</Label>
                  <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paperback">Paperback</SelectItem>
                      <SelectItem value="hardcover">Hardcover</SelectItem>
                      <SelectItem value="ebook">E-book</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="genre">Genre*</Label>
                  <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="science-fiction">Science Fiction</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="publication_date">Publication Date</Label>
                  <Input
                    id="publication_date"
                    value={formData.publication_date}
                    onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cover">Cover Image URL</Label>
                <Input
                  id="cover"
                  value={formData.cover}
                  onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="in_stock"
                  checked={formData.in_stock}
                  onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
                />
                <Label htmlFor="in_stock">In Stock</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBook ? 'Update' : 'Add'} Book
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>${book.price}</TableCell>
              <TableCell className="capitalize">{book.format}</TableCell>
              <TableCell className="capitalize">{book.genre}</TableCell>
              <TableCell>{book.in_stock ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(book)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(book.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
