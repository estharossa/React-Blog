import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <div className="container mb-4">
                <Header/>
            </div>
            <Outlet/>
        </>
    );
}