import "./textfield.scss";
(function ($) {
    $.fn.textfield = function (options) {
        let defaults = {
            width: 320,
            withButton: false,
            onButtonClick: () => {},
        };

        this.each(function () {
            let settings = $.extend({}, defaults, options);
            let $this = $(this);
            let $button = $this.find(".textfield__button");

            setTextfield();
            $button.on("click", function () {
                settings.onButtonClick();
            });
            function setTextfield() {
                let width = $this.attr("width")
                    ? $this.attr("width")
                    : settings.width;
                $this.css("width", width);

                let withButton = $this.attr("withButton")
                    ? true
                    : settings.withButton;
                if (withButton) {
                    console.log($button);
                    $button.addClass("show");
                }
            }
        });
        return this;
    };
})(jQuery);

$(function () {
    $(".textfield").textfield({});
});
