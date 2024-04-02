import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { getLists } from "../Redux/Slices/List";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Feature from "./Feature";

function Home() {

    const [list, setLists] = useState([]);
    const [tax, setTax] = useState(false);

    const dispatch = useDispatch();

    const fetchLists = async () => {
        const res = await dispatch(getLists());
        setLists(res?.payload?.data);
    }

    function handleToogle(boolean) {
        setTax(boolean);
    }

    useEffect(() => {
        fetchLists();
    }, [])
    return (
        <>
            <Navbar />
            <Feature onToggleChange={handleToogle} />
            <div className="flex flex-row gap-3 justify-center flex-wrap mt-10">
                {list?.map(el => <Card key={el._id} data={el} isActive={tax} />)}
            </div>
            <div className="fixed bottom-0 left-0 right-0">
                <Footer />
            </div>
        </>
    )
}

export default Home;