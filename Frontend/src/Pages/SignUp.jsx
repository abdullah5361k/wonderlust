import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { createAccount, loginAccount } from "../Redux/Slices/AuthSlice";
import { useDispatch } from 'react-redux';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [signUp, setSignUp] = useState({
        username: "",
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignUp({
            ...signUp,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!signUp.username || !signUp.email || !signUp.password) {
            toast.error("All fields are mandatory");
            return;
        }
        if (signUp.password.length < 7) {
            toast.error("Password must be atleast 6 char long");
            return;
        }

        // Dispatch create account
        const res = await dispatch(createAccount({ username: signUp.username, email: signUp.email, password: signUp.password }));
        if (res?.payload?.success) {
            const res = await dispatch(loginAccount({ email: signUp.email, password: signUp.password }));
            if (res?.payload?.success) {
                navigate("/");
            }
        }
    }

    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center bg-gray-100 mt-5">
                <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="username"
                                value={signUp.username}
                                onChange={handleUserInput}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={signUp.email}
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
                                value={signUp.password}
                                onChange={handleUserInput}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            name="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-400 focus:ring-opacity-50 w-full"
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
            {/* <div className="relative"> */}
            {/* <div className="fixed bootom-0 left-0 right-0"> */}
            <Footer />

            {/* </div> */}
            {/* </div> */}
        </div>
    )
}

export default SignUp;