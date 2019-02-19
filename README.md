# Bay Area Networking Guide (BANG)
[![Build Status](https://travis-ci.com/brandondavid/BANG.svg?branch=master)](https://travis-ci.com/brandondavid/BANG)

## Development
This is an unofficial prototype for the Bay Area Networking Guide (BANG).  It is fully functional, though populated with placeholder data and not deployed to a production environment.  Further, the NoSQL database used is likely a poor fit and the database schema itself could use considerable development.  There is no frontend or much in the way of input validation, as the primary purpose of the prototype was to raise a functioning API as something unique to be documented.

### Specification
A sketch of the minimum specification is given [here](http://www.synergistech.com/bang-leader.html):
> - the company's name, physical address, switchboard telephone and main fax numbers, main and employment-related URLs, and a brief description of its products and/or services
> - whether there's a formal in-house technical publications, training, or marketing communications service (and if not, is there a need for a contract solution)
> - the titles, contact information, and key responsibilities of any technical communications department managers
> - which tools are in use in technical communications department(s)
> - whether the company creates content for a global audience
> - the credentials the company typically seeks in its candidates

The template record below follows that specification in an overly literal fashion.  Certainly, it would be preferable to have `Managers`, `Tools`, and `Credentials` as their own data structures so they could be independent of `Company`, which implies that a better backend would involve an RDBMS.
```
    {
       "name": "ABC, Inc.",
       "address": "12345 Main Street; Cityville, CA",
       "phone": "(112) 358-1321",
       "fax": "(314) 159-2653",
       "mainUrl": "https: //abcinc.com",
       "employmentUrl": "https: //abcinc.com/careers",
       "description": "ABC makes products and offers services.",
       "techPub": "Yes",
       "training": "No",
       "marketing": "Needed",
       "managers": [
          {
             "name": "Jane Thomas",
             "title": "Director of Technical Communication",
             "contactInfo": "jane.thomas@abcinc.com",
             "reponsibilities": "Directs team of technical writers."
          },
          {
             "name": "Thomas Jane",
             "title": "Manager of Technical Communication",
             "contactInfo": "tom.jane@abcinc.com",
             "reponsibilities": "Manages team of technical writers."
          }
       ],
       "tools": [
          "DITA",
          "MadCap Flare"
       ],
       "global": true,
       "credentials": [
          "STC Practitioner Certificate",
          "STC Expert Certificate"
       ]
    }
```

The above template record was used to specify the following Mongoose model specification:
```
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
```

## Architecture
- Written in Node.js, with templating done in Mustache for simplicity.
- Express.js is used as a web application framework, greatly facilitating RESTfulness.
- The database is a MongoDB sandbox hosted on AWS through mLab, accessed through the Mongoose API.
- The webapp is hosted on Heroku and available at [https://bay-area-networking-guide.herokuapp.com](https://bay-area-networking-guide.herokuapp.com).

## Data Generation
Placeholder data was generated using the following template:
```
[
  '{{repeat(99)}}',
  {
     name: '{{company()}}',
     address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
     phone: '{{phone()}}',
     fax: '{{phone()}}',
     mainUrl: 'http://www.{{lorem(1, "words")}}.com',
     employmentUrl: 'http://www.{{lorem(1, "words")}}.com',
     description: '{{lorem(1, "paragraphs")}}',
     technicalPub: '{{random("Yes", "No", "Needed")}}',
     training: '{{random("Yes", "No", "Needed")}}',
     marketing: '{{random("Yes", "No", "Needed")}}',
     managers:[
        '{{repeat(1, 3)}}',
        {
           name: '{{firstName()}} {{surname()}}',
           title: 'Manager of {{lorem(2, "words")}}',
           contactInfo: '{{email()}}',
           reponsibilities: 'Responsibilities include {{lorem(2, "words")}} and {{lorem(2, "words")}}'
        }
     ],
     tools:[
        '{{repeat(1, 5)}}',
        '{{lorem(1, "words")}}'
     ],
     global: '{{bool()}}',
     credentials:[
        '{{repeat(1, 3)}}',
        '{{lorem(2, "words")}} Certificate'
     ]
  }
]
```

## Testing and CI/CD
- Testing is done through a Postman collection, which is called via Newman during CI/CD.
- CI/CD is done through Travis.

## Roadmap
- Migrate to a relational database  
- Raise more endpoints (e.g. `/tool`, `/credential`, `/manager`)
- Authentication
- Develop frontend
