guitarApp.factory('Route',function($resource){
  guitar = function(){
    return $resource('api/v1/guitars/:id',{id: '@_id'},{
      delete: { method: 'DELETE' },
      update: { method: 'PUT' }
    });
  }

  wire = function(){
    return $resource('api/v1/guitars/:guitar_id/wires/:id',{guitar_id: '@_guitar_id',id: '@_id'},{
      delete: { method: 'DELETE' },
      update: { method: 'PUT' }
    });
  }

  note = function(){
    return $resource('api/v1/notes/:id',{id: '@_id'},{
    });
  }

  sound = function(){
    return $resource('api/v1/sound/:id',{id: '@_id'},{
    });
  }

})