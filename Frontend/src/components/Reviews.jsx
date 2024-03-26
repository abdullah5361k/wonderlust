import { IoIosPerson } from "react-icons/io";
import { useSelector } from "react-redux";
import { Rating } from "@smastrom/react-rating";

function Reviews({ comment, rating, onDelete, creater_id, creater_name, timeStamp }) {

    const { username, _id } = useSelector(state => state.auth.data);

    const date = new Date(timeStamp);

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const readable = `${month}  ${year}`;

    return (
        <div className="w-[48%]">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-slate-400 mt-12 w-[70%] mx-20">
                <div className="flex items-center px-4 py-1 border-b border-gray-200">
                    <IoIosPerson />
                    <span className="font-medium text-gray-800">{creater_name.charAt(0).toUpperCase() + creater_name.slice(1)} </span>
                </div>
                <div className="flex">
                    <div className="px-4 py-1">
                        <p className="text-gray-700 font-semibold flex items-center gap-2">
                            <Rating style={{ maxWidth: 70 }} readOnly value={rating} />
                        </p>
                    </div>
                    <p className="mx-3">{readable}</p>
                </div>
                <div className="px-4 py-1">
                    <p className="text-gray-700"> {comment} </p>
                </div>
                <div className="px-4 my-2">
                    {(
                        username == creater_name && _id == creater_id
                        &&
                        <button
                            className="bg-red-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700"
                            onClick={() => onDelete()}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Reviews;