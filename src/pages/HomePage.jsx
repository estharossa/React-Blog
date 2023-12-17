import {getPosts} from "../modules/FeedProvider.js";
import {useLoaderData} from "react-router-dom";
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import {fakeAuthProvider} from "../modules/AuthProvider.js";
import {useEffect, useState} from "react";

export async function loader() {
    return getPosts();
}

export default function HomePage() {
    if (fakeAuthProvider.isAuthenticated) {
        const [posts, setPosts] = useState([]);

        useEffect(() => {
            async function fetchPosts() {
                try {
                    const fetchedPosts = await getPosts();
                    setPosts(fetchedPosts);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }

            fetchPosts();
        }, []);

        return (
            <div className="container">
                <div className="space-y-6">
                    {
                        posts.map(post => (
                            <Card key={post.id} className="m-auto">
                                <CardHeader className="flex space-x-4 justify-between items-center">
                                    <p className="font-bold text-lg">{post.title}</p>
                                </CardHeader>
                                <Divider/>
                                <CardBody className="p-3">
                                    <p>{post.body}</p>
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
            </div>
        );
    } else {
        return <>No visible posts</>
    }
}