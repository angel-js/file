ngl.file
========

Angular 1.x file utils

Install
-------

    bower install ngl.file

API
---

### `nglFileRead`

```js
nglFileRead(file, type).then(function (content) { ... });
```

  * **file:** a file from an `input[type="file"]`
  * **type:** file type: `[ 'binary' | 'text' ]`. Defaults to `binary`
  * **content:** the file content

### `nglFileReadImage`

```js
nglFileReadImage(file).then(function (image) { ... });
```

  * **file:** a file from an `input[type="file"]`
  * **image** a `new window.Image()` instance

References

  * http://stackoverflow.com/questions/5173796/html5-get-image-dimension
  * http://renevier.net/misc/resizeimg.html
  * https://gist.github.com/pfraces/04889c82006f77864a4a

### `<ngl-file-on-change>`

Simple wrapper to `input[type=file].addEventListener('change')`

  * must be placed on `input[type=file]` elements only
  * doesn't emit event when selecting the same file multiple times in a row

```html
<input type="file" ngl-file-on-change="handleFileChange" />
```

```js
$scope.handleFileChange = function (files) { ... };
```

References

  * http://stackoverflow.com/a/19647381/1815446

### `<ngl-file-on-select>`

Higher-level abstraction to `input[type=file]` elements

  * can't be placed on `input[type]` elements
  * listen to `click` events
  * allow selecting the same file multiple times in a row

```html
<button ngl-file-on-select="handleFileSelect">Select</button>
```

```js
$scope.handleFileSelect = function (files) { ... }
```

References

  * Use same file multiple times: http://stackoverflow.com/a/27346890/1815446

### `<ngl-file-write>`

```html
<div ngl-file-write="lorem.txt" ngl-file-content="{{ content }}"></div>
```

```js
$scope.content = 'lorem ipsum ...';
```

References

  * Create a file from JavaScript: http://stackoverflow.com/a/20343999/1815446
  * Save/download data generated in Javascript: http://hackworthy.blogspot.com.es/2012/05/savedownload-data-generated-in.html
