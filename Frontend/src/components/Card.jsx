import { useNavigate } from 'react-router-dom';

function Card({ data }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/list/detail/${data._id}`)}
            className="cursor-pointer w-[22rem] h-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-200">
            <img className="w-full h-48 object-cover" src={data.image.url} alt="This is an image" />
            <div className="p-4">
                <h5 className="text-xl font-bold tracking-tight text-gray-900">{data.title}</h5>
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
                    <p className="ml-2 text-sm font-medium text-gray-900">{data.price} / night</p>
                </div>
            </div>
        </div>
    )
}

export default Card;