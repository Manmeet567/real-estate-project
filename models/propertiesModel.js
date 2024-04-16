const mongoose = require('mongoose');

const Schema = mongoose.Schema

const propertiesSchema = new Schema({
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

const Properties = mongoose.model('Properties', propertiesSchema)
module.exports = Properties;