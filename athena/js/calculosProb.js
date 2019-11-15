$(document).ready(function (){

    $("[data-btn-calcular]").click(function(){
        //reiniciando classe de alerta para validar
        retiraAlertaCampos();
        
        //buscando a aba selecionada
        let abaSelecionada = $("#pills-nav a.active").attr("data-value");

        //validando campos
        if(validaCampos(abaSelecionada)){

            //calculando de acordo com a aba selecionada
            switch(abaSelecionada){
                case "uni": uniforme(); break;
                case "bi": binomial(); break;
                case "nor": normal(); break;
            }
        }
        else
            alert("Existem campos sem valores ou com valores incorretos!"); //retornando erro        
    });

    var fatorial = function fac(n) { return n < 2 ? 1 : n * fac(n - 1) }

    function binomial() {
        let analComb = 1;
        let n = $("#amostraN").val();
        let p = $("#chanceSucesso").val();
        let q = $("#chanceFracasso").val();
        let k = $("#eventoK").val();
        if (k != 0 && k != n) {
            analComb = fatorial(n) / (fatorial(k) * fatorial(n - k));
        }

        let result = ((analComb * p ** k * q ** (n - k)) * 100).toFixed(2);
        let media = n*p;
        let dp = Math.sqrt(n*p*q).toFixed(2);

        $("#probabilidadeBinomial label").text("Probabilidade: " + result);
        $("#mediaBinomial label").text("Média: " + media);
        $("#dpBinomial label").text("Desvio Padrão: " + dp);
        $("#resultadosBinomial").show();
    }


   function uniforme() {
        //quantidade = x (maior/menor)
        //minimo = a
        //maximo = b
        //de = y; ate = x (entre)
        let indFormato = $("#selectUniforme").val();
        let a = $("#inputPontoMininmo").val();
        let b = $("#inputPontoMaximo").val();
        let x = "";
        let y = "";

        if (indFormato == "maior") {
            x = $("#inputQuantidade").val();
            x = b - x;
        }
        else if (indFormato == "menor") {
            x = $("#inputQuantidade").val();
            x = x - a;
        }
        else if (indFormato == "entre") {
            x = $("#uniformeInputDe").val();
            y = $("#uniformeInputAte").val();
            x = x - y;
        }

        let result = (1 / (b - a) * x * 100).toFixed(2);
        let variancia = ((b - a) ** 2 / 12).toFixed(2);
        let dp = Math.sqrt((b - a) ** 2 / 12).toFixed(2);
        let cv = (dp / ((a + b) / 2) * 100).toFixed(2);

        $("#resultadoUniforme label").text("Resultado: " + result);   
        $("#cvUniforme label").text("Coeficiente de Variancia: " + cv);
        $("#dpUniforme label").text("Desvio Padrão: " + dp);
        $("#varianciaUniforme label").text("Variancia: " + variancia);
        $("#resultadosUniforme").show();

    };



    function normal() {
        let intervalo = $("#selectNormal").val();
        let media = $("#normalMedia").val();
        let dp = $("#normalDesvioPadrao").val();
        let x = "";
        let y = "";
        let z = ""
        let aux = ""
        let probabilidade = 0;
        let vet = [
            [0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
            [0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753],
            [0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
            [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
            [0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
            [0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
            [0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549],
            [0.2580, 0.2611, 0.2642, 0.2673, 0.2703, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
            [0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
            [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
            [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
            [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
            [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
            [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
            [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
            [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
            [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
            [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
            [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
            [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
            [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817],
            [0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
            [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
            [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
            [0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
            [0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
            [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
            [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
            [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
            [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
            [0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
            [0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
            [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
            [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
            [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
            [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
            [0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
            [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
            [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
            [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000],
        ];

        if (intervalo == "maior") {
            x = $("#normalQuantidade").val();

            z += (((x - media) / dp) * 100).toString().replace(/[^0-9]/g, '')
            z = vet[parseInt(z[0]) + parseInt(z[1])][z[2]];
            if (x < media) {
                probabilidade = (0.5 - z) * 100;
            }
            else {
                probabilidade = (0.5 + z) * 100
            }
        }
        else if (intervalo == "menor") {
            x = $("#normalQuantidade").val();

            z += (((x - media) / dp) * 100).toString().replace(/[^0-9]/g, '')
            z = vet[parseInt(z[0]) + parseInt(z[1])][z[2]];
            if (x > media) {
                probabilidade = (0.5 + z) * 100;
            }
            else {
                probabilidade = (0.5 - z) * 100
            }
        }
        else if (intervalo == "entre") {
            x = $("#normalInputDe").val();
            y = $("#normalInputAte").val();

            if(x==media){
                aux += (((y - media) / dp) * 100).toString().replace(/[^0-9]/g, '');
                aux = vet[parseInt(aux[0]) + parseInt(aux[1])][parseInt(aux[2])];  
                probabilidade = aux*100;  
            }
            else if(y==media){
                z += (((x - media) / dp) * 100).toString().replace(/[^0-9]/g, '')
                z = vet[parseInt(z[0]) + parseInt(z[1])][parseInt(z[2])];
                probabilidade = aux*100;    
            }
            else{
                z += (((x - media) / dp) * 100).toString().replace(/[^0-9]/g, '')
                z = vet[parseInt(z[0]) + parseInt(z[1])][parseInt(z[2])];

                aux += (((y - media) / dp) * 100).toString().replace(/[^0-9]/g, '');
                aux = vet[parseInt(aux[0]) + parseInt(aux[1])][parseInt(aux[2])];
                probabilidade = (z - aux) * 100 
            }
        }

        $("#probabilidadeNormal label").text("Probabilidade: " + probabilidade)
        $("#resultadosNormal").show();
    }

    function validaCampos(abaSelecionada){
        let result = true;

        if(abaSelecionada == "uni"){

            if(!$("#selectUniforme").val()){
                $("#selectUniforme").addClass("alertInput");
                result = false;
            }

            if(!$("#inputPontoMininmo").val() || isNaN($("#inputPontoMininmo").val())){
                $("#inputPontoMininmo").addClass("alertInput");
                result = false;
            }

            if(!$("#inputPontoMaximo").val() || isNaN($("#inputPontoMaximo").val())){
                $("#inputPontoMaximo").addClass("alertInput");
                result = false;
            }

            if($("#selectUniforme").val() == "entre"){
                if(!$("#uniformeInputDe").val() || isNaN($("#uniformeInputDe").val())){
                    $("#uniformeInputDe").addClass("alertInput");
                    result = false;
                }

                if(!$("#uniformeInputAte").val() || isNaN($("#uniformeInputAte").val())){
                    $("#uniformeInputAte").addClass("alertInput");
                    result = false;
                }
            }else{

                if(!$("#inputQuantidade").val() || isNaN($("#inputQuantidade").val())){
                    $("#inputQuantidade").addClass("alertInput");
                    result = false;
                }

            }

        } else if (abaSelecionada == "bi"){
            if(!$("#amostraN").val() || isNaN($("#amostraN").val())){
                $("#amostraN").addClass("alertInput");
                result = false;
            }

            if(!$("#chanceSucesso").val() || isNaN($("#chanceSucesso").val())){
                $("#chanceSucesso").addClass("alertInput");
                result = false;
            }

            if(!$("#chanceFracasso").val() || isNaN($("#chanceFracasso").val())){
                $("#chanceFracasso").addClass("alertInput");
                result = false;
            }

            if(!$("#eventoK").val() || isNaN($("#eventoK").val())){
                $("#eventoK").addClass("alertInput");
                result = false;
            }
        } else if (abaSelecionada == "nor"){
            if(!$("#selectNormal").val()){
                $("#selectNormal").addClass("alertInput");
                result = false;
            }

            if(!$("#normalMedia").val() || isNaN($("#normalMedia").val())){
                $("#normalMedia").addClass("alertInput");
                result = false;
            }

            

            if(!$("#normalDesvioPadrao").val() || isNaN($("#normalDesvioPadrao").val())){
                $("#normalDesvioPadrao").addClass("alertInput");
                result = false;
            }

            if($("#selectNormal").val() == "entre"){
                if(!$("#normalInputDe").val() || isNaN($("#normalInputDe").val())){
                    $("#normalInputDe").addClass("alertInput");
                    result = false;
                }

                if(!$("#normalInputAte").val() || isNaN($("#normalInputAte").val())){
                    $("#normalInputAte").addClass("alertInput");
                    result = false;
                }
            }else{

                if(!$("#normalQuantidade").val() || isNaN($("#normalQuantidade").val())){
                    $("#normalQuantidade").addClass("alertInput");
                    result = false;
                }

            }
        }

        return result;
    }

    function retiraAlertaCampos(){
        $(".alertInput").removeClass("alertInput");
    }

});
