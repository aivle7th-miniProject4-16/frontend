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
import Header from '../components/Header';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [apiKey, setApiKey] = useState(''); // ✅ API 키 상태 추가

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
    if (!title.trim() || !content.trim() || !apiKey.trim()) {
      alert('제목, 내용, API 키를 모두 입력해주세요.');
      return;
    }

    setGenerating(true);
    try {
      const imageUrl = await generateCoverImage(apiKey, title, content); // ✅ API 키 전달
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
      setGenerating(false);
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
      <Header buttonLabel="메인화면" buttonPath="/" />

      <Container sx={{ mt: 6, mb: 10, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ p: 4, maxWidth: 1300, width: '100%' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            📘 도서 수정
          </Typography>

          <Grid container spacing={4}>
            {/* 입력 영역 */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="OpenAI API 키 입력"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value.trim())}
                margin="normal"
                type="password"
                placeholder="sk-..."
              />
              <TextField
                fullWidth
                label="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="저자"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                margin="normal"
                multiline
                rows={6}
              />
            </Grid>

            {/* 이미지 및 버튼 영역 */}
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
                {coverImageUrl ? (
                  <img
                    src={coverImageUrl}
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
                  onClick={handleSubmit}
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

export default EditBookPage;
