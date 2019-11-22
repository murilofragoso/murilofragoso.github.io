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
        $("#navLinkDescritiva").addClass("sublinhado");
    })

    $("#cardDescritiva").click(function () {
        $("#containerDivMae").show();
        $("#containerCard").hide();
        $("#navLinkDescritiva").addClass("sublinhado");
    })

    $("#bntProbabilidade").click(function () {
        $("#containerCard").hide();
        $("#containerProbabilidade").show();
        $("#containerDivMae").hide();
        $("#navLinkProbabilidade").addClass("sublinhado");
    })

    $("#cardProbabilidade").click(function () {
        $("#containerCard").hide();
        $("#containerProbabilidade").show();
        $("#containerDivMae").hide();
        $("#navLinkProbabilidade").addClass("sublinhado");
    })

    $("#bntRegressão").click(function () {
        $("#containerCard").hide();
        $("#containerCorrelacao").show();
        $("#navLinkRegressao").addClass("sublinhado");
    })

    $("#cardCorrelacao").click(function () {
        $("#containerCard").hide();
        $("#containerCorrelacao").show();
        $("#navLinkRegressao").addClass("sublinhado");
    })


    $("#navLinkProbabilidade").click(function () {
        $("#containerCard").hide();
        $("#containerDivMae").hide();
        $("#containerCorrelacao").hide();
        $("#containerProbabilidade").show();
        $("#containerRegressao").hide();
        limparResultProb();
    })

    $("#navLinkDescritiva").click(function () {
        $("#containerDivMae").show();
        $("#containerCard").hide();
        $("#containerCorrelacao").hide();
        $("#containerProbabilidade").hide();
        $("#containerRegressao").hide();
        $("#divContentForm").show();
        $("#divContentTable").hide();
        limparResultProb();
    })

    $("#navLinkRegressao").click(function () {
        $("#containerDivMae").hide();
        $("#containerCard").hide();
        $("#containerCorrelacao").show();
        $("#containerProbabilidade").hide();
        $("#containerRegressao").hide();
        limparResultProb();
    })

    $("[name='tipoEntrada']").change(function (event) {
        let valueSelecionado = event.target.value;
        if (valueSelecionado == "csv") {
            $("#divValoresTxt").slideUp("fast", function () {
                $("#divValoresCsv").slideDown("fast");
            });
        } else {
            $("#divValoresCsv").slideUp("fast", function () {
                $("#divValoresTxt").slideDown("fast");
            });
        }
    })

    $("[name='tipoEntradaCorr']").change(function (event) {
        let valueSelecionado = event.target.value;
        if (valueSelecionado == "csv") {
            $("#divValoresTxtCorr").slideUp("fast", function () {
                $("#divValoresCsvCorr").slideDown("fast");
            });

        } else {
            $("#divValoresCsvCorr").slideUp("fast", function () {
                $("#divValoresTxtCorr").slideDown("fast");
            });

        }
    })

    $("#selectUniforme").change(function (event) {
        let valueSelecionado = event.target.value
        if (valueSelecionado == 'entre') {
            $("#inputQuantidade").slideUp('fast', function () {
                $("#entreUniforme").slideDown('fast')
            })

        } else {
            $("#entreUniforme").slideUp('fast', function () {
                $("#inputQuantidade").slideDown('fast')
            })

        }
    })

    $("#selectNormal").change(function (event) {
        let valueSelecionado = event.target.value;
        if (valueSelecionado == "entre") {
            $("#normalQuantidade").slideUp("fast", function () {
                $("#entreNormal").slideDown('fast');
            })


        } else {
            $("#entreNormal").slideUp('fast', function () {
                $("#normalQuantidade").slideDown('fast');
            });

        }
    })

    $("[data-btn-menu], [data-card-option]").click(function () {
        $("#togglerNav span").addClass("navbar-toggler-icon");
        $("#conteudoNavbarSuportado").addClass("navbar-collapse").removeClass("hidden");
    })

    $("#pills-nav .nav-item").click(function () {
        var item = $(this).find('a');
        if (!item.hasClass("active"))
            limparResultProb();
    })

    function limparResultProb() {
        $("#resultadosUniforme").hide();
        $("#resultadosBinomial").hide();
        $("#resultadosNormal").hide();
    }


  
$(".inputMensagem").focus(function(){
    $(this).popover('show');
});

$(".inputMensagem").blur(function(){
    $(this).popover('hide');
});

    


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














