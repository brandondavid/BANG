const Company = require('../models/Company')

module.exports = {

    get: (params) => {
        return new Promise((resolve, reject) => {
            Company.find(params)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            Company.findById(id)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    getPropertyById: (id, params) => {
        return new Promise((resolve, reject) => {
            Company.findById(id, params).select("-_id")
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    post: (params) => {
        return new Promise((resolve, reject) => {
            Company.create(params)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        }) 
    },

    put: (id, params) => {
        return new Promise((resolve, reject) => {
            Company.findByIdAndUpdate(id, params, {new:true})
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        }) 
    },

    putPropertyById: (id, params) => {
        return new Promise((resolve, reject) => {
            Company.findByIdAndUpdate(id, params, {new:true})
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        }) 
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            Company.findByIdAndDelete(id)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        }) 
    }

}