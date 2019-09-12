$( document ).ready(function(){
    var vetGlobal = [];
    var indQuantiGlobal = false;
    //Eventos Form
    $("#bntCalcular").click(function(){
        let tipoVariavel = $("#idTipoDeVariavel").val()
        switch (tipoVariavel){
            case "QN": getQualitativaNominal(); break;
            case "QO": getQualitativaOrdinal(); break;
            case "QD": getQuantitativaDiscreta(); break;
            case "QC": getQuantitativaContinua(); break;
            default: alert("Escolha um tipo de variável");
        }

        $("#headVariavel").text($("#idNomeVariavel").val());
    });

    $("#idSeparatrizes").change(function(){
        let qtdItens = 0
        switch ($(this).val()){
            case "Q": qtdItens = 4; break;
            case "Qui": qtdItens = 5; break;
            case "D": qtdItens = 10; break;
            case "Pe": qtdItens = 100; break;
            default: qtdItens = 0;
        }

        let opcoes = "<option value=''>Selecione</option>"
        for(let x = 1; x <= qtdItens; x++){
            opcoes += "<option value=" + x + ">" + x + "</option>";
        }

        $("#idNumeroSeparatrizes").html(opcoes);
    })

    $("#idNumeroSeparatrizes").change(medidasSeparatrizes);

    function getQualitativaNominal(){
        if(!$("#idValores").val()){
            alert("Insira os valores");
            return;
        }

        qualitativaNominal($("#idValores").val());
        $("#divContentForm").hide();
        $("#divContentTable").show();
    }

    function getQualitativaOrdinal(){
        if(!$("#idValores").val()){
            alert("Insira os valores");
            return;
        }

        if(!$("#idOrdemVariavel").val()){
            alert("Insira a ordem das variaveis");
            return;
        }

        qualitativaOrdinal($("#idValores").val(), $("#idOrdemVariavel").val());
        $("#divContentForm").hide();
        $("#divContentTable").show();
    }

    function getQuantitativaDiscreta(){
        if(!$("#idValores").val()){
            alert("Insira os valores");
            return;
        }

        quantitativaDiscreta($("#idValores").val());
        $("#divContentForm").hide();
        $("#divContentTable").show();
    }

    function getQuantitativaContinua(){
        if(!$("#idValores").val()){
            alert("Insira os valores");
            return;
        }

        quantitativaContinua($("#idValores").val());
        $("#divContentForm").hide();
        $("#divContentTable").show();
    }

    //Funcoes de suporte
    function addLinhaTabela(nomeVariavel, fi, fiPercent, fac, facPercent){
        var linha = 
        "<tr>" +
            "<td>" + nomeVariavel +"</td>" +
            "<td>" + fi + "</td>" +
            "<td>" + fiPercent + "% </td>" +
            "<td>" + fac + "</td>" +
            "<td>" + facPercent + "% </td>" +
        "</tr>"

        $("#tableResult tbody").append(linha);
    }

    function returnPercent(val, total){
        return ((val/total) * 100).toFixed();
    }

    function setModa(matriz){
        let maiorValor = 0;
        let arrayModa = [];
        for(let i=0; i < matriz.length; i++){
            if(matriz[i].length > maiorValor){
                maiorValor = matriz[i].length;
                arrayModa = [matriz[i][0]];
            } else if(matriz[i].length == maiorValor){
                arrayModa.push(matriz[i][0]);
            }
        }

        let moda = "Moda: Não existe";
        if(arrayModa.length < matriz.length){
            moda = "Moda: "
            arrayModa.forEach(function(element, index){
                moda += element;
                if(index < arrayModa.length -1)
                    moda += ", ";
            });
        }

        $("#divModa label").text(moda)
    }

    function medidasSeparatrizes(){
        let porcentagem = $("#idNumeroSeparatrizes").val();
        switch($("#idSeparatrizes").val()){
            case "Q": porcentagem *= 25; break;
            case "Qui": porcentagem *= 20; break;
            case "D": porcentagem *= 10; break;
        }

        let result = "Resultado: "
        if(vetGlobal.length % 2 != 0)
            result += vetGlobal[Math.round((vetGlobal.length - 1) /(100/porcentagem))];
        else{
            if(indQuantiGlobal){
                result += (parseInt(vetGlobal[Math.round((vetGlobal.length -1) /(100/porcentagem)) - 1])+ parseInt(vetGlobal[Math.round((vetGlobal.length -1)/(100/porcentagem))])) /2;
            }
            else
                result += vetGlobal[Math.round((vetGlobal.length -1)/(100/porcentagem) - 1)] + " e " + vetGlobal[Math.round((vetGlobal.length -1)/(100/porcentagem))];
        }

        $("#resultMedidasSeparatrizes").text(result);
    }

    function setMediana(vet, indQuanti = false){
        let mediana = "Mediana: ";
        if(vet.length % 2 != 0 )
            mediana += vet[Math.round((vet.length - 1) /2)]; 
        else{
            if(indQuanti)
                mediana += (parseInt(vet[Math.round((vet.length -1)/2 - 1)]) + parseInt(vet[Math.round((vet.length -1)/2)])) /2; 
            else
                mediana += vet[Math.round((vet.length -1)/2 - 1)] + " e " + vet[Math.round((vet.length -1)/2)]; 
        } 

        $("#divMediana label").text(mediana)
    }

    //Calculos
    function qualitativaNominal(valor) {

        let vet = valor.toLowerCase().split(";");
        let tamanhoTotal =  vet.length;
        vet.sort();

        let matriz = [];
        let cont = 0;

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
    }

    function qualitativaOrdinal(valor, ordem) {

        let vet = valor.toLowerCase().split(";");
        let tamanhoTotal =  vet.length;
        let VetOrd = ordem.toLowerCase().split(";");
        let matriz = [];
        let cont = 0;

        vet.sort();

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
    }

    function quantitativaDiscreta(valor) {

        let vet = valor.toLowerCase().split(";");
        let tamanhoTotal =  vet.length;
        vet.sort(function(a, b) {
            return a - b;
        });

        let matriz = [];
        let cont = 0;
        let somaTotal = 0;

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
        if(!isNaN(somaTotal)){
            $("#divMedia label").text("Média: " + Math.round(somaTotal/tamanhoTotal));
            $("#divMedia").show();
        }

        //moda
        setModa(matriz);

        //mediana
        setMediana(vet, true);
    }

    function quantitativaContinua(valor) {

        let vet = valor.toLowerCase().split(";");
        let tamanhoTotal =  vet.length;
        vet.sort(function(a, b) {
            return a - b;
        });

        let matriz = [];
        let cont = 0;

        let al = vet[vet.length-1] - vet[0];
        let k = Math.round(Math.sqrt(vet.length - 1));
        var passo = "";
        
        while(passo == ""){
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
        for(let x = 0; x < k; x++){
            matrizFormatada.push([]);
            for(let i = auxPasso - passo; i < matriz.length; i++){
                if(matriz[i][0] < auxPasso){
                    matriz[i].forEach(element => matrizFormatada[x].push(element));
                }
            }
            auxPasso += passo;
        }

        var fac = 0;
        auxPasso = parseInt(matriz[0][0]) + passo;
        for(let x = 0; x < matrizFormatada.length; x++){
            fac += matrizFormatada[x].length;
            let nomeItem = (auxPasso - passo) + " |-- " + auxPasso;
            addLinhaTabela(nomeItem, matrizFormatada[x].length, returnPercent(matrizFormatada[x].length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal));
            auxPasso += passo;
        }
    }

    //qualitativaNominal('leo;pedro;pedro;murilo;helio;leo;murilo;helio;thales;renata;thales;bruna;leo;caio');
}) 