const authReducer = (state={},action) =>{
    const {payload,type} = action
    switch(type){
        case 'SIGNUP':{
            return payload
        }

        case 'LOGIN':{
            return payload
        }
        case 'LOGOUT':{
            return {}
        }
        default: return state; 
    }
}

export default authReducer








 