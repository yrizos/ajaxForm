(function ($) {

    $.fn.ajaxForm = function (options) {

        var settings = $.extend({}, $.fn.ajaxForm.defaults, options);

        return this.each(function () {
            var $form = $(this);
            dataType = $form.attr("data-dataType");
            if (dataType != undefined) settings.dataType = dataType;

            $form.on("submit", function (event) {
                event.preventDefault();

                $.ajax({
                    type: $form.attr("method"),
                    url: $form.attr("action"),
                    data: $form.serialize(),
                    cache: false,
                    dataType: settings.dataType,
                    beforeSend: function () {
                        $form.addClass("ajaxForm-loading");

                        if (typeof settings.beforeSend == "function") settings.beforeSend.call($form);
                    },
                    complete: function () {
                        $form.removeClass("ajaxForm-loading");

                        if (typeof settings.complete == "function") settings.complete.call($form);
                    },
                    success: function (response) {
                        if (typeof settings.success == "function") settings.success.call($form, response);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (typeof settings.error == "function") settings.error.call($form, XMLHttpRequest, textStatus, errorThrown);
                    }
                });
            });
        });
    };

    $.fn.ajaxForm.defaults = {
        dataType: "json",
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function () {
        },
        error: function () {
        }
    };

})(jQuery);