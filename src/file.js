angular.module('ngl.file', [])

.factory('nglFileRead', function ($injector) {
    'use strict';

    var $window = $injector.get('$window');
    var $q = $injector.get('$q');

    var TYPE_METHOD = {
      binary: 'readAsDataURL',
      text: 'readAsText'
    };

    var nglFileRead = function (file, type) {
        var deferred = $q.defer();
        var method = TYPE_METHOD[type || 'binary'];
        var reader = new $window.FileReader();

        reader.onload = function (event) {
            deferred.resolve(event.target.result);
        };

        reader[method](file);
        return deferred.promise;
    };

    return nglFileRead;
})

.factory('nglFileImage', function ($injector) {
    'use strict';

    var $window = $injector.get('$window');
    var $q = $injector.get('$q');

    var nglFileImage = function (content) {
        var deferred = $q.defer();
        var image = new $window.Image();

        image.onload = function () {
          deferred.resolve(image);
        };

        image.onerror = function () {
          deferred.reject(content);
        };

        image.src = content;
        return deferred.promise;
    };

    return nglFileImage;
})

.directive('nglFileOnChange', function ($injector) {
    'use strict';

    var $parse = $injector.get('$parse');

    var controller = function ($scope, $element, $attrs) {
        var callback = $parse($attrs.nglFileOnChange)($scope);

        $element.on('change', function (event) {
            var files = event.target.files;
            if (!files.length) { return; }

            $scope.$apply(function () {
              callback(files);
            });
        });
    };

    return {
        scope: true,
        controller: controller
    };
})

.directive('nglFileDialog', function ($injector) {
    'use strict';

    var $parse = $injector.get('$parse');

    var tpl = [
        '<form>',
            '<input type="file" />',
        '</form>'
    ].join('');

    var form = angular.element(tpl);
    var input = form.children('input');

    var controller = function ($scope, $element, $attrs) {
        var callback = $parse($attrs.nglFileDialog)($scope);

        input.on('change', function (event) {
            var files = event.target.files;
            if (!files.length) { return; }

            $scope.$apply(function () {
              callback(files);
            });
        });

        $element.on('click', function () {
            form[0].reset();
            input[0].click();
        });
    };

    return {
        scope: true,
        controller: controller
    };
})

.directive('nglFileWrite', function ($injector) {
    'use strict';

    var $window = $injector.get('$window');
    var $document = $injector.get('$document');

    var jsonUrl = function (json) {
        var url = $window.encodeURIComponent(json);
        return 'data:text/json;charset=utf8,' + url;
    };

    var DEFAULT_FILE_NAME = 'data';

    var tpl = [
        '<a href="" download="">Download File</a>'
    ].join('');

    var anchor = angular.element(tpl);
    anchor.attr({ download: DEFAULT_FILE_NAME });

    var controller = function ($element, $attrs) {
        $attrs.$observe('nglFileWrite', function (content) {
          anchor.attr({ href: jsonUrl(content) });
        });

        $attrs.$observe('nglFileName', function (name) {
          anchor.attr({ download: name });
        });

        $element.on('click', function () {
          anchor[0].click();
        });
    };

    return {
        scope: true,
        controller: controller
    };
});
