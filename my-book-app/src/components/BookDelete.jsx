// src/components/BookDelete.jsx
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@mui/material';
  import { useState } from 'react';
  import { deleteBook } from '../api/bookApi';
  import { useNavigate } from 'react-router-dom';
  
  const BookDelete = ({ id, onSuccess }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleConfirmDelete = async () => {
      try {
        await deleteBook(id);
        setOpen(false);
        alert('도서가 삭제되었습니다.');
        onSuccess ? onSuccess(id) : navigate('/');
      } catch (err) {
        alert('삭제에 실패했습니다.');
        console.error(err);
      }
    };
  
    return (
      <>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          삭제
        </Button>
  
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>도서 삭제 확인</DialogTitle>
          <DialogContent>
            <DialogContentText>
              정말 이 도서를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="inherit">
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
  
  export default BookDelete;
  