import { FaAirbnb } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteInfo } from "../Redux/Slices/AuthSlice";
import Cookies from 'js-cookie';

function NavBar() {

    const state = useSelector(state => state.auth);
    const dispatch = useDispatch();

    function logout() {
        dispatch(deleteInfo());
        localStorage.clear();
        Cookies.remove("token");
    }

    return (
        <div className="border">
            <div className="mt-4 mx-10 flex flex-row justify-between items-center" >
                {/* <div className="flex flex-row gap-4 wrap mt-4 mx-10"> */}
                <div className="flex items-center justify-center gap-10">
                    <div className="logo text-red flex">
                        <Link to={"/"}>
                            <FaAirbnb className="text-4xl" />
                            <h3 className="font-bold mt-1">airbnb</h3>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-4 font-semibold">
                        <Link to={"/"}><h1>Home</h1></Link>
                        {state.isLoggedIn && <Link to={"/addlist"}><h2 className="cursor-pointer">Add new List</h2></Link>}
                    </div>
                </div>
                <div className="flex flex-row gap-4 font-bold ml-20">
                    {state.isLoggedIn ? <h2 className="cursor-pointer text-red-700" onClick={logout}>Logout</h2> : <Link to={"/login"}><h2>Login</h2></Link>}
                </div>
            </div>
        </div>
    )
}

export default NavBar;