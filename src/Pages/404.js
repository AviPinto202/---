import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import err_img from "../images/404.jpg";

const NotFoundPage = () => {
    return (
        <div>
            <div className="err_items">
                <img id="err_img" src={err_img} alt="404"></img>
                <h1 id="err_title">Error<br />Page Not Found</h1>
                <Link to={'/'}><Button variant="contained">Go Back Home Page</Button></Link>
            </div>
        </div>
    );
}

export default NotFoundPage;