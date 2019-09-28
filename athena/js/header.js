$( document ).ready(function(){
    $("#returnForm").click(function(){
        limparCampos();
        $("#divContentTable").hide();
        $("#divContentForm").show();
    })

    function limparCampos(){
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
})