
# Installation

1. To install dependencies, assuming that you already have installed node, npm and ruby at least.

   Check what gems are installed with `gem list` should be, at least,

      sass (3.4.13)  
      scss-lint (0.37.0)

   if not, install or update sass and scss-lint

   Check if bower is available with `bower -v` if it is missing, install it

   globally with `npm install -g bower` 

   Check if gulp is available with `gulp -v` if it is missing, install it

   globally with `npm install -g gulp` 


2. Gulp tasks, try `gulp help` and it will display all availabe tasks with a description.

   Main tasks:

   gulp default  
   gulp dist  
   gulp dist --release  

   Default task include the following tasks 'sass-lint', 'jshint', 'sass', 'vendor-scripts', 'scripts' and 'watch'.



# Useful links

1. Resources

  * [HTML5 W3C Reference] (http://dev.w3.org/html5/html-author)
  * [HTML5 MDN guide] (https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) and [tags reference] (https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list)
  * [SASS] (http://sass-lang.com/guide) language reference.
  * [CSS Guide Lines] (http://cssguidelin.es) is **the main guidelines to follow in the project to successfully complete it in a sane, manageable and scalable way**.
  * [BEM notation] (https://bem.info/method/definitions) applyed to css naming, but it must be used [carefully] (http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax)
  * [OOCSS] (http://appendto.com/2014/04/oocss) introduction
  * [Javascript patterns] (http://shichuan.github.io/javascript-patterns)

2. Gulp plugins

  * [del] (https://www.npmjs.org/package/del/)
  * [gulp-autoprefixer] (https://www.npmjs.com/package/gulp-autoprefixer/)
  * [gulp-concat] (https://www.npmjs.com/package/gulp-concat/)
  * [gulp-connect] (https://www.npmjs.com/package/gulp-connect/)
  * [gulp-github-release] (https://www.npmjs.com/package/gulp-git-release/)
  * [gulp-jshint] (https://www.npmjs.com/package/gulp-jshint/)
  * [gulp-minify-css] (https://www.npmjs.com/package/gulp-minify-css/)
  * [gulp-notify] (https://www.npmjs.com/package/gulp-notify/)
  * [gulp-prompt] (https://www.npmjs.com/package/gulp-prompt/)
  * [gulp-sass] (https://www.npmjs.com/package/gulp-sass/)
  * [gulp-shell] (https://www.npmjs.com/package/gulp-shell/)
  * [gulp-uglify] (https://www.npmjs.com/package/gulp-uglify/)
  * [gulp-zip] (https://www.npmjs.com/package/gulp-zip/)
  * [jshint-stylish] (https://www.npmjs.com/package/jshint-stylish/)
  * [run-sequence] (https://www.npmjs.com/package/run-sequence/)
  * [yargs] (https://www.npmjs.com/package/yargs/)
