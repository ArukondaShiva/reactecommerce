import { NavLink } from "react-router-dom"

const Subheader=()=>{
  return(
    <div className="subheader-container">
       <ul>
         <li><NavLink exact to="/"><b>Home</b></NavLink></li>
         <li><NavLink exact to="/category-1"><b>category 1</b></NavLink></li>
         <li><NavLink exact to="/category-2"><b>category 2</b></NavLink></li>
         <li><NavLink exact to="/category-3"><b>category 3</b></NavLink></li>
         <li><NavLink exact to="/category-4"><b>category 4</b></NavLink></li> 
        
       </ul>
    </div>
  )
}

export default Subheader