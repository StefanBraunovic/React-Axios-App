import axiosInstance from './axios';
// import axios from 'axios';

export const getAllMovies = () =>{
 return   axiosInstance.get('movies', {headers:{Authorization:`Bearer ${localStorage.getItem('jwt_token')}`}})
}


export const deleteMovie = (movieId) =>{
    return   axiosInstance.delete(`movies/${movieId}`, {headers:{Authorization:`Bearer ${localStorage.getItem('jwt_token')}`}})
}