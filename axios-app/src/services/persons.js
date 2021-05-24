import axiosInstance from './axios';
// import axios from 'axios';

export const getAllPeople = () => {
	return axiosInstance
	.get('people/count', {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	})
	.then((r) => {
		return axiosInstance.get(`people?size=${r.data}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
			},
		});
	});
};

export const deletePerson = (personId) => {
	return axiosInstance.delete(`people/${personId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const getPerson = (personId) => {
	return axiosInstance.get(`people/${personId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const addPeople = (data) => {
	return axiosInstance.post(`people`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};

export const editPerson = (data) => {
	return axiosInstance.put(`people`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};
