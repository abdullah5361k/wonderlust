import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <div className="h-20 w-full border bg-slate-200 flex flex-col justify-center items-center mt-7">
            <div className="flex flex-row gap-3">
                <FaFacebook />
                <FaTwitter />
                <FaInstagram />
            </div>
            <div className="font-bold">
                <p> @ WonderLust Pvt.Ltd</p>
                <p> privacy term </p>
            </div>
        </div>
    )
}

export default Footer;