(function ($) {

    "use strict";

    $.fn.ajaxForm = function (options) {
        options = $.extend({}, $.fn.ajaxForm.defaults, options);

        function callHandler(name, form, args) {
            if (typeof options[name] === "function") {
                options[name].apply(form, [].slice.call(args, 0));
            }
        }

        return this.filter("form").each(function () {
            var settings, dataType, form = this;

            settings = $.extend({}, {
                url: $(this).prop("action"),
                type: $(this).prop("method"),
                data: $(this).serialize()
            }, options);

            dataType = $(this).attr("data-dataType");
            if (typeof dataType === "string") {
                settings.dataType = dataType;
            }

            settings.beforeSend = function () {
                $(this).addClass("ajaxForm-loading");
                callHandler("beforeSend", form, arguments);
            };

            settings.complete = function () {
                $(this).removeClass("ajaxForm-loading");
                callHandler("complete", form, arguments);
            };

            $(this).on("submit", function (event) {
                event.preventDefault();

                $.ajax(settings);
            });
        });
    };

    $.fn.ajaxForm.defaults = {};

})(jQuery);