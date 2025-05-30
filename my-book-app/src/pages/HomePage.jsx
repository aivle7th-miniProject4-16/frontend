import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: '나는 왜 쉬지 못할까?',
      author: '김은영',
      date: '2024-05-12',
      description: '정신의학과 교수가 쓴 책입니다. 이 책은 현대인의 마음을 위로하고 삶의 균형을 찾도록 도와줍니다.',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=나는+왜+쉬지+못할까?',
    },
    {
      id: 2,
      title: '데미안',
      author: '헤르만 헤세',
      date: '2024-03-01',
      description: '자아와 성장에 관한 이야기. 20세기 독일 문학의 대표작 중 하나입니다.',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=데미안',
    },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            AIVLE SCHOOL 6반 16조
          </Typography>
          <Button color="inherit" onClick={() => navigate('/add')}>
            도서 등록
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 6, mb: 10 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: 'center', mb: 5, fontWeight: 'bold' }}
        >
          📖 책을 선택해 자세히 살펴보세요 📖
        </Typography>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Grid container spacing={3} justifyContent="center">
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <BookCard {...book} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default HomePage;
