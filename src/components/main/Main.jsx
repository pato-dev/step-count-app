import "./main.css";
import Navbar from "../layouts/navbar/Navbar"
import Footer from "../layouts/footer/Footer";

const Main = () => {
    return (
        <>
            <Navbar />
            <div className="counter_container">
                <div className="counter_content">
                    <h2>Goal</h2>
                    <div className="goal_counter">
                        <h5>15,000</h5>
                        <span>steps</span>
                    </div>
                    <div className="count_display">
                        <p className="current_date">Oct 30, 2022</p>
                        <h4 className="current_steps">15,000</h4>
                        <span className="steps">steps</span>
                        <span className="percentage_completion">100% completed</span>
                    </div>
                    <div className="step_count_btn--save">
                        <button>Save Step</button>
                    </div>
                    <div className="footer">
                        <p>Diabetes Control Project</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Main