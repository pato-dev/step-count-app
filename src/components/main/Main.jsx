import "./main.css";
import Navbar from "../layouts/navbar/Navbar"

const Main = () => {

    return (
        <div className="main_container">
            <Navbar />
            <div className="counter_container">
                <h2>Welcome (Username)</h2>
            </div>
        </div>
    )
}

export default Main