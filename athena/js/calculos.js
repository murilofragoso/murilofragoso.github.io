var vetGlobal = [];
var indQuantiGlobal = false;
var tipoVarGlobal;
var passoGlobal;
var facsGlobal = [];
var matrizGlobal = [];
var mediaGlobal;
var vetPassosAux=[];
var ptMedio = [];
var coresGraficos = [
    'rgb(0,128,0)',
    'rgb(0,0,205)',
    'rgb(210,105,30)',
    'rgb(128,0,128)',
    'rgb(180,0,0)',
    'rgb(0,191,255)',
    'rgb(0,250,154)',
    'rgb(255,0,255)',
    'rgb(218,165,32)',
    'rgb(128,0,0)'

]
var valoresCalculo;
$(document).ready(function () {
    //Eventos Form
    $("#bntCalcular").click(function () {
        retiraAlertaCamposDescr();

        if(!$("#idNomeVariavel").val()){
            alert("Insira o nome da variável");
            $("#idNomeVariavel").addClass("alertInput");
            return;
        }    

        if(!$("#idTipoDePesquisa").val()){
            alert("Selecione o tipo de pesquisa");
            $("#idTipoDePesquisa").addClass("alertInput");
            return;
        }    

        valoresCalculo = "";
        setValoresCalc();
    });

    $("#idSeparatrizes").change(function () {
        let qtdItens = 0
        switch ($(this).val()) {
            case "Q": qtdItens = 4; break;
            case "Qui": qtdItens = 5; break;
            case "D": qtdItens = 10; break;
            case "Pe": qtdItens = 100; break;
            default: qtdItens = 0;
        }

        let opcoes = "<option value=''>Selecione</option>"
        for (let x = 1; x <= qtdItens; x++) {
            opcoes += "<option value=" + x + ">" + x + "</option>";
        }

        $("#idNumeroSeparatrizes").html(opcoes);
    })

    $("#idNumeroSeparatrizes").change(function(){
        tipoVarGlobal == "QC" ? medidasSeparatrizesContinua() : medidasSeparatrizes();  
    });

    function getQualitativaNominal() {
        $("#divMedia").hide();
        $("#rowDesvioPadrao").hide();

        if(qualitativaNominal(valoresCalculo)){
            $("#divContentForm").hide();
            $("#divContentTable").show();
        };
    }

    function getQualitativaOrdinal() {
        $("#divMedia").hide();
        $("#rowDesvioPadrao").hide();

        if (!$("#idOrdemVariavel").val()) {
            alert("Insira a ordem das variaveis");
            $("#idOrdemVariavel").addClass("alertInput");
            return;
        }

        if(qualitativaOrdinal(valoresCalculo, $("#idOrdemVariavel").val())){
            $("#divContentForm").hide();
            $("#divContentTable").show();
        };
    }

    function getQuantitativaDiscreta() {
        if(quantitativaDiscreta(valoresCalculo)){
            $("#divContentForm").hide();
            $("#divContentTable").show();
        };
    }

    function getQuantitativaContinua() {
        if(quantitativaContinua(valoresCalculo)){
            $("#divContentForm").hide();
            $("#divContentTable").show();
        };
    }

    //Funcoes de suporte
    function addLinhaTabela(nomeVariavel, fi, fiPercent, fac, facPercent) {
        var linha =
            "<tr>" +
            "<td>" + nomeVariavel + "</td>" +
            "<td>" + fi + "</td>" +
            "<td>" + fiPercent + "% </td>" +
            "<td>" + fac + "</td>" +
            "<td>" + facPercent + "% </td>" +
            "</tr>"

        $("#tableResult tbody").append(linha);
    }

    function returnPercent(val, total) {
        return ((val / total) * 100).toFixed();
    }

    function setModa(matriz) {
        let maiorValor = 0;
        let arrayModa = [];
        for (let i = 0; i < matriz.length; i++) {
            if (matriz[i].length > maiorValor) {
                maiorValor = matriz[i].length;
                arrayModa = [matriz[i][0]];
            } else if (matriz[i].length == maiorValor) {
                arrayModa.push(matriz[i][0]);
            }
        }

        let moda = "Moda: Não existe";
        if (arrayModa.length < matriz.length) {
            moda = "Moda: "
            arrayModa.forEach(function (element, index) {
                moda += element;
                if (index < arrayModa.length - 1)
                    moda += ", ";
            });
        }

        $("#divModa label").text(moda)
    }

    function setModaContinua(matriz) {
            let maiorValor = 0;
            let arrayModa = [];
            for (let i = 0; i < matriz.length; i++) {
                if (matriz[i].length > maiorValor) {
                    maiorValor = matriz[i].length;
                    arrayModa = [vetPassosAux[i]+(passoGlobal/2)];
                } else if (matriz[i].length == maiorValor) {
                    arrayModa.push(vetPassosAux[i]+(passoGlobal/2));
                }
            }
            let moda = "Moda: Não existe";
            if (arrayModa.length < matriz.length) {
                moda = "Moda: "
                arrayModa.forEach(function (element, index) {
                    moda += element;
                    if (index < arrayModa.length - 1)
                        moda += ", ";
                });
            }

            $("#divModa label").text(moda)
        }

    function medidasSeparatrizes() {
        let porcentagem = $("#idNumeroSeparatrizes").val();
        switch ($("#idSeparatrizes").val()) {
            case "Q": porcentagem *= 25; break;
            case "Qui": porcentagem *= 20; break;
            case "D": porcentagem *= 10; break;
        }

        let result = "Resultado: " + vetGlobal[Math.round((vetGlobal.length - 1) / (100 / porcentagem))];
        $("#resultMedidasSeparatrizes").text(result);
    }

    function medidasSeparatrizesContinua() {

        let porcentagem = $("#idNumeroSeparatrizes").val();

        switch ($("#idSeparatrizes").val()) {
            case "Q": porcentagem *= 25; break;
            case "Qui": porcentagem *= 20; break;
            case "D": porcentagem *= 10; break;
        }

        let posicao = ((vetGlobal.length) / (100 / porcentagem));
        let fi = 0;
        let aux = 0;
        let limite = 0;
        let facant = 0;

        for (let i = 0; i < matrizGlobal.length; i++) {
            
            facant = i == 0 ? 0 : facsGlobal[i - 1];
            
            if (facant <= posicao  && posicao <= facsGlobal[i]) {
                for(let x = vetPassosAux.length; x >= 0; x--){
                    if(limite == 0 && parseInt(vetPassosAux[x]) <= parseInt(matrizGlobal[i][0]))
                        limite = parseInt(vetPassosAux[x]);
                }
                //limite = parseInt(matrizGlobal[i][0]);
                fi = matrizGlobal[i].length;
                facant = i == 0 ? 0 : facsGlobal[i - 1];
                break;
            }

        }

        let result = "Resultado: " +  (limite + ((posicao - facant) / fi) * passoGlobal).toFixed(2);

        $("#resultMedidasSeparatrizes").text(result);
    }

    function setMediana(vet, indQuanti = false) {
        let mediana = "Mediana: ";
        if (vet.length % 2 != 0)
            mediana += vet[Math.round((vet.length - 1) / 2)];
        else {
            if (indQuanti)
                mediana += (parseInt(vet[Math.round((vet.length - 1) / 2 - 1)]) + parseInt(vet[Math.round((vet.length - 1) / 2)])) / 2;
            else
                mediana += vet[Math.round((vet.length - 1) / 2 - 1)] + " e " + vet[Math.round((vet.length - 1) / 2)];
        }

        $("#divMediana label").text(mediana)
    }

    function setMedianaContinua() {

        let posicao = ((vetGlobal.length) / 2);
        let fi = 0;
        let aux = 0;
        let limite = 0;
        let facant = 0;

        for (let i = 0; i < matrizGlobal.length; i++) {
            
            if (posicao >= facant && posicao <= facsGlobal[i]) {
                limite = parseInt(matrizGlobal[i][0]);
                fi = matrizGlobal[i].length;
                facant = i == 0 ? 0 : facsGlobal[i - 1];
                break;
            }

            facant = i == 0 ? 0 : facsGlobal[i - 1];
        }

        let mediana = "Mediana: " +  (limite + ((posicao - facant) / fi) * passoGlobal).toFixed(2);

        $("#divMediana label").text(mediana)
    }

    function validaLetras(vetor) {
        for (let x = 0; x < vetor.length; x++) {
            let aux = (vetor[x]);
            if (!isNaN(aux)) {
                alert('Este tipo de variável so aceita texto');
                $("#idTipoDeVariavel").addClass("alertInput");
                $("#idFileValores").addClass("alertInput");
                return false;
            }
        }

        return true;
    }

    function validaNumeros(vetor) {
        for (let x = 0; x < vetor.length; x++) {
            let aux = parseInt(vetor[x]);
            if (isNaN(aux)) {
                alert('Este tipo de variável só aceita números ');
                $("#idTipoDeVariavel").addClass("alertInput");
                $("#idFileValores").addClass("alertInput");
                return false;
            }
        }

        return true;
    }

    function desvioPadrao(matriz){
        if($("#idTipoDePesquisa").val() == "A"){
            return desvioPadraoAmostra(matriz);
        }else if($("#idTipoDePesquisa").val() == "P"){
            return desvioPadraoPopulacao(matriz);
        }

        return 0;
    }

    function desvioPadraoPopulacao(matriz) {
        let dp = 0;

        for (let i = 0; i < matriz.length; i++) {
            dp += ((matriz[i][0] - mediaGlobal) ** 2) * matrizGlobal[i].length;
        }

        return dp = Math.sqrt(dp / vetGlobal.length).toFixed(2);
    }


    function desvioPadraoAmostra(matriz) {
        let dp = 0;

        for (let i = 0; i < matriz.length; i++) {
            dp += ((matriz[i][0] - mediaGlobal) ** 2) * matrizGlobal[i].length;
        }

        return dp = Math.sqrt(dp / (vetGlobal.length - 1)).toFixed(2);
    }

    function coeficienteVariacao(dp){
        let cv = ((dp/mediaGlobal)*100).toFixed(2)

        return cv
    }

    //Grágicos
    function graficoPizza(dados, nomes) {   
        var ctx = $("#canvasGraph")

        var pieChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: dados,
                labels: nomes
            }
        });
    }

    function GraficoBarrasSeparadas(dados, nomes) {
        var ctx = $("#canvasGraph");

        var chartGraph = new Chart(ctx, {
            type: "bar",
            data: {
                datasets: dados,
                labels: nomes
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,

                        }
                    }]
                }
            }
        });
    }

    function GraficoBarrasJuntas(dados, nomes) {
        var ctx = $("#canvasGraph")

        var chartGraph = new Chart(ctx, {
            type: "bar",
            data: {
                datasets: dados,
                labels: nomes,
            },
            options: {
                scales: {
                    xAxes: [{
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        ticks: {
                            fonColor: '#000'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#000',
                        }
                    }]
                }
            }
        });
    }

    //Calculos
    function qualitativaNominal(valor) {

        let vet = valor.split(";");
        let tamanhoTotal = vet.length;
        vet.sort();

        let matriz = [];
        let cont = 0;
        
        if (!validaLetras(vet)) {
            return false;
        }


        for (let i = 0; i < vet.length; i++) {

            if (i == 0) {
                matriz.push([vet[i]]);
            }
            else if (vet[i] == vet[i - 1]) {
                matriz[cont].push(vet[i]);
            }
            else {
                matriz.push([vet[i]]);
                cont++;
            }

        }

        //populando tabela
        var fac = 0;
        matriz.forEach(element => {
            fac += element.length;
            addLinhaTabela(element[0], element.length, returnPercent(element.length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal))
        });

        //setando globais
        vetGlobal = vet;
        indQuantiGlobal = false;

        //moda
        setModa(matriz);

        //mediana
        setMediana(vet);

        //grafico
        let dados = [],
            nomes = [],
            cores = [],
            indiceCores = 0;
        matriz.forEach(element => {
            dados.push(element.length);
            nomes.push(element[0]);
            cores.push(coresGraficos[indiceCores])
            if(indiceCores == coresGraficos.length -1)
                indiceCores = 0;
            else
                indiceCores++
        });

        graficoPizza([{
            data:dados,
            backgroundColor: cores,
        }], nomes);

        return true;
    }

    function qualitativaOrdinal(valor, ordem) {

        let vet = valor.split(";");
        let tamanhoTotal = vet.length;
        let VetOrd = ordem.split(";");
        let matriz = [];
        let cont = 0;

        vet.sort();

        if (!validaLetras(vet)){
            return false;
        }

        for(let i = 0; i < vet.length; i++){
            if(VetOrd.indexOf(vet[i]) == -1){
                alert("A ordem não pussui todas as variaveis");
                $("#idOrdemVariavel").addClass("alertInput");
                return false;
            }
        }

        for(let i = 0; i < VetOrd.length; i++){
            if(vet.indexOf(VetOrd[i]) == -1){
                alert("A ordem pussui variaveis não listadas");
                $("#idOrdemVariavel").addClass("alertInput");
                return false;
            }
        }

        for (let i = 0; i < VetOrd.length; i++) {

            let ord = VetOrd[i];
            matriz.push([])

            for (let j = 0; j < vet.length; j++) {

                if (vet[j] == ord) {
                    matriz[cont].push(vet[j]);
                }
            }
            cont++;
        }

        //populando tabela
        var fac = 0;
        matriz.forEach(element => {
            fac += element.length;
            addLinhaTabela(element[0], element.length, returnPercent(element.length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal))
        });

        //setando globais
        vetGlobal = vet;
        indQuantiGlobal = false;

        //moda
        setModa(matriz);

        //mediana
        setMediana(vet);

        //grafico
        let dados = [],
            nomes = [],
            cores = [],
            indiceCores = 0;
        matriz.forEach(element => {
            dados.push(element.length);
            nomes.push(element[0]);
            cores.push(coresGraficos[indiceCores])
            if(indiceCores == coresGraficos.length -1)
                indiceCores = 0;
            else
                indiceCores++
        });

        graficoPizza([{
            data:dados,
            backgroundColor: cores,
        }], nomes);

        return true;
    }

    function quantitativaDiscreta(valor) {

        let vet = valor.split(";");
        let tamanhoTotal = vet.length;
        vet.sort(function (a, b) {
            return a - b;
        });

        let matriz = [];
        let cont = 0;
        let somaTotal = 0;

        if (!validaNumeros(vet)){
            return false;;
        }

        for (let i = 0; i < vet.length; i++) {

            somaTotal += parseInt(vet[i]);

            if (i == 0) {
                matriz.push([vet[i]]);
            }
            else if (vet[i] == vet[i - 1]) {
                matriz[cont].push(vet[i]);
            }
            else {
                matriz.push([vet[i]]);
                cont++;
            }

        }

        //populando tabela
        var fac = 0;
        matriz.forEach(element => {
            fac += element.length;
            addLinhaTabela(element[0], element.length, returnPercent(element.length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal))
        });

        //setando globais
        vetGlobal = vet;
        indQuantiGlobal = true;
        matrizGlobal = matriz;

        //média
        if (!isNaN(somaTotal)) {
            mediaGlobal = (somaTotal / tamanhoTotal).toFixed(2);
            $("#divMedia label").text("Média: " + mediaGlobal);
            $("#divMedia").show();
        }

        //moda
        setModa(matriz);

        //mediana
        setMediana(vet, true);

        //desvio padrão
        let desvio = desvioPadrao(matriz);
        $("#divDesvioPadrao label").text("Desvio Padrão: " + desvio);

        //coeficiente de variação
        let coef = coeficienteVariacao(desvio)
        $("#divCoeficiente label").text("Coeficiente de variação: " + coef);

        //liberando linha
        $("#rowDesvioPadrao").show();

        //grafico
        let dados = [],
            nomes = [],
            cores = [],
            indiceCores = 0;
        matriz.forEach(element => {
            dados.push(element.length);
            nomes.push(element[0].toString());
            cores.push(coresGraficos[indiceCores])
            if(indiceCores == coresGraficos.length -1)
                indiceCores = 0;
            else
                indiceCores++
        });

        GraficoBarrasSeparadas([{
            data:dados,
            backgroundColor: cores,
            label: $("#idNomeVariavel").val()
        }], nomes);

        return true;
    }

    function quantitativaContinua(valor) {

        let vet = valor.split(";");
        let tamanhoTotal = vet.length;
        vet.sort(function (a, b) {
            return a - b;
        });

        let matriz = [];
        let cont = 0;

        let al = vet[vet.length - 1] - vet[0];
        let k = Math.trunc(Math.sqrt(vet.length));
        var passo = "";

        if (!validaNumeros(vet)){
            return false;
        }

        while (passo == "") {
            al++;
            if (al % k == 0) {
                passo = al / k
            }
            else if (al % (k + 1) == 0) {
                passo = al / (k + 1);
                k++;
            }
            else if (al % (k - 1) == 0) {
                passo = al / (k - 1);
                k--;
            }
        }

        for (let i = 0; i < vet.length; i++) {

            if (i == 0) {
                matriz.push([vet[i]]);
            }
            else if (vet[i] == vet[i - 1]) {
                matriz[cont].push(vet[i]);
            }
            else {
                matriz.push([vet[i]]);
                cont++;
            }

        }

        var matrizFormatada = [];
        var auxPasso = parseInt(matriz[0][0]) + passo;
        for (let x = 0; x < k; x++) {
            matrizFormatada.push([]);
            for (let i = 0; i < matriz.length; i++) {
                if (matriz[i][0] < auxPasso && matriz[i][0] >= auxPasso - passo) {
                    matriz[i].forEach(element => matrizFormatada[x].push(parseInt(element)));
                }
            }
            auxPasso += passo;
        }

        vetPassosAux = [];

        var fac = 0,
            nomes = [];
        auxPasso = parseInt(matriz[0][0]) + passo;
        for (let x = 0; x < matrizFormatada.length; x++) {
            fac += matrizFormatada[x].length;
            facsGlobal.push(fac);
            let nomeItem = (auxPasso - passo) + " |-- " + auxPasso;
            vetPassosAux.push(auxPasso - passo);
            nomes.push(nomeItem);
            addLinhaTabela(nomeItem, matrizFormatada[x].length, returnPercent(matrizFormatada[x].length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal));
            auxPasso += passo;
        }
        
        //grafico
        let dados = [],
            cores = [],
            indiceCores = 0;
        matrizFormatada.forEach(element => {
            dados.push(element.length);
            cores.push(coresGraficos[indiceCores])
            if(indiceCores == coresGraficos.length -1)
                indiceCores = 0;
            else
                indiceCores++
        });

        GraficoBarrasJuntas([{
            data:dados,
            backgroundColor: cores,
            label: $("#idNomeVariavel").val()
        }], nomes);

        //setando globais
        passoGlobal = passo;         
        matrizGlobal = matrizFormatada;
        vetGlobal = vet;        
        //ptMedioGlobal -> media
        //mediaGlobal; -> media

        //mediana
        setMedianaContinua();

        //moda
        setModaContinua(matrizFormatada)

        //media
        ptMedio = [];
        var somaTotal = 0;
        for (let i = 0; i < matrizFormatada.length; i++) {
            somaTotal += (parseInt(vetPassosAux[i]) + (passoGlobal / 2)) * matrizFormatada[i].length;
            ptMedio.push([(parseInt(vetPassosAux[i])+ (passoGlobal / 2))]);
        }
        if(!isNaN(somaTotal)){
            media = (somaTotal / vetGlobal.length).toFixed(2);
            mediaGlobal = media;
            $("#divMedia label").text("Média: " + media);
            $("#divMedia").show();
        }

        //desvio padrão
        let desvio = desvioPadrao(ptMedio);
        $("#divDesvioPadrao label").text("Desvio Padrão: " + desvio);

        //coeficiente de variação
        let coef = coeficienteVariacao(desvio)
        $("#divCoeficiente label").text("Coeficiente de variação: " + coef);

        //liberando linha
        $("#rowDesvioPadrao").show();

        return true;
    }

    //funções de leitura

    var leitorCSV = new FileReader();
    leitorCSV.onload = function(evt){
        let fileArr  = evt.target.result.split('\n').filter(x => x && x != " ");
        valoresCalculo = fileArr.toString();
        calcular();
    }

    function getValoresCsv(){
        let file = document.getElementById("idFileValores").files[0];
        if(!file){
            alert("Nenhum documento selecionado!")
            $("#idFileValores").addClass("alertInput");
            return;
        }
        leitorCSV.readAsText(file);
    }

    function setValoresCalc(){
        if($("[name='tipoEntrada']:checked").val() == "csv")
            getValoresCsv();
        else{
            if (!$("#idValores").val()) {
                alert("Insira os valores");
                $("#idValores").addClass("alertInput");
                return;
            }

            valoresCalculo = $("#idValores").val()
            calcular();
        }
    }

    function calcular(){
        let tipoVariavel = $("#idTipoDeVariavel").val()
        switch (tipoVariavel) {
            case "QN": getQualitativaNominal(); break;
            case "QO": getQualitativaOrdinal(); break;
            case "QD": getQuantitativaDiscreta(); break;
            case "QC": getQuantitativaContinua(); break;
            default: alert("Escolha um tipo de variável"); $("#idTipoDeVariavel").addClass("alertInput");
        }

        tipoVarGlobal = tipoVariavel;

        $("#headVariavel").text($("#idNomeVariavel").val());
    }

    function retiraAlertaCamposDescr(){
        $(".alertInput").removeClass("alertInput");
    }

}) 
