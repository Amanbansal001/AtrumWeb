import $ from 'jquery';


export const hideModal = (id) => {
    $(`#${id}`).modal('hide');
}

export const showModal = (id) => {
    
    $(`#${id}`).modal();
}

export const youtubeIframe = () => {
    $("#player").remove();
}

export const easyzoom_call = () => {
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

export const mobileMenu = () => {
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

    var header = $(".header");
    $(window).scroll(function () {
        var scroll = $(window).window.scrollTop();
        if (scroll >= 100) {
            header.removeClass('header').addClass("darkHeader");
        } else {
            header.removeClass("darkHeader").addClass('header');
        }
    });
}

export const viewingRoomOwl = () => {
    window.viewingRoomOwl();
}

export const showLoader = () => {

    document.querySelectorAll('.loader-div').forEach(e => {
        e.classList.remove('hide');
    })
};


export const hideLoader = () => {
    document.querySelectorAll('.loader-div').forEach(e => {
        e.classList.add('hide');
    })
};


export const validateEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
}

export const mmddyyyy = (date, delimitor = "-") => {
    var today = new Date(date);
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    
    today = `${mm}${delimitor}${dd}${delimitor}${yyyy}`;
    
    return today;
}

export const ddmmyyyy = (date, delimitor = "-") => {
    var today = new Date(date);
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    
    today = `${dd}${delimitor}${mm}${delimitor}${yyyy}`;
    

    return today;
}

export const prevDay = () => {
    var d = new Date();
    d.setTime(d.getTime() - (1 * 86400000));

    return yyyymmdd(d);
}


export const nthDay = (nth) => {
    var d = new Date();
    d.setTime(d.getTime() + (nth * 86400000));

    return yyyymmdd(d);
}

export const yyyymmdd = (date, delimitor = "-") => {
    var today = new Date(date);
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    
    today = `${yyyy}${delimitor}${mm}${delimitor}${dd}`;
   
    return today;
}

export const auctionDate=(date, delimitor = "-")=>{

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var today = new Date(date);
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    var hh = today.getHours();

    var min = today.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }

    var ss = today.getSeconds();
    if (ss < 10) {
        ss = '0' + ss;
    }

    var ampm = hh >= 12 ? 'pm' : 'am';
    hh = hh % 12;
    hh = hh ? hh : 12; 
    today = `${monthNames[today.getMonth()]} ${dd} `
    return today;
}


export const isMobile = () => {
    var isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return isMobileDevice;
}

export const component_init = () => {
    window.call_zoom();
}

export const deepCopy = async (data) => {
    return JSON.parse(JSON.stringify(data));
}

export const toDecimal = (data) => {
    data = !data ? 0 : data;
    data = parseFloat(data);
    return data.toFixed(2);
}

export const flatten = (obj, path = '') => {
    if (!(obj instanceof Object)) return { [path.replace(/\.$/g, '')]: obj };

    return Object.keys(obj).reduce((output, key) => {
        return obj instanceof Array ?
            { ...output, ...flatten(obj[key], path + '[' + key + '].') } :
            { ...output, ...flatten(obj[key], path + key + '.') };
    }, {});
}