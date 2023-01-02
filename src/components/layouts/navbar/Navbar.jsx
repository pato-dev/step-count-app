import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <nav className="navbar_container">
            <div className="navbar_list_container">
                <div className="logo">
                    <Link to="/">Diabetes Control</Link>
                </div>
                <div className="navbar_list">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/add-patient">Add</Link>
                        </li>
                        <li>
                            <button className="logout_btn" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar