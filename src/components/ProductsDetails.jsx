import { useState,useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Header from "./Header"



function ProductsDetails(){

    const[productDetails,setProductDetails]=useState({})
    const[cart,setCart] = useState({productId:'',status:'in-cart',quantity:'',productPrice:''})
    const[quantity,setquantity] = useState(1)
    const params = useParams()
    const id = params.id;

    useEffect(()=>{
        axios.get(`http://localhost:8080/products`,{params:{id}})
        .then(response=>{
            setProductDetails(response.data)
            console.log(response)
        })
        .catch(error=>{
            setProductDetails(error)
        })
    },[id])


    const cartHandler=()=>{
        const userId = localStorage.getItem("userId")  
        const updateCart ={
            ...cart,
            productId:productDetails.id,
            userId:userId,
            quantity:quantity,
            productPrice:productDetails.price
            
        }

        setCart(updateCart);

        axios.post('http://localhost:8080/cart',updateCart)
        .then(response=>{
            setCart(response.data)
            console.log(" cart data",response.data)
        }) 
        
        .catch(error=>{
            setCart(error)
        })
    }

    return(
        <>
        <Header />
        <div className="body">
           
            <div className="details">
               
                <img className="detailImage" src={`http://localhost:8080/products/findimage/${productDetails.fileName}`}/>
                <div className="detailsBrand">
                    <p >{productDetails.brand}</p>
                    <p className="productName">Model {productDetails.name}</p>
                    <p className="productPrice">₹{productDetails.price}</p>
                    <p className="productDiscount">{`(${productDetails.discount} % OFF)`}</p>
                    <p className="ratingSize">{productDetails.rating} <img className="ratingImage" src="/amazonIcons/download.jpg"></img></p>
                    <label className="productQuanity">Quantity </label>
                    <select value={quantity} onChange={e=>setquantity(e.target.value)}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                    <div>
                      <button onClick={cartHandler} className="cartButton">Add to Cart</button>
                    </div>
                </div>  
            </div>
        </div>
        </>
    )
}
export default ProductsDetails