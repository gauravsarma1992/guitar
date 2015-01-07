guitarApp.factory('Route',function($resource){
  route = function(){
    return $resource('api/v1/guitars/:id',{id: '@_id'},{
      delete: { method: 'DELETE' },
      update: { method: 'PUT' }
    });
  }

})