$( document ).ready(function(){

    //Eventos Form
    $("#bntCalcular").click(function(){
        let tipoVariavel = $("#idTipoDeVariavel").val()
        switch (tipoVariavel){
            case "QN": getQualitativaNominal(); break;
            case "QO": getQualitativaOrdinal(); break;
            case "QD": getQuantitativaDiscreta(); break;
            case "QC": alert("Quantitativa Continua não implementada"); break;
            default: alert("Escolha um tipo de variável");
        }
    });

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

        var fac = 0;
        matriz.forEach(element => {
            fac += element.length;
            addLinhaTabela(element[0], element.length, returnPercent(element.length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal))
        });
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

        var fac = 0;
        matriz.forEach(element => {
            fac += element.length;
            addLinhaTabela(element[0], element.length, returnPercent(element.length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal))
        });
    }

    function quantitativaDiscreta(valor) {

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

        var fac = 0;
        matriz.forEach(element => {
            fac += element.length;
            addLinhaTabela(element[0], element.length, returnPercent(element.length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal))
        });
    }

    function quantitativaContinua(valor) {

        let vet = valor.toLowerCase().split(";");
        let tamanhoTotal =  vet.length;
        vet.sort();

        let matriz = [];
        let cont = 0;

        let al = vet[vet.length] - vet[0];
        let k = Math.floor(Math.sqrt(vet.lenght - 1));

        for (let i = 0; ; i++) {

            if (al + i % k == 0) {
                passo = (al + i) / k
                break
            }
            else if ((al + i) % (k + 1) == 0) {
                passo = (al + i) / (k + 1)
                break
            }    
            else if ((al + i) % (k + 2) == 0) {
                passo = (al + i) / (k + 2)
                break
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

        var fac = 0;
        matriz.forEach(element => {
            fac += element.length;
            addLinhaTabela(element[0], element.length, returnPercent(element.length, tamanhoTotal), fac, returnPercent(fac, tamanhoTotal))
        });
    }

    //qualitativaNominal('leo;pedro;pedro;murilo;helio;leo;murilo;helio;thales;renata;thales;bruna;leo;caio');
})