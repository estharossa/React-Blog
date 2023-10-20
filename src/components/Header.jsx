import {Link} from "react-router-dom";
import {Button} from "@nextui-org/react";

export default function Header() {
    return (
        <div className="flex items-center justify-between space-x-4 py-4">
            <div className="flex items-center space-x-4">
                <Button as={Link} to="/" color="primary" variant="flat">Home</Button>
                <Button as={Link} to="/new" color="primary">Create Post</Button>
            </div>
            <Button as={Link} to="/profile" color="primary" variant="flat">Profile</Button>
        </div>
    )
};