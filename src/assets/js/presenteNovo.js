import jQuery from 'jquery';


jQuery(document).ready(function ($) {

$("#tema-categoria").on("change", function(){
    $("input[name=tema-categoria]").val($(this).val());
});

$(document).on("click", ".deleteImage", function(){
    $(".presentes-2 .card-gift-thumb img").remove();
    $(".card-gift-thumb").css("background-image", "");
})

}
)