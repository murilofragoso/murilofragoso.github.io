$(document).ready(function () {
    var vetGlobal = [];
    var indQuantiGlobal = false;
    var tipoVarGlobal;
    var passoGlobal;
    var facsGlobal = [];
    var matrizGlobal = [];
    var ptMedioGlobal = [];
    var mediaGlobal;
    var coresGraficos = [
        'rgba(77, 166, 253, 0.85)',
        'rgba(0, 0, 255, 1)',
        'rgba(24, 255, 255)',
        'rgba(26, 35, 126)',
        'rgba(100, 149, 237, 1)',
        'rgba(0, 131, 143)',
    ]
    //Eventos Form
    $("#bntCalcular").click(function () {
        if(!$("#idNomeVariavel").val()){
            alert("Insira o nome da variável");
            return;
        }    

        let tipoVariavel = $("#idTipoDeVariavel").val()
        switch (tipoVariavel) {
            case "QN": getQualitativaNominal(); break;
            case "QO": getQualitativaOrdinal(); break;
            case "QD": getQuantitativaDiscreta(); break;
            case "QC": getQuantitativaContinua(); break;
            default: alert("Escolha um tipo de variável");
        }

        tipoVarGlobal = tipoVariavel;

        $("#headVariavel").text($("#idNomeVariavel").val());
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
        if (!$("#idValores").val()) {
            alert("Insira os valores");
            return;
        }

        if(qualitativaNominal($("#idValores").val())){
            $("#divContentForm").hide();
            $("#divContentTable").show();
        };
    }

    function getQualitativaOrdinal() {
        if (!$("#idValores").val()) {
            alert("Insira os valores");
            return;
        }

        if (!$("#idOrdemVariavel").val()) {
            alert("Insira a ordem das variaveis");
            return;
        }

        if(qualitativaOrdinal($("#idValores").val(), $("#idOrdemVariavel").val())){
            $("#divContentForm").hide();
            $("#divContentTable").show();
        };
    }

    function getQuantitativaDiscreta() {
        if (!$("#idValores").val()) {
            alert("Insira os valores");
            return;
        }

        if(quantitativaDiscreta($("#idValores").val())){
            $("#divContentForm").hide();
            $("#divContentTable").show();
        };
    }

    function getQuantitativaContinua() {
        if (!$("#idValores").val()) {
            alert("Insira os valores");
            return;
        }

        if(quantitativaContinua($("#idValores").val())){
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
                    arrayModa = [matriz[i][0] + passoGlobal];
                } else if (matriz[i].length == maiorValor) {
                    arrayModa.push(matriz[i][0] + passoGlobal);
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
        /*if (vetGlobal.length % 2 != 0)
            result += vetGlobal[Math.round((vetGlobal.length - 1) / (100 / porcentagem))];
        else {
            if (indQuantiGlobal) {
                result += (parseInt(vetGlobal[Math.round((vetGlobal.length - 1) / (100 / porcentagem)) - 1]) + parseInt(vetGlobal[Math.round((vetGlobal.length - 1) / (100 / porcentagem))])) / 2;
            }
            else
                result += vetGlobal[Math.round((vetGlobal.length - 1) / (100 / porcentagem) - 1)] + " e " + vetGlobal[Math.round((vetGlobal.length - 1) / (100 / porcentagem))];
        }*/

        $("#resultMedidasSeparatrizes").text(result);
    }

    function medidasSeparatrizesContinua() {

        let porcentagem = $("#idNumeroSeparatrizes").val();

        switch ($("#idSeparatrizes").val()) {
            case "Q": porcentagem *= 25; break;
            case "Qui": porcentagem *= 20; break;
            case "D": porcentagem *= 10; break;
        }

        let posicao = Math.round((vetGlobal.length) / (100 / porcentagem));
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

        let posicao = Math.round((vetGlobal.length) / 2);
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
                alert('Este tipo de variável so aceita texto')
                return false;
            }
        }

        return true;
    }

    function validaNumeros(vetor) {
        for (let x = 0; x < vetor.length; x++) {
            let aux = parseInt(vetor[x]);
            if (isNaN(aux)) {
                alert('Este tipo de variável só aceita números ')
                return false;
            }
        }

        return true;
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

        //média
        if (!isNaN(somaTotal)) {
            $("#divMedia label").text("Média: " + Math.round(somaTotal / tamanhoTotal));
            $("#divMedia").show();
        }

        //moda
        setModa(matriz);

        //mediana
        setMediana(vet, true);

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
        let k = Math.round(Math.sqrt(vet.length - 1));
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
                    matriz[i].forEach(element => matrizFormatada[x].push(element));
                }
            }
            auxPasso += passo;
        }

        var fac = 0,
            nomes = [];
        auxPasso = parseInt(matriz[0][0]) + passo;
        for (let x = 0; x < matrizFormatada.length; x++) {
            fac += matrizFormatada[x].length;
            facsGlobal.push(fac);
            let nomeItem = (auxPasso - passo) + " |-- " + auxPasso;
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
        somaTotal = 0;
        for (let i = 0; i < matrizFormatada.length; i++) {
            somaTotal += (matrizFormatada[i][0] + passoGlobal) * (matrizFormatada[i].length);
            ptMedio.push([(matrizFormatada[i][0] + passoGlobal)]);
        }

        if(!isNaN(somaTotal)){
            media = somaTotal / matrizFormatada.length;
            $("#divMedia label").text("Média: " + media);
        }

        return true;
    }

}) 