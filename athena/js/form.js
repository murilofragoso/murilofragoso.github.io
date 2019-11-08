$(document).ready(function () {
    $("#idTipoDeVariavel").change(function () {
        if ($(this).val() == "QO")
            $("#divOrdemVariaveis").slideDown()
        else
            $("#divOrdemVariaveis").slideUp()

    })

    $("#bntDescritiva").click(function () {
        $("#containerDivMae").show ();
        $("#containerCard").hide ();
    })

    $("#bntProbabilidade").click(function () {
        $("#containerCard").hide();
        $("#containerProbabilidade").show();
        $("#containerDivMae").hide();
    })

    $("bntRegressao").click (function(){
        $("#containerCard").hide();
        $("#containerRegressão").show ();   
    })


    $("#selectUniforme").change(function () {
        if ($(this).val() == "entre")
            $("#entreUniforme").slideDown()

        else
            $("#entreUniforme").slideUp()

    })

    $("#selectNormal").change(function () {
        if ($(this).val() == "entre")
            $("#entreNormal").slideDown();

        else
            $("#entreNormal").slideUp();

    })

    $("#navLinkProbabilidade").click(function () {
        $("#containerCard").hide ();
        $("#containerDivMae").hide();
        $("#containerProbabilidade").show();
    })

    $("[name='tipoEntrada']").change(function(event){
        let valueSelecionado = event.target.value;
        if(valueSelecionado == "csv"){
            $("#divValoresTxt").slideUp("fast");
            $("#divValoresCsv").slideDown("fast");            
        }else{
            $("#divValoresCsv").slideUp("fast");
            $("#divValoresTxt").slideDown("fast");     
        }
    })
});





