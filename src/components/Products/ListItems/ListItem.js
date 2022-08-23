import { Fragment, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import AddToCartIcon from "../../../assets/icons/add_cart.svg";
import Modal from "../../UI/Modal";
import { addItemHandler,removeItemHandler } from "../../../actions";
// import  connect from "react-redux"

const ListItem=({data})=>{
    const [counter,setCounter] = useState(0);
    const [showModal,setShowModal]=useState(false);
    const item = useSelector(state=>state.cart.items.find(item=>item.id===data.id))
    const dispatch=useDispatch()


    const increaseCounterByOne=event=>{
      event.stopPropagation()
      dispatch(addItemHandler(data))
    }


    const decreaseCounterByOne=event=>{
      event.stopPropagation()
      dispatch(removeItemHandler(data.id))
    }


    // console.log(data);


    const handleModal =()=>{
      setShowModal(previousState=>!previousState)
    }


    return (
      <Fragment>
        <div onClick={handleModal} className={"item-card"}>
            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt="Some title"/>
            <div className={"item-card_information"}>
               <div className={"pricing"}>
                 <span>₹{data.discountedPrice}</span>
                 <small>
                    <strike>₹{data.price}</strike>
                 </small>
               </div>
               <div className={"title"}>
                  <h3>{data.title}</h3>
               </div>
            </div>

            {/* <button onClick={()=>updateItemTitle(data.id)}>Update the title</button> */}

            {/* if item is not present or if quantity is not present in item object */}

            {
               !item || item?.quantity <1?
               <button className="cart-add" onClick={increaseCounterByOne}>
                 <span>Add To Cart</span>
                 <img src={AddToCartIcon} alt="Cart Icon"/>
               </button>
               :
               <div className="cart-addon">
                 <button onClick={decreaseCounterByOne}><span>-</span></button>
                 <span>{item.quantity}</span>
                 <button onClick={increaseCounterByOne}><span>+</span></button>
               </div>
            }


        </div>
       {showModal && 

         <Modal onClose={handleModal}>
           <div className="item-card__modal">
             <div className="img-wrap">
                <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt="Some title"/>
             </div>

             <div className="meta">
                <h3>{data.title}</h3>
                <div className={"pricing"}>
                  <span>₹{data.discountedPrice}</span>
                  <small>
                    <strike>₹{data.price}</strike>
                  </small>
                </div>
                <p>{data.description}</p>

              {
                !item||item?.quantity<1?
               <button className="cart-add cart-add__modal" onClick={increaseCounterByOne}>
                 <span>Add To Cart</span>
                 <img src={AddToCartIcon} alt="Cart Icon"/>
               </button>
               :
               <div className="cart-addon cart-addon__modal">
                 <button onClick={decreaseCounterByOne}><span>-</span></button>
                 <span>{item.quantity}</span>
                 <button onClick={increaseCounterByOne}><span>+</span></button>
               </div>
              }

             </div>
          

           </div>
         </Modal>
       }
      </Fragment>
    )
}

const mapStateToProps = (state,ownProps)=>{
    console.log(state,ownProps)
    return {}
}

export default ListItem








 