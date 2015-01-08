

guitarApp.controller('TrialController',["$scope","$http","Route","ngAudio",function($scope,$http,Route,ngAudio){
 
  $scope.tuneToNote = { "A": "#000", "B": "#aaa", "C": "#bbb", "D": "#ccc", "E": "#ddd", "F": "#eee",}

  $scope.guitars = [];
 

  $scope.sound = function(note){
  $scope.sounds = ngAudio.load("/sounds/"+note+".mp3");
    $scope.sounds.play();
  }

  // $scope.guitars = route().query();

  // $scope.guitars.$promise.then(function(){
  //   // console.log($scope.guitars);
  // })

  route().query().$promise.then(function(item){
    angular.forEach(item, function(i){
      $scope.guitars.push(i);
    })
  });

  $scope.stringClicked = "s1";
  $scope.guitarClicked = $scope.guitars[1];

  $scope.clickGuitar = function(guitar){
    $scope.guitarClicked = guitar;
  }

  $scope.tune = function(note){
    angular.forEach($scope.guitars,function(item){
      if(item.id == $scope.guitarClicked.id){
        $http.post('/api/v1/guitars/'+item.id+'/tune',{guitarClicked: $scope.guitarClicked.id, stringClicked: $scope.stringClicked, note: note}).success(function(data){
          item[$scope.stringClicked] = note;
        })
      }
    })
  }

  $scope.deleteGuitar = function(guitar){
     
//      $scope.guitars.splice(guitar.id,1);

    route().delete({id: guitar.id},function(){
      angular.forEach($scope.guitars,function(item){
        if(item.id == guitar.id){
          item.deleted = true;
        }
      })

      alert("deleted");
    });
  }

 


}])

