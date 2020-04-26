const bcrypt = require('bcrypt')  
const LocalStrategy = require('passport-local').Strategy
 
module.exports = function(passport){
    function findUser(username, callback){
        global.db.collection("users").findOne({"username": username}, function(err, doc){
            callback(err, doc);
        });
    }
    
    function findUserById(id, callback){
        const ObjectId = require("mongodb").ObjectId;
        global.db.collection("users").findOne({_id: ObjectId(id) }, (err, doc) => {
            callback(err, doc);
        });
    }
}