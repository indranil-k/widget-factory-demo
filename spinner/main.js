$.widget("custom.spinner", {
    options: {
        initialValue: 0,
        step: 1,
        allowNegative: false,
        increamentIcon: '+',
        decreamentIcon: '-',
    },
 
    _create: function () {
        this.element.addClass('wf-spinner');
        this._createSpinner();
        this._attachEvents();
    },
 
    _createSpinner: function () {
        
        var spinnerContainer = $("<div>").addClass("spinner");
        this.element.append(spinnerContainer);
 
        if(this.element.hasClass('wf-spinner')) {
        
            var input = $("<input>").attr({type: "text", value: this.options.initialValue}).appendTo(spinnerContainer);
            var spinnerButtons = $("<div>").addClass("spinner-buttons").appendTo(spinnerContainer);
    
            $("<button>").attr("class", "spinner-plus").html(this.options.increamentIcon).appendTo(spinnerButtons);
            $("<button>").attr("class", "spinner-minus").html(this.options.decreamentIcon).appendTo(spinnerButtons);
        
        }
    },
 
    _attachEvents: function () {

        var input = this.element.find("input");
        var upButton = this.element.find(".spinner-plus");
        var downButton = this.element.find(".spinner-minus");
 
        var self = this;
        upButton.on("click", function () {
            self._increaseValue(input);
        });
 
        downButton.on("click", function () {
            self._decreaseValue(input);
        });
 
        input.on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.UP) {
                event.preventDefault();
                self._increaseValue(input);
            } else if (event.keyCode === $.ui.keyCode.DOWN) {
                event.preventDefault();
                self._decreaseValue(input);
            }
        });
    },
 
    _increaseValue: function (input) {

        var value = parseInt(input.val());
        var step = this.options.step;
        var newValue = value + step;
 
        if (this.options.allowNegative || newValue >= 0) {
            input.val(newValue);
            this._trigger("change", null, { value: newValue });
        }
    },
 
    _decreaseValue: function (input) {
        
        var value = parseInt(input.val());
        var step = this.options.step;
        var newValue = value - step;
 
        if (this.options.allowNegative || newValue >= 0) {
            input.val(newValue);
            this._trigger("change", null, { value: newValue });
        }
    },
 
    _destroy: function () {
        this.element.empty();
    }
});

$.widget("custom.timer", $.custom.spinner, {
    options: {
        expandable: true,
        endTime: 0,
        timerDelay: 1000,
    },

    _create: function () {
        this.element.addClass('wf-timer');
        this._createSpinner();
        this._attachEvents();
        this._startTimer();
    },

    _startTimer: function () {
        var self = this;
        var timerValue = this.options.initialValue;

        var timerContainer = this.element;
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

            if (!self.options.allowNegative && isNegative) {
                timerValue = 0;
            }

            var absTimerValue = Math.abs(timerValue);
            var seconds = absTimerValue % 60;
            var minutes = Math.floor(absTimerValue / 60);

            isNegative ? $(timerminus).text("-") : $(timerminus).text("");
            $(timerminutes).text(minutes.toString().padStart(2, '0'));
            $(timerseconds).text(seconds.toString().padStart(2, '0'));

            self._trigger("change", null, { value: timerValue });

            if (timerValue <= self.options.endTime) {
                clearInterval(timerInterval);
                timerPlayButton.text('Play');
            }

            timerValue -= self.options.step;
        }

        timerPlayButton.on("click", function () {
            if (timerPlayButton.text() === "Pause") {
                clearInterval(timerInterval);
                timerPlayButton.text("Play");
            } else {
                timerInterval = setInterval(updateTimer, self.options.timerDelay);
                timerPlayButton.text("Pause");
            }
        });

        timerInterval = setInterval(updateTimer, self.options.timerDelay);
    },
});