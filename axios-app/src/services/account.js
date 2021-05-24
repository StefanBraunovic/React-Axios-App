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
    return axiosInstance.post('/register', {
      login: data.login,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      authorities: ['ROLE_USER'],
    });
  };

export const getAccount = () => {
	return axiosInstance.get(`account`,  {
		headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
	});
};


