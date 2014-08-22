angular.module('mnApp.services').factory('progress', ['ngProgress', '$timeout',
  function(ngProgress, $timeout) {
    var tasks = [];
    var complete = function() {
      if (tasks.length === 0) {
        ngProgress.complete();
      }
    };

    var start = function() {
      if (tasks.length === 0) {
        ngProgress.start();
      }
    };

    return {
      register: function(task) {
        start();
        tasks.push(task);
      },
      done: function(task) {
        var idx = tasks.indexOf(task);
        if (idx !== -1) {
          tasks.splice(idx, 1);
        }
        complete();
      },
    };
  }]);
