import {useState} from 'react';
import {Form, redirect, useActionData, useLocation, useNavigation,} from 'react-router-dom';
import {fakeAuthProvider} from '../modules/AuthProvider.js';
import {Button, Card, CardBody, Input} from '@nextui-org/react';

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationError, setRegistrationError] = useState(null);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get('from') || '/';

    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get('username') != null;

    let actionData = useActionData();

    const handleToggleMode = () => {
        setIsRegistering((prevMode) => !prevMode);
        setRegistrationError(null); // Reset registration error on mode toggle
    };

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
                            <div className="text-red-500 text-center">
                                {actionData.error}
                            </div>
                        ) : null}
                        <Form
                            method="post"
                            replace
                            className="space-y-3"
                        >
                            {isRegistering && (
                                <Input type="email" name="email" label="Email"/>
                            )}
                            <input type="hidden" name="isRegistering" value={isRegistering}/>
                            <Input type="username" name="username" label="Username"/>
                            <Input type="password" name="password" label="Password"/>
                            {isRegistering ? (
                                <Button
                                    type="submit"
                                    size="lg"
                                    color="primary"
                                    className="w-full"
                                    isLoading={isLoggingIn}
                                >
                                    Register
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    size="lg"
                                    color="primary"
                                    className="w-full"
                                    isLoading={isLoggingIn}
                                >
                                    Login
                                </Button>
                            )}
                        </Form>
                        {!isRegistering ? (
                            <div className="text-center mt-4">
                <span>
                  Not have an account?{' '}
                    <span
                        onClick={handleToggleMode}
                        className="text-primary hover:underline cursor-pointer"
                    >
                    Register
                  </span>
                </span>
                            </div>
                        ) : (
                            <div className="text-center mt-4">
                <span>
                  Already have an account?{' '}
                    <span
                        onClick={handleToggleMode}
                        className="text-primary hover:underline cursor-pointer"
                    >
                    Login
                  </span>
                </span>
                            </div>
                        )}
                        {registrationError && (
                            <div className="text-red-500 text-center mt-4">
                                {registrationError}
                            </div>
                        )}
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
    let username = formData.get('username');
    let password = formData.get('password');

    if (!username) {
        return {
            error: 'You must provide a username to log in or register',
        };
    }

    if (!password) {
        return {
            error: 'You must provide a password to log in or register',
        };
    }

    try {
        let redirectTo = formData.get('redirectTo');
        let result;

        if (formData.get('isRegistering') === 'true') {
            let email = formData.get('email');
            result = await fakeAuthProvider.register(username, password, email);

            if (result.success) {
                result = await fakeAuthProvider.signIn(username, password);
            }
        } else {
            result = await fakeAuthProvider.signIn(username, password);
        }

        if (result.success) {
            return redirect(redirectTo || '/');
        } else {
            alert(result.error.message ? result.error.message : 'Failed');
        }
    } catch (error) {
        alert(error.message ? error.message : 'Failed');
    }

    return null;
}