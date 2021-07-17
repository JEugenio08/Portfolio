"use strict";
(function ($) {

    var $gridIsotope = null;

    $(document).ready(function () {
        init();
    });

    $(document).resize(function () {
        $gridIsotope ? $gridIsotope.isotope() : null;
    })
    $(document).load(function () {
        $gridIsotope ? $gridIsotope.isotope() : null;
    })

    // Theme initialization function.
    function init() {
        setTimeout(isotopePortfolio, 50);
        contactFormValidation();
        initialEvents();
        spyScroll();


    }

    // Theme initial events function.
    function initialEvents() {
        if ($('[data-toggle="tooltip"]').length) {
            $('[data-toggle="tooltip"]').tooltip({});
        }

        if ($('.circle-progress').length) {
            $('.circle-progress').circleProgress({
                animation: true,
                lineCap: 'round',
                fill: {gradient: ['#ff1e41', '#ff1e41']}
            });
        }

        if ($('.smooth-scroll').length) {
            new SmoothScroll('.smooth-scroll',  {
                speed: 500,
                speedAsDuration: true
            });
        }
    }

    // Isotope
    function isotopePortfolio() {
        if ($(".portfolio-items").length) {
            var $elements = $(".portfolio-items"),
                $filters = $(".portfolio-filter ul li");

            $gridIsotope = $elements.isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows',
            });


            $filters.on("click", function () {
                $filters.removeClass("active");
                $(this).addClass("active");
                var selector = $(this).data("filter");
                $(".portfolio-items").isotope({
                    filter: selector,
                    hiddenStyle: {
                        transform: "scale(.2)",
                        opacity: 0,
                    },
                    visibleStyle: {
                        transform: "scale(1)",
                        opacity: 1,
                    },
                    transitionDuration: ".4s",
                });
            });
        }
    }

    function spyScroll() {
        var scrollSpy = new bootstrap.ScrollSpy(document.body, {
            target: '#navbar-top'
        })
    }

    // Validate Contact Form.
    function contactFormValidation() {
        if ($("#contact-form").length) {
            $("#contact-form").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                    },

                    email: "required",
                    message: "required"

                },

                messages: {
                    name: "Please enter your name",
                    email: "Please enter your email address",
                    message: "Please write a message"
                },

                submitHandler: function (form) {
                    $.ajax({
                        type: "POST",
                        url: "mail.php",
                        data: $(form).serialize(),
                        success: function () {
                            $("#loader").hide();
                            $("#success").slideDown("slow");
                            setTimeout(function () {
                                $("#success").slideUp("slow");
                            }, 3000);
                            form.reset();
                        },
                        error: function () {
                            $("#loader").hide();
                            $("#error").slideDown("slow");
                            setTimeout(function () {
                                $("#error").slideUp("slow");
                            }, 3000);
                        },
                    });
                    return false;
                },

            });
        }
    }

})($);
