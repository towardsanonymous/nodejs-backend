const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req,res)=>{

    // Existing user
    // hash password
    // user creation
    // token generation

    const { username, email, password } = req.body
    try {
        const existing_user = await userModel.findOne({email})
        if(existing_user){
            return res.status(400).json({message:"User already exist"})
        }
        console.log(password)
        const hash_password = await bcrypt.hash(password,10);
        console.log(hash_password)
        const result = await userModel.create({
            username : username,  
            email : email,
            password : hash_password,
        })

        const token = jwt.sign({email:result.email,id : result.id}, SECRET_KEY);
        res.status(201).json({user : result, token : token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Somethig went wrong"});
    }

  

}

const signin = async (req,res) =>{

    const {email,password} = req.body;
    try {
        const existing_user = await userModel.findOne({email});
        if(!existing_user){
            return res.status(404).json({message:"User not found"});
        }
        const matchpassword = await bcrypt.compare(password,existing_user.password);

        if(!matchpassword){
            return res.status(400).json({message:"Invalid creddentials"});
        }

        const token = jwt.sign({email : existing_user.email,id : existing_user.id}, SECRET_KEY);
        res.status(200).json({user : existing_user,token:token});
        
    } catch (error) {
        console.log(Error);
        res.status(500).json({message:"Something went wrong"})
    }
}


module.exports = {signup,signin};