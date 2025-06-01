import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBookById, deleteBook } from '../api/bookApi';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await fetchBookById(id);
        setBook(res.data);
      } catch (err) {
        alert("도서를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      setOpenDialog(false); // ✅ 먼저 모달 닫기
      await deleteBook(id);
      alert("도서가 삭제되었습니다.");
      navigate('/');
    } catch (err) {
      alert("삭제에 실패했습니다.");
      console.error(err);
    }
  };
  

  if (loading) {
    return (
      <Container sx={{ mt: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!book) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography>도서를 찾을 수 없습니다.</Typography>
      </Container>
    );
  }

  return (
    <>
      {/* 상단 고정 헤더 */}
      <AppBar position="static" sx={{ backgroundColor: '#0D1B2A' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            AIVLE SCHOOL 6반 16조
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            메인화면
          </Button>
        </Toolbar>
      </AppBar>

      {/* 본문 */}
      <Container sx={{ mt: 6, mb: 10 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 5 }}>
          도서상세
        </Typography>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  style={{ width: '100%', maxWidth: 280, borderRadius: 8 }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>제목: {book.title}</Typography>
              <Typography gutterBottom>저자: {book.author}</Typography>
              <Typography gutterBottom>작성일: {book.createdAt || '-'}</Typography>
              <Typography gutterBottom>수정일: {book.updatedAt || '-'}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>내용</Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{book.content}</Typography>
          </Box>
        </Paper>

        {/* 수정/삭제 버튼 */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="primary" onClick={() => navigate(`/edit/${book.id}`)}>
            수정
          </Button>
          <Button variant="outlined" color="error" onClick={() => setOpenDialog(true)}>
            삭제
          </Button>
        </Box>
      </Container>

      {/* 삭제 확인 모달 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>도서 삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말 이 도서를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            취소
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookDetailPage;
