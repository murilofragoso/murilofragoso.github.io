$(document).ready(function () {
    function limparCamposDescritiva() {
        $("#idTipoDePesquisa").val("");
        $("#idTipoDeVariavel").val("");
        $("#idNomeVariavel").val("");
        $("#idSeparatrizes").val("");
        $("#idNumeroSeparatrizes").val("");
        $("#idValores").val("");
        $("#tableResult tbody").html("");
        $("#divGraph").html('<canvas id="canvasGraph"></canvas>');
        $("#resultMedidasSeparatrizes").html("");
        $("#idFileValores").val("");
        vetGlobal = [];
        indQuantiGlobal = false;
        facsGlobal = [];
        matrizGlobal = [];
    }

    function limparCamposProb() {
        //uniforme
        $("#selectUniforme").val("").change();
        $("#inputQuantidade").val("");
        $("#inputPontoMininmo").val("");
        $("#inputPontoMaximo").val("");
        $("#uniformeInputDe").val("");
        $("#uniformeInputAte").val("");


        //binomial
        $("#amostraN").val("");
        $("#chanceSucesso").val("");
        $("#chanceFracasso").val("");
        $("#eventoK").val("");

        //normal
        $("#selectNormal").val("").change();
        $("#normalMedia").val("");
        $("#normalQuantidade").val("");
        $("#normalDesvioPadrao").val("");
        $("#normalInputDe").val("");
        $("#normalInputAte").val("");
    }

    function limparCamposCorr() {
        $("#idFileValoresCorr").val ("");
        $("#inputIndependente").val("");
        $("#inputDependente").val("");
        a = 0;
        b = 0;
    }

    $("#navLinkDescritiva").click(limparCamposDescritiva)
    $("#navLinkProbabilidade").click(limparCamposProb)
    $("#navLinkRegressao").click(limparCamposCorr)

    $("#pills-nav .nav-item").click(function () {
        var item = $(this).find('a');
        if (!item.hasClass("active"))
            limparCamposProb();
    })

    $(".nav-link").click(function(){
        $(".sublinhado").removeClass("sublinhado")
        $(this).addClass("sublinhado")
    })
})