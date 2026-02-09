import Header from "./Header"

function OrderCompleted(){
    return(
        <>
            <Header/>
            <div className="order">
                
                <img className="greenTick" src="/amazonIcons/greenTick.jpg"/> 
                <h1>Thank you, Your order has been placed successfully....</h1>

            </div>
        </>
    )
}
export default OrderCompleted
