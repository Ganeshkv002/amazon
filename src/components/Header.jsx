import { useNavigate } from "react-router-dom"
import React,{useContext} from "react"
import { UserContext } from "./Cart"
import { Link } from "react-router-dom"

function Header(){

    const navigate = useNavigate()
    const count = useContext(UserContext)
    const clickHandler=() =>{
        navigate('/products/cart')
    }

    const homeButton=()=>{
        navigate('/products') 
    }

    return(
        <div>
           
            <div className="header">
                <div className="leftSection">
                    <img className="logo" src="/amazonIcons/image.png" onClick={homeButton}/>
                </div>
                    
                <div className="rightSection">
                    <Link className="orderLink" to ='/products/${id}/cart/orders' >orders</Link>
                    <p className="Cartcount">{count}</p>
                    <img className="cart" src="/amazonIcons/cart.jpg" onClick={clickHandler} ></img>
                </div>
            </div> 
        </div>
    )
}
export default Header