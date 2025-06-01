import {
  AppBar,
  Toolbar,
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api/bookApi';
import { generateCoverImage } from '../api/generateCoverImage';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const handleImageGenerate = async () => {
    if (!title.trim() || !description.trim()) {
      alert('제목과 설명을 모두 입력해주세요.');
      return;
    }

    setGenerating(true);
    try {
      const imageUrl = await generateCoverImage(title, description);
      if (imageUrl) {
        setGeneratedImageUrl(imageUrl);
        alert('✅ 이미지가 성공적으로 생성되었습니다.');
      } else {
        alert('❌ 이미지 생성에 실패했습니다.');
      }
    } catch (err) {
      console.error('🔥 이미지 생성 중 오류:', err);
      alert('이미지 생성 중 문제가 발생했습니다.');
    } finally {
      setGenerating(false);
    }
  };

  const handleRegister = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) {
      alert('모든 항목을 작성해주세요.');
      return;
    }

    const bookData = {
      title,
      author,
      content: description,
      coverImageUrl: generatedImageUrl,
    };

    try {
      await createBook(bookData);
      alert('도서 등록 완료!');
      navigate('/');
    } catch (err) {
      console.error('도서 등록 실패', err);
      alert('등록에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
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

      <Container sx={{ mt: 6, mb: 10, display: 'flex', justifyContent: 'center' }}>
      <Box
            sx={{
              p: 4,
              maxWidth: 1300,
              width: '100%',
            }}
          >
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            📘 새 도서 등록
          </Typography>

          <Grid container spacing={4}>
            {/* 입력 영역 */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="제목 입력"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="저자 입력"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="내용 입력"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={6}
              />
            </Grid>

            {/* 이미지 영역 */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  width: 400,
                  height: 300,
                  border: '2px dashed #90caf9',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f4f6f8',
                  overflow: 'hidden',
                }}
              >
                {generatedImageUrl ? (
                  <img
                    src={generatedImageUrl}
                    alt="도서 이미지"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#999', textAlign: 'center' }}>
                    제목과 내용을 입력 후 <br /> '이미지 생성'을 눌러주세요
                  </Typography>
                )}
              </Box>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleImageGenerate}
                sx={{ mt: 2, fontWeight: 600 }}
                disabled={generating}
              >
                {generating ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={20} />
                    생성 중...
                  </Box>
                ) : (
                  '이미지 생성'
                )}
              </Button>

              <Box display="flex" gap={2} sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleRegister}
                  disabled={!generatedImageUrl}
                  sx={{ fontWeight: 600 }}
                >
                  저장
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  sx={{ fontWeight: 600 }}
                >
                  취소
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AddBookPage;
