const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
}, {timestamps:true});

//static signup method
userSchema.statics.signup = async function( email, password) {
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email is in use by someone else')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password:hash})

    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error("User does not exist.")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect Password")
    }

    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User;