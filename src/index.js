const express=require("express");
//const path=require("path");
//const mongodb=require("bcrypt");
// const { log } = require("console");
 const collection=require("./config")
// const studentmarks=require('./students')
// const phyicsexam=require('./phyicsexam')
// const chemestryexam=require('./chemistryexam')
//const js_alert=require('js-alert')
const app=express();
const {AsyncLocalStorage}= require('async_hooks');
const { log } = require("console");
const mongodbsantize=require('express-mongo-sanitize')
const xssclean=require('xss-clean')


//var Localstore= new LocalStorage('./scratch');
// const mathsexam=require('./mathsexam')

// const storage=require('node-sessionstorage')
// const useradd=require('./results');
// const { SocketAddress } = require("net");
// const cokkieparser=require('cookie-parser');
// const resultdatas = require("./results");
// const { log } = require("console");


// app.use(cokkieparser())
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use('/',express.static("public"));

app.use(express.static("public"));

app.use(mongodbsantize())
app.use(xssclean())

app.get('/',async(req,res)=>{
  var  fulldata= await  collection.find()
//  console.log(fulldata) if want data in cloud excute the line  
   res.render("home.ejs",{data:fulldata})
})
port=3000
app.listen(port,()=>{
console.log("server is running 3000");

},)
app.post('/',async(req,res)=>{
   const data={
      name:req.body.name,
      link:req.body.Ilink,
      Mlink:req.body.Mlink
   }
   const  userdata= await collection.insertMany(data);
 //  console.log(userdata)
   res.redirect("/")
})
app.post('/Delete',async(req,res)=>{
const data_del=req.body.id
var Deleted_data=await collection.findByIdAndDelete(data_del)
//console.log(Deleted_data)

})

app.get('/update',async(req,res)=>{
   if (req.path === "/favicon.ico") return res.status(204).end();
   const id_data=req.query.id
   console.log("id",id_data)
  const  singleset= await collection.findOne({ _id: req.query.id });
  console.log('database',singleset)


  var singledata = [
   singleset
   ];
res.render("update.ejs",{dataup:singledata})

})
app.post('/update',async(req,res)=>{
const update_data={

   "id":req.body.id,
   "name":req.body.name,
   "link":req.body.link,
   "Mlink":req.body.Mlink,
}
   console.log(update_data)

   const { ObjectId } = require('mongodb'); // Import ObjectId if not already imported

   const result = await collection.updateOne(
       { _id: new ObjectId(update_data.id) },  // Correct ObjectId usage
       { 
           $set: {  // Use a single `$set` object
               name: update_data.name,
               link: update_data.link,
               Mlink: update_data.Mlink
           }
       }
   );
   
   res.redirect("/");
   

})


