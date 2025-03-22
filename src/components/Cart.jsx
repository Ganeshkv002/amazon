import { useState,useEffect,createContext } from "react"
import axios from "axios"
import Header from "./Header"
import { useNavigate } from "react-router-dom"
export const UserContext = createContext();
function Cart(){

    const[cartDetails,setCartDetails] = useState([])
    const[quantity,setquantity] = useState({})
    const [bankId,setBankId] = useState()
    const[addPrice,setAddPrice] = useState(0)
    const navigate = useNavigate()
   
    const  id = localStorage.getItem("userId")

    useEffect(()=>{
        getCart()
        getBankDetailId()
        totalAmountCalculation()
    },[])

   const itemDelete=(cartId)=>{
    
    console.log("id is ",cartId)
        console.log("item delete")
        axios.delete(`http://localhost:8080/cart/remove/${cartId}`)
        .then(response=>{
            console.log(response.data)
            getCart()
        })
        .catch(error=>{
            setCartDetails(error)
        },[])
   }

   const getCart=()=>{
    axios.get(`http://localhost:8080/cart`, {params:{id}})
    .then(response=>{
        console.log(response.data)
        setCartDetails(response.data)
        
    })
    .catch(error=>{
        setCartDetails(error)
    })
   }

   const getBankDetailId=()=>{
        axios.get(`http://localhost:8080/bankdetails/${id}`)
        .then(response =>{
            // console.log("id is ",id)
           const bankDetails = response.data
        //    console.log("length of",bankDetails.length)
        //     console.log("bank data",response.data)
            setBankId(bankDetails)
        })
        .catch(error=>{
            console.log(error)
        })
   }

   const paymentButton=()=>{
    console.log("length",bankId.length)
        if(bankId.length === 0){
            navigate('/products/:id/cart/bankdetails')
        }else{
            navigate('/products/:id/cart/bankdetails/order')
        }
        
   }
   const totalAmountCalculation=()=>{
    let count=0;
    cartDetails.forEach((cart)=>{
        count=count+cart.price
        console.log("price total",count=count+cart.price)
    })
    console.log("price total",count)
    setAddPrice(addPrice=count)
   }    
  

    return(<>
    <UserContext.Provider value={cartDetails.length}>
        <Header cartDetails={cartDetails.length}/>
        </UserContext.Provider>
        < >
            
            <h1 className="shoppingtext">Shopping Cart</h1>
           
            {
                cartDetails.map(cart => <div key={cart.id}>
                    <img className="cartImage" src={`http://localhost:8080/products/findimage/${cart.fileName}`}></img>
                    <div className="cartdetails">
                    <p>{cart.brand}</p>
                    <p className="productName">{cart.name}</p>
                    <p className="productPrice">₹{cart.price}</p>
                    <p className="productDiscount">{`(${cart.discount}  % OFF)`}</p>
                    <label className="productQuanity">Quantity </label>
                    <select value={quantity} onChange={e=>setquantity(e.target.value)}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                    <div>
                   <button className="deletebutton" onClick={()=>itemDelete(cart.cartId)}>Delete</button>
                   
                    </div>
                 </div> 
                </div>) 
                
            } 
            <p>Total Amount  {addPrice} </p>
           <div ><button className="buycart" onClick={paymentButton}>Proceed to Buy</button></div>
        </>
        </>
    )
}
export default Cart