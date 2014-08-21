angular.module('ResolverPromiseHelper', []).factory('Resolver',
  function Resolver($q, $rootScope) {

    Resolver.deferr = function deferrer(method) {

      var deferred  = $q.defer();
      var args      = Array.prototype.slice.call(arguments);
      var first_arg = arguments[1];

      function passedResolved(argument) {
        args.splice(0, 2, deferred);
        method.apply(null, args);
      }

      function passedRejected(argument) {
        deferred.reject();
      }

      if (first_arg && typeof first_arg.then === 'function') {

        first_arg.then(passedResolved, passedRejected);

      } else {

        // replace method with defer object
        args.splice(0, 1, deferred);
        method.apply(null, args);

      }
      return deferred.promise;
    };

    Resolver.resolve = function resolver(deferred) {
      function res(deferred, arg) {
        $rootScope.$apply(function() {
          deferred.resolve(arg);
        });
      }
      return res.bind.apply(res, [null].concat(Array.prototype.slice.call(arguments)));
    };

    return Resolver;
  });
