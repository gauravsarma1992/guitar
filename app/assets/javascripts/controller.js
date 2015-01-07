

guitarApp.controller('TrialController',["$scope","$http","Route","ngAudio",function($scope,$http,Route,ngAudio){
 
  $scope.tuneToNote = { "A": "#000", "B": "#aaa", "C": "#bbb", "D": "#ccc", "E": "#ddd", "F": "#eee",}

  $scope.guitars = [];
 

  $scope.sound = function(note){
  $scope.sounds = ngAudio.load("/sounds/"+note+".mp3");
    $scope.sounds.play();
  }


  route().query(function(item){
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
    route().delete({id: guitar.id},function(){
      $scope.guitars.splice(guitar.id,1);
      alert("deleted");
    });
  }

  $scope.saveGuitar = function(){
    var temp = {};
    temp.title = $scope.newGuitar;
    temp.s1 = "A";
    temp.s2 = "B";
    temp.s3 = "C";
    temp.s4 = "D";
    temp.s5 = "E";
    temp.s6 = "F";
    temp.deleted = false;
    route().save(temp,function(data){
      $scope.guitars.push(data.guitar);
    })
    $scope.newGuitar = "";  
  }


}])

