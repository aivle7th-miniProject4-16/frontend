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
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const books = [
    {
      id: 1,
      title: '나는 왜 쉬지 못할까?',
      author: '김은영',
      description:
        '이 책은 정신의학과 교수가 오랜 임상 경험을 토대로 일과 휴식 사이에서 균형을 찾지 못하는 현대인에게 꼭 필요한 메시지를 담고 있다. 삶을 되돌아보게 만드는 통찰과 실천적 조언이 담겨 있다.',
      imageUrl: 'https://via.placeholder.com/300x300.png?text=나는+왜+쉬지+못할까?',
      createdAt: '2025.05.29',
      updatedAt: '2025.05.30',
    },
  ];

  const book = books.find((b) => b.id === Number(id));
  if (!book) return <Typography>도서를 찾을 수 없습니다.</Typography>;

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    alert('도서가 삭제되었습니다. (※ 실제 기능은 추후 구현)');
    navigate('/');
  };

  return (
    <>
      {/* 상단 고정 헤더 */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
                variant="h6"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                AIVLE SCHOOL 6반 16조
            </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            메인화면
          </Button>
        </Toolbar>
      </AppBar>

      {/* 본문 */}
      <Container sx={{ mt: 6, mb: 10 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 5 }}
        >
          도서상세
        </Typography>

        {/* ✅ 네모 테두리 영역 */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            {/* 이미지 */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  style={{ width: '100%', maxWidth: 280, borderRadius: 8 }}
                />
              </Box>
            </Grid>

            {/* 텍스트 정보 */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>제목: {book.title}</Typography>
              <Typography gutterBottom>저자: {book.author}</Typography>
              <Typography gutterBottom>작성일: {book.createdAt}</Typography>
              <Typography gutterBottom>수정일: {book.updatedAt}</Typography>
            </Grid>
          </Grid>

          {/* 내용 */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>내용</Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{book.description}</Typography>
          </Box>
        </Paper>

        {/* 🔧 수정/삭제 버튼 (틀 바깥쪽) */}
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
