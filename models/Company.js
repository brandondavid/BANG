const mongoose = require('mongoose')

const InHouse = {
    type: String, 
    enum: ['Yes', 'No', 'Needed']
}

const Manager = new mongoose.Schema({
    name: {type:String, default:''},
    title: {type:String, default:''},         //title
    contactInfo: {type:String, default:''},   //contact information
    reponsibilities: [String]                 //key responsibilities
})

const Company = new mongoose.Schema({
    name: {type:String, required:true},       //company's name
    address: {type:String, default:''},       //physical address
    phone: {type:String, default:''},         //switchboard telephone number
    fax: {type:String, default:''},           //main fax number
    mainUrl: {type:String, default:''},       //main URL
    employmentUrl: {type:String, default:''}, //employment-related URL
    description: {type:String, default:''},   //brief description of products/services
    techPub: InHouse,                         //in-house technical publications
    training: InHouse,                        //in-house training
    marketing: InHouse,                       //in-house marketing communications service
    managers: [Manager],                      //technical communications managers
    tools: [String],                          //tools used in technical communications department(s)
    global: {type:Boolean, default:false},    //whether the company creates content global audiences
    credentials: [String]                     //credentials the company typically seeks in its candidates
})

module.exports = mongoose.model('Company', Company)