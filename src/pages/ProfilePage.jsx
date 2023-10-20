import {useFetcher, useRouteLoaderData} from "react-router-dom";
import {Button} from "@nextui-org/react";

export default function ProfilePage() {
    // Get our logged-in user, if they exist, from the root route loader data
    let {user} = useRouteLoaderData("root")
    let fetcher = useFetcher();

    if (!user) {
        return <p>You are not logged in.</p>;
    }

    let isLoggingOut = fetcher.formData != null;

    return (
        <div className="container">
            <p>Welcome {user}!</p>
            <br/>
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
        </div>
    );
}