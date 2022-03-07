import axios from 'axios';

const url = '/register';

export const createPost = (newPost) => axios.post(url, newPost);