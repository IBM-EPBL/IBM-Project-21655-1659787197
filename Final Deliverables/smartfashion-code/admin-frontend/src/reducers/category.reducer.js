import { CategoryConstants } from "../actions/constants";

const initState={
    loading:false,
    categories:[],
    error:null
};
const buildNewCategories=(parentId,categories,category)=>{
    let myCategories=[];
    if(parentId==undefined){
        return [
            ...categories,{
                _id:categories._id,
                name:category.name,
                slug:category.slug,
                type:category.type,
                children:[]
            }
        ];

    }
    for(let cat of categories){
        if(cat._id===parentId){
            const newCategory={
                _id:category._id,
                name:category.name,
                slug:category.slug,
                type:category.type,
                parentId:category.parentId,
                children:[]

            };
            myCategories.push({
                ...cat,
                children:cat.children.length>0?[...cat.children,newCategory]:[newCategory]
        })
    }else{
            myCategories.push({
                ...cat,
                children:cat.children?buildNewCategories(parentId,cat.children,category):[]
            })
        }
       
    }
    return myCategories;
}
export default(state=initState,action)=>{
    switch(action.type){
        case CategoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
            break;
        case CategoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading:false
            }
            break;
        case CategoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category=action.payload.category;
            const updatedCategories=buildNewCategories(category.parentId,state.categories,category);
            console.log('updated categories',updatedCategories);
            state={
                ...state,
                categories:updatedCategories,
                loading:false,
            }
            break;
        case CategoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...initState,
                loading:false,
                error:action.payload.error
            }
            break;
        case CategoryConstants.UPDATE_CATEGORIES_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case CategoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case CategoryConstants.UPDATE_CATEGORIES_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        
            case CategoryConstants.DELETE_CATEGORIES_REQUEST:
                state={
                      ...state,
                      loading:true
                }
                break;
            case CategoryConstants.DELETE_CATEGORIES_SUCCESS:
                state={
                        ...state,
                        loading:false
                }
                break;
            case CategoryConstants.DELETE_CATEGORIES_FAILURE:
                state={
                     ...state,
                     loading:false,
                     error:action.payload.error
                }
                break;
    }
return state;
}