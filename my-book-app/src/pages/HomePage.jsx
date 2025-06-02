import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import BookCard from '../components/BookCard';
import { fetchBooks } from '../api/bookApi';
import Header from '../components/Header';

const HomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetchBooks();
        setBooks(res.data);
      } catch (err) {
        alert('도서 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return (
    <>
      <Header buttonLabel="도서 등록" buttonPath="/add" />
      <Container sx={{ mt: 6, mb: 10 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: 'center', mb: 5, fontWeight: 'bold' }}
        >
          📖 책을 선택해 자세히 살펴보세요 📖
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Paper elevation={1} sx={{ p: 4, borderRadius: 4 }}>
            <Grid container spacing={3} justifyContent="center">
              {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    date={book.createdAt}
                    description={book.content}
                    imageUrl={book.coverImageUrl}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default HomePage;
