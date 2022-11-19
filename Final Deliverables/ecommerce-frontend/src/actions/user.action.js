import { cartConstants, userContants } from "./constants";
import axios from "../helpers/axios";

export const getAddress=()=>{
    return async dispatch=>{
        try{
            const res=await axios.post(`/user/getaddress`);
            dispatch({type:userContants.GET_USER_ADDRESS_REQUEST});
            if(res.status===200){
                const {
                    userAddress:{
                        address
                    }
                }=res.data;
                dispatch({
                    type:userContants.GET_USER_ADDRESS_SUCCESS,
                    payload:{address}
                });

            }
            else{
                const {error}=res.data;
                dispatch({
                    type:userContants.GET_USER_ADDRESS_FAILURE,
                    payload:{error}

                });

            }

            
        }
        catch(error){
            console.log(error);
        }
    }
}
export const addAddress=(payload)=>{
    return async dispatch=>{
        try{
            const res=await axios.post(`/user/address/create`,{payload})
            dispatch({type:userContants.ADD_USER_ADDRESS_REQUEST});
            if(res.status===201){
                console.log(res);

                const {
                    address:{address},
                
                }=res.data;
                dispatch({
                    type:userContants.ADD_USER_ADDRESS_SUCCESS,
                    payload:{address}
                });
            }else{
                const {error} =res.data;
                dispatch({
                    type:userContants.ADD_USER_ADDRESS_FAILURE,
                    payload:{error}
                });
            }
        }catch(error){
            console.log(error);
        }
    }
   
}
export const addOrder=(payload)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.post(`/addOrder`,payload);
            dispatch({type:userContants.ADD_USER_ORDER_REQUEST});
            if(res.status===201){
                console.log(res);
                dispatch({
                    type:cartConstants.RESET_CART,
                });

                // const{order}=res.data;
                // dispatch({
                //     type:cartContants.RESET_CART,

                // });
                // dispatch({
                //     type:userContants.ADD_USER_ORDER_SUCCESS,
                //     payload:{order},
                // });
            }
            else{
                const {error}=res.data;
                dispatch({
                    type:userContants.ADD_USER_ORDER_FAILURE,
                    payload:{error},
                });
            }}
            catch(error){
                console.log(error);
            }
            }
        }

  
        
    export const getOrder = (payload) => {
        return async (dispatch) => {
          try {
            const res = await axios.post(`/getOrder`, payload);
            dispatch({ type: userContants.GET_USER_ORDER_REQUEST });
            if (res.status === 200) {
              console.log(res);
              const { order } = res.data;
              dispatch({
                type: userContants.GET_USER_ORDER_SUCCESS,
                payload: { order },
              });
            } else {
              const { error } = res.data;
              dispatch({
                type: userContants.GET_USER_ORDER_FAILURE,
                payload: { error },
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
      };
      export const getOrders = () => {
        return async (dispatch) => {
          try {
            const res = await axios.get(`/getOrders`);
            dispatch({ type: userContants.GET_USER_ORDER_REQUEST });
            if (res.status === 200) {
              console.log(res);
              const { orders } = res.data;
              dispatch({
                type: userContants.GET_USER_ORDER_SUCCESS,
                payload: { orders },
              });
            } else {
              const { error } = res.data;
              dispatch({
                type: userContants.GET_USER_ORDER_FAILURE,
                payload: { error },
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
      };