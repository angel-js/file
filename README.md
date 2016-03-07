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
nglFileRead(file, type)
.then(function (content) { ... });
```

  * **file:** a file from an `input[type="file"]`
  * **type:** file type: `[ 'binary' | 'text' ]`. Defaults to `binary`
  * **content:** the file content

### `nglFileImage`

```js
nglFileImage(content)
.then(function (image) { ... });
```

  * **content:** the image content `URL`-encoded
  * **image:** a `new window.Image()` instance

Works well with `nglFileRead`

```js
nglFileRead(file)
.then(nglFileImage)
.then(function (image) { ... });
```

References

  * http://stackoverflow.com/questions/5173796/html5-get-image-dimension
  * http://renevier.net/misc/resizeimg.html
  * https://gist.github.com/pfraces/04889c82006f77864a4a

### `<ngl-file-on-change>`

Opens a file selection dialog and calls `callback` passing the selected files

Low-level wrapper to `input[type=file].addEventListener('change')`

  * must be placed on `input[type=file]` elements only
  * doesn't emit event when selecting the same file multiple times in a row

```html
<input type="file" ngl-file-on-change="callback" />
```

```js
$scope.callback = function (files) { ... };
```

References

  * http://stackoverflow.com/a/19647381/1815446

### `<ngl-file-dialog>`

Opens a file selection dialog and calls `callback` passing the selected files

High-level abstraction to `input[type=file]` elements

  * can't be placed on `input[type]` elements
  * listen to `click` events
  * allow selecting the same file multiple times in a row

```html
<button ngl-file-dialog="callback">Select</button>
```

```js
$scope.callback = function (files) { ... }
```

References

  * Use same file multiple times: http://stackoverflow.com/a/27346890/1815446

### `<ngl-file-write>`

Stores **JSON** as a file download

```html
<div ngl-file-write="{{ content }}" ngl-file-name="lorem.txt"></div>
```

```js
$scope.content = 'lorem ipsum ...';
```

References

  * Create a file from JavaScript: http://stackoverflow.com/a/20343999/1815446
  * Save/download data generated in Javascript: http://hackworthy.blogspot.com.es/2012/05/savedownload-data-generated-in.html
