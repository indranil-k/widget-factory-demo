$.widget("custom.offcanvas", {
    options: {
        width: '250px',
        animationDuration: 300,
        openEvent: 'custom.offcanvas.open',
        closeEvent: 'custom.offcanvas.close'
    },

    _create: function () {
        this.element.addClass("offcanvas");
        this.element.css({
            'height':'fit-content',
            'width': this.options.width,
            'transform': 'translateX(-' + this.options.width + ')',
            'transition': 'transform ' + this.options.animationDuration + 'ms ease-in-out'
        });

        this.element.find('.offcanvas-content').css('padding', '20px');

        this._on(this.element.find('.closeBtn'), {
            'click': '_close'
        });

        this._on(this.element, {
            'keydown': '_handleKeyDown'
        });
        this.toggleState=1;
    },

    _open: function () {
        this.element.css('height','fit-content')
        this.element.css('transform', 'translateX(0)');
        this.element.focus();
        $(this.element).trigger(this.options.openEvent)
    },

    _close: function () {
        this.element.css('height','0')
        this.element.css('transform', 'translateX(-' + this.options.width + ')');
        $(this.element).trigger(this.options.closeEvent, null, {widget:this});
    },

    _handleKeyDown: function (event) {
        if (event.key === 'Escape') {
            this._close();
        }
    },

    open: function () {
        this._open();
    },

    close: function () {
        this._close();
    }
});

$.widget("custom.sidebar", $.custom.offcanvas, {
    options: {
        position: 'top', // Position of the sidebar ('top')
    },

    _create: function () {
        this._super(); // Call the _create method of the parent offcanvas widget

        // Customize sidebar appearance based on the position
        this.element.css({
            'width': '100%', // Adjust width to 100% for top position
            'transform': 'translateY(-100%)', // Start off-screen
            'transition': 'transform ' + this.options.animationDuration + 'ms ease-in-out'
        });
        // Add additional styling for top-position sidebar
        this.isToggled=false;
        this.element.addClass("sidebar");
    },

    toggle: function () {
        if (!this.isToggled) {
            this.element.css({
                'transform': 'translateY(0)',
            });
            this.element.focus();
            this.isToggled=true;
        } else {
            this.element.css({
                'transform': 'translateY(-100%)',
            });
            this.isToggled=false;
        }
    }
    // Additional methods specific to the top-position sidebar widget can be added here
});




