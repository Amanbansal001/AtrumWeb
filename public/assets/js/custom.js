function easyzoom_call() {
    // Instantiate EasyZoom instances
    var $easyzoom = $('.easyzoom').easyZoom();

    // Setup thumbnails example
    var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');

    $('.thumbnails').on('click', 'a', function (e) {
        var $this = $(this);

        e.preventDefault();

        // Use EasyZoom's `swap` method
        api1.swap($this.data('standard'), $this.attr('href'));
    });

    // Setup toggles example
    var api2 = $easyzoom.filter('.easyzoom--with-toggle').data('easyZoom');

    $('.toggle').on('click', function () {
        var $this = $(this);

        if ($this.data("active") === true) {
            $this.text("Switch on").data("active", false);
            api2.teardown();
        } else {
            $this.text("Switch off").data("active", true);
            api2._init();
        }
    });

}

$(function () {
    //caches a jQuery object containing the header element
    var header = $(".header");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            header.removeClass('header').addClass("darkHeader");
        } else {
            header.removeClass("darkHeader").addClass('header');
        }
    });
});


(function ($) {
    $.fn.countTo = function (options) {
        options = options || {};

        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from: $(this).data('from'),
                to: $(this).data('to'),
                speed: $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals: $(this).data('decimals')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof (settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof (settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));

jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });

    // start all the timers
    $('.timer').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }
});

$(".menu-icon").click(function () {
    $(".mobile-menu").addClass("showmenu");
    $("body").addClass("bodybox");
});
$(".back").click(function () {
    $(".mobile-menu").removeClass("showmenu");
    $("body").removeClass("bodybox");
});
$(".mobile-menu li a").click(function () {
    $(".mobile-menu").removeClass("showmenu");
    $("body").removeClass("bodybox");
});


function viewingRoomOwl() {
    var $owl = $('.owl-carousel');
    console.log('owl', $owl);
    if (!$owl) {
        return false;
    }

    $owl.children().each(function (index) {
        $(this).attr('data-position', index); // NB: .attr() instead of .data()
    });


    console.log('owl.owlCarousel', $owl.owlCarousel);
    if (!$owl.owlCarousel) { return false; }

    $owl.owlCarousel({
        margin: 40,
        center: true,
        loop: true,
        mouseDrag: true,
        responsive: {
            0: {
                items: 1,
                loop: true,
                mouseDrag: true,
            },
            600: {
                items: 1,
                loop: true,
                mouseDrag: true,
            },
            1000: {
                items: 4,
                loop: true,
                mouseDrag: true,
            }
        }
    });

    $(document).on('click', '.owl-item>div', function () {
        // see https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html#to-owl-carousel
        var $speed = 300;  // in ms
        $owl.trigger('to.owl.carousel', [$(this).data('position'), $speed]);
    });
}

function touchStart() {
    $('.carousel').on('touchstart', function (event) {
        const xClick = event.originalEvent.touches[0].pageX;
        $(this).one('touchmove', function (event) {
            const xMove = event.originalEvent.touches[0].pageX;
            const sensitivityInPx = 5;

            if (Math.floor(xClick - xMove) > sensitivityInPx) {
                $(this).carousel('next');
            }
            else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
                $(this).carousel('prev');
            }
        });
        $(this).on('touchend', function () {
            $(this).off('touchmove');
        });
    });
}

function select2_init(classname = 'select2') {
    // $('.' + classname).select2();
    // setTimeout(() => {
        
    //     $("."+classname).select2("destroy").select2();
    // }, 1500)
}

function paymentCallC(){
    var messageObj = {message: 'payment_cancel'};
    var stringifiedMessageObj = JSON.stringify(messageObj);
    webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);
}

function paymentCallF(){
    var messageObj = {message: 'payment_finish'};
    var stringifiedMessageObj = JSON.stringify(messageObj);
    webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj); 
}