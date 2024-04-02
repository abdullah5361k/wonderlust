import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function FeaturesList() {

    const { state } = useLocation();
    const category = state.feature;
    const { lists } = useSelector(state => state.list);
    const st = [{ category: "Mountain" }, { category: "Champing" }, { category: "Arctic" }];
    return (
        <>
            <NavBar />
            <div className="flex flex-wrap mt-20 justify-center">
                {
                    lists.length > 0 && lists.filter(el => el.category == category).map(el => {
                        return el.category === category && <Card key={el._id} data={el} />
                    })
                }
                {
                    lists.length > 0 && !lists.some(el => el.category == category) && (
                        <h1>NO LIST IS FOUND!</h1>
                    )
                }
            </div >
            <div className="fixed bottom-0 left-0 right-0">
                <Footer />
            </div>
        </>
    )
}

export default FeaturesList;