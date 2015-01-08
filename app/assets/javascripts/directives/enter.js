guitarApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

guitarApp.directive('guitar',function(){
    guitar = {};
    guitar.restrict = 'E';
    guitar.templateUrl = "/templates/guitar.html";
    return guitar;
})

guitarApp.directive('guitarCollector',function(){
    guitarCollector = {};
    guitarCollector.restrict = 'E';
    guitarCollector.scope = { guitars : "=collection" };
    guitarCollector.controller = function($scope){
      $scope.saveGuitar = function(){
          // console.log("eh");
          var temp = {};
          temp.title = $scope.newGuitar;
          guitar().save(temp,function(data){
            guitar().get({id: JSON.parse(data.guitar).id}).$promise.then(function(item){
              $scope.guitars.push(item);
            });
            console.log($scope.guitars);
          })
          $scope.newGuitar = "";  
        }
    };
    guitarCollector.templateUrl = "/templates/newguitar.html";
    // guitarCollector.template = "{{guitars}}"
    return guitarCollector;
})

guitarApp.directive('tuner',function(){
    tuner = {};
    tuner.restrict = 'E';
    tuner.templateUrl = "/templates/tuner.html";
    return tuner;
})

guitarApp.directive('tunerAddon',function(){
    tunerAddon = {};
    tunerAddon.restrict = 'E';
    tunerAddon.templateUrl = "/templates/tunerAddon.html";
    return tunerAddon;
})