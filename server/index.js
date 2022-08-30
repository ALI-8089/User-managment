const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Admin = require('./models/user.model')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/jwt')

app.post('/api/register', async (req, res) => {


  try {
    await User.UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', err })
  } 
})
app.post('/api/login', async (req, res) => {
 
  const user = await User.UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  if (user) {
    const token = jwt.sign({},
      
      'shfjksdhfskdjhfsdfsd25s5df6s3f5265fs6',{ expiresIn: '10h'}
    )
    return res.json({ status: 'ok', user: token })
  } else { 
    return res.json({ status: 'error', user: false })
  }
})



/* ---------------admin----------*/

const checkadmin = (req,res,next)=>{
  const adminToken = req.headers.authtoken

  console.log(adminToken);
  if(adminToken){
    const auth = jwt.verify(adminToken,'sfjkhdskfhsdjkfhjkdshfsmjfocijgfu9xhytrughfjkdslkdugik')
    console.log(auth);
    if(auth){
      console.log("admin logged");
      next()
    }else{
      res.json({status:false})
    }
  }
}  

app.post('/api/admin-login',checkadmin, async (req, res) => {
 
  const admin = await Admin.AdminModel.findOne({
    email: req.body.email,
    password: req.body.password, 
  }) 
 
  if (admin) {
    const adminToken = jwt.sign(
      {
        name: admin.name,
        email: admin.email,
      },
      'sfjkhdskfhsdjkfhjkdshfsmjfocijgfu9xhytrughfjkdslkdugik',{ expiresIn:"10s" },
    )
    return res.json({ status: 'ok', admin: adminToken })
  } else {
    return res.json({ status: 'error', admin: false })
  }
})
app.get('/api/admin', async (req, res) => {
  const adminToken = req.headers.authtoken
  try {
    jwt.verify(adminToken, 'sfjkhdskfhsdjkfhjkdshfsmjfocijgfu9xhytrughfjkdslkdugik')
    const userData = await User.UserModel.find({})
   
    res.json(userData)
  } catch (err) { 
   console.log(err);
    res.json({ status: 'error' })
  }
})
app.post('/api/delete',checkadmin, async(req, res) => {

const id = req.body.id
try{
const response = await User.UserModel.deleteOne({_id : id})
res.json({response,status: 'success'})
}catch(err){
res.json({status: 'user not match'})
}
}) 
app.post('/api/edit-user',checkadmin, async(req, res) => {

  const id = req.body.id
  try{
  const response = await User.UserModel.updateOne({_id : id},{
    $set:{
   name:req.body.name,
   email:req.body.email,
  }})
  res.json({response,status: 'success'})
  }catch(err){ 
  res.json({status: 'user not match'})
  }
  })
  app.post ('/api/add-user',checkadmin,(req,res)=>{
    console.log("aaaaaaaa00000000",req.body);
    try{
      const user = User.UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }) 
      res.json({status: 'ok'})
    }catch(err){
      res.json({status: 'error'})
    }
   
  }) 

  

app.listen(3002, () => { 
  console.log('server started at port 3002')
}) 
