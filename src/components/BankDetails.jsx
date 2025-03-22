import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import Cards from "react-credit-cards-2"
import 'react-credit-cards-2/dist/es/styles-compiled.css';



function BankDetails(){

    const navigate = useNavigate()
    const[bankDetails,setBankDetails] = useState({accountNum:'',name:'',cvv:'',userId:'',expireDate:null})
    bankDetails.userId = localStorage.getItem("userId")

    


    const saveButton = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/bankdetails',bankDetails)
        .then(response=>{
            console.log(response.data)
            alert('your cart is saved')
            navigate('/products/cart')
        })
        .catch(error=>{
            console.log(error)
        })
    }

return(
    <>
    
        <div className="paymentBody">
            
            <Cards
            number={bankDetails.accountNum || ""}
            name={bankDetails.name || ""}
            cvc={bankDetails.cvv || ""}
            expiry={bankDetails.expireDate ? `${bankDetails.expireDate.getMonth() + 1}/${bankDetails.expireDate.getFullYear().toString().slice(-2)}` : ""}
            />

            <h1>Bank Details</h1>

            <form onSubmit={saveButton}><div>
                
                <div className="cardAndNum">
                <label >Card Number</label>
                <input type="tel" value={bankDetails.accountNum} onChange={e=>setBankDetails({...bankDetails,accountNum:e.target.value})} />

                <label className="cardNameandExpireDate">Name</label>
                <input type="text" value={bankDetails.name} onChange={e=>setBankDetails({...bankDetails,name:e.target.value})} />
                </div>
                <div><label>CVV Number</label>
                <input type="text" value={bankDetails.cvv} placeholder="XXX" onChange={e=>setBankDetails({...bankDetails,cvv:e.target.value})} />

                <label className="cardNameandExpireDate">Expire Date</label>
                <DatePicker  selected={bankDetails.expireDate} placeholderText="MM/YYY" onChange={(date)=>setBankDetails({...bankDetails,expireDate:date})}  dateFormat={'MM/yyyy'} 
                minDate={new Date()} showYearDropdown scrollableMonthYearDropdown/>
                </div>
                </div>
                
                    <button className="savecard" type="submit">Save Card</button>
                
            </form>
        </div>
    </>
    )
}
export default BankDetails