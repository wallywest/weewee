## Using Gulp

### 1. Install gulp globally:

```
npm install -g gulp
```

### 2. Install gulp in your project devDependencies:

```
npm install --save-dev gulp
```

### 3. Create a `gulpfile.js` at the root of your project:

```javascript
var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});
```

### 4. Run gulp:

```
gulp
