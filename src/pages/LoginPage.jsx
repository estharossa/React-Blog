import {Form, redirect, useActionData, useLocation, useNavigation} from "react-router-dom";
import {fakeAuthProvider} from "../modules/AuthProvider.js";
import {Button, Card, CardBody, Input} from "@nextui-org/react";

export default function LoginPage() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("username") != null;

    let actionData = useActionData()

    return (
        <div className="mt-48">
            <h1 className="font-bold text-2xl text-center mb-8">Login</h1>
            <div className="flex items-center justify-center">
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 w-full max-w-[610px]"
                    shadow="sm"
                >
                    <CardBody>
                        {actionData && actionData.error ? (
                            <div className="text-red-500 text-center">{actionData.error}</div>
                        ) : null}
                        <Form method="post" replace className="space-y-3">
                            <input type="hidden" name="redirectTo" value={from}/>
                            <Input type="username" name="username" label="Username"/>
                            <Input type="password" name="password" label="Password"/>
                            <Button type="submit" size="lg" color="primary"
                                    className="w-full" isLoading={isLoggingIn}
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
                                Login
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export async function loginLoader() {
    if (fakeAuthProvider.isAuthenticated) {
        return redirect("/");
    }
    return null;
}

export async function loginAction({request}) {
    let formData = await request.formData();
    let username = formData.get("username")
    let password = formData.get("password")

    if (!username) {
        return {
            error: "You must provide a username to log in",
        };
    }

    if (!password) {
        return {
            error: "You must provide a password to log in",
        };
    }

    try {
        let result = await fakeAuthProvider.signIn(username, password);

        if (result.success) {
            let redirectTo = formData.get("redirectTo")
            return redirect(redirectTo || "/");
        } else {
            alert(result.error.message ? result.error.message : "Failed")
        }
    } catch (error) {
        alert(error.message ? error.message : "Failed")
    }

    return null
}