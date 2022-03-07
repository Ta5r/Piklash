import axios from 'axios';

const url = 'localhost:5000/register';

export const createPost = (newPost) => axios.post(url, newPost);