$( document ).ready(function(){
    function limparCamposDescritiva(){
        $("#idTipoDePesquisa").val("");
        $("#idTipoDeVariavel").val("");
        $("#idNomeVariavel").val("");
        $("#idSeparatrizes").val("");
        $("#idNumeroSeparatrizes").val("");
        $("#idValores").val("");
        $("#tableResult tbody").html("");
        $("#divGraph").html('<canvas id="canvasGraph"></canvas>');
        $("#resultMedidasSeparatrizes").html("");
        vetGlobal = [];
        indQuantiGlobal = false;
        facsGlobal = [];
        matrizGlobal = [];
    }

    function limparCamposProb(){
        //uniforme
        $("#selectUniforme").val("");
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
        $("#selectNormal").val("");
        $("#normalMedia").val("");
        $("#normalQuantidade").val("");
        $("#normalDesvioPadrao").val("");
        $("#normalInputDe").val("");
        $("#normalInputAte").val("");
    }

    function limparCamposCorr(){
        $("#inputIndependente").val("");
        $("#inputDependente").val("");
        a = 0;
        b = 0;
    }

    $("#navLinkDescritiva").click(limparCamposDescritiva)
    $("#navLinkProbabilidade").click(limparCamposProb)
    $("#navLinkRegressao").click(limparCamposCorr)
})