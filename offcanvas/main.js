$("#sidebar").sidebar({
    width: '250px',
    position: 'left',
});
$('.h-menu').on('click', function(){
    $("#sidebar").sidebar("toggle");
})
// Handle the click event on the expand item
$("#expandItem").on("click", function () {
    $("#sidebar").sidebar("toggle");
});
$('#openBtn1').on('click', function () {
        $('#offcanvas1').offcanvas('open');
    });

$('#offcanvas1').offcanvas({
    width: '300px',
    animationDuration: 300,
    openEvent: 'custom.offcanvas.show',
    closeEvent: 'custom.offcanvas.hide'
});

$('#offcanvas1').on('custom.offcanvas.show', function () {
    console.log('Offcanvas is shown.');
});

$('#offcanvas1').on('custom.offcanvas.hide', function () {
    console.log('Offcanvas is hidden.');
});


//second
$('#openBtn2').on('click', function () {
    $('#offcanvas2').offcanvas('open');
});

$('#offcanvas2').offcanvas({
    width: '300px',
    animationDuration: 1000,
    openEvent: 'custom.offcanvas.login',
    closeEvent: 'custom.offcanvas.logout'
});

$('#offcanvas2').on('custom.offcanvas.login', function () {
    $('.toggle-btn')
        .toggleClass('primary-button')
        .attr('disabled','true')
});

$('#offcanvas2').on('custom.offcanvas.logout', function () {
    $('.toggle-btn')
        .text('Login')
        .toggleClass('primary-button')
        .removeAttr('disabled')
});
$('#myform').on('submit',e=>{
    e.preventDefault();
    $('.toggle-btn').text('Logout');
    $('.toggle-btn').addClass('logout-btn');
    $('#offcanvas2').trigger('custom.offcanvas.login')
    $('#offcanvas2').close();
})