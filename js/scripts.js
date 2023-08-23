$(document).ready(function () {

    'use strict'

    // WOW
    var wow = new WOW(
        {
            boxClass: 'wow',      // default
            animateClass: 'animated', // default
            offset: 0,          // default
            mobile: false,       // true
            live: false        // true
        });
    wow.init();

    // lightGallery inicialization
    if (document.getElementById('lightgallery')) {
        $("#lightgallery").lightGallery();
    }

    // Main nav menu actions
    var toggleMenu = function () {
        $('.js-page-header').toggleClass("page-header--is-shown");
        $('.js-mobile-menu-btn .icon-bar').toggleClass("icon-bar--is-toggled");
        $('.js-page-header__brand').toggleClass("page-header__brand--is-hidden");
    }

    $(".js-mobile-menu-btn").on('click', function () {
        toggleMenu();
    });

    // Countdown timer
    var currTime = new Date();
    var currDate = currTime.getDate();
    var currMonth = currTime.getMonth() - 10;
    var currYear = currTime.getFullYear() + 1;
    var eventTime = currYear + "/" + currMonth + "/" + currDate;

    $('#countdown').countdown('2023/09/05', function (event) {
        $(this).html(event.strftime(''
            + '<span class="timer__item">%D<span class="timer__item-caption">ngày</span></span>'
            + '<span class="timer__item">%H<span class="timer__item-caption">giờ</span></span>'
            + '<span class="timer__item">%M<span class="timer__item-caption">phút</span></span>'
            + '<span class="timer__item">%S<span class="timer__item-caption">giây</span></span>'));
    });
    $('#countdown2').countdown('2023/09/05', function (event) {
        $(this).html(event.strftime(''
            + '<span class="timer__item">%D<span class="timer__item-caption">ngày</span></span>'
            + '<span class="timer__item">%H<span class="timer__item-caption">giờ</span></span>'
            + '<span class="timer__item">%M<span class="timer__item-caption">phút</span></span>'
            + '<span class="timer__item">%S<span class="timer__item-caption">giây</span></span>'));
    });

    // Video
    var videoPlay1 = $('.js-video__play1'),
        videoPlay2 = $('.js-video__play2'),
        videoPlay3 = $('.js-video__play3'),
        videoPlay4 = $('.js-video__play4'),
        video1 = document.querySelector('#video1'),
        video2 = document.querySelector('#video2'),
        video3 = document.querySelector('#video3'),
        video4 = document.querySelector('#video4'),
        videoPoster1 = $('.js-video-block-poster1'),
        videoPoster2 = $('.js-video-block-poster2'),
        videoPoster3 = $('.js-video-block-poster3'),
        videoPoster4 = $('.js-video-block-poster4');

    var toggleVideo = function (btn, video, poster) {
        btn.toggleClass('video-block__play--is-playing');
        poster.toggleClass('video-block__poster--is-hidden');

        video.addEventListener('ended', function (e) {
            video.load();
            btn.removeClass('video-block__play--is-playing');
            poster.removeClass('video-block__poster--is-hidden');
        });

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    videoPlay1.on('click', function () {
        toggleVideo(videoPlay1, video1, videoPoster1);
    });
    videoPlay2.on('click', function () {
        toggleVideo(videoPlay2, video2, videoPoster2);
    });
    videoPlay3.on('click', function () {
        toggleVideo(videoPlay3, video3, videoPoster3);
    });
    videoPlay4.on('click', function () {
        toggleVideo(videoPlay4, video4, videoPoster4);
    });


    //smooth scrolling
    $('a[href*="#"]:not([href="#"])').on('click', function (e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            toggleMobileMenu();
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    var toggleMobileMenu = function () {
        if ($(window).width() < 768) {
            $('.menu-collapsed').toggleClass("menu-expanded");
        }
    };

    // Ticket card mouseover effect
    var screenWidth = window.screen.width / 2,
        screenHeight = window.screen.height / 2,
        elem = $('.js-ticket'),
        perspective = 'perspective(700px)';

    function isMobileDevice() {
        const mobileUserAgents = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return mobileUserAgents.some(agent => navigator.userAgent.match(agent));
    }

    elem.on('mousemove', function (e) {
        if (isMobileDevice()) {
            return;
        }

        var centroX = e.clientX - screenWidth,
            centroY = screenHeight - e.clientY,
            degX = centroX * 0.02,
            degY = centroY * 0.02;
        $(e.currentTarget).css({
            '-webkit-transform': perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
            '-moz-transform': perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
            '-ms-transform': perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
            '-o-transform': perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
            'transform': perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)'
        });
    });

    // Tabs in conference
    // Not proper event delegation, but this method from official Bootstrap docs
    $('.js-tabs-block a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // Ajax for register form
    $('#register-form').submit(function () {
        var name = $('input[name="username"]').val();
        var email = $('input[name="email"]').val();
        var message = $('input[name="phone"]').val();

        var formData = {
            name: name,
            email: email,
            message: message
        };

        $.ajax({
            type: "POST",
            url: '/comment.php',
            data: formData,
            success: function () {
                $('#form-submit-errors').text("Success!");
            },
            error: function () {
                $('#form-submit-errors').text("Something went wrong...");
            }
        });

        return false;
    });
    fetch('./config.json')
        .then((response) => response.json())
        .then((json) => {
            $('[data-lity]').attr('href', json.url);
        })
});
