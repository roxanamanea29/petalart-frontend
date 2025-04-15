
import {Navigate} from "react-router-dom";



export const Home = () => {
    return <h2>Home page (Private)</h2>;
};

export const Analytics = () => <h2>Analytics (Private,permission:'analize')</h2>
export const Admin = () => <h2>Admin (Private,permission: admin')</h2>