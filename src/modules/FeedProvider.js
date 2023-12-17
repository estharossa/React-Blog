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

export async function createPost({title, content}) {
    let id = Math.random().toString(36).substring(2, 9);
    let post = {id, title, content};
    let posts = await getPosts();
    posts.unshift(post);
    await set(posts);
    return post;
}

export async function getPost(id) {
    let posts = await localforage.getItem("posts");
    let post = posts.find((post) => post.id === id);
    return post ?? null;
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