import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { getLists } from "../Redux/Slices/List";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function Home() {

    const [list, setLists] = useState([]);

    const dispatch = useDispatch();

    const fetchLists = async () => {
        const res = await dispatch(getLists());
        setLists(res?.payload?.data);
    }

    useEffect(() => {
        fetchLists();
    }, [])
    return (
        <>
            <Navbar />
            <div className="flex flex-row gap-3 justify-center flex-wrap mt-10">
                {list?.map(el => <Card key={el._id} data={el} />)}
            </div>
            <Footer />
        </>
    )
}

export default Home;