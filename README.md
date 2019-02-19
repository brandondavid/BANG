# Bay Area Networking Guide (BANG)
[![Build Status](https://travis-ci.com/brandondavid/BANG.svg?branch=master)](https://travis-ci.com/brandondavid/BANG)

## Development
This is an unofficial prototype for the Bay Area Networking Guide (BANG).  It is fully functional, though populated with placeholder data and not deployed to a production environment.  Further, the NoSQL database used is likely a poor fit and the database schema itself could use considerable development.  There is no frontend or much in the way of input validation, as the primary purpose of the prototype was to raise a fully functional API as something unique to be documented.


### Specification
A sketch of the minimum specification is given [here](http://www.synergistech.com/bang-leader.html):
> - the company's name, physical address, switchboard telephone and main fax numbers, main and employment-related URLs, and a brief description of its products and/or services
> - whether there's a formal in-house technical publications, training, or marketing communications service (and if not, is there a need for a contract solution)
> - the titles, contact information, and key responsibilities of any technical communications department managers
> - which tools are in use in technical communications department(s)
> - whether the company creates content for a global audience
> - the credentials the company typically seeks in its candidates

Following that specification in an overly literal way, gives us:
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
(https://raw.githubusercontent.com/brandondavid/BANG/master/seed/company.json)

Of course, it would be far preferable to have Managers, Tools, and Credentials as their own data structures so that they could be used independently of any company.  This would also imply that a better backend would involve a RDBMS.

## Architecture
- The database is a MongoDB sandbox hosted on AWS through mLab.
- Express.js is used as a web application framework, which greatly facilitates the webapp being RESTful, which makes it easy to have a REST API.
- The API itself is written in Node.js, which means BANG is most of the way to using the classic MEAN (or MERN) stack.  However, the templating engine is simply Mustache to avoid unnecessary overhead.
- The entire application is deployed on Heroku and available at [https://bay-area-networking-guide.herokuapp.com](https://bay-area-networking-guide.herokuapp.com)

## Data Generation
Placeholder data was generated using [this template](https://github.com/brandondavid/BANG/blob/master/seed/json-generator.md) on Vazha Omanashvili's [JSON Generator](https://www.json-generator.com).

## Testing and CI/CD
- Testing is done through a Postman collection, which is called via Newman during CI/CD.
- CI/CD is done through Travis.

## Roadmap
- Migrate to a relational database  
- Raise more endpoints (e.g. /tool, /credential, /manager)
- Authentication
- Develop frontend
