(function ($) {
    $(document).ready(function () {
        let owl = $('.references-list');
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
        let carouselWidth = $(".references-carousel").outerWidth();
        setPosition(carouselWidth);
        $(window).resize(function () {
            let carouselWidth = $(".references-carousel").outerWidth();
            setPosition(carouselWidth);
        });
        /* Inline Edit input */
        $(".detail-row > .text").blur(function () {

        });

        $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            yearRange: '1972:2018',
            defaultDate: '03/01/1993',
        });

        /* Skills event */
        // Disable Enter key in contenteditable
        $("[contenteditable]").keypress(function (e) { return e.which != 13; });

        // contenteditable Allow only number
        $(".progress-circle > span").on("keypress", function () {
            if (event.keyCode < 48 || event.keyCode > 57) {
                return false;
            }
        });

        $(".progress-bar > span").on("keypress", function () {
            if (event.keyCode < 48 || event.keyCode > 57) {
                return false;
            }
        });


        $(".progress-circle > span").on("click", function () {
            let textOld = $(this).text().trim();
            changeCircleProgress($(this), textOld);
        });

        $(".progress-bar > span").on("click", function () {
            let textOld = $(this).text().trim();
            changeProgressBar($(this), textOld);
        });

        $("#proAdd").on('click', function (e) {
            e.preventDefault();
            let countSkill = $(".skill-progress-circle > .progress-circle-wrapper").length;
            if (countSkill > 0) {
                let getParent = $(this).closest(".skill-button-add");
                let firstElement = $(".skill-progress-circle > .progress-circle-wrapper").first();
                firstElement.clone().insertBefore(getParent);
            } else {
                addCircleProgress($(this));
            }

            $("[contenteditable]").keypress(function (e) { return e.which != 13; });
            $(".progress-circle > span").on("keypress", function () {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    return false;
                }
            });

            $(".progress-circle > span").on("click", function () {
                let textOld = $(this).text().trim();
                changeCircleProgress($(this), textOld);
            });

            $(".progress-circle-del").on('click', function(e){
                e.preventDefault();
                $(this).closest(".progress-circle-wrapper").remove();
            });
        });

        $("#perAdd").on('click', function (e) {
            e.preventDefault();
            let countSkill = $(".skill-progress-bar > .progress-bar-wrapper").length;
            if (countSkill > 0) {
                let getParent = $(this).closest(".skill-button-add");
                let firstElement = $(".skill-progress-bar > .progress-bar-wrapper").first();
                firstElement.clone().insertBefore(getParent);
            } else {
                addProgressBar($(this));
            }

            $("[contenteditable]").keypress(function (e) { return e.which != 13; });
            $(".progress-bar > span").on("keypress", function () {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    return false;
                }
            });

            $(".progress-bar > span").on("click", function () {
                let textOld = $(this).text().trim();
                changeProgressBar($(this), textOld);
            });

            $(".progress-bar-del").on('click', function(e){
                e.preventDefault();
                $(this).closest(".progress-bar-wrapper").remove();
            });
        });

        $(".progress-circle-del").on('click', function(e){
            e.preventDefault();
            $(this).closest(".progress-circle-wrapper").remove();
        });

        $(".progress-bar-del").on('click', function(e){
            e.preventDefault();
            $(this).closest(".progress-bar-wrapper").remove();
        });
    });

    /* Change name events */
    $(".summary-info > .box > h2").blur(function () {
        let newText = $(this).text();
        $(".personal-info > .head > h4").text(newText);
    });
    $(".personal-info > .head > h4").blur(function () {
        let newText = $(this).text();
        $(".summary-info > .box > h2").text(newText);
    });


    /* Function */
    function setPosition(width) {
        if ($(window).width() <= 860) {
            let range = (width / 2 - 110);
            $(".owl-nav button.owl-prev").css("left", range + "px");
            $(".owl-nav button.owl-next").css("right", range + "px");
        } else {
            $(".owl-nav button.owl-prev").css("left", "");
            $(".owl-nav button.owl-next").css("right", "");
        }
    }

    function addCircleProgress(current) {
        let circleItem = '<div class="progress-circle-wrapper"><div class="progress-circle progress-75"><span contenteditable="true">75</span>' +
            '</div><div class="progress-circle-name" contenteditable="true">HTML/CSS</div><a href="#" class="progress-circle-del"><i class="far fa-trash-alt"></i></a></div>';
        $(".skill-progress-circle").prepend(circleItem);
    }

    function changeCircleProgress(current, textOld) {
        $(current).blur(function () {
            let textNew = parseInt($(current).text().trim());
            if (textNew > 100) {
                alert("Skill must be <= 100%");
                $(current).text(textOld);
            } else {
                if( !isNaN(textNew) ) {
                    $(current).closest(".progress-circle").removeClass("progress-" + textOld).addClass("progress-" + textNew);
                } else {
                    $(current).text(textOld);
                }
            }
        });
    }

    function changeProgressBar(current, textOld) {
        $(current).blur(function () {
            let textNew = parseInt($(current).text().trim());
            if (textNew > 100) {
                alert("Skill must be <= 100%");
                $(current).text(textOld);
            } else {
                if( !isNaN(textNew) ) {
                    $(current).closest(".progress-bar").removeClass("progress-" + textOld).addClass("progress-" + textNew);
                } else {
                    $(current).text(textOld);
                }
            }
        });
    }
    
    function addProgressBar(current) {
        let prbarItem = '<div class="progress-bar-wrapper"><div class="progress-bar-name" contenteditable="true">Team work</div>' +
            '<div class="progress-bar progress-75"><span contenteditable="true">75</span></div><a href="#" class="progress-circle-del"><i class="far fa-trash-alt"></i></a></div>';
        $(".skill-progress-bar").prepend(prbarItem);
    }
})(jQuery);
