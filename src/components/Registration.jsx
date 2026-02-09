import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Registration.css";


function Registration(){

    const[customer,setcustomer] = useState({firstName :'',lastName:'',gender:'',age:'',mobileNumber:'',emailId:'',password:'',country:'',state:'',pinCode:'',})
    const navigate = useNavigate()
    const buttonHandler=(e)=>{
        e.preventDefault()
        const{firstName,lastName,gender,age,mobileNumber,emailId,password} = customer
        if(!firstName || !lastName || !gender || !age || !mobileNumber || !emailId || !password){
            alert(`Please fill in all the required fields before continuing`)
        }else{
        axios.post('http://localhost:8080/amazon/customers',customer)
        .then(response => {
            console.log(response)
           
            navigate("/")

            alert('Your account has been created successfully. Please login to continue')
        }) 
        .catch(console.error())
    
    }}
    return(
        <>
        <img className="amazonIcon" src="amazonIcons/amazonIn.jpg"/>
        <div className="content">
            <h4>Amazon Registration</h4>
        <form onSubmit={buttonHandler}>
            <div className="spaceBetweenAttributes">
            <label >FirstName : </label>
            <input type="text" value={customer.firstName} onChange={e=> setcustomer({...customer,firstName:e.target.value})}/>
            </div>
            <div className="spaceBetweenAttributes">
                <label>LastName : </label>
                <input type="text" value={customer.lastName} onChange={e => setcustomer({...customer,lastName:e.target.value})}/>
            </div>
            <div className="spaceBetweenAttributes">
                <label>Gender : </label>
                
                <input type="radio"  name="gender" value="male" onChange={e => setcustomer({...customer,gender:e.target.value})}/>
                <label>Male </label>
                <input type="radio" name="gender" value="female" onChange={e => setcustomer({...customer,gender:e.target.value})}/>
                <label>Female</label>

            </div >
            <div className="spaceBetweenAttributes">
                <label>Age : </label>
                <input type="text" value={customer.age} onChange={e => setcustomer({...customer,age : e.target.value})}/>
            </div>

            <div className="spaceBetweenAttributes">
                <label>Moble Number : </label>
                <input tupe="text" value={customer.mobileNumber} onChange={e => setcustomer({...customer,mobileNumber:e.target.value})}/>
            </div>
            <div className="spaceBetweenAttributes">
                <label>EmailId : </label>
                <input type="text" value={customer.emailId} onChange={e => setcustomer({...customer,emailId:e.target.value})}/>
            </div>
            <div className="spaceBetweenAttributes">
                <label>Password : </label>
                <input type="text" value={customer.password} onChange={e => setcustomer({...customer,password:e.target.value})}/>
            </div>
            <div className="spaceBetweenAttributes">
                <label>Country : </label>
                <select value={customer.country} onChange={e => setcustomer({...customer,country:e.target.value})}>
                    <option value='india'>India</option>
                    <option value='Usa'>Usa</option>
                    <option value='china'>China</option>
                    <option value='canada'>Canada</option>
                    <option value='australia'>Australia</option>
                    <option value='russia'>Russia</option>
                    <option value='brazil'>Brazil</option>
                    <option value='argentina'>Argentina</option>
                    <option value='mexico'>Mexico</option>
                    <option value='indonesia'>Indonesia</option>
                </select>
            </div>
            <div className="spaceBetweenAttributes">
                <label>State : </label>
                <input type="text" value={customer.state} onChange={e => setcustomer({...customer,state:e.target.value})}/>
            </div>
            <div className="spaceBetweenAttributes">
                <label>PinCode : </label>
                <input type="text" value={customer.pinCode} onChange={e => setcustomer({...customer,pinCode:e.target.value})}/>
            </div>
            <button className="submitButton" type='submit'>Submit</button>
            </form>
            
            <div >
            <Link to={"/"}>Login</Link>
            </div>
        </div>
    </>
    )
}
export default Registration
