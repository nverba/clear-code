angular.module('optionsService', ['defaultOptions'])
  .factory('Options',
    function (default_options, Resolver, $q, $rootScope) {

      var OptionsService  = {};

      OptionsService.ready = Resolver.deferr(loadOptions);

      OptionsService.resetOptions = function () {
        chrome.storage.local.clear();
      };

      function loadOptions(deferred) {

        chrome.storage.local.get(objectify('ClearCodeOptions', mapDefaults(default_options)), function (response) {
          OptionsService.categories = response.ClearCodeOptions;
          deferred.resolve();
        });
      }

      function objectify(key, value) {

        var obj = {};
        obj[key] = value;
        return obj;
      }

      function mapDefaults(defaults) {
        var response = {};
        angular.forEach(defaults, function (options, category) {
          response[category] = {};
          angular.forEach(options, function (value, option) {
            response[category][option] = value.default;
          });
        });
        return response;
      }

      $rootScope.$watch( function (){ return OptionsService.categories; }, function (newValue, oldValue) {
        if (angular.equals(newValue, oldValue)) { return; }
        chrome.storage.local.set(objectify('ClearCodeOptions', OptionsService.categories));
      }, true);

      return OptionsService;
    });
