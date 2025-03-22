import { NavLink } from "react-router-dom"
function Navbar(){
    return(
        <nav>
            <NavLink to='/'>Back To Login Page</NavLink>
            <NavLink to='/registration'> Create a New Account</NavLink>
        </nav>
    )
}
export default Navbar