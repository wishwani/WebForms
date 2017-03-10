var app = angular.module('app', ['ngCookies']);

app.controller('cookieCtrl', function($scope,$cookies) {		
			$scope.saveCookie = function(){
				$cookies.LoggedInUser = $scope.user;
					
				// $cookies.put("username",$scope.user);				
				
			};
			
           // this.getCookieValue = function () {
           //         $cookies.user = this.user;
           //         return $cookies.user;
           //  };
           
           // this.user = this.getCookieValue();
    
    // need to set some $watch('user'....) for store your name into cookie
});