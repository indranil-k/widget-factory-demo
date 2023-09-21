
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
    this.modal.find(".modal-content").text(this.options.modalContent);

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


  $.widget("custom.modalWithColorPicker", $.custom.modal, {
      options: {
        colorPickerId: "colorPicker", // ID for the color picker input field
        selectedColor: "#ff0000", // Default selected color
      },
    
      _create: function () {
        // Call the parent _create function
        this._super();
    
        // Add color picker input field to the modal content
        this.colorPickerInput = $("<input>", {
          id: this.options.colorPickerId,
          type: "color",
          value: this.options.selectedColor,
        }).appendTo(this.modal.find(".modal-content"));
    
        // Add a button to open the color picker
        this.colorPickerButton = $("<button>", {
          text: "Pick a Color",
          class: "color-picker-button",
        }).appendTo(this.modal.find(".modal-content"));
    
        var self = this;
    
        // Event handler to update the selected color
        this.colorPickerInput.on("input", function () {
          var selectedColor = $(this).val();
          self.options.selectedColor = selectedColor;
        });
    
        // Event handler to open the color picker dialog
        this.colorPickerButton.on("click", function () {
          self.openColorPicker();
        });
      },
    
      openColorPicker: function () {
        // Trigger a click event on the color picker input field
        $("#" + this.options.colorPickerId).trigger("click");
      },
    
      open: function () {
        // Call the parent open function
        this._super();
    
        // Show the color picker input field and button
        this.colorPickerInput.show();
        this.colorPickerButton.show();
      },
    
      close: function () {
        // Call the parent close function
        this._super();
    
        // Hide the color picker input field and button
        this.colorPickerInput.hide();
        this.colorPickerButton.hide();
      },
  });
    
  // Usage
      var modalWithColorPicker = $("#modalWithColorPicker").modalWithColorPicker({
      modalTitle: "Modal with Color Picker",
      modalContent: "Pick a color:",
      isOpen: false, // Set to true to open the modal by default
  });
  
  // Open the modal with color picker
  modalWithColorPicker.modalWithColorPicker("open");