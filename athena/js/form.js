$(document).ready(function () {
    $("#idTipoDeVariavel").change(function () {
        if ($(this).val() == "QO")
            $("#divOrdemVariaveis").slideDown()
        else
            $("#divOrdemVariaveis").slideUp()

    })
})

$(document).ready (function(){
    $("#bntDescritiva").click (function(){
        $("#divMae").show ('slow');
        $("#containerCard").hide ();
    })
})





