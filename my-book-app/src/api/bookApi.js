// src/api/bookApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/book'; // 백엔드 서버 주소

//  도서 목록 조회
export const fetchBooks = () => axios.get(BASE_URL);

//  도서 등록
export const createBook = (bookData) => axios.post(BASE_URL, bookData);

//  도서 상세 조회
export const fetchBookById = (id) => axios.get(`${BASE_URL}/${id}`);

//  도서 수정 조회 (수정 폼용)
export const fetchBookForEdit = (id) => axios.get(`${BASE_URL}/${id}/update`);

//  도서 수정 저장
export const updateBook = (id, bookData) => axios.put(`${BASE_URL}/${id}/update`, bookData);

//  도서 삭제
export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);
