export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  format: 'Hardcover' | 'Paperback' | 'eBook';
  genre: string;
  cover: string;
  description: string;
  isbn: string;
  publicationDate: string;
  inStock: number;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 14.99,
    rating: 4.5,
    format: 'Hardcover',
    genre: 'Fiction',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    isbn: '978-0525559474',
    publicationDate: 'August 13, 2020',
    inStock: 15
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 12.99,
    rating: 4.7,
    format: 'Paperback',
    genre: 'Science Fiction',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    isbn: '978-0593135204',
    publicationDate: 'May 4, 2021',
    inStock: 23
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 16.99,
    rating: 4.8,
    format: 'Hardcover',
    genre: 'Self-Help',
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
    description: 'Tiny Changes, Remarkable Results. No matter your goals, Atomic Habits offers a proven framework for improving every day.',
    isbn: '978-0735211292',
    publicationDate: 'October 16, 2018',
    inStock: 8
  },
  {
    id: '4',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    price: 13.99,
    rating: 4.6,
    format: 'Paperback',
    genre: 'Historical Fiction',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    description: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.',
    isbn: '978-1501161933',
    publicationDate: 'June 13, 2017',
    inStock: 12
  },
  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 18.99,
    rating: 4.9,
    format: 'Hardcover',
    genre: 'Science Fiction',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
    isbn: '978-0441172719',
    publicationDate: 'June 1, 1965',
    inStock: 7
  },
  {
    id: '6',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 15.99,
    rating: 4.7,
    format: 'Paperback',
    genre: 'Business',
    cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop',
    description: 'Timeless lessons on wealth, greed, and happiness. Doing well with money is not necessarily about what you know.',
    isbn: '978-0857197689',
    publicationDate: 'September 8, 2020',
    inStock: 18
  },
  {
    id: '7',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: 14.99,
    rating: 4.5,
    format: 'Hardcover',
    genre: 'Mystery',
    cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
    description: 'For years, rumors of the Marsh Girl have haunted Barkley Cove, a quiet town on the North Carolina coast.',
    isbn: '978-0735219090',
    publicationDate: 'August 14, 2018',
    inStock: 20
  },
  {
    id: '8',
    title: 'Educated',
    author: 'Tara Westover',
    price: 13.99,
    rating: 4.6,
    format: 'Paperback',
    genre: 'Biography',
    cover: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=600&fit=crop',
    description: 'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    isbn: '978-0399590504',
    publicationDate: 'February 20, 2018',
    inStock: 14
  },
  {
    id: '9',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 12.99,
    rating: 4.4,
    format: 'Paperback',
    genre: 'Thriller',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop',
    description: 'Alicia Berenson life is seemingly perfect. Then one evening, she shoots her husband and never speaks another word.',
    isbn: '978-1250301697',
    publicationDate: 'February 5, 2019',
    inStock: 25
  },
  {
    id: '10',
    title: '1984',
    author: 'George Orwell',
    price: 11.99,
    rating: 4.8,
    format: 'Paperback',
    genre: 'Dystopian',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
    description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
    isbn: '978-0452284234',
    publicationDate: 'June 8, 1949',
    inStock: 30
  },
  {
    id: '11',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    price: 14.99,
    rating: 4.5,
    format: 'Hardcover',
    genre: 'Fiction',
    cover: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop',
    description: 'The Vignes twin sisters will grow up to live in two very different worlds, one black and one white.',
    isbn: '978-0525536291',
    publicationDate: 'June 2, 2020',
    inStock: 11
  },
  {
    id: '12',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 17.99,
    rating: 4.7,
    format: 'Hardcover',
    genre: 'Non-Fiction',
    cover: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&h=600&fit=crop',
    description: 'A Brief History of Humankind explores how biology and history have defined us and enhanced our understanding of what it means to be human.',
    isbn: '978-0062316097',
    publicationDate: 'February 10, 2015',
    inStock: 16
  }
];
