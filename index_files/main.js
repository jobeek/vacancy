$(document).ready(function() {
    $(".form-phone-submit").click(function(event) {
        api.validate(["phone"]);
        if (api.valid) {
            api.sendPhone();
        }
    });

    $(".form-code-submit").click(function(event) {
        api.validate(["code"]);
        if (api.valid) {
            api.sendCode();
        }
    });

    $('#prelendShowMore').click(function () {
        $('.vac-full-details-cropped').removeClass('vac-full-details-cropped');
        $(this).hide()
    })
    
    $('.custom-drop').on('click', function (e) {
        e.preventDefault();
        $(this).parent().find('.custom-dropdown').toggleClass('notices-dropdown--active');
    });

    $('.hamburger').on('click', function(e) {
       e.preventDefault();

       $(this).toggleClass('is-active');

       $('.site-content').toggleClass('site-content--active');

        $('.site-navigation').toggleClass('site-navigation--active');
    });

    $('.ua-search').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('ua-search--active');
        $('.search-container').slideToggle(0);
        $('.search-block').toggleClass('search-block--active');

    });

    $('.payment-block').on('click', function() {
        $(this).toggleClass('pb-border');
        $('.payment-block').not(this).removeClass('pb-border');
        $('.payment-block').not(this).find('.payment-check').prop('checked', false);

    });

    $('.pm-checker .s-input-wrap input').on('focus', function() {
        $('.payment-block .payment-check').prop('checked', true);
    });

    $('.us-select').select2({
        placeholder: " ",
    });

    $('.call-from').select2({
        placeholder: "С 8:00",
    });

    $('.call-to').select2({
        placeholder: "по 19:00",
    });

    $('.b-day').select2({
        placeholder: "Дата",
    });

    $('.b-month').select2({
        placeholder: "Месяц",
    });

    $('.b-year').select2({
        placeholder: "Год",
    });

    $('.b-employ').select2({
        placeholder: "Полная",
    });

    if( $('.c-resume') ) {
        $('.c-resume').select2({});
    }

    if( $('.j-select') ) {
        $('.j-select').select2({});
    }

    $('.d-open').on('click', function(e) {
        e.preventDefault();

        $(this).parents('.user-feature__row').siblings('.user-feature-fields').slideToggle(300);
    });

    $('.ftr-heading').on('click', function() {
        $(this).find('.ftr-arrow-down').toggleClass('arrow-rotate');
        $(this).siblings('.filters-list').slideToggle(200);
        $(this).parents('.ftr-arrow-down').toggleClass('fltr-drop--active');
    });


    $('.rec-item--drop').on('click', function() {
       $(this).find('.rec-item-drop').slideToggle(200);
        $('.rec-item--drop').not(this).find('.rec-item-drop').slideUp(200);
    });


    $('.btn-respond').on('click', function(e) {
       e.preventDefault();

       $('.overlay').addClass('overlay--visible');
       $('.r-modal').addClass('r-modal--active');
    });


    $('.r-modal .close-modal').on('click', function(e) {
       e.preventDefault();

       $('.r-modal').removeClass('r-modal--active');
        $('.overlay').removeClass('overlay--visible');
    });

    $('.overlay').on('click', function() {
        $('.r-modal').removeClass('r-modal--active');
        $('.overlay').removeClass('overlay--visible');
    });

    $('.payment-check').change(function() {
        $(this).parents('.payment-block').toggleClass('payment-block--active');
        $('.payment-check').not(this).parents('.payment-block').removeClass('payment-block--active');
        $('.payment-check').not(this).prop('checked', false);
    });

    $('.s-input-wrap input').on('input', function() {
        $('.placeholder').addClass('placeholder--hidden');
    });

	$("#check_terms").change(function(){
		if ( $("#check_terms").prop("checked")){
		    $(".checkbox-rules-err").hide();
			$(".mb48 .btn").prop("disabled", false);
		} else {
			$(".checkbox-rules-err").show();
			$(".mb48 .btn").prop("disabled", true);
		}
	});

    $('.click-form').on('click', function() {
        let id = $(this).attr('data-vacancy-id');
        $('.vacancy-preview').hide();
        $('.vacancy-content-' + id).show();
        $("#form-phone").appendTo('.vacancy-content-'+id+' .form-content');
        $('.back-container').removeClass('hidden');
        $('html, body').animate({
	        scrollTop: 0
	    });
        
        //$('.vacancy-land-box').hide();
        //$('.preland3.hidden').removeClass('hidden');
    });

    $('.back-btn').on('click', function() {
        $('.vacancy-preview').show();
        $('.vacancy-content ').hide();
        $('.back-container').addClass('hidden');
    });

});
