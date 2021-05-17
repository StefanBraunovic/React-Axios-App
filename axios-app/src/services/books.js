import axiosInstance from './axios';
// import axios from 'axios';

export const getAllBooks = () => {
	return axiosInstance
		.get('books/count', {
			headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
		})
		.then((r) => {
			return axiosInstance.get(`books?size=${r.data}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
				},
			});
		});
};

export const deleteBook = (bookId) => {
	return axiosInstance.delete(`books/${bookId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const getBook = (bookId) => {
	return axiosInstance.get(`books/${bookId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const addBook = (data) => {
	return axiosInstance.post(`books`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const editBook = (data) => {
	return axiosInstance.put(`books`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};
