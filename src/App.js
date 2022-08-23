import Products from "./components/Products/Products.js"
import Header from "./components/Layout/Header.js";
import Subheader from "./components/Layout/Subheader.js";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthIndex from "./components/Auth/index.js";
import { useEffect } from "react";
import { checkIsLoggedIn } from "./actions/auth.js";
import { useDispatch,useSelector } from "react-redux";

const App = () =>{

  const dispatch = useDispatch()
  const authState=useSelector(state=>state.auth)

  //checking--> if user is already login or not
  //if already login --> not showing login button 
  useEffect(()=>{
    dispatch(checkIsLoggedIn(()=>{}))
  },[])



  return (
    <div> 
       <Header/>
       <Subheader/>
       <Switch>

        { 
         !authState.idToken &&
         <Route path="/:type(login|signup)" exact>
           <AuthIndex/>
         </Route>
        }
        
        {/* if user is logged in redirected to home page */}
        <Redirect to="/" from="/login"/>
        <Redirect to="/" from="/signup"/>
  

         <Route path="/404" exact>
           <h1>Not Found!</h1>
         </Route>

         <Route path="/:category?" exact>
           <Products/>
         </Route>

         <Redirect to="/404"/> 
     
       </Switch>
    </div>
  );
}

export default App;
