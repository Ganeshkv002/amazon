import { useState,useEffect,createContext } from "react"
import axios from "axios"
import Header from "./Header"
import { useNavigate } from "react-router-dom"

export const UserContext = createContext();


function Cart(){

    const[cartDetails,setCartDetails] = useState([])
    const[quantity,setquantity] = useState(1)
    const [bankId,setBankId] = useState()
    const[addPrice,setAddPrice] = useState(0)
    const[amount,setAmount] = useState()
    const[orders,setOrders] = useState({productName:'',productId:'',status:'Delivery',productPrice:'',totalAmount:''})
    const navigate = useNavigate()
   
    const  id = localStorage.getItem("userId")

    

    useEffect(()=>{
        getCart()
        getBankDetailId()
    },[])

   const itemDelete=(cartId)=>{
    console.log("id is ",cartId)
        console.log("item delete")
        axios.delete(`http://localhost:8080/cart/remove/${cartId}`)
        .then(response=>{
          console.log(response.data)
            getCart();
        })
        .catch(error=>{
            setCartDetails(error)
        },[])
   }

   const getCart=()=>{
    axios.get(`http://localhost:8080/cart`, {params:{id}})
    .then(response=>{
        setCartDetails(response.data)
        const items = response.data[response.data.length-1]
        console.log(response.data)

        let totalPrice =0;
        for(let i=0; i<=response.data.length-1; i++){
            totalPrice = totalPrice +response.data[i].price * response.data[i].quantity* quantity
        }

        setquantity(items.quantity)
        setAddPrice(totalPrice)
    })
    .catch(error=>{
        setCartDetails(error)
    })
    
   }

   const getBankDetailId=()=>{
        axios.get(`http://localhost:8080/bankdetails/${id}`)
        .then(response =>{
           const bankDetails = response.data
            setBankId(bankDetails)
            console.log("bank",bankDetails)
        })
        .catch(error=>{
            console.log(error)
        })
   }

    const ordersItems=()=>{
      cartDetails.forEach(cart=>{
        const newOrder={
        ...orders,
        productName:cart.name,
        productId:cart.productId,
        productPrice:cart.price,
        totalAmount:addPrice,
        userId:id
      };
      axios.post(`http://localhost:8080/orders`,newOrder)
            .then(response=>{
              setOrders(response.data)
              console.log("orders",response.data)
            })
            .catch(error=>{
              setOrders(error)
            })
      }); 
    }

   const paymentButton=()=>{
        if(!bankId){
            navigate(`/products/${id}/cart/bankdetails`)
        }else{
              deductAmount()
              ordersItems()
            
            //remove the cart items
            axios.delete(`http://localhost:8080/cart/delete/${id}`)
            .then(response=>{
              setCartDetails(cartDetails)
            })
            .catch(error=>{
              setCartDetails(error)
            })
        }  
   }
    
   const deductAmount=()=>{
      axios.put(`http://localhost:8080/cart/deduct/${id}`)
      .then(response=>{
        setAmount(response.data)
        
        if(addPrice <= bankId.amount){
             navigate(`/products/${id}/cart/bankdetails/orderCompleted`)
        }else{
          console.log(bankId.amount)
          alert(`Insufficient balance in your account`)
        }
      })

      .catch(error=>{
        setAmount(error)
      })
   }

  //  const orderButton=()=>{
  //   navigate(`/products/${id}/cart/orders`)
  //  }

  

    return (
  <>
      <UserContext.Provider value={cartDetails.length}>
        <Header cartDetails={cartDetails.length} />
      </UserContext.Provider>

    <h1 className="shoppingtext">Shopping Cart</h1>

    {cartDetails.length > 0 ? (
      <>
        {cartDetails.map(cart => (
          <div key={cart.id}>
            <img
              className="cartImage"
              src={`http://localhost:8080/products/findimage/${cart.fileName}`}
              alt={cart.name}
            />
            <div className="cartdetails">
              <p>{cart.brand}</p>
              <p className="productName">{cart.name}</p>
              <p className="productPrice">₹{cart.price}</p>
              <p className="productDiscount">{`(${cart.discount} % OFF)`}</p>
              <label className="productQuanity">Quantity </label>
              <select
                value={quantity}
                onChange={e => setquantity(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <div>
                <button
                  className="deletebutton"
                  onClick={() => itemDelete(cart.cartId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        <p style={{ textAlign: "center", paddingTop: "30px" }}>
          Total Amount {addPrice}
        </p>
        <div>
          <button className="buycart" onClick={paymentButton}>
            Proceed to Buy
          </button>
          
        </div>
        
      </>
    ) : (
      <div>
        <div>
        <h2 style={{ textAlign: "center", paddingTop: "30px",textAlignLast:'bold',paddingTop:'100px' }}>Your Amazon Cart is empty</h2>
        </div>
      </div>
    )}
  </>
);

}
export default Cart