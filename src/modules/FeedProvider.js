import localforage from "localforage";
import axios from "axios";
import {fakeAuthProvider} from "./AuthProvider.js";

export async function getPosts() {
    const apiUrl = 'http://127.0.0.1:8000/api/users/posts/';

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${fakeAuthProvider.accessToken}`
            }
        });

        const posts = response.data;

        await localforage.setItem("posts", posts);

        return posts;
    } catch (error) {
        console.log(error)

        let posts = await localforage.getItem("posts");
        if (!posts) posts = [];
        return posts;
    }
}

export async function createPost({title, body}) {
    const apiUrl = 'http://127.0.0.1:8000/api/users/posts/';
    const accessToken = fakeAuthProvider.accessToken;

    try {
        const newPost = {title, body};

        const response = await axios.post(apiUrl, newPost, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export async function getPost(id) {
    const accessToken = fakeAuthProvider.accessToken;

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/posts/${id}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function deletePost(id) {
    let posts = await localforage.getItem("posts");
    let index = posts.findIndex((post) => post.id === id);
    if (index > -1) {
        posts.splice(index, 1);
        await set(posts);
        return true;
    }
    return false;
}

function set(posts) {
    return localforage.setItem("posts", posts);
}