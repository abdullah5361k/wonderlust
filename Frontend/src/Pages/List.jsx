import NavBar from "../components/Navbar";
import { FaRupeeSign } from "react-icons/fa6";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { createReview, deleteReview } from "../Redux/Slices/Review";
import Reviews from "../components/Reviews";
import { useParams } from 'react-router-dom';
import { getListById, deleteList } from "../Redux/Slices/List";
import { useNavigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

function List() {

    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.list);
    const state = useSelector(state => state.auth);
    const { isLoggedIn, data } = state;
    const navigate = useNavigate();


    function handleUserInput(e) {
        const { name, value } = e.target;
        if (name == "comment") {
            console.log(value);
            setComment(value);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!rating || !comment) {
            toast.error("Please add your review");
            return;
        }
        const data = { rating: rating, review: comment, id: id };
        const res = await dispatch(createReview(data));
        if (res?.payload?.success) {
            setRating(0);
            setComment("");
            getList();
        }
    }

    async function getList() {
        await dispatch(getListById(id));
    }

    async function handleDeleteReview(id) {
        await dispatch(deleteReview(id));
        getList();
    }


    async function listDelete(e) {
        const res = await dispatch(deleteList(id));
        if (res?.payload?.success) {
            navigate("/");
        }
    }

    useEffect(() => {
        getList().catch(err => toast.error("Please revisit this page!"));
    }, [dispatch])

    return <>
        <NavBar />
        <div>
            <h1 className="text-center text-4xl font-bold text-gray-800 mt-10">{list?.title}</h1>
            <div className="flex flex-row gap-3 justify-center h-auto flex-wrap mt-10">
                <div className="bg-white rounded-lg shadow-md h-full overflow-hidden max-w-lg">
                    <img className="w-[100%] h-48 object-cover" src={list?.image?.url} alt="This is an image" />
                    <div className="p-2">
                        <p className="mt-1 font-semibold  text-gray-700">{list?.description}</p>
                        <div className="flex items-center mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707l4.146-4.147A1 1 0 0114 12.707l-1.414 1.414L10.586 14.147a1 1 0 00-1.414-1.414zM5.707 7.707A1 1 0 007 8.707l4.146-4.147a1 1 0 10-1.414-1.414L4.293 7.293a1 1 0 000 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="ml-2 text-sm font-medium text-gray-900 flex items-center">
                                <FaRupeeSign /> <span>{list?.price}</span>
                            </p>
                        </div>
                        <h4 className="mt-2 font-medium"> {list?.country} </h4>
                        <h4 className="mt-2 font-medium">{list?.location}</h4>
                    </div>
                    {
                        (
                            data._id === list?.admin?.id &&
                            data.username == list?.admin?.username &&
                            <div className="flex gap-10">
                                <button
                                    onClick={() => navigate(`/list/edit/${id}`, { state: list })}
                                    type="button"
                                    className="px-6 py-3 rounded-md font-medium text-white bg-green-500 hover:bg-yellow-800"
                                >
                                    Edit
                                </button>
                                <button type="button"
                                    className="px-6 py-3 rounded-md font-medium text-white bg-red-500 hover:bg-red-800"
                                    onClick={listDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    }
                    <div className="mt-7">
                        <h1 className="font-semibold text-lg">Leave a Review</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="rating"> Rating </label>
                                <Rating style={{ maxWidth: 150 }} value={rating} onChange={setRating} />
                            </div>
                            <div>
                                <label htmlFor="comment">Comment</label>
                                <textarea
                                    className="w-full h-32 px-3 py-2 text-base border rounded-md focus:outline-none border-yellow-500 focus:border-blue-500"
                                    name="comment"
                                    id="comment"
                                    placeholder="Enter your reviews"
                                    rows={4}
                                    cols={40}
                                    value={comment}
                                    onChange={handleUserInput}
                                />
                            </div>
                            {(
                                isLoggedIn == true ?
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                        py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Submit
                                    </button> :
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                        py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => navigate("/login")}
                                    >
                                        Submit
                                    </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <h1 className="text-lg font-semibold text-center mt-5 text-black-700">All Reviews</h1>
            <div className="flex flex-row flex-wrap ">
                {
                    (
                        list?.reviews?.length > 0 &&
                        list?.reviews.map(e =>
                            <Reviews
                                key={e?._id}
                                onDelete={() => handleDeleteReview(e._id)}
                                comment={e?.review}
                                rating={e.rating}
                                timeStamp={e.createdAt}
                                creater_id={e?.createdBy?.id}
                                creater_name={e?.createdBy?.username}
                            />
                        ))}
            </div>
        </div>
        <Footer />
    </>
}


export default List;