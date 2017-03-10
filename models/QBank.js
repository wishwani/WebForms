 var mongoose = require("mongoose");
 var Schema = mongoose.Schema;

 var QBankSchema = new Schema({ 
 		className: String,
 		_id : String,
 		question  : [{
 			que: String,
	 		ans1: String,
	 		ans2: String,
	 		ans3: String,
	 		ans4: String,
	 		ans5: String

 			}]
 		});

 module.exports=mongoose.model('QBank',QBankSchema);