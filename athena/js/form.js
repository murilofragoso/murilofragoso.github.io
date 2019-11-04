$(document).ready(function () {
    $("#idTipoDeVariavel").change(function () {
        if ($(this).val() == "QO")
            $("#divOrdemVariaveis").slideDown()
        else
            $("#divOrdemVariaveis").slideUp()

    })
})

$(document).ready(function () {
    $("#bntDescritiva").click(function () {
        $("#containerDivMae").show();
        $("#containerCard").hide();
    })
})

$(document).ready(function () {
    $("#bntProbabilidade").click(function () {
        $("#containerCard").hide();
        $("#containerProbabilidade").show();
    })
})

$(document).ready(function () {
    $("#selectUniforme").change(function () {
        if ($(this).val() == "entre")
            $("#entreUniforme").slideDown()

        else
            $("#entreUniforme").slideUp()

    })
})

$(document).ready(function () {
    $("#selectNormal").change(function () {
        if ($(this).val() == "entre")
            $("#entreNormal").slideDown()

        else
            $("#entreNormal").slideUp()

    })
})

$(document).ready(function () {
    $("#navLinkProbabilidade").click(function () {
        $("#containerCard").hide ();
        $("#containerProbabilidade").show();
    })
})

$(document).ready(function () {
    $("#navLinkDescritiva").click(function () {
        $("#containerDivMae").show();
        $("#containerCard").hide();

    })
})







