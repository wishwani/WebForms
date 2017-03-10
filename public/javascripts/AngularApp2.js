var app = angular.module("app", []);

app.controller('addSurveyCtrl', function($scope,$http) {

	$scope.question = [];
	$scope.addQuestion = function() {
    $scope.question.push($scope.questionObj);
    $scope.questionObj ={};
  };

  $scope.addSurvey = function() {
    $scope.data ={surveyname:$scope.surveyname, surveyId:$scope.surveyId, question: $scope.question};
    $http.post('/CreateSurvey', $scope.data);
  };
});

app.controller('addQBankCtrl', function($scope,$http) {

  $scope.question = [];
  $scope.addQuestion = function() {
    $scope.question.push($scope.questionObj);
    $scope.questionObj ={};
  };

  $scope.addQBank = function() {
    $scope.data ={className:$scope.className, classId:$scope.classId, question: $scope.question};
    $http.post('/CreateSurvey/fillQBank', $scope.data);
  };
});

app.controller("dynamicFields", function($scope,$http) {
   
   $scope.questions = [{_id: 01, value: ''}];

   $scope.addNewQuestion = function() {
     var newItemNo = $scope.questions.length;
     $scope.questions.push({'_id' : 01 + newItemNo, 'value' : 'question' + newItemNo});
   };
   
   $scope.removeNewQuestion = function() {
     var newItemNo = $scope.questions.length-1;
     if ( newItemNo !== 0 ) {
      $scope.questions.pop();
     }
   };
   
   $scope.showAddQuestion = function(question) {
     return question._id === $scope.questions[$scope.questions.length-1]._id;
   };

   $scope.addESurvey = function() {
      $scope.quevalue = [];
      for(var q = 0;q < $scope.questions.length;q++){
        $scope.quevalue.push($scope.questions[q]);
      }     
  };

  $scope.saveESurvey = function() {
       $scope.data ={surveyname:$scope.surveyname, surveyId:$scope.surveyId, quevalue: $scope.quevalue};
      $http.post('/CreateSurvey/ESurvey', $scope.data);
   };
 
 });

app.controller('answerMCQCtrl', function($scope,$http,$element) {

  $scope.mcqanswers = [];
  $scope.qu = [];
  $scope.finalAnswers = [];
  $scope.saveAnswer = function(ele) {

      $scope.mcqanswers.push({'questionId' : ele.target.name, 'answer' : ele.target.value}); 
      // var valueArr = $scope.mcqanswers.map(function(item){ return item.questionId });
      // console.log(valueArr);
      // var isDuplicate = valueArr.some(function(item, idx){ 
      //     return valueArr.indexOf(item) != idx 
      // });

      // if(!isDuplicate){
      //   $scope.qu.push(ele.target.name); 
      //   console.log($scope.qu);
      // }else {
      //   console.log("This is a duplicate"); 
      // }
      console.log($scope.mcqanswers);
      // console.log(isDuplicate);
  };
  // $scope.al = function(ele){
  //   // console.log($($element));
  //   console.log(ele.target.name+" "+ele.target.value);
  // };

  // function getName(){
  //   for(var i =0;i<document.getElementsByTagName("input").length;i+=5){
  //     console.log(document.getElementsByTagName("input")[i].name);
  //   }
  // }

  $scope.submitAnswers = function() {

    console.log($scope.mcqanswers);
    for(var x = $scope.mcqanswers.length-1; x>=0 ;x--) {
      if($scope.qu.indexOf($scope.mcqanswers[x].questionId) == -1){
        $scope.qu.push($scope.mcqanswers[x].questionId);
        $scope.finalAnswers.push($scope.mcqanswers[x]);
      }else{
        console.log("This is a duplicate"); 
      }
     
    };

    $scope.data ={surveyName:document.getElementById('Sname').innerHTML, surveyId:document.getElementById('ID').innerHTML, answers: $scope.finalAnswers};
    $http.post('/SubmitSurvey/saveMCQAnswers', $scope.data);
     console.log($scope.data);
  };
});

app.controller('answerECtrl', function($scope,$http) {

  $scope.essayanswers = [];
  $scope.saveAnswer = function() {

    // $scope.essayanswers.push({'questionNo' : 01 + newItemNo, 'answer' : $scope.answer});
  };

  $scope.submitAnswers = function() {


    for(var x =0;;x++){
      if(document.getElementsByTagName('textarea')[x] === undefined){
        break;
      }
      $scope.essayanswers.push({'questionI' : document.getElementsByTagName('textarea')[x].name, 'answer' : document.getElementsByTagName('textarea')[x].value});
      // console.log(document.getElementsByTagName('textarea')[x].value);
    }
// console.log($scope.essayanswers);
// console.log(document.getElementById('ID').innerHTML);
// console.log(document.getElementById('Sname').innerHTML);
    $scope.data ={surveyName:document.getElementById('Sname').innerHTML, surveyId:document.getElementById('ID').innerHTML, answers: $scope.essayanswers};
    $http.post('/SubmitSurvey/saveEssayAnswers', $scope.data);
  };
});
	

  //for(var x=1;;x++){if(document.getElementsByTagName('input')[x].type == "checkbox"){console.log(document.getElementsByTagName('input')[x])}else{break;}}


app.controller("surveyname_username",function($scope){
    $scope.sendUser = function(){
      console.log(survey_id);
      console.log(username);
    };  
     
});

app.controller("survey_user_email",function($scope){
    $scope.sendEmail = function(){
      emaillist = '';
      for(var i=0;i<email.length;i++){
        if(i == email.length -1) {
          emaillist += (email[i]);  
        }else{
          emaillist += (email[i]+", ");
        }
        
      }

      console.log(emaillist);
    }
});