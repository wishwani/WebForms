 var mongoose = require("mongoose");
 var Schema = mongoose.Schema;

 var MCQReplySchema = new Schema({ 
 		
 		_id : String,
 		surveyname: String,
 		replies :[{
 			replierId : String,
 			answers : [{
 				questionId : String,
 				answer : String
 			}]	
 		}]
 		
 		});

 module.exports=mongoose.model('MCQReply',MCQReplySchema);