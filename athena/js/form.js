$(document).ready(function () {
    $("#idTipoDeVariavel").change(function () {
        if ($(this).val() == "QO")
            $("#divOrdemVariaveis").slideDown()
        else
            $("#divOrdemVariaveis").slideUp()

    })

    $("#bntDescritiva").click(function () {
        $("#containerDivMae").show();
        $("#containerCard").hide();
    })

    $("#bntProbabilidade").click(function () {
        $("#containerCard").hide();
        $("#containerProbabilidade").show();
        $("#containerDivMae").hide();
    })

    $("#bntRegressão").click(function () {
        $("#containerCard").hide();
        $("#containerCorrelacao").show();
    })

    $("#bntCorrelacao").click(function () {
        $("#containerCard").hide();
        $("#containerCorrelacao").hide();
        $("#containerRegressao").show();
    })




    $("#selectUniforme").change(function () {
        if ($(this).val() == "entre")
            $("#entreUniforme").slideDown()
        else
            $("#entreUniforme").slideUp()

    })

    $("#selectNormal").change(function () {
        if ($(this).val() == "entre") {
            $("#normalQuantidade").slideUp();
            $("#entreNormal").slideDown();
            
        } else {
            $("#entreNormal").slideUp();
            $("#normalQuantidade").slideDown();
        }


    })

    $("#navLinkProbabilidade").click(function () {
        $("#containerCard").hide();
        $("#containerDivMae").hide();
        $("#containerCorrelacao").hide();
        $("#containerProbabilidade").show();
        $("#containerRegressao").hide();
    })

    $("#navLinkDescritiva").click(function () {
        $("#containerDivMae").show();
        $("#containerCard").hide();
        $("#containerCorrelacao").hide();
        $("#containerProbabilidade").hide();
        $("#containerRegressao").hide();
    })

    $("#navLinkRegressao").click(function () {
        $("#containerDivMae").hide();
        $("#containerCard").hide();
        $("#containerCorrelacao").show();
        $("#containerProbabilidade").hide();
        $("#containerRegressao").hide();
    })

    $("[name='tipoEntrada']").change(function (event) {
        let valueSelecionado = event.target.value;
        if (valueSelecionado == "csv") {
            $("#divValoresTxt").slideUp("fast");
            $("#divValoresCsv").slideDown("fast");
        } else {
            $("#divValoresCsv").slideUp("fast");
            $("#divValoresTxt").slideDown("fast");
        }
    })

    $("[data-btn-menu]").click(function () {
        $("#togglerNav span").addClass("navbar-toggler-icon");
        $("#conteudoNavbarSuportado").addClass("navbar-collapse").removeClass("hidden");
    })
});

// Apenas testando, se der muito trabalho no calculo pode tirar...

/*$("#selectRegressao").change(function () {
   if ($(this).val () == "X") {
       $("#divCorrelacao01").hide ("fast");
       $("#divCorrelacao03").hide("fast");
       $("#divCorrelacao02").show("fast");

   }  else if ($(this).val() == "Y") {
       $("#divCorrelacao01").slideUp("fast");
       $("#divCorrelacao02").slideUp("fast");
       $("#divCorrelacao03").slideDown("fast");

   } /*else {
       $("#divCorrelacao03").slideUp("fast");
       $("#divCorrelacao02").slideUp("fast");
       $("#divCorrelacao01").slideDown("fast");
   }


}) */













