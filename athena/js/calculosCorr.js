var a = 0;
var b = 0;

$(document).ready(function (){
    $("#bntCorrelacao").click(function () {
        //reiniciando classe de alerta para validar
        retiraAlertaCamposCorr();
        //validando campos
        if(validaCamposCorr()){
            //calculando
            let corr = correlacao().toFixed(2);
            if(corr){
                //escondendo formulário
                $("#containerCorrelacao").hide();

                //exibindo resultados
                $("#divEquacao label").text("Equação da Reta: " + corr + "%");
                if(corr < 0)
                    corr = corr * -1;
                let forcaCorr
                if(corr < 0.3)
                    forcaCorr = "Inexistente à fraca";
                else if(corr < 0.6)
                    forcaCorr = "Fraca à média";
                else if(corr >= 0.6)
                    forcaCorr = "Média à forte";
                    
                $("#divCorrelacao label").text("Correlação: " + forcaCorr);    
                $("#containerRegressao").show();
            }
        }else{
            //retornando erro
            alert("Campos Inválidos");
        }
    })

    //x =independente; y=denpendente
    function correlacao() {
        let x = $("#inputIndependente").val(),
            y = $("#inputDependente").val();
        x = x.split(";");
        y = y.split(";");

        if(x.length != y.length){
            alert("Os dados possuem quantidades diferentes de valores!");
            return;
        }

        let soma = 0, xi2 = 0, yi2 = 0, xi = 0, yi = 0, n = x.length;
        for (let i = 0; i < n; i++) {
            xi += parseInt(x[i]);
            yi += parseInt(y[i]);
            soma += parseInt(x[i]) * parseInt(y[i]);
            xi2 += x[i] ** 2;
            yi2 += y[i] ** 2;
        }

        xa=xi/n;
        yb=yi/n;
        a = (n * soma - xi * yi)/(n * xi2 - (xi ** 2));
        b = yb-a*xa;

        return ((n * soma - xi * yi) / Math.sqrt((n * xi2 - (xi ** 2)) * (n * yi2 - (yi ** 2)))) * 100;

    }

    //x =independente; y=denpendente
    $("#regressaoSelecione").blur(function(){
        let result;
        if ($("#selectRegressao").val() == "X"){
            result = a * $(this).val() + b;
        }
        else{
            result = ($(this).val() - b) / a;
        }

        $("#resultRegress").text(result);
    })

    function validaCamposCorr(){
        let x = $("#inputIndependente").val(),
            y = $("#inputDependente").val(),
            result = true;

        if(!x){
            $("#inputIndependente").addClass("alertInput");
            result = false;
        }

        if(!y){
            $("#inputDependente").addClass("alertInput");
            result = false;
        }

        return result;
    }

    function retiraAlertaCamposCorr(){
        $(".alertInput").removeClass("alertInput");
    }
})