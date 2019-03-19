(function ($) {
    $(document).ready(function () {
        var owl = $('.references-list');
        owl.owlCarousel({
            margin: 10,
            nav: true,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
            }
        });

        /* Caculating distance of carousel nav button */
            var carouselWidth = $(".references-carousel").outerWidth();
            setPosition(carouselWidth);
            $(window).resize(function () {
                var carouselWidth = $(".references-carousel").outerWidth();
                setPosition(carouselWidth);
            });
    });
})(jQuery);

function setPosition(width) {
    if($(window).width() <= 860) {
        var range = (width / 2 - 110);
        $(".owl-nav button.owl-prev").css("left", range + "px");
        $(".owl-nav button.owl-next").css("right", range + "px");
    } else {
        $(".owl-nav button.owl-prev").css("left", "");
        $(".owl-nav button.owl-next").css("right", "");
    }
}