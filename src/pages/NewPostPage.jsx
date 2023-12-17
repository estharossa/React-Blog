import {createPost} from "../modules/FeedProvider.js";
import {Form, redirect} from "react-router-dom";
import {Button, Input, Textarea} from "@nextui-org/react";

export default function NewPost() {
    return (
        <div className="container">
            <Form method="post" className="space-y-3 flex flex-col">
                <Input type="text" name="title" label="Title"/>
                <Textarea name="content" rows="10" cols="30" label="Content"/>
                <Button type="submit" color="primary" className="self-end">Save</Button>
            </Form>
        </div>
    );
}

export async function action({request}) {
    const formData = await request.formData();
    await createPost({
        title: formData.get("title"),
        body: formData.get("content"),
    });
    return redirect(`/`);
}