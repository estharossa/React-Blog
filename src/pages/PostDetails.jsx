import {getPost} from "../modules/FeedProvider.js";
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


export default function PostDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPostDetails() {
            try {
                const postDetails = await getPost(postId);
                setPost(postDetails);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        }

        fetchPostDetails();
    }, [postId]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <div className="space-y-6">
                <Card key={post.id} className="m-auto">
                    <CardHeader className="flex space-x-4 justify-between items-center">
                        <p className="font-bold text-lg">{post.title}</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody className="p-3">
                        <p>{post.body}</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}