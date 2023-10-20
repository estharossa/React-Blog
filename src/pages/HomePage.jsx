import { getPosts } from "../modules/FeedProvider.js";
import { useLoaderData } from "react-router-dom";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export async function loader() {
    return getPosts();
}

export default function HomePage() {
    const posts = useLoaderData();

    return (
        <div className="container">
            
            <div className="space-y-6">
                {
                    posts.map(post => (
                        <Card key={post.id} className="m-auto">
                            <CardHeader className="flex space-x-4 justify-between items-center">
                                <p className="font-bold text-lg">{post.title}</p>
                            </CardHeader>
                            <Divider />
                            <CardBody className="p-3">
                                <p>{post.content}</p>
                            </CardBody>
                        </Card>
                    )
                    )
                }
            </div>

        </div>
    )
}