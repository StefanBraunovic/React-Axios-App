import axiosInstance from './axios';
// import axios from 'axios';

export const getAllMovies = () => {
	return axiosInstance
	.get('movies/count', {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	})
	.then((r) => {
		return axiosInstance.get(`movies?size=${r.data}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
			},
		});
	});
};

export const deleteMovie = (movieId) => {
	return axiosInstance.delete(`movies/${movieId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const getMovie = (movieId) => {
	return axiosInstance.get(`movies/${movieId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const addMovie = (data) => {
	return axiosInstance.post(`movies`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const editMovie = (data) => {
	return axiosInstance.put(`movies`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};
