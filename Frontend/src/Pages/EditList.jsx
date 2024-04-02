import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from "react-router-dom"; 4
import { useDispatch } from "react-redux";
import { createList, editList } from "../Redux/Slices/List";

function EditList() {

    const location = useLocation();
    const { state } = location;
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [listData, setListData] = useState({
        title: state?.title || "",
        description: state?.description || "",
        image: state?.image?.url || "",
        price: state?.price || 0,
        country: state?.country || "",
        location: state?.location || "",
        category: state?.category || "",
    });
    const categories = ["Room", "Iconic City", "Mountain", "Castle", "Amazing Pool", "Camping", "Farm", "Arctic"];

    function handleUserInput(e) {
        const { name, value } = e.target;
        setListData({
            ...listData,
            [name]: value
        })
    };

    function handleImageUpload(e) {
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            setListData({
                ...listData,
                image: uploadImage
            })
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const addBtn = document.getElementById("add");
        const editBtn = document.getElementById("edit");
        if (!listData.country || !listData.title || !listData.description || !listData.image || !listData.price || !listData.location || !listData.category) {
            toast.error("All Fields are mandatory!");
            return;
        }
        if (editBtn != null) {
            console.log("Edit");
            const res = await dispatch(editList({ ...listData, id: id }));
            if (res?.payload?.success) {
                navigate(`/list/detail/${id}`);
            }
        }
        if (addBtn != null) {
            const url = listData.image;
            const res = await dispatch(createList({ ...listData }));
            if (res?.payload?.success) {
                navigate("/");
            }
        }
    }

    return (
        <div>
            <NavBar />
            <div>
                <div className="flex items-center justify-center bg-gray-100">
                    <div className="bg-white rounded-lg shadow-md px-8  w-[50%] mt-2">
                        {
                            (
                                location.pathname == '/addlist' ?
                                    <h2 className="text-2xl font-bold text-center mb-4">Create a new List</h2>
                                    : <h2 className="text-2xl font-bold text-center mb-4">Edit Your Listing</h2>
                            )
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={listData.title}
                                    onChange={handleUserInput}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={listData.description}
                                    onChange={handleUserInput}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="image" className="cursor-pointer block text-gray-700 text-sm font-bold mb-2">
                                    Choose an image
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    name="image"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleImageUpload}
                                    className=" cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={listData.price}
                                    onChange={handleUserInput}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="flex w-full gap-7">
                                <div className="mb-6">
                                    <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                                        Country
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        name="country"
                                        value={listData.country}
                                        onChange={handleUserInput}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                                        Location
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={listData.location}
                                        onChange={handleUserInput}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                                    Category:
                                    <select name="category" value={listData.category} onChange={handleUserInput}>
                                        {
                                            categories.map((e, idx) => (
                                                <option key={idx} value={e}>{e}</option>
                                            ))
                                        }
                                    </select>
                                </label>
                            </div>
                            {
                                (
                                    location.pathname == '/addlist' ?
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                            py-2 px-4 rounded focus:outline-none focus:ring-2 cursor-pointer
                                             focus:ring-blue-400 focus:ring-opacity-50 w-full"
                                            id="add"
                                        >
                                            Add
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                            py-2 px-4 rounded focus:outline-none focus:ring-2 cursor-pointer 
                                            focus:ring-blue-400 focus:ring-opacity-50 w-full"
                                            id="edit"
                                        >
                                            Edit
                                        </button>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}

export default EditList;