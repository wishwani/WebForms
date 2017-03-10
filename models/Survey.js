 var mongoose = require("mongoose");
 var Schema = mongoose.Schema;

 var SurveySchema = new Schema({ 
 		surveyname: String,
 		_id : String,
 		createrName : String,
 		takers : [{
 			takerName : String
 		}],
 		question : [{
 			que: String,
	 		ans1: String,
	 		ans2: String,
	 		ans3: String,
	 		ans4: String,
	 		ans5: String

 			}]
 		});

 module.exports=mongoose.model('Survey',SurveySchema);