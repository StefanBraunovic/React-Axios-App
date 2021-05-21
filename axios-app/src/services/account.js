import axios from 'axios';
import axiosInstance from '../services/axios'

export const login = (data) =>{
    return axios({
        method:'POST',
        baseURL:'http://localhost:8080/api/',
        url:'/authenticate',
        data:data
    })
}


export const registerAccount = (data) => {
	return axiosInstance.post(`register`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};


export const getUser = (data) => {
	return axiosInstance.post(`users/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};


