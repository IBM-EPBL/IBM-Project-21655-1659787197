
import { userContants } from "../actions/constants";
const initState={
    address:[],
    error:null,
    loading:false,
    orders:[],
    orderDetails:{},
    orderFetching:false,
    placeOrderId:null,
}
export default (state= initState,action)=>{
    switch(action.type)
    {
        case userContants.GET_USER_ADDRESS_REQUEST:
            state={
                ...state,
                loading:true
            }
        break;
        case userContants.GET_USER_ADDRESS_SUCCESS:
            state={
                ...state,
                address:action.payload.address,
                loading:false
            }
        break;
        case userContants.GET_USER_ADDRESS_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        case userContants.ADD_USER_ADDRESS_REQUEST:
            state={
                ...state,
                loading:true,
            };
            break;
        case userContants.ADD_USER_ADDRESS_SUCCESS:
            state={
                ...state,
                address:action.payload.address,
                loading:false,
            };
            break;
        case userContants.ADD_USER_ADDRESS_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error,
            };
            break;
    
            case userContants.GET_USER_ORDER_REQUEST:
                state = {
                  ...state,
                  orderFetching: true,
                };
                break;
              case userContants.GET_USER_ORDER_SUCCESS:
                state = {
                  ...state,
                  orders: action.payload.orders,
                  orderFetching: false,
                };
                break;
              case userContants.GET_USER_ORDER_FAILURE:
                state = {
                  ...state,
                  error: action.payload.error,
                  orderFetching: false,
                };
                break;
                case userContants.GET_USER_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        orderDetails: action.payload.order,
      };
      break;
    case userContants.GET_USER_ORDER_DETAILS_FAILURE:
      break;
    case userContants.ADD_USER_ORDER_SUCCESS:
      state = {
        ...state,
        placedOrderId: action.payload.order._id,
      };
      break;
    }
    return state;
}