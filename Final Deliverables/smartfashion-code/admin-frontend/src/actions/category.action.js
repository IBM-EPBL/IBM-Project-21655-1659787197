import axios from "../helpers/axios";
import { CategoryConstants } from "./constants";

 const getAllCategory=()=>{
    return async dispatch=>{
        dispatch({type:CategoryConstants.GET_ALL_CATEGORIES_REQUEST});
        const res=await axios.get(`category/getcategory`);
        console.log(res);
        if(res.status===200)
        {const {categoryList}=res.data;
            dispatch({
                type:CategoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{categories:categoryList}
            });
        }
        else{
            dispatch({
                type:CategoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}

export const addCategory=(form)=>{
    return async dispatch=>{
        dispatch({type:CategoryConstants.ADD_NEW_CATEGORY_REQUEST});
        try{
            const res =await axios.post(`/category/create`,form);
            if(res.status===201){   
                dispatch({
                    type:CategoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload:{category:res.status.category}
                });
                
            }
            else{
                dispatch({
                    type:CategoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload:res.data.error });

        }}
        catch(error)
        {
          
        console.log(error.response); 

        }
       
           
        
    }
}

export const updateCategories=(form)=>{
    return async dispatch=>{
         dispatch({type:CategoryConstants.UPDATE_CATEGORIES_REQUEST});
        const res =await axios.post(`/category/update`,form);
        if(res.status===201){
            dispatch({type:CategoryConstants.UPDATE_CATEGORIES_SUCCESS});

            dispatch(getAllCategory())
            
          console.log(res);

        }
        else{
            const {error}=res.data;
            dispatch({
                type:CategoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload:{error}
            });
        }
    }
}
export const deleteCategories=(ids)=>{

    return async dispatch=>{
        dispatch({type:CategoryConstants.DELETE_CATEGORIES_REQUEST});
        const res =await axios.post(`/category/delete`,{
            payload:{
                ids
            }
        });
        if(res.status==201){
            dispatch(getAllCategory());
            dispatch({type:CategoryConstants.DELETE_CATEGORIES_SUCCESS});
            
        }
        else{
            const {error}=res.data;
           dispatch({
               type:CategoryConstants.DELETE_CATEGORIES_FAILURE,
               payload:{error}
           })
        }
        console.log(res);
    }
    
}
export {
    getAllCategory
}