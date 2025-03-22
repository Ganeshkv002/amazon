import { useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import './myStyles.css'
import Header from "./Header";
import React,{useContext} from "react"

function Products(){

    const[products,setProduct] = useState([]);
    const naviagte = useNavigate()
    const userId =localStorage.getItem("userId")
    console.log("the userId is",userId);

    useEffect(()=>{
        axios.get('http://localhost:8080/products/')
        .then(response =>{
            setProduct(response.data)
            console.log(response)
           
        })
        .catch(error=>{
            setProduct([])
        })
    },[])


    const handleClick = (id)=>{
        naviagte(`${id}`)
    } 
    
    return(
        <div>
            <Header/>

            <div className="body">
           <div className="primary">
            {
                products.map(product => <div  key={product.id}>
                < img className="images" src={`http://localhost:8080/products/findimage/${product.fileName}`}
                onClick={()=>handleClick(product.id)}/>
                <div className="brand"> <p>{product.brand}</p></div>
                    <div className="productInformation">
                <div className="title"> <p>{product.name}</p></div>
                <div> <p>{`Rs . ${product.price}`}</p></div>
                <div> <p>{`(${product.discount} % OFF)`}</p></div>
                <div> <p>{product.rating}<img className="rating"src="amazonIcons/download.jpg"></img></p></div>
                    </div>
             </div>)
           }
            </div>
        </div>
        </div>
    )
}
export default Products