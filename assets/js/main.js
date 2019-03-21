(function ($) {
    $(document).ready(function () {
        let owl = $('.references-list');
        owl.owlCarousel({
            margin: 10,
            nav: true,
            loop: false,
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
        /* Change Image vavatar */
        $("#imgLarge").on('change', function () {
            readURL(this);
        });
        $("#imgSmall").on('change', function () {
            readURL(this);
        });
        /* Inline Edit input */
        $(".detail-row > .text").blur(function () {

        });
        // get date picker
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
        // contenteditable Allow only number
        $(".progress-bar > span").on("keypress", function () {
            if (event.keyCode < 48 || event.keyCode > 57) {
                return false;
            }
        });
        // Change pro skill
        $(".progress-circle > span").on("click", function () {
            let textOld = $(this).text().trim();
            changeCircleProgress($(this), textOld);
        });
        // Change per skill
        $(".progress-bar > span").on("click", function () {
            let textOld = $(this).text().trim();
            changeProgressBar($(this), textOld);
        });
        // Add pro skill
        $("#proAdd").on('click', function (e) {
            e.preventDefault();
            let countSkill = $(".skill-progress-circle > .progress-circle-wrapper").length;
            if (countSkill > 0) {
                let getParent = $(this).closest(".skill-button-add");
                let firstElement = $(".skill-progress-circle > .progress-circle-wrapper").first();
                firstElement.clone().insertBefore(getParent);
            } else {
                addCircleProgress();
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
            $(".progress-circle-del").on('click', function (e) {
                e.preventDefault();
                $(this).closest(".progress-circle-wrapper").remove();
            });
        });
        // Add per skill
        $("#perAdd").on('click', function (e) {
            e.preventDefault();
            let countSkill = $(".skill-progress-bar > .progress-bar-wrapper").length;
            if (countSkill > 0) {
                let getParent = $(this).closest(".skill-button-add");
                let firstElement = $(".skill-progress-bar > .progress-bar-wrapper").first();
                firstElement.clone().insertBefore(getParent);
            } else {
                addProgressBar();
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
            $(".progress-bar-del").on('click', function (e) {
                e.preventDefault();
                $(this).closest(".progress-bar-wrapper").remove();
            });
        });
        // Dell pro skill
        $(".progress-circle-del").on('click', function (e) {
            e.preventDefault();
            $(this).closest(".progress-circle-wrapper").remove();
        });
        // Del per Skill
        $(".progress-bar-del").on('click', function (e) {
            e.preventDefault();
            $(this).closest(".progress-bar-wrapper").remove();
        });
        /* Experience & Education events */
        $("#addExperience").on('click', function (e) {
            e.preventDefault();
            let currentCase = $(this).closest(".work-education-case");
            let countExperience = currentCase.find("> .box > .item").length;

            if (countExperience > 0) {
                let firstElement = currentCase.find("> .box > .item").first();
                currentCase.find("> .box").append(firstElement.clone());
            } else {
                addExperience(currentCase.find("> .box"));
            }

            $(".case-item-del").on('click', function (e) {
                e.preventDefault();
                $(this).closest(".item").remove();
            });
        });
        // Add education
        $("#addEducation").on('click', function (e) {
            e.preventDefault();
            let currentCase = $(this).closest(".work-education-case");
            let countExperience = currentCase.find("> .box > .item").length;
            if (countExperience > 0) {
                let firstElement = currentCase.find("> .box > .item").first();
                currentCase.find("> .box").append(firstElement.clone());
            } else {
                addEducation(currentCase.find("> .box"));
            }
            $(".case-item-del").on('click', function (e) {
                e.preventDefault();
                $(this).closest(".item").remove();
            });
        });
        // delete Ex & education
        $(".case-item-del").on('click', function (e) {
            e.preventDefault();
            $(this).closest(".item").remove();
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

    /* Portfolio */
    $(".portfolio-projects").css("max-height", 600);
    caculatorPrHeight();
    $(".portfolio-projects > .item").each(function (index) {
        let item_index = index % 10;
        if (!$(this).hasClass("portfolio-projects-button-add")) {
            $(this).addClass("item-style-" + item_index);
        }
    });
    // Add project
    $("#addProject").on('click', function (e) {
        e.preventDefault();
        addProject();
        $(".del-project").on('click', function (e) {
            e.preventDefault();
            dellProject(this);
        });
    });
    // Dell project
    $(".del-project").on('click', function (e) {
        e.preventDefault();
        dellProject(this);
    });
    // Process postition projects
    $('.portfolio-projects').masonry({
        // options
        itemSelector: '.item',
    });
    // Add References
    $("#addReferences").on('click', function (e) {
        e.preventDefault();
        addReference();
        $(".del-reference").on('click', function (e) {
            e.preventDefault();
            deleteReference($(this));
        });
    });
    // Reference Change avatar
    $(".ip-people-img").on('change', function () {
        readURL(this);
    });
    // Reference delete
    $(".del-reference").on('click', function (e) {
        e.preventDefault();
        deleteReference($(this));
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

    function addCircleProgress() {
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
                if (!isNaN(textNew)) {
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
                if (!isNaN(textNew)) {
                    $(current).closest(".progress-bar").removeClass("progress-" + textOld).addClass("progress-" + textNew);
                } else {
                    $(current).text(textOld);
                }
            }
        });
    }

    function addProgressBar() {
        let prbarItem = '<div class="progress-bar-wrapper"><div class="progress-bar-name" contenteditable="true">Team work</div>' +
            '<div class="progress-bar progress-75"><span contenteditable="true">75</span></div><a href="#" class="progress-circle-del"><i class="far fa-trash-alt"></i></a></div>';
        $(".skill-progress-bar").prepend(prbarItem);
    }

    function readURL(input) {
        var fileTypes = ['jpg', 'jpeg', 'png'];
        if (input.files && input.files[0]) {
            var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
                isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
            if (isSuccess) {
                var reader = new FileReader();
                var imgId = "#" + $(input).attr("id") + "_";
                reader.onload = function (e) {
                    $(imgId).attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                $(input).val(null);
            }
        }
    }

    function addExperience(curerntCase) {
        let itemHtml = '<div class="item"><div class="title">(2010 - 2019) ABC COMPANY</div><div class="pos">Developer' +
            '</div><div class="desc text-justify">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummynibh' +
            'euismod tincidunt</div></div>';
        curerntCase.prepend(itemHtml);
    }

    function addEducation(curerntCase) {
        let itemHtml = '<div class="item"><div class="title">(2010 - 2015) DEF University</div><div class="pos">' +
            'Student</div><div class="desc text-justify">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy ' +
            'nibh euismod tincidunt</div></div>';
        curerntCase.prepend(itemHtml);
    }

    function addProject() {
        let projectHTML = '<div class="item d-flex justify-content-center align-items-center"><div class="box">' +
            'Project</div><a href="#" class="del-project"><i class="far fa-trash-alt"></i></a></div>';
        $(projectHTML).insertBefore(".portfolio-projects-button-add");
        $(".portfolio-projects > .item").each(function (index) {
            $(this).removeAttr('style');
            let item_index = index % 10;
            if (!$(this).hasClass("portfolio-projects-button-add")) {
                $(this).addClass("item-style-" + item_index);
            }
        });
        caculatorPrHeight();

        setTimeout(function () {
            var $container = $('.portfolio-projects');
            $container.masonry('reloadItems');
            $container.masonry();
        }, 0);
    }

    function dellProject(current) {

        $(".portfolio-projects > .item").each(function (index) {
            let item_index = index % 10;
            if (!$(this).hasClass("portfolio-projects-button-add")) {
                $(this).removeClass("item-style-" + item_index);
            }
        });
        $(current).closest(".item").remove();
        $(".portfolio-projects > .item").each(function (index) {
            let item_index = index % 10;
            $(this).removeAttr('style');
            if (!$(this).hasClass("portfolio-projects-button-add")) {
                $(this).addClass("item-style-" + item_index);
            }
        });
        caculatorPrHeight();
        setTimeout(function () {
            var $container = $('.portfolio-projects');
            $container.masonry('reloadItems');
            $container.masonry();
        }, 0);
    }

    function caculatorPrHeight() {
        let countImg = $(".portfolio-projects > .item-style-0").length;
        if (countImg >= 1) {
            if ($(".portfolio-projects > .item-style-9").length === countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg) + $(".portfolio-projects-button-add").height());
            } else if ($(".portfolio-projects > .item-style-8").length === (countImg) && $(".portfolio-projects > .item-style-9").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg));
            } else if ($(".portfolio-projects > .item-style-7").length === (countImg) && $(".portfolio-projects > .item-style-8").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg));
            } else if ($(".portfolio-projects > .item-style-6").length === (countImg) && $(".portfolio-projects > .item-style-7").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg));
            } else if ($(".portfolio-projects > .item-style-5").length === (countImg) && $(".portfolio-projects > .item-style-6").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg));
            } else if ($(".portfolio-projects > .item-style-4").length === (countImg) && $(".portfolio-projects > .item-style-5").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg - 1) + 400);
            } else if ($(".portfolio-projects > .item-style-3").length === (countImg) && $(".portfolio-projects > .item-style-4").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg - 1) + 400);
            } else if ($(".portfolio-projects > .item-style-2").length === (countImg) && $(".portfolio-projects > .item-style-3").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg - 1) + 400);
            } else if ($(".portfolio-projects > .item-style-1").length === (countImg) && $(".portfolio-projects > .item-style-2").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg - 1) + 400);
            } else if ($(".portfolio-projects > .item-style-1").length === (countImg) && $(".portfolio-projects > .item-style-0").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg - 1) + 200);
            } else if ($(".portfolio-projects > .item-style-0").length === (countImg) && $(".portfolio-projects > .item-style-1").length < countImg) {
                $(".portfolio-projects").css("max-height", 600 * (countImg - 1) + 200);
            }
        }
    }

    function addReference() {
        let countRef = $(".references-list .owl-stage > .owl-item").length;
        let refIndex = 1;
        if (countRef > 1) {
            refIndex = countRef + 1;
        }
        let refHtml = '<div class="item d-flex align-items-center flex-wrap"><label for="peopleImg' + refIndex + '" class="people-avatar">' +
            '<img id="peopleImg' + refIndex + '_" src="assets/images/ref-1.png" alt="People avatar"><input type="file" id="peopleImg' + refIndex + '" class="d-none ip-people-img"></label><div class="text text-justify">' +
            '<span><i class="first">“</i>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ' +
            'euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis ' +
            'nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. ' +
            'Duis autem vel eum iriure dolor in hendrerit in <i class="last">”</i></span></div><a href="#" class="del-reference">' +
            '<i class="far fa-trash-alt"></i></a></div>';
        $('.references-list').trigger('add.owl.carousel', [$(refHtml), 0]).trigger('refresh.owl.carousel');
        $(".ip-people-img").on('change', function () {
            readURL(this);
        });
    }

    function deleteReference(current) {
        var curPos = $(this).closest(".item").parent().index();
        $(".owl-carousel").trigger('remove.owl.carousel', [curPos]).trigger('refresh.owl.carousel');
    }
})(jQuery);