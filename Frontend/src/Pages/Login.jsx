import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginAccount } from "../Redux/Slices/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLogin({
            ...login,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!login.password || !login.email) {
            toast.error("All Fields are mandatory!");
            return;
        }
        const res = await dispatch(loginAccount({ email: login.email, password: login.password }));
        if (res?.payload?.success) {
            navigate("/");
        }
    }

    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center bg-gray-100 mt-5">
                <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={login.email}
                                onChange={handleUserInput}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={login.password}
                                onChange={handleUserInput}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-3">
                            <p className="text-black font-semibold">Don't have an account</p><Link to={"/signup"} className="text-blue-600">Create Account</Link>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <div className="relative">
                <div className="fixed bottom-0 left-0 right-0">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Login;