import { IoMdTrendingUp } from "react-icons/io";
import { PiMountainsFill } from "react-icons/pi";
import { MdPool } from "react-icons/md";
import { PiCastleTurret } from "react-icons/pi";
import { GiFarmer } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { GiAntarctica } from "react-icons/gi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feature({ onToggleChange }) {

    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const toggle = () => {
        setIsActive(!isActive);
        onToggleChange(!isActive);
        console.log(!isActive);
    };
    return (
        <div className="flex items-center justify-around mt-3">
            <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "trending" } })}>
                    <IoMdTrendingUp />
                    <p>Trending</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "Mountain" } })}>
                    <PiMountainsFill />
                    <p>Mountains</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "Amazing Pool" } })}>
                    <MdPool />
                    <p>Amazing Pool</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "Castle" } })}>
                    <PiCastleTurret />
                    <p>Castle</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "Farm" } })}>
                    <GiFarmer />
                    <p>Farm</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "Iconic City" } })}>
                    <FaTreeCity />
                    <p>Iconic Cities</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "Camping" } })}>
                    <GiCampingTent />
                    <p>Camping</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100" onClick={() => navigate("/features", { state: { feature: "Arctic" } })}>
                    <GiAntarctica />
                    <p>Arctic</p>
                </div>
            </div>


            <div className="flex gap-1">
                <p>Display total before taxes</p>
                <button
                    className={`flex items-center justify-center w-12 h-6
                 bg-gray-300 rounded-full focus:outline-none ${isActive ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                    onClick={toggle}
                >
                    <div
                        className={`w-5 h-5 bg-white rounded-full 
                    transform transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'
                            }`}
                    />
                </button>
            </div>

        </div>
    )
}

export default Feature;