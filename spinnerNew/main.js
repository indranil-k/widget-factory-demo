$.widget("custom.customSpinner", $.ui.spinner, {
    options: {
        disabled: false, //Disables the spinner if set to true.
        min: 0, //Specifies the minimum allowed value for the spinner.
        max: 90, //Specifies the maximum allowed value for the spinner.
        numberFormat: "C", //Defines the format for displaying numbers.
        page: 2, //Determines the number of steps to change when using the page up/page down keys.
        icons: {
            upIcon: "+", //Allows customization of the increament icon displayed in the spinner.
            downIcon: "-", //Allows customization of the decrement icon displayed in the spinner.
        },
        create: function(event, ui) {//Callback before spinner loads.
        },
        spin: function(event, ui) { //Callback when the user increments or decrements the value.
        },
        stop: function(event, ui) { //Callback when the user stops spinning the value.
        },
        change: function(event, ui) { //Callback when the value of the spinner changes.
        },
        culture: "en-US", //Specifies the culture (locale) for formatting numbers.
        step: 1, //Sets the increment or decrement step for the spinner.
        initialValue: 0, //Allows to set initiall value in the spinner. It should be greater then min value
    },

    _create: function() {
        this.element.addClass('wf-spinner-input');
        setTimeout(function() {
            var parentElement = this.element.closest('span');
            parentElement.addClass('wf-spinner');

            parentElement.find('.ui-spinner-up .ui-button-icon').text(this.options.icons.upIcon);
            parentElement.find('.ui-spinner-down .ui-button-icon').text(this.options.icons.downIcon);
        }.bind(this), 0);

        if(this.options.initialValue < this.options.min) {
            this.element.val(this.options.min);
        } else {
            this.element.val(this.options.initialValue);
        }

        this._super();
    },
});

$.widget("custom.customTimer", $.custom.customSpinner, {
    options: {
        expandable: true,
        endTime: 0,
        timerDelay: 1000,
    },

    _create: function () {
        this.element.addClass('wf-timer');
        this._startTimer();
    },

    _startTimer: function () {
        var self = this;
        var timerValue = self.options.min;

        var timerContainer = $('.timer-container');
        var timerCounter = $("<div>").addClass("timer-counter").appendTo(timerContainer);
        var timerPlayButton = $("<button>").addClass("timerPlayButton").text('Pause').appendTo(timerContainer);
        var timerminus = $("<span>").addClass("timer-minus").appendTo(timerCounter);
        var timerminutes = $("<span>").addClass("timer-minutes").text('00').appendTo(timerCounter);
        var timerseparator = $("<span>").addClass("timer-separator").text(':').appendTo(timerCounter);
        var timersecondsContainer = $("<div>").addClass("timer-seconds-container").appendTo(timerCounter);
        var timerseconds = $("<span>").addClass("timer-seconds").text('00').appendTo(timersecondsContainer);

        var timerInterval;

        function updateTimer() {
            var isNegative = timerValue < 0;

            var absTimerValue = Math.abs(timerValue);
            var seconds = absTimerValue % 60;
            var minutes = Math.floor(absTimerValue / 60);

            isNegative ? $(timerminus).text("-") : $(timerminus).text("");
            $(timerminutes).text(minutes.toString().padStart(2, '0'));
            $(timerseconds).text(seconds.toString().padStart(2, '0'));

            self._trigger("change", null, { value: timerValue });

            if (timerValue >= self.options.max) {
                clearInterval(timerInterval);
                timerPlayButton.text('Reset');
            }

            timerValue += self.options.step;
        }

        timerPlayButton.on("click", function () {
            if (timerPlayButton.text() === "Pause") {
                clearInterval(timerInterval);
                timerPlayButton.text("Play");
            } else if (timerPlayButton.text() === "Reset") {
                timerValue = self.options.min;
                timerInterval = setInterval(updateTimer, self.options.timerDelay);
                timerPlayButton.text('Pause');
            } else {
                timerInterval = setInterval(updateTimer, self.options.timerDelay);
                timerPlayButton.text("Pause");
            }
        });

        timerInterval = setInterval(updateTimer, self.options.timerDelay);
    },
});