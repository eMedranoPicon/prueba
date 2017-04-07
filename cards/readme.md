
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

   gulp sass  
   gulp sass-lint  
   gulp scripts  
   gulp jshint

   Default task include the following tasks 'sass-lint', 'jshint', 'sass', 'vendor-scripts', 'scripts' and 'watch'. 'test' was removed by it could be included again if it is necesary.


3. Important: If I forgot something, call me, ask jewellery boys or better 
   call Saul ;)


# Useful links

1. Resources

  * [HTML5 W3C Reference] (http://dev.w3.org/html5/html-author)
  * [HTML5 MDN guide] (https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) and [tags reference] (https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list)
  * [SASS] (http://sass-lang.com/guide) language reference.
  * [CSS Guide Lines] (http://cssguidelin.es) is **the main guidelines to follow in the project to successfully complete it in a sane, manageable and scalable way**.
  * [BEM notation] (https://bem.info/method/definitions) applyed to css naming, but it must be used [carefully] (http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax)
  * [OOCSS] (http://appendto.com/2014/04/oocss) introduction
  * [Javascript patterns] (http://shichuan.github.io/javascript-patterns)

2. Testing resources:

  * [Karma] (http://karma-runner.github.io/0.12/intro/how-it-works.html) test runner
  * [Jasmine] (http://jasmine.github.io/2.0/introduction.html) testing framework
  * [Jasmine-query] (https://github.com/velesin/jasmine-jquery/) extension for Jasmine
  * [PhantomJS] (http://phantomjs.org)  headless WebKit scriptable with a JavaScript API
  * [Jasmine Spy Cheatsheet] (http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet)
  * [Spying on JS methods with Jasmine] (http://blog.codeship.com/jasmine-spyon) how to
  * [Basic jQuery testing with Jasmine] (http://matthewroach.me/basic-jquery-testing-with-jasmine-part-1) how to

3. Gulp plugins

  * [autoprefixer] (https://www.npmjs.org/package/gulp-autoprefixer/)
  * [cache] (https://www.npmjs.org/package/gulp-cache/)
  * [concat] (https://www.npmjs.org/package/gulp-concat/)
  * [del] (https://www.npmjs.org/package/del/)
  * [showhelp] (https://www.npmjs.org/package/gulp-showhelp/)
  * [jshint] (https://www.npmjs.org/package/gulp-jshint/)
  * [karma] (https://www.npmjs.org/package/gulp-karma/)
  * [minifycss] (https://www.npmjs.org/package/gulp-minify-css/)
  * [notify] (https://www.npmjs.org/package/gulp-notify/)
  * [rename] (https://www.npmjs.org/package/gulp-rename/)
  * [runSequence] (https://www.npmjs.org/package/run-sequence/)
  * [sass] (https://www.npmjs.org/package/gulp-sass/)
  * [uglify] (https://www.npmjs.org/package/gulp-uglify/)
