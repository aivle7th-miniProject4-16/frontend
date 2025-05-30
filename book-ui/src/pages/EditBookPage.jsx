import {
  AppBar,
  Toolbar,
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: '나는 왜 쉬지 못할까?',
      author: '김은영',
      description: '정신의학과 교수가 쓴 책',
      imageUrl: 'https://covers.openlibrary.org/b/id/10523386-L.jpg',
    },
    {
      id: 2,
      title: '데미안',
      author: '헤르만 헤세',
      description: '자아와 성장에 관한 이야기',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=데미안',
    },
  ];

  const book = books.find((b) => b.id === Number(id));

  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [description, setDescription] = useState(book?.description || '');
  const [imageUrl, setImageUrl] = useState(book?.imageUrl || 'https://via.placeholder.com/150?text=IMG');

  if (!book) return <Typography>도서를 찾을 수 없습니다.</Typography>;

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('제목을 작성해주세요.');
      return;
    }
    if (!author.trim()) {
      alert('저자를 작성해주세요.');
      return;
    }
    if (!description.trim()) {
      alert('내용을 작성해주세요.');
      return;
    }

    alert('수정 완료! (임시)');
    navigate(`/detail/${book.id}`);
  };

  const handleCancel = () => {
    navigate(`/detail/${book.id}`);
  };

  const handleImageGenerate = () => {
    alert(`이미지 생성 요청:\n제목: ${title}\n저자: ${author}\n설명: ${description}`);
  };

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
          <Button color="inherit" onClick={() => navigate('/')}>메인화면</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 6, mb: 10 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 5 }}>
          📘 도서 수정
        </Typography>

        <TextField
          fullWidth
          label="제목"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="저자"
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="내용"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                width: '100%',
                maxWidth: 600,
                height: 250,
                border: '2px solid #90caf9',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <img
                src={imageUrl}
                alt="도서 이미지"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={8}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Button variant="outlined" onClick={handleImageGenerate} sx={{ mb: 2 }}>
              이미지 생성
            </Button>
            <Box display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>저장</Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>취소</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditBookPage;
