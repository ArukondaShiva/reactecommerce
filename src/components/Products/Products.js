import { useState,useEffect } from "react"
import ListItem from "./ListItems/ListItem"
import axios from "axios";
import { computeHeadingLevel } from "@testing-library/react";
import Loader from "../UI/Loader";
import { useHistory, useLocation, useParams } from "react-router-dom";


const Products =()=>{

    const [items,setItems]=useState([]);
    const [loader,setLoader]=useState(true);
    const  params = useParams()
    const history = useHistory()
    const {search} = useLocation()
    const queryParams=new URLSearchParams(search).get("search")


    useEffect(()=>{
        async function fetchItems(){

            try{

                let slug = `items.json`
                
                if(params.category){
                   slug = `items-${params.category}.json`
                }
                if(queryParams){
                    slug+=`?search=${queryParams}`
                }
                //items-category-1.json
                const response = await axios.get(`https://reactecommerce-876c8-default-rtdb.firebaseio.com/${slug}`)
                const data = response.data;

                if(!data){
                    handleNotFound();
                    return;
                }

                const transformedData = data.map((item,index)=>{
                   return{
                     ...item,
                     id:index
                   }
                })
                setItems(transformedData)
            }
            catch(error){
                console.log("Error : ",error);
                // alert("some error occured")
            }
            finally{
                setLoader(false);
            }
        }

        fetchItems();

        return ()=>{
            setItems([])
            setLoader(true)
        }

    },[params.category,queryParams])

     //[params] dependency --> for fetching data based on category
    

    const handleNotFound=()=>{
       history.push("/404")
    }


    return(
        <>
        <div className={"product-list"}>
          <div className={"product-list--wrapper"}>     
            {
                items.map(item=>{
                    return (<ListItem key={item.id} data={item} />)
                })
            }
          </div>
        </div>
          { loader && <Loader/>}
        </>
    )



}

export default Products;
