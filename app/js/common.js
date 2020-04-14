$(document).ready(function(){

    //*** mobile-mnu customization *****//
    var mmenu = $('#mobile-mnu');
    var $mmenu = mmenu.mmenu({
        "pageScroll": true,

        "navbar": {
            "title" : "Навигация",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            // "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-wrapper"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        setTimeout(function(){
            $('.mmenu-btn').addClass('is-active')
        }, 300);

    });

    $('#close-mnu').click(function(e){
        e.preventDefault();
        API.close();
    });

    API.bind( "close:start", function() {
        setTimeout(function() {
            $('.mmenu-btn').removeClass( "is-active" );
        }, 300);
    });
    //***** end mobile-mnu customization *****//


    $('.mm-menu nav a').click(function(){
        API.close();
    });

    function heightses() {
        $('.advantage-item-title').height('auto').equalHeights();
        $('.advantage-item-desc').height('auto').equalHeights();
        $('.feature-item').height('auto').equalHeights();
        $('.partner-item').height('auto').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });

    setTimeout(function(){
        heightses();
    }, 300);

    $('.advantages-slider').owlCarousel({
        nav: false,
        items: 1,
        margin: 30,
        dots: false,
        autoHeight: true,
        autoWidth: true,
        loop: true
    });

    $('.how-navs-slider').owlCarousel({
        nav: false,
        items: 1,
        margin: 15,
        dots: false,
        autoHeight: true,
        autoWidth: true,
        loop: false,
        responsive : {
            0 : {
                margin: 8
            },
            480 : {
                margin: 15
            }
        }
    });

    $('.features-slider').owlCarousel({
        nav: true,
        navText: ['',''],
        items: 1,
        margin: 30,
        dots: false,
        autoWidth: true,
        loop: true,
        responsive : {
            0 : {
                margin: 8
            },
            480 : {
                margin: 30
            }
        }
    });

    $('.partners-slider').owlCarousel({
        nav: false,
        items: 1,
        margin: 8,
        dots: false,
        autoWidth: true,
        loop: true,
    });

    $('.preloader').fadeOut();

    $('.checkbox-label input').styler();

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });


    $(function() {
        $(".btn-popup").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });



    //E-mail Ajax Send
    $(".contact-form").submit(function() { //Change
        var th = $(this);
        var t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });

    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [18, 18],
                });

            map.geoObjects.add(myPlacemark);
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }




    $('.how-nav').click(function(e){
        e.preventDefault();
        var th = $(this);
        var slide = $(this).attr('data-slide');
        var currentSlide = $('.how-item.active');
        var currentSlideId = currentSlide.attr("id");
        var neddedSlide = $('#'+slide);

        currentSlide.removeClass('active');

        if(slide > currentSlideId) {
            currentSlide.addClass('prev');
        } else {
            currentSlide.addClass('next');
        }

        neddedSlide.removeClass('prev').removeClass('next').addClass('active');


        $('.how-nav').removeClass('active');
        $('.how-nav-'+ slide).addClass('active');

        console.log(slide)
    })

    $(window).scroll(function() {
        if($(this).scrollTop() > 10) {
            $('.main-head').addClass('sticky');
        } else {
            $('.main-head').removeClass('sticky');
        }
    });

    $(".main-mnu a, .foot-mnu a").mPageScroll2id();
});
