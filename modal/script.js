$(document).ready(function() {
            
    //Default modal
    $("#modal1").modal({
        modalClass: "custom-modal-class",
        //overlayClass: "custom-overlay-class",
        closeButtonClass: "custom-close-button-class",
        isOpen: false, // The modal and overlay will be shown on initialization
        closeOnOverlayClick: false, // to close modal on clicking outside of modal        
        modalTitle: "Default modal title", // Default modal title
        modalContent: "Modals are used to draw the user's attention to important information, actions, or decisions that require immediate attention. They help prevent users from performing other actions until the modal is dealt with, making them ideal for critical or confirmatory tasks.", // Default modal content
        appendTo: ".modal-1"
    });

    $("#modalBtn1").on("click", function() {
        $("#modal1").modal("open");
    });

    //modal with overlay
    $("#modal2").modal({
        modalClass: "custom-modal-class",
        overlayClass: "custom-overlay-class",
        closeButtonClass: "custom-close-button-class",
        isOpen: false, // The modal and overlay will be shown on initialization
        closeOnOverlayClick: false, // to close modal on clicking outside of modal        
        modalTitle: "Modal with overlay title", // Default modal title
        modalContent: "Modals are used to draw the user's attention to important information, actions, or decisions that require immediate attention. They help prevent users from performing other actions until the modal is dealt with, making them ideal for critical or confirmatory tasks.", // Default modal content
        appendTo: ".modal-2"
    });

    $("#modalBtn2").on("click", function() {
        $("#modal2").modal("open");
    });

    //open modal with overlay click
    $("#modal3").modal({
        modalClass: "custom-modal-class",
        overlayClass: "custom-overlay-class",
        closeButtonClass: "custom-close-button-class",
        isOpen: true, // The modal and overlay will be shown on initialization
        closeOnOverlayClick: false, // to close modal on clicking outside of modal        
        modalTitle: "Pre-loaded Modal with overlay title", // Default modal title
        modalContent: "Modals are used to draw the user's attention to important information, actions, or decisions that require immediate attention. They help prevent users from performing other actions until the modal is dealt with, making them ideal for critical or confirmatory tasks.", // Default modal content
        appendTo: ".modal-3"
    });

    $("#modalBtn3").on("click", function() {
        $("#modal3").modal("open");
    });

    //modal with overlay click
    $("#modal4").modal({
        modalClass: "custom-modal-class",
        overlayClass: "custom-overlay-class",
        closeButtonClass: "custom-close-button-class",
        isOpen: false, // The modal and overlay will be shown on initialization
        closeOnOverlayClick: true, // to close modal on clicking outside of modal        
        modalTitle: "Modal with overlay click title", // Default modal title
        modalContent: "Modals are used to draw the user's attention to important information, actions, or decisions that require immediate attention. They help prevent users from performing other actions until the modal is dealt with, making them ideal for critical or confirmatory tasks.", // Default modal content
        appendTo: ".modal-4"
    });

    $("#modalBtn4").on("click", function() {
        $("#modal4").modal("open");
    });
    
});