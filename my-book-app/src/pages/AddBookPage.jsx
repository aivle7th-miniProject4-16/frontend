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
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api/bookApi';
import { generateCoverImage } from '../api/generateCoverImage';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('https://via.placeholder.com/150?text=IMG');
  const [generating, setGenerating] = useState(false); // ✅ 이미지 생성 로딩 상태

  const navigate = useNavigate();

  const handleImageGenerate = async () => {
    if (!title.trim() || !description.trim()) {
      alert('제목과 설명을 모두 입력해주세요.');
      return;
    }

    setGenerating(true); // ✅ 로딩 시작
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
      setGenerating(false); // ✅ 로딩 종료
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
      {/* AppBar 생략 */}
      <Container sx={{ mt: 6, mb: 10 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 5 }}>
          📘 새 도서 등록
        </Typography>

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
          rows={4}
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
                src={generatedImageUrl}
                alt="도서 이미지"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} display="flex" flexDirection="column" justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleImageGenerate}
              sx={{ mb: 2 }}
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

            <Box display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={handleRegister}>저장</Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>취소</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddBookPage;
