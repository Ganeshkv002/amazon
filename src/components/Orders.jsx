import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

function Orders(){

    const[orderItem,setOrderItem] = useState([])
    const userId = localStorage.getItem("userId")
   const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8080/orders/${userId}`)
        .then(response=>{
            const orders = response.data.map(item=>({
                productName : item[0],
                orderDate : item[1],
                fileName : item[2],
                productId : item[3]  
            }));
             setOrderItem(orders)
            console.log(response.data)
        })
        .catch(error=>{
            setOrderItem(error)
        })
    },[])

    const imageHandler = (productId)=>{
        navigate(`/products/${productId}`)
    }
    

    return(
        <div>
            <Header/>
            <div style={{textAlign:'center'}}>
                <h1 style={{paddingTop:'100px'}}>Your Orders</h1>
            </div>
            <div>
                {orderItem.length > 0 ?(
                    <>
                        <h2 style={{paddingLeft:'50px'}}>Purchase history</h2>
                        {orderItem.map((item, index) => (
                            <div className="orderItem" key={index}>
                                <img
                                className="orderImg"
                                src={`http://localhost:8080/products/findimage/${item.fileName}`}
                                onClick={()=>imageHandler(item.productId)} alt={item.productName}
                                />
                                <div className="orderData">
                                <p>{item.productName}</p>
                                <p>
                                    <span style={{  color: "#888888" }}>Ordered on </span>{item.orderDate}
                                </p>

                                </div>
                            </div>
                            ))}
                    </>
                ):(
                    <>
                    <h1 style={{textAlign:'center',fontWeight:'bold'}}>No items in your Order</h1>
                    </>
                )}
            </div>
        </div>
    )
}
export default Orders