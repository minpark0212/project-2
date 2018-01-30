var orm = require("../config/orm.js");
var Sequelize = require('sequelize');


var beer = {
  selectAll: function(cb) {
    orm.all("beers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.create("beers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.update("beers", objColVals, condition, function(res) {
      cb(res);
    });
  },

  deleteOne: function(conditionVal, cb){
    orm.delete('beers', 'recipeId', conditionVal, function(res){
      cb(res);
    });
  }
};


  
// Export 
module.exports = beer;