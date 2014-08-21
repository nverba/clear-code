angular.module('optionsService', ['defaultOptions'])
  .factory('Options',
    function (default_options, Resolver, $q) {

      var OptionsService  = {};
      var promisedOptions = [];

      OptionsService.updateOptions = {};
      OptionsService.resetOptions  = {};

      function objectify(key, value) {
        var obj = {};
        obj[key] = value;
        return obj;
      }

      function mapDefaults(defaults) {
        var response = {};
        Object.keys(defaults).map(function(key) {
          response[key] = defaults[key].default;
        });
        return response;
      }

      function configOptions(deferred, key) {

        OptionsService.updateOptions[key] = function (option, value) {
          OptionsService[key][option] = value;
          chrome.storage.local.set(objectify(key, OptionsService[key]));
        };

        OptionsService.resetOptions[key] = function () {
          OptionsService[key] = default_options[key];
          chrome.storage.local.set(objectify(key, OptionsService[key]));
        };

        chrome.storage.local.get(objectify(key, mapDefaults(default_options[key])), function (response) {
          OptionsService[key] = response[key];
          deferred.resolve();
        });
      }

      Object.keys(default_options).map(function(key) {
        promisedOptions.push(Resolver.deferr(configOptions, key));
      });

      var deferred = $q.defer();
      $q.all(promisedOptions).then(function () {
        deferred.resolve(OptionsService);
      });

      return deferred.promise;
    });
