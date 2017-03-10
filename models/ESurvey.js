 var mongoose = require("mongoose");
 var Schema = mongoose.Schema;

 var EssaySchema = new Schema({ 
 		surveyname: String,
 		_id : String,
 		createrName : String,
 		takers : [{
 			takerName : String
 		}],
 		question : [{
 			_id: String,
 			value: String
 			}]
 		});

 module.exports=mongoose.model('ESurvey',EssaySchema);