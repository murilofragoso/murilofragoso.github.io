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
                let prop = "diretamente proporcional";
                if(corr < 0){
                    corr = corr * -1;
                    prop = "inversamente proporcional";
                }
                let forcaCorr;
                if(corr < 30)
                    forcaCorr = "Inexistente à fraca, "+ prop;
                else if(corr < 60)
                    forcaCorr = "Fraca à média, "+ prop;
                else if(corr >= 60)
                    forcaCorr = "Média à forte, " + prop;

                $("#divEquacao label").text("Equação da Reta: " + corr + "%");    
                $("#divCorrelacao label").text("Correlação: " + forcaCorr);    
                $("#containerRegressao").show();
            }
        }else{
            //retornando erro
            alert("Campos Inválidos");
        }
    })

    var leitorCSVCorr = new FileReader();
    leitorCSVCorr.onload = function(evt){
        let fileArr  = evt.target.result.split('\n').filter(x => x && x != " ");
        let fileString = "";

        console.log(fileArr);

        //x = 1 se o primeiro item for o nome da variavel, se não mudar para x = 0
        /*for (let x = 1; x < fileArr.length; x++) {
            fileString += fileArr[x] + (x == fileArr.length -1 ? "" : ";")
        }

        valoresCalculo = fileString;*/
    }

    function getValoresCsv(){
        let file = document.getElementById("idFileValoresCorr").files[0];
        if(!file){
            alert("Nenhum documento selecionado!")
            return;
        }
        leitorCSVCorr.readAsText(file);
    }

    $("#btnTesteCsv").click(getValoresCsv);

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
        if ($("#selectRegressao").val() == "Y"){
            result = a * $(this).val() + b;
        }
        else if ($("#selectRegressao").val() == "X"){
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