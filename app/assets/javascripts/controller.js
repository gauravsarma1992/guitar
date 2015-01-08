

guitarApp.controller('TrialController',["$scope","$http","Route","ngAudio",function($scope,$http,Route,ngAudio){
 
  $scope.tuneToNote = { "A": "#000", "B": "#aaa", "C": "#bbb", "D": "#ccc", "E": "#ddd", "F": "#eee",}

  $scope.guitars = [];
 

  $scope.sound = function(note){
  $scope.sounds = ngAudio.load("/sounds/"+note+".mp3");
    $scope.sounds.play();
  }

  $scope.value = "50";
      $scope.options = {       
        from: 1,
        to: 6,
        step: 1,
        dimension: " s"        
      };

 // $scope.guitars.$promise.then(function(){
  //   // console.log($scope.guitars);
  // })

  guitar().query().$promise.then(function(item){
    angular.forEach(item, function(i){
      $scope.guitars.push(i);
    })
  });

  note().query().$promise.then(function(item){
    $scope.notes = [];
    angular.forEach(item,function(i){
      $scope.notes[i.title] = i.sound;
    });
    console.log($scope.notes);
  });

  $scope.stringClicked = "1";
  $scope.guitarClicked = $scope.guitars[1];

  $scope.clickGuitar = function(guitar){
    $scope.guitarClicked = guitar;
  }

  $scope.tune = function(note){
    angular.forEach($scope.guitars,function(item){
      if(item.id == $scope.guitarClicked.id){
        $http.post('/api/v1/guitars/'+item.id+'/tune',{guitarClicked: $scope.guitarClicked.id, stringClicked: 's'+$scope.stringClicked, note: note}).success(function(data){
          // item['s'+$scope.stringClicked] = note;
          angular.forEach(item.wires,function(i){
            if(''+i.title+'' == 's'+$scope.stringClicked){
              i.value = note;
              console.log(i);
            }
          })
        })
      }
    })
  }

  $scope.deleteGuitar = function(guitar){
     
      guitar.$delete({id: guitar.id},function(){
        angular.forEach($scope.guitars,function(item){
          if(item.id == guitar.id){
            item.deleted = true;
          }
        })

        alert("deleted");
      });
  }

 


}])

