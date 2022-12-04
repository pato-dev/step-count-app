import "./navbar.css";
const Navbar = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <nav className="navbar_container">
            <div className="navbar_list_container">
                <div className="logo">Diabetes Control</div>
                <div className="navbar_list">
                    <ul>
                        <li>Profile</li>
                        <li>
                            <button className="btn logout_btn" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Navbar