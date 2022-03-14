import * as api from '../api/api.js';
export const createPost = async (post)  => {
    try {
      const { data } = await api.createPost(post);
        console.log("data from actions/index : "+data);
    } catch (error) {
      console.log(error.message);
    }
  };