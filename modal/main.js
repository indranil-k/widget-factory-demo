
$.widget("custom.modal", {
  options: {
    modalClass: "",
    overlayClass: "",
    closeButtonClass: "",
    isOpen: false, // Set default isOpen to false
    closeOnOverlayClick: false, // Add closeOnOverlayClick option
    modalTitle: "My Custom Modal Title",
    modalContent: "This is my custom modal content.",
    appendTo: "",
  },

  _create: function () {
    var self = this;
    this.modal = this.element;
    this.overlay = $("<div>", { class: "modal-overlay" }).appendTo(this.options.appendTo);
    this.closeButton = $("<button>", { text: "", class: "modal-close-btn" }).appendTo(this.modal);

    // Add custom classes
    this.modal.addClass(this.options.modalClass);
    this.overlay.addClass(this.options.overlayClass);
    this.closeButton.addClass(this.options.closeButtonClass);

    // Hide the modal and overlay initially
    this.modal.hide();
    this.overlay.hide();

    // Handle click on the overlay to close the modal
    if (this.options.closeOnOverlayClick) {
      this.overlay.on("click", function () {
        self.close();
      });
    }

    // Handle click on the close button to close the modal
    this.closeButton.on("click", function () {
      self.close();
    });

    // Set initial title and content
    this.modal.find(".modal-title").text(this.options.modalTitle);
    // this.modal.find(".modal-content").text(this.options.modalContent);
    this.modal.find(".modal-content").html(this.options.modalContent);

    // Allow the widget to be initialized in an open or closed state
    if (this.options.isOpen) {
      this.open();
    }

  },

  open: function () {
    this.overlay.show();
    this.modal.show();
  },

  close: function () {
    this.overlay.hide();
    this.modal.hide();
  }
});