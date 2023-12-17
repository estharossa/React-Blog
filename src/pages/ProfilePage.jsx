import {useFetcher, useRouteLoaderData} from "react-router-dom";
import {Button} from "@nextui-org/react";
import {fakeAuthProvider} from "../modules/AuthProvider.js";
import {useEffect, useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function ProfilePage() {
    // Get our logged-in user, if they exist, from the root route loader data
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUserDetails() {
            try {
                const userDetails = await fakeAuthProvider.getUser();
                setUser(userDetails);
            } catch (error) {
                console.log("error fetching user details")
            }
        }

        getUserDetails();
    }, []);

    let fetcher = useFetcher();

    if (!user) {
        return <p>You are not logged in.</p>;
    }

    let isLoggingOut = fetcher.formData != null;

    return (
        <div className="container">
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">Welcome, {user.username}</p>
                        <p className="text-small text-default-500">You have {user.posts.length} posts</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <p>Experienced publisher</p>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <fetcher.Form method="post" action="/logout">
                        <Button type="submit" color="danger" isLoading={isLoggingOut}
                                spinner={
                                    <svg
                                        className="animate-spin h-5 w-5 text-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                }
                        >
                            Sign out
                        </Button>
                    </fetcher.Form>
                </CardFooter>
            </Card>

            <br/>
        </div>
    );
}