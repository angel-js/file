angular.module('ngl.file', [])

.factory('nglFileRead', function ($window, $q) {
    'use strict';

    var TYPE_METHOD = {
      binary: 'readAsDataURL',
      text: 'readAsText'
    };

    var read = function (file, type) {
        var deferred = $q.defer();
        var method = TYPE_METHOD[type || 'binary'];
        var reader = new $window.FileReader();

        reader.onload = function (event) {
            deferred.resolve(event.target.result);
        };

        reader[method](file);
        return deferred.promise;
    };

    return read;
})

.factory('nglFileReadImage', function ($window, $q, nglFileRead) {
    'use strict';

    var readImage = function (file) {
        var deferred = $q.defer();
        var image = new $window.Image();

        image.onload = function () { deferred.resolve(image); };
        image.onerror = function () { deferred.reject(file); };

        nglFileRead(file)
        .then(function (content) { image.src = content; })
        ['catch'](image.onerror);

        return deferred.promise;
    };

    return readImage;
})

.directive('nglFileOnChange', function ($parse) {
    'use strict';

    var link = function (scope, element, attr) {
        var callback = $parse(attr.nglFileOnChange)(scope);

        element.on('change', function (event) {
            var files = event.target.files;
            if (!files.length) { return; }
            
            scope.$apply(function () {
                callback(files);
            });
        });
    };

    return {
        link: link
    };
})

.directive('nglFileOnSelect', function ($parse) {
    'use strict';

    var tpl = [
        '<form>',
            '<input type="file" />',
        '</form>'
    ].join('');

    var link = function (scope, element, attr) {
        var form = angular.element(tpl);
        var input = form.children('input');
        var callback = $parse(attr.nglFileOnSelect)(scope);

        input.on('change', function (event) {
            var files = event.target.files;
            if (!files.length) { return; }
            
            scope.$apply(function () {
                callback(files);
            });
        });

        element.on('click', function () {
            form[0].reset();
            input[0].click();
        });
    };

    return {
        link: link
    };
})

.directive('nglFileWrite', function ($window, $document) {
    'use strict';
    
    var tpl = [
        '<a href="" download="">Download File</a>'
    ].join('');

    var jsonUrl = function (json) {
        var url = $window.encodeURIComponent(json);
        return 'data:text/json;charset=utf8,' + url;
    };

    var link = function (scope, element, attrs) {
        var form = angular.element(tpl);
        var anchor = form.children('a');
        
        attrs.$observe('nglFileWrite', function (filename) { anchor.attr({ download: filename }); });
        attrs.$observe('nglFileContent', function (content) { anchor.attr({ href: jsonUrl(content) }); });
        element.on('click', function () { anchor[0].click(); });
    };

    return {
        link: link
    };
});
