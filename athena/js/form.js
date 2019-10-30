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
        $("#divMae").show ('1');
        $("#containerCard").hide ();
    })
})





