import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ id, title, author, description, imageUrl, date }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 240,           //  작게 고정
        height: 320,          //  높이도 고정
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2">저자: {author}</Typography>
        <Typography variant="body2">작성일: {date}</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '0.8rem',
            mt: 0.5,
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 1 }}>
        <Button size="small" onClick={() => navigate(`/detail/${id}`)}>
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
