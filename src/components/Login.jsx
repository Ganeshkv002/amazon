import { useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import "./LoginPageStyles.css";
function Login(){
    const [user,setUser] = useState({userName:'',password:''})
    const navigate = useNavigate()

    const buttonHandler = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8080/amazon/customers/login',
         {params :{emailId: user.userName,password:user.password}})
        .then(response =>{
            console.log(response.data)
            const loggedInUser = response.data;
            if(Object.keys(loggedInUser).length===0){
                alert ("Your login details are incorrect. Please verify your email and password or sign up for a new account.");
            }
            else{
                console.log("login sucessfully",response.data)
                const id = response.data.customerID;
                localStorage.setItem("userId",  id);
                console.log("userId",localStorage.getItem("userId"));
            return navigate('/products') 
            }
        })

        .catch(error =>{
            console.log(error)
        })

    }
    return(
    <>
    <img className="amazonLogo" src="amazonIcons/amazonIn.jpg"/>
        < div className="content">
             <h3>Sign in or create account</h3>
                <form onSubmit={buttonHandler}>
                    <div>
                        <label className="searchBar">Username :</label>
                        <input type="text" placeholder="email" value={user.userName} onChange={e => setUser({...user,userName:e.target.value})}/>
                    </div>
                        <div>
                            <label className="searchBar">Password :</label>
                            <input type="text" value={user.password} onChange={e => setUser({...user,password:e.target.value})}/>
                        </div>
                        <div>
                            <button className="loginBuuton" type="submit">Login</button>
                        </div>
                    </form>
                    <div>
                        <Link to='/registration'>Create a new account</Link>
                    </div>
        </div>
    </>
    )
}
export default Login