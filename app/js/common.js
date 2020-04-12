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
        loop: true,
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
        nav: false,
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



    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

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
});
