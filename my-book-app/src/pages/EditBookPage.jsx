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
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBookForEdit, updateBook } from '../api/bookApi';
import { generateCoverImage } from '../api/generateCoverImage';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('https://via.placeholder.com/150?text=IMG');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false); // ✅ 이미지 생성 중 상태

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await fetchBookForEdit(id);
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setContent(book.content);
        setCoverImageUrl(book.coverImageUrl);
      } catch (err) {
        alert('도서 정보를 불러오지 못했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !content.trim()) {
      alert('모든 항목을 작성해주세요.');
      return;
    }

    const bookData = { title, author, content, coverImageUrl };

    try {
      await updateBook(id, bookData);
      alert('수정 완료!');
      navigate(`/detail/${id}`);
    } catch (err) {
      alert('수정에 실패했습니다.');
      console.error(err);
    }
  };

  const handleCancel = () => navigate(`/detail/${id}`);

  const handleImageGenerate = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용은 반드시 입력해주세요.');
      return;
    }

    setGenerating(true); // ✅ 로딩 시작
    try {
      const imageUrl = await generateCoverImage(title, content);
      if (imageUrl) {
        setCoverImageUrl(imageUrl);
        alert('✅ 이미지가 성공적으로 생성되었습니다.');
      } else {
        alert('❌ 이미지 생성에 실패했습니다.');
      }
    } catch (err) {
      console.error('🔥 이미지 생성 오류:', err);
      alert('이미지 생성 중 문제가 발생했습니다.');
    } finally {
      setGenerating(false); // ✅ 로딩 종료
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

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

        <TextField fullWidth label="제목" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth label="저자" margin="normal" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <TextField fullWidth multiline rows={4} label="내용" margin="normal" value={content} onChange={(e) => setContent(e.target.value)} />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ width: '100%', maxWidth: 600, height: 250, border: '2px solid #90caf9', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
              <img
                src={coverImageUrl}
                alt="도서 이미지"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={8} display="flex" flexDirection="column" justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleImageGenerate}
              sx={{ mb: 2 }}
              disabled={generating} // ✅ 생성 중 비활성화
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
