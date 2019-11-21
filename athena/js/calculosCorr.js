var a = 0;
var b = 0;
var valoresCalculoX;
var valoresCalculoY;

$(document).ready(function (){
    $("#bntCorrelacao").click(function () {
        //reiniciando classe de alerta para validar
        retiraAlertaCamposCorr();
        //validando campos
        if(validaCamposCorr()){
            valoresCalculoX = "";
            valoresCalculoY = "";
            //recuperando valores
            if($("[name='tipoEntradaCorr']:checked").val() == "csv")
                getValoresCsv();
            else{
                valoresCalculoX = $("#inputIndependente").val(),
                valoresCalculoY = $("#inputDependente").val();
                calcularCorr();
            }
        }else{
            //retornando erro
            alert("Campos Inválidos");
        }
    })

    function calcularCorr(){
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
            gerarGraficos();
        }
    }

    var leitorCSVCorr = new FileReader();
    leitorCSVCorr.onload = function(evt){
        let fileArr  = evt.target.result.split('\n').filter(x => x && x != " ");
        valoresCalculoX = fileArr[0];
        valoresCalculoY = fileArr[1];
        calcularCorr();
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
        let x = valoresCalculoX.split(";"),
            y = valoresCalculoY.split(";");

        if(x.length != y.length){
            alert("Os dados possuem quantidades diferentes de valores!");
            return;
        }

        let soma = 0, xi2 = 0, yi2 = 0, xi = 0, yi = 0, n = x.length;
        for (let i = 0; i < n; i++) {
            xi += parseFloat(x[i]);
            yi += parseFloat(y[i]);
            soma += parseFloat(x[i]) * parseFloat(y[i]);
            xi2 += parseFloat(x[i]) ** 2;
            yi2 += parseFloat(y[i]) ** 2;
        }

        xa=xi/n;
        yb=yi/n;
        a = parseFloat(((n * soma - xi * yi)/(n * xi2 - (xi ** 2))).toFixed(2));
        b = parseFloat((yb-a*xa).toFixed(2));

        return ((n * soma - xi * yi) / Math.sqrt((n * xi2 - (xi ** 2)) * (n * yi2 - (yi ** 2)))) * 100;

    }

    //x =independente; y=denpendente
    $("#bntRegressao").click(function(){
        let result;
        if ($("#selectRegressao").val() == "X"){
            result =`Resultado de Y = X * ${a} + ${b} = ` +   (a * $("#regressaoSelecione").val() + b).toFixed(2);
        }
        else if ($("#selectRegressao").val() == "Y"){
            result = `Resultado de X = ( Y - ${b}) / ${a} = ` + (($("#regressaoSelecione").val() - b) / a).toFixed(2);
        }
        
        $("#resultRegress").text(result);
        $('#regressaoSelecione').innerText('...');
    })

    function validaCamposCorr(){
        let result = true;

        if($("[name='tipoEntradaCorr']:checked").val() == "csv"){
            let file = document.getElementById("idFileValoresCorr").files[0];
            if(!file){
                $("#idFileValoresCorr").addClass("alertInput");
                result = false;
            }
        }else{
            let x = $("#inputIndependente").val(),
                y = $("#inputDependente").val();
                
            if(!x){
                $("#inputIndependente").addClass("alertInput");
                result = false;
            }

            if(!y){
                $("#inputDependente").addClass("alertInput");
                result = false;
            }
        }
        
        return result;
    }

    function retiraAlertaCamposCorr(){
        $(".alertInput").removeClass("alertInput");
    }


    function gerarGraficos(){
        let x = valoresCalculoX.split(";"),
            value = valoresCalculoY.split(";"),
            dataPontos = [];


        for(let i = 0; i < x.length; i++){
            dataPontos.push({x: x[i], value: value[i]})
        }

        let comecoLinhaX = x[0],
            comecoLinhaValue = a * comecoLinhaX + b,
            fimLinhaX = x[x.length - 1],
            fimLinhaValue = a * fimLinhaX + b

        var dataLinha = [
            {x: comecoLinhaX, value: comecoLinhaValue},
            {x: fimLinhaX, value: fimLinhaValue}
        ];

        chart = anychart.scatter();

        var series1 = chart.marker(dataPontos);
        var series2 = chart.line(dataLinha);

        chart.xGrid(true);
        chart.yGrid(true);
        chart.xMinorGrid(true);
        chart.yMinorGrid(true);

        chart.container("divGraficoCorr");

        chart.draw();
    }
})