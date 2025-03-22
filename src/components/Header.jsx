import { useNavigate } from "react-router-dom"
import React,{useContext} from "react"
import { UserContext } from "./Cart"

function Header(){

    const navigate = useNavigate()
    const count = useContext(UserContext)
    // console.log("count is",count)
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
                     {/* <div className="middleSection">
                        <input type="text" placeholder="search"/>
                     </div> */}
                        <p className="Cartcount">{count}</p>
            <div className="rightSection">
                <img className="cart" src="/amazonIcons/cart.jpg" onClick={clickHandler} ></img>
                
            </div>
            
                </div> 
        </div>
    )
}
export default Header