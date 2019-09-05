import jQuery from 'jquery';

jQuery(document).ready(function ($) {
    $( document ).on( 'change', 'form.sidebar input[type=checkbox], form.sidebar input[type=radio]', function( event ) {
        event.preventDefault( );
        $( '#submit-form-button-hidden' ).click();
    });

    $( document ).on( 'change', 'form.sidebar input.period-custom-text', function( event ) {
        event.preventDefault( );

    	$( '#custom-period-label' ).click();
    	$( '#submit-form-button-hidden' ).click();
    });

    $( document ).on( 'change', 'form.sidebar input#search-field', function( event ) {
        event.preventDefault( );
        $( '#submit-form-button-hidden' ).click();
    });
})