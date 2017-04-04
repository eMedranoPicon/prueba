$.AccordionSoft = function( options, element ) {

    this.$el            = $( element );
    // list items
    this.$items         = this.$el.children('ul').children('li');
    // total number of items
    this.itemsCount     = this.$items.length;

    // initialize accordion
    this._init( options );

};

$.AccordionSoft.defaults         = {
    // index of opened item. -1 means all are closed by default.
    open                : 0,
    // if set to true, only one item can be opened.
    // Once one item is opened, any other that is
    // opened will be closed first
    oneOpenedItem       : true,
    // speed of the open / close item animation
    speed               : 450,
    // easing of the open / close item animation
    easing              : 'linear',
    // speed of the scroll to action animation
    scrollSpeed         : 900,
    // easing of the scroll to action animation
    scrollEasing        : 'easeInOutExpo',
    // margin between last element of open content and the next accordion header
    marginToNextHeader  : 20,
    // enable or disable accordion scroll
    enableScroll        : true
};

$.AccordionSoft.prototype         = {
    _init                 : function( options ) {

        this.options        = $.extend( true, {}, $.AccordionSoft.defaults, options );

        // validate options
        this._validate();

        // current is the index of the opened item
        this.current        = this.options.open;

        // hide the contents so we can fade it in afterwards
        this.$items.find('div.st-content').hide();

        // save original height and top of each item
        this._saveDimValues();

        // if we want a default opened item...
        if( this.current !== -1 )
            this._toggleItem( this.$items.eq( this.current ), false );

            // initialize the events
        this._initEvents();

    },


    _firstItem            : function( $item ) {
        var $content = $item.find('div.st-content');
        var $header  = $item.find('.header-accordion span');

        ( $item.hasClass( 'st-open' ) )

        ? ( this.current = -1,
            $content.stop(true, true).fadeOut( this.options.speed ),
            $header.stop(true, true).fadeIn( this.options.speed ),
            $item.removeClass( 'st-open' ).stop().animate({
                        height    : $item.data( 'originalHeight' )
                      },
                  this.options.speed, this.options.easing )
          )

            : ( this.current = $item.index(),
            $content.stop(true, true).fadeIn( this.options.speed ),
            $header.stop(true, true).fadeOut( this.options.speed ),
            $item.addClass( 'st-open' ).stop().animate({
                        height    : $item.data( 'originalHeight' ) + $content.outerHeight( true ) + this.options.marginToNextHeader
                      },
                  this.options.speed, this.options.easing )
          );

    },


    _toggleItem            : function( $item, scroll ) {

        var $content = $item.find('div.st-content');
        var $header  = $item.find('.header-accordion span');

        ( $item.hasClass( 'st-open' ) )

        ? ( this.current = -1,
            $content.stop(true, true).fadeOut( this.options.speed ),
            $header.stop(true, true).fadeIn( this.options.speed ),
            $item.removeClass( 'st-open' ).stop().animate({
                    height    : $item.data( 'originalHeight' )
                },
                this.options.speed, this.options.easing )
            )

        : ( this.current = $item.index(),
            $content.stop(true, true).fadeIn( this.options.speed ),
            $header.stop(true, true).fadeOut( this.options.speed ),
            $item.addClass( 'st-open' ).stop().animate({
                    height    : $item.data( 'originalHeight' ) + $content.outerHeight( true ) + this.options.marginToNextHeader
                },
                this.options.speed, this.options.easing ),
                 ( scroll ?    this._scroll( this ) : '')
            );

  },


    // checks if there is any opened item
        _isOpened            : function() {

            return ( this.$el.find('li.st-open').length > 0 );

        },


    _saveDimValues        : function() {
        this.$items.each( function() {
            var $item        = $(this);

            $item.data({
                originalHeight   : $item.find('div.header-accordion').height(),
                offsetTop        : $item.offset().top
            });

        });

    },


    // validate options
    _validate            : function() {
        // open must be between -1 and total number of items, otherwise we set it to -1
        if( this.options.open < -1 || this.options.open > this.itemsCount - 1 )
            this.options.open = -1;
    },


    _initEvents            : function() {
        var instance, $item;

        instance        = this;

        // open / close item
        this.$items.find('div.header-accordion').bind('click.accordion', function() {

            $item       = $(this).parent();

            // close any opened item if oneOpenedItem is true
            if( instance.options.oneOpenedItem && instance._isOpened() && instance.current!== $item.index() ) {

                instance._toggleItem( instance.$items.eq( instance.current ), instance.options.enableScroll );

            }

            // open / close item
            instance._toggleItem( $item, instance.options.enableScroll );

            return false;

        });

        $(window).bind('smartresize.accordion', function() {

            // reset original item values
            instance._saveDimValues();

            // reset the content's height of any item that is currently opened
            instance.$el.find('li.st-open').each( function() {

                var $this    = $(this);
                $this.css( 'height', $this.data( 'originalHeight' ) + $this.find('div.st-content').outerHeight( true ) );

            });

            // scroll to current
            if( instance._isOpened() )
                instance._scroll();

        });

  },


  // scrolls to current item or last opened item if current is -1
    _scroll                : function( instanceArg ) {

        var instance    = instanceArg || this, current;

        ( instance.current !== -1 ) ? current = instance.current : current = instance.$el.find('li.st-open:last').index();

        $('html, body').stop().animate({
            scrollTop    : ( instance.options.oneOpenedItem ) ? instance.$items.eq( current ).data( 'offsetTop' ) : instance.$items.eq( current ).offset().top
        }, instance.options.scrollSpeed, instance.options.scrollEasing );

    }
};


$.fn.accordionSoft     = function( options ) {
    var args, instance;

    if ( typeof options === 'string' ) {
        args = Array.prototype.slice.call( arguments, 1 );
        this.each(function() {
            instance = $.data( this, 'accordion' );
            if ( !instance ) {
                logError( "cannot call methods on accordion prior to initialization; " +
                "attempted to call method '" + options + "'" );
                return;
            }
            if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
                logError( "no such method '" + options + "' for accordion instance" );
                return;
            }
            instance[ options ].apply( instance, args );
        });
    }
    else {
        this.each(function() {
            instance = $.data( this, 'accordion' );
            if ( !instance ) {
                $.data( this, 'accordion', new $.AccordionSoft( options, this ) );
            }
        });
    }
    return this;
};