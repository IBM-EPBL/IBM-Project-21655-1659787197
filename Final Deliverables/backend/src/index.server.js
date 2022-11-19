const express=require('express');
const env=require('dotenv');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
const authRoute=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const productRoutes=require('./routes/product');
const categoryRoutes=require('./routes/category');
const cartRoutes=require('./routes/cart');
const path=require('path');
const cors=require('cors');
const initialDateRoutes=require('./routes/admin/initialData');
const page=require('./routes/admin/page');
const address=require('./routes/address');
const orderRoutes=require('./routes/order')
const adminOrderRoute=require('./routes/admin/order.routes');

env.config();
//mongodb+srv://manikandan:<password>@cluster0.ag6tc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.use(bodyParser());
mongoose
  .connect(
    `mongodb+srv://manikandan:manikandan@cluster0.ag6tc.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    
  
  )
  .then(() => {
    console.log("Database connected");
  });
  app.use(cors());
  app.use(express.json());
  app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoute);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',initialDateRoutes);
app.use('/api',cartRoutes);
app.use('/api',page);
app.use('/api',address);
app.use('/api',orderRoutes);
app.use('/api',adminOrderRoute);

app.listen(process.env.PORT||5000,()=>{
    console.log(`server is running on port 2000`);
});