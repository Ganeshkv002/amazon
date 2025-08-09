import { useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
function Login(){
    const [user,setUser] = useState({userName:'arun@gmail.com',password:'1234'})
    const navigate = useNavigate()

    const buttonHandler = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8080/amazon/customers/login',
         {params :{emailId: user.userName,password:user.password}})
        .then(response =>{
            const loggedInUser = response.data;
            if(Object.keys(loggedInUser).length===0){
                alert ("inavlid username and password");
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
        <div className="loginbody">
            <h1>Login page</h1>
            <form onSubmit={buttonHandler}>
                <div>
                    <label>username </label>
                    <input type="text" placeholder="email" value={user.userName} onChange={e => setUser({...user,userName:e.target.value})}/>
                </div>
                <div>
                    <label>Password </label>
                    <input type="text" value={user.password} onChange={e => setUser({...user,password:e.target.value})}/>
                </div>
                <div>
                   <button type="submit">Login</button>
                </div>
            </form>
                <div>
                <Link to='/registration'>create new account</Link>
                </div>
        </div>
    )
}
export default Login