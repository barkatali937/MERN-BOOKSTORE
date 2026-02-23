import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import BookNotFound from '../components/BookNotFound';
import BookCard from '../components/BookCard';
import api from '../lib/axios';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      try{
        const res = await api.get('/books');
        console.log(res.data);
        setBooks(res.data);
      }catch (error){
        console.log("Error fetching books");
        console.log(error);
        toast.error("Failed to log books");
      }finally{
        setLoading(false);
      }
    }
    fetchBooks();
  },[])
  return(
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7x1 mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading books ...</div>}
        {books.length === 0 && <BookNotFound />}
        {books.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{books.map((book) => (<BookCard key={book._id} book={book} setBooks={setBooks} />))}</div>)}
      </div>
    </div>
  )
}

export default HomePage
