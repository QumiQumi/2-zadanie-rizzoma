import "./dropdown.scss";
(function ($) {
    $.fn.dropdown = function (options) {
        let defaults = {
            maxItems: Infinity,
            minItems: 0,
            items: {},
            multiple: false,
            width: 320,
        };

        this.each(function () {
            let settings = $.extend({}, defaults, options);

            const $this = $(this);
            const $head = $this.find(".dropdown__head");
            const $text = $this.find(".dropdown__text");
            const $icon = $this.find(".dropdown__icon");
            const $list = $this.find(".dropdown__list");
            const $clearBtn = $this.find(".dropdown__clear");
            const $applyBtn = $this.find(".dropdown__apply");
            let $items = null;
            let minSum = 0;
            let totalSum = 0;
            let isHidden = true;
            const multiple = $this.attr("multiple") ? true : settings.multiple;

            setVariables();

            // Обработка нажатия на дропдаун
            $head.on("click", function () {
                toggleDropdown();
            });

            // Обработка кнопки применить
            $applyBtn.on("click", function () {
                toggleDropdown();
            });

            function setVariables() {
                $items = $this.find(".dropdown__item").map(function () {
                    return {
                        item: $(this),
                        value: $(this).attr("value"),
                        text: $(this).find(">span").text(),
                        sum: $(this).attr("minItems"),
                        minItems: $(this).attr("minItems"),
                        maxItems: $(this).attr("maxItems"),
                    };
                });
                $items.each(function () {
                    if (this.sum) minSum += parseInt(this.sum);
                });
                let width = $this.attr("width")
                    ? $this.attr("width")
                    : settings.width;
                $this.css("width", width);
            }
            function toggleDropdown() {
                $list.toggleClass("show");
                let afterContentText = isHidden
                    ? "keyboard_arrow_up"
                    : "keyboard_arrow_down";
                $icon.text(afterContentText);
                isHidden = !isHidden;
            }
            function hideDropdown() {
                if (!isHidden) {
                    $list.toggleClass("show");
                    let afterContentText = isHidden
                        ? "keyboard_arrow_up"
                        : "keyboard_arrow_down";
                    $icon.text(afterContentText);
                    isHidden = !isHidden;
                }
            }
            // Обработка кнопки очистки
            $clearBtn.on("click", function () {
                totalSum = minSum;
                toggleClearBtn();
                $items.each(function () {
                    this.sum = $(this).attr("minItems");
                    this.item.find(".dropdown__number span").text(this.sum);
                    this.item.find(".dropdown__minus").css("opacity", 0.5);
                });
                updateTextfield();
            });

            $items.each(function () {
                let item = this;
                const $item = this.item;
                const $minus = $item.find(".dropdown__minus");
                const $plus = $item.find(".dropdown__plus");
                const $number = $item.find(".dropdown__number span");

                const minItems = Number(
                    item.minItems ? item.minItems : settings.minItems
                );
                const maxItems = Number(
                    item.maxItems ? item.maxItems : settings.maxItems
                );

                setItem();

                // Обработка кнопки плюс
                $plus.on("click", function () {
                    if (item.sum < maxItems) {
                        if (item.sum == minItems) $minus.css("opacity", 1);
                        updateSum("plus");
                    }
                });

                // Обработка кнопки минус
                $minus.on("click", function () {
                    if (item.sum > minItems) {
                        if (item.sum == minItems + 1)
                            $(this).css("opacity", 0.5);
                        updateSum("minus");
                    }
                });
                function updateSum(operation) {
                    switch (operation) {
                        case "minus": {
                            item.sum--;
                            totalSum--;
                            break;
                        }
                        case "plus": {
                            item.sum++;
                            totalSum++;
                            break;
                        }
                    }
                    $number.text(item.sum);
                    toggleClearBtn();
                    updateTextfield();
                }

                function setItem() {
                    $number.text(minItems);
                    totalSum += minItems;
                }
                updateTextfield();
            });
            function toggleClearBtn() {
                if (totalSum === minSum) {
                    $clearBtn.css("visibility", "hidden");
                } else {
                    $clearBtn.css("visibility", "visible");
                }
            }
            function updateTextfield() {
                if (multiple) {
                    let text = "";
                    let isFirst = true;
                    $items.each(function () {
                        if (this.sum != 0)
                            if (isFirst) {
                                text += `${this.sum} ${this.text}`;
                                isFirst = false;
                            } else text += `, ${this.sum} ${this.text}`;
                    });
                    $text.text(text);
                } else {
                    let text = "гость";
                    if (totalSum > 1 && totalSum < 5) text = "гостя";
                    else if (totalSum >= 5 && totalSum < 21) text = "гостeй";

                    if (totalSum === 0) $text.text("Сколько гостей");
                    else $text.text(`${totalSum} ${text}`);
                }
            }
        });

        return this;
    };
})(jQuery);

$(function () {
    $(".dropdown").dropdown({ maxItems: 5 });
});
