(function ($) {
    $(document).ready(function () {
        let $owl = $('.references-list');
        $owl.owlCarousel({
            margin: 10,
            nav: true,
            loop: false,
            smartSpeed: 1500,
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
        $(".progress-circle [contenteditable]").keypress(function (e) { return e.which != 13; });
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
        });
        // Dell pro skill
        $(document).on('click', '.progress-circle-del', function () {
            $(this).closest(".progress-circle-wrapper").remove();
        });
        // Del per Skill
        $(document).on('click', '.progress-bar-del', function () {
            $(this).closest(".progress-bar-wrapper").remove();
        });
        /* Experience & Education events */
        $(document).on('click', '#addExperience', function () {
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
        $(document).on('click', '#addEducation', function () {
            let currentCase = $(this).closest(".work-education-case");
            let countExperience = currentCase.find("> .box > .item").length;
            if (countExperience > 0) {
                let firstElement = currentCase.find("> .box > .item").first();
                currentCase.find("> .box").append(firstElement.clone());
            } else {
                addEducation(currentCase.find("> .box"));
            }
        });

        // delete Ex & education
        $(document).on('click', '.case-item-del', function () {
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
    $(document).on('click', '#addProject', function () {
        addProject();
    });
    // Dell project
    $(document).on('click', '.del-project', function () {
        ConfirmPrDelete(this);
    });
    // Process postition projects
    var $grid = $('.portfolio-projects').masonry({
        // options
        itemSelector: '.item',
    });
    // Add References
    $("#addReferences").on('click', function (e) {
        e.preventDefault();
        addReference();
    });

    // Reference Change avatar
    $(document).on('change', '.ip-people-img', function () {
        readURL(this);
    });
    // Reference remove
    $(document).on('click', '.del-reference', function () {
        deleteReference($(this));
    });
    // Scroll Top
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });
    $(document).ready(function() {
        $(".scroll-top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    });
    /* Function */
    function ConfirmPrDelete(current) {
        x = confirm("Are you sure want to delete?");
        if (x) {
            dellProject(current);
        }
    }

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
        let circleItem = `<div class="progress-circle-wrapper">
                            <div class="progress-circle progress-75">
                                <span contenteditable="true">75</span>
                            </div>
                            <div class="progress-circle-name" contenteditable="true">HTML/CSS</div>
                                <button class="progress-circle-del" onclick="return ConfirmDelete()">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </div>`;
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
        let prbarItem = `<div class="progress-bar-wrapper">
                            <div class="progress-bar-name" contenteditable="true">Team work</div>
                            <div class="progress-bar progress-75">
                                <span contenteditable="true">75</span>
                            </div>
                            <button class="progress-bar-del" onclick="return ConfirmDelete()">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>`;
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
        let itemHtml = `<div class="item">
                            <div class="title">(2010 - 2019) ABC COMPANY</div>
                            <div class="pos">Developer</div>
                            <div class="desc text-justify">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummynibh euismod tincidunt
                            </div>
                            <button class="case-item-del" onclick="return ConfirmDelete()">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>`;
        curerntCase.prepend(itemHtml);
    }

    function addEducation(curerntCase) {
        let itemHtml = `<div class="item">
                            <div class="title">(2010 - 2015) DEF University</div>
                            <div class="pos">Student</div>
                            <div class="desc text-justify">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                            </div>
                            <button class="case-item-del" onclick="return ConfirmDelete()">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>`;
        curerntCase.prepend(itemHtml);
    }

    function addProject() {
        let elems = [getItemElement(), reCreateAddBtn()];
        let $elems = $(elems);
        $grid.masonry('remove', $(".portfolio-projects-button-add"));
        $grid.append($elems).masonry('appended', $elems).masonry();
        caculatorPrHeight();
    }

    function getItemElement() {
        let countProject = ($('.portfolio-projects > .item').length - 1) % 10;
        let itemElem = document.createElement('div');
        itemElem.className = 'item d-flex justify-content-center align-items-center item-style-' + countProject;
        let boxElem = document.createElement('div');
        boxElem.className = 'box';
        let textnode = document.createTextNode("Project");
        boxElem.appendChild(textnode);
        //action
        let actionElem = document.createElement('div');
        actionElem.className = 'project-action d-flex';
        //icon
        let viewElem = document.createElement('button');
        let removeElem = document.createElement('button');
        removeElem.className = 'del-project';
        let iView = document.createElement('i');
        iView.className = 'far fa-eye';
        viewElem.appendChild(iView);
        viewElem.setAttribute('data-toggle', "modal");
        viewElem.setAttribute('data-target', "#exampleModal");
        let iRemove = document.createElement('i');
        iRemove.className = 'far fa-trash-alt';
        removeElem.appendChild(iRemove);
        // add button
        actionElem.appendChild(viewElem);
        actionElem.appendChild(removeElem);
        boxElem.appendChild(actionElem);
        itemElem.appendChild(boxElem);
        return itemElem;
    }

    function reCreateAddBtn() {
        let itemElm = document.createElement('div');
        itemElm.className = 'item portfolio-projects-button-add d-flex justify-content-center align-items-center';
        let btnElem = document.createElement('button');
        btnElem.setAttribute("id", "addProject");
        btnElem.className = 'btn btn-active';
        let aText = document.createTextNode("Add project");
        btnElem.appendChild(aText);
        let iElem = document.createElement('i');
        iElem.className = 'fas fa-plus';
        btnElem.appendChild(iElem);
        itemElm.appendChild(btnElem);
        return itemElm;
    }

    function dellProject(current) {
        let curentIndex = $(current).closest(".item").index() % 10;
        $(".portfolio-projects > .item").each(function (index) {
            let item_index = index % 10;
            if (!$(this).hasClass("portfolio-projects-button-add") && item_index === curentIndex) {
                $grid.masonry('remove', $(".item-style-" + curentIndex));
                $(".portfolio-projects > .item-style-" + curentIndex).remove();

            } else if (!$(this).hasClass("portfolio-projects-button-add")) {
                $(this).removeClass("item-style-" + item_index);
            }
        });
        $(".portfolio-projects > .item").each(function (index) {
            let item_index = index % 10;
            if (!$(this).hasClass("portfolio-projects-button-add")) {
                $(this).addClass("item-style-" + item_index);
            }
        });
        $grid.masonry();
        caculatorPrHeight();
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
        let refHtml = `<div class="item d-flex align-items-center flex-wrap">
                            <label for="peopleImg${refIndex}" class="people-avatar">
                                <img id="peopleImg${refIndex}_" src="assets/images/ref-1.png" alt="People avatar" class="w-100 h-100">
                                <input type="file" id="peopleImg${refIndex}" class="d-none ip-people-img">
                            </label>
                            <div class="text text-justify">
                                <span><i class="first">“</i>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh 
                                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                                nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in 
                                <i class="last">”</i>
                                </span>
                            </div>
                            <button class="del-reference" onclick="return ConfirmDelete()">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>`;
        $('.references-list').trigger('add.owl.carousel', [$(refHtml), 0]).trigger('refresh.owl.carousel');
    }

    function deleteReference(current) {
        var curPos = $(current).closest(".item").parent().index();
        $(".owl-carousel").trigger('remove.owl.carousel', [curPos]).trigger('refresh.owl.carousel');
    }
})(jQuery);