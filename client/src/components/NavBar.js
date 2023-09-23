import {NavLink} from "react-router-dom"

function NavBar({ setCurrentUser, updateSearchText }){

    function logOutUser() {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) {
            setCurrentUser(null)
            }
        })
    }

return (
    <>
    <nav id="nav-bar" className="navbar navbar-expand">
            <div className="links-group">
            <img id="app-logo" src="images/robot1.png"></img>
            
            <NavLink to="/">
            <a href="#" className="navbar-brand">Nue Kid</a>
            </NavLink>
            <NavLink exact to="/my-activities">My Activities</NavLink>
            <NavLink to="/meet">Meet</NavLink>
            <NavLink to="/host-event">Host</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className="search-group">
            <div >
                <label htmlFor="search"></label>
                <input
                    type="text"
                    id="search"
                    placeholder="Explore the neighborhood..."
                    onChange={updateSearchText}
                
                />
            </div>
            <button id="log-out" onClick={logOutUser}>Logout</button>
            </div>
        
    </nav>
        


    </>
)

}

export default NavBar;

