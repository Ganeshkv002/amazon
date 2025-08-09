import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Registration(){
    const[customer,setcustomer] = useState({firstName :'',lastName:'',gender:'',age:'',mobileNumber:'',emailId:'',password:'',country:'',state:'',pinCode:'',})
    const navigate = useNavigate()
    const buttonHandler=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/amazon/customers',customer)
        .then(response => {
            console.log(response)
           
            navigate("/")

            //alert('registration successfully !')
        })
        .catch(console.error())
    }
    return(
        <div className="loginbody">
            <h1>Amazon Registration</h1>
            <form onSubmit={buttonHandler}>
                <div>
            <label>FirstName :</label>
            <input type="text" value={customer.firstName} onChange={e=> setcustomer({...customer,firstName:e.target.value})}/>
            </div>
            <div>
                <label>LastName :</label>
                <input type="text" value={customer.lastName} onChange={e => setcustomer({...customer,lastName:e.target.value})}/>
            </div>
            <div>
                <label>Gender :</label>
                
                <input type="radio"  name="gender" value="male" onChange={e => setcustomer({...customer,gender:e.target.value})}/>
                <label>Male</label>
                <input type="radio" name="gender" value="female" onChange={e => setcustomer({...customer,gender:e.target.value})}/>
                <label>Female</label>

            </div>
            <div>
                <label>Age :</label>
                <input type="text" value={customer.age} onChange={e => setcustomer({...customer,age : e.target.value})}/>
            </div>

            <div>
                <label>Moble Number :</label>
                <input tupe="text" value={customer.mobileNumber} onChange={e => setcustomer({...customer,mobileNumber:e.target.value})}/>
            </div>
            <div>
                <label>EmailId :</label>
                <input type="text" value={customer.emailId} onChange={e => setcustomer({...customer,emailId:e.target.value})}/>
            </div>
            <div>
                <label>Password :</label>
                <input type="text" value={customer.password} onChange={e => setcustomer({...customer,password:e.target.value})}/>
            </div>
            <div>
                <label>Country :</label>
                <select value={customer.country} onChange={e => setcustomer({...customer,country:e.target.value})}>
                    <option value='india'>India</option>
                    <option value='usa'>Usa</option>
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
            <div>
                <label>State :</label>
                <input type="text" value={customer.state} onChange={e => setcustomer({...customer,state:e.target.value})}/>
            </div>
            <div>
                <label>PinCode :</label>
                <input type="text" value={customer.pinCode} onChange={e => setcustomer({...customer,pinCode:e.target.value})}/>
            </div>
            <button type='submit'>Submit</button>
            </form>
            
            <div>
            <Link to={"/"}>Login</Link>
            </div>
        </div>
    )
}
export default Registration