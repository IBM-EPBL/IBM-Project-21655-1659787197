import React, { useEffect,useState } from 'react';
import Layout from '../../components/Layout';
import { Container,Row,Col,Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import './style.css';
import { addCategory, getAllCategory,updateCategories,deleteCategories as deleteCategoriesAction } from '../../actions';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {IoIosCheckmarkCircleOutline,IoIosCheckbox,IoIosArrowDown,IoIosArrowForward,IoIosCheckboxOutline, IoIosTrash,IoIosAdd,IoIosCloudUpload} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';   
import AddCategoryModal from './components/AddCategoryModal';
const Category = (props) => {
    const category=useSelector(state=>state.category);
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName]=useState('');  
    const [parentCategoryId,setParentCategoryId]=useState('');
    const [categoryImage,setCategoryImage]=useState('');
    const [checked,setChecked]=useState([]);
    const [expanded,setExpanded]=useState([]);
    const [checkedArray,setCheckedArray]=useState([]);
    const [name,setName]=useState('');
    const [expandedArray,setExpandedArray]=useState([]);
    const [updateCategoryModal,setUpdateCategoryModal]=useState(false);
    const [deleteCategoryModal,setDeleteCategoryModal]=useState(false);
    const dispatch=useDispatch();
    
useEffect(()=>{
if(!category.loading){
    setShow(false);
}
},[category.loading]);
    const handleClose = () =>{
        
        const form =new FormData();
        if(categoryName === ""){
            alert('Category Name is required');
            setShow(false);
            return ;
        }
     
        form.append('name',categoryName);
        form.append('parentId',parentCategoryId);
        form.append('categoryImage',categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        // const cat={
         

        //     // categoryName,
        //     // parentCategoryId,
        //     // categoryImage
        // };
       
        setShow(false);
    } 
    const handleShow = () => setShow(true);
    const renderCategories=(categories)=>
    {
        let myCategories=[];
        for(let category of categories){
            myCategories.push(
                {
                    label:category.name,
                    value:category._id,
                    type:category.type,
                    children:category.children.length>0&& renderCategories(category.children),
                }
           
            );
        }
        return myCategories;
    }
   
    const createCategoryList=(categories,options=[])=>{
        for(let category of categories){
            options.push({value:category._id,
                name:category.name,
                parentId:category.parentId,
                type:category.type,
                
        });

            if(category.children.length>0){
                createCategoryList(category.children,options)
            }
        }
        return options;

    }
const handleCategoryImage=(e)=>{
    setCategoryImage(e.target.files[0]);
}
const updateCategory=()=>{
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);

}
const updateCheckedAndExpandedCategories=()=>{
    const categories=createCategoryList(category.categories);
    const checkedArray=[];
    const expandedArray=[];
    checked.length>0&&checked.forEach((categoryId,index)=>{
        const category=categories.find((category,_index)=>categoryId==category.value);
        category&&checkedArray.push(category);
    })
    expanded.length>0&&expanded.forEach((categoryId,index)=>{
        const category=categories.find((category,_index)=>categoryId==category.value);
        category&&expandedArray.push(category);
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);


}
const handleCategoryInput=(key,value,index,type)=>{
    if(type=="checked")
    {
        const updatedCheckedArray=checkedArray.map((item,_index)=>index==_index?{...item,[key]:value}:item)
        setCheckedArray(updatedCheckedArray);

    }else if(type=="expanded")
    {
        const updatedExpandedArray=expandedArray.map((item,_index)=>index==_index?{...item,[key]:value}:item)
        setExpandedArray(updatedExpandedArray);
    }
}
const updateCategoriesForm=()=>{
    const form=new FormData();
    expandedArray.forEach((item,index)=>{
        form.append('_id',item.value);
        form.append('name',item.name);
        form.append('parentId',item.parentId?item.parentId:"");
        form.append('type',item.type);
    })
    checkedArray.forEach((item,index)=>{
        form.append('_id',item.value);
        form.append('name',item.name);
        form.append('parentId',item.parentId?item.parentId:"");
        form.append('type',item.type);
    });
    dispatch(updateCategories(form));
  

}




const renderAddCategoryModal=()=>{
    return (
        <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Category'}
      >
      <input
      value={categoryName}
      placeholder={`Category Name`}
      onChange={(e)=>setCategoryName(e.target.value)}/>
      <select 
      className='form-control'
      value={parentCategoryId}
       onChange={(e)=>setParentCategoryId(e.target.value)}>
      <option>Select category</option>
      {createCategoryList(category.categories).map(option=>
       <option key={option.value} value={option.value}>{option.name}</option>)
      }</select>
      <input type="file" name="categoryImage" onChange={handleCategoryImage}/>
      </Modal> 
    );
}
const deleteCategory=()=>{
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
}




const deleteCategories=()=>{
    const checkedIdsArray=checkedArray.map((item,index)=>({_id:item.value}));
    const expandedIdsArray=expandedArray.map((item,index)=>({_id:item.value}));
    const idsArray=expandedIdsArray.concat(checkedIdsArray);


    if(checkedIdsArray.length>0)
    {
        dispatch(deleteCategoriesAction(checkedIdsArray))

        .then(result=>{
            if(result){
                dispatch(getAllCategory())
                setDeleteCategoryModal(false)
            }
        });

    }
    setDeleteCategoryModal(false);
  
}
const renderDeleteCategoryModal=()=>{
    
    return (
        <Modal modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={()=>setDeleteCategoryModal(false)}
        buttons={
            [
               { label:'No',
                color:'primary',
                onClick:()=>{
                    alert('no');
                }
            },
            { label:'Yes',
            color:'danger',
            onClick:deleteCategories
        }
            ]
        }
        >
       <h5>Expanded</h5>
      {
          expandedArray.map((item,index)=><span key={index}>{item.name}</span>)
      }
      <h5>Checked</h5>
      {
        checkedArray.map((item,index)=><span key={index}>{item.name}</span>)
    }
        </Modal>
    );
}
const categoryList = createCategoryList(category.categories);
  return (
      <Layout sidebar>
       <Container>
       <Row>
       <Col md={12}>
         <div style={{display:'flex',justifyContent:'space-between'}}>
         <h3>Category</h3>
         <div className='actionBtnContainer'>
         <span>Actions:</span>
         <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
         <button onClick={deleteCategory}><IoIosTrash/><span>Delete</span></button>
         <button onClick={updateCategory}><IoIosCloudUpload/><span>Edit</span></button>
         </div>
         </div>
     
       </Col></Row>
       <Row>
       <Col md={12}>
   
  <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked( checked )}
                onExpand={expanded => setExpanded(expanded )}
                icons={{    
                    check: <IoIosCheckbox />,
                    uncheck: < IoIosCheckboxOutline/>,
                    halfCheck: <IoIosCheckboxOutline />,
                    expandClose: <IoIosArrowForward />,
                    expandOpen:<IoIosArrowDown/>
                   
                }}
            
            />
       </Col></Row>
       

       </Container>
       <AddCategoryModal
       show={show}
       handleClose={()=>setShow(false)} 
       onSubmit={handleClose}
       modalTitle={'Add Categories'}    
       categoryName={categoryName}
       setCategoryName={setCategoryName}
       parentCategoryId={parentCategoryId}
       setParentCategoryId={setParentCategoryId}
       categoryList={ categoryList}
       handleCategoryImage={handleCategoryImage}
       
       />

       <UpdateCategoriesModal
       show={updateCategoryModal}
              handleClose={()=>setUpdateCategoryModal(false)}
              onSubmit={updateCategoriesForm}
              modalTitle={'Update Categories'}
              size='lg' 
              expandedArray={expandedArray}
              checkedArray={checkedArray}
              handleCategoryInput={handleCategoryInput}
              categoryList={ categoryList}
              />
     
    
  
  
     
 

{renderDeleteCategoryModal()}   




       
     
      </Layout>
  )
};

export default Category;
