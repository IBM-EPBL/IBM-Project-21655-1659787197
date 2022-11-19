const express=require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');

const { addCategroy, getCategories,updateCategories,deleteCategories} = require('../controller/category');
const router=express.Router();
const shortid=require('shortid');
const multer = require("multer");
const path=require('path');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename:function(req,file,cb){
        cb(null,shortid.generate()+'-'+file.originalname)
    }
})
const upload=multer({storage});
router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addCategroy);
router.get('/category/getcategory',getCategories);
router.post('/category/update',upload.array('categoryImage'),updateCategories);
router.post('/category/delete',deleteCategories);
module.exports=router;