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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(
    'https://via.placeholder.com/150?text=IMG'
  );
  const navigate = useNavigate();

  const handleImageGenerate = () => {
    alert(`이미지 생성 요청:\n제목: ${title}\n저자: ${author}\n설명: ${description}`);
  };

  const handleRegister = () => {
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

    alert('도서 등록 완료! (백엔드 연동 예정)');
    navigate('/detail/3');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      {/* 헤더 */}
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
        <Typography variant="h5" gutterBottom sx={{ mb: 5 }}>
          📘 새 도서 등록
        </Typography>

        <TextField
          fullWidth
          label="제목 입력"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="저자 입력"
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="내용 입력"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
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
                src="https://covers.openlibrary.org/b/id/10523386-L.jpg"
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
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Button variant="outlined" onClick={handleImageGenerate} sx={{ mb: 2 }}>
              이미지 생성
            </Button>
            <Box display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={handleRegister}>
                저장
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                취소
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddBookPage;
