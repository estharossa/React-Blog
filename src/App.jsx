import {createBrowserRouter, redirect, RouterProvider,} from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";
import {fakeAuthProvider} from "./modules/AuthProvider.js";

import Layout from "./components/Layout.jsx";
import HomePage, {loader as homePageLoader} from "./pages/HomePage.jsx";
import NewPost, {action as newPostAction} from "./pages/NewPostPage.jsx";
import LoginPage, {loginAction, loginLoader} from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        loader() {
            return {user: fakeAuthProvider.username};
        },
        Component: Layout,
        children: [
            {
                index: true,
                Component: HomePage,
                loader: protectedLoader
            },
            {
                path: "new",
                element: <NewPost/>,
                loader: protectedLoader,
                action: newPostAction,
            },
            {
                path: "login",
                action: loginAction,
                loader: loginLoader,
                Component: LoginPage,
            },
            {
                path: "profile",
                loader: protectedLoader,
                Component: ProfilePage,
            },
        ],
    },
    {
        path: "/logout",
        async action() {
            await fakeAuthProvider.signOut();
            return redirect("/");
        },
    },
]);

function protectedLoader({request}) {
    if (!fakeAuthProvider.isAuthenticated) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/login?" + params.toString());
    }
    return null;
}

export default function App() {
    return (
        <NextUIProvider>
            <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>}/>
        </NextUIProvider>
    );
}