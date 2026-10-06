  const { name } = require("ejs");
  const mongodb=require("mongoose");
  const client=require("mongodb");
  
  const connect=mongodb.connect(process.env.mongodburl)

  connect.then(()=>{
      console.log("database is connected ");
       
  })
  .catch((e)=>{
      console.log("database cannot be connected"+e)

  })
  const mongodbschema= new mongodb.Schema({
      name:{
         type:String,
        required: true
 },
      link: {
        type:String,
         required:true
     },
       Mlink:{
        type:String,
        required:true
       },
       year:{
        type:String,
        require:true
       }
  });
  const collection = new mongodb.model("movies",mongodbschema);
  module.exports=collection;













  
  

