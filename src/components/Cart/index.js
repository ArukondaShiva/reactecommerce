import { Fragment, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import Modal from "../UI/Modal"
import CartItem from "./CartItem"
import OrderSuccessModal from "../UI/OrderSuccess"
import { addItemHandler,clearCartHandler,placeOrderHandler,removeItemHandler } from "../../actions"


const Cart = () =>{

    const [showModal,setShowModal] = useState(false)
    const [orderModal,setOrderModal] = useState(false)
    const items = useSelector(state=>state.cart.items)
    const totalAmount = useSelector(state=>state.cart.totalAmount)
    const [orderId,setOrderId] = useState("")
    const dispatch = useDispatch()

    const handleModal = () =>{
        setShowModal(previousState=>!previousState)
    }


    const handleOrderModal = () =>{
        setShowModal(false);
        // dispatch(clearCartHandler())
        setOrderModal(previous=>!previous)
    }

    const orderHandler = () =>{
      setShowModal(false)
      // dispatch(clearCartHandler())
      dispatch(placeOrderHandler(response => {
          if(response.error){
            alert(response.data.error || "Some error occured,please try again");
          }else{
            console.log(response.data)
            setOrderId(response.data.name)
            setShowModal(false)
            setOrderModal(previous=>!previous)
          }
      }))
       
    }


    const dispatchEvents=(type,item)=>{
       if(type===1){
         dispatch(addItemHandler(item))
       }
       else if(type===-1){
          dispatch(removeItemHandler(item.id))
       }
    }

    return(
     <Fragment>
        <button onClick={handleModal}>
          <span data-items={items.length}>Cart</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
             <circle cx="6" cy="19" r="2" />
             <circle cx="17" cy="19" r="2" />
             <path d="M17 17h-11v-14h-2" />
             <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
             <path d="M15 6h6m-3 -3v6" />
          </svg>
        </button>
        {
            showModal &&
            <Modal onClose={handleModal}>
                <div className="checkout-modal">
                    <h2>Checkout Modal</h2>
                    <div className="checkout-modal_list">
                      
                      {
                        items.length > 0 ?
                        items.map(item=>{
                           return (
                             <CartItem
                                data={item} 
                                onEmitIncreaseItem={item=>dispatchEvents(1,item)} 
                                onEmitDecreaseItem={item=>dispatchEvents(-1,item)}
                                key={item.id}
                             />
                           )
                        })
                        :
                        <div className="empty-cart">Please add something in your cart!</div>

                      }

        
                    </div>
                    {
                      items.length >0 &&
                      <div className="checkout-modal_footer">
                        <div className="totalAmount">
                           <h4>Total Amount: </h4>
                           <h4>
                           {totalAmount}
                           <span style={{marginLeft:"4px"}}> INR</span>
                           </h4>
                        </div>
                        <button onClick={orderHandler}>Order Now</button>
                      </div>
                    }
                </div>
            </Modal>
        }
        {orderModal && <OrderSuccessModal orderId={orderId} onClose={handleOrderModal}/>}
      </Fragment>
    )
}

export default Cart