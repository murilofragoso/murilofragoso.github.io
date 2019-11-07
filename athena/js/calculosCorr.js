$(document).ready(function (){
    function correlacao(x, y) {
        if (xi.length > yi.length) {
            return -1
        }
        let soma = 0, xi2 = 0, yi2 = 0, xi = 0, yi = 0, n = x.length;
        for (let i = 0; i < xi.length; i++) {
            xi += x[i];
            yi += y[i];
            soma += x[i] + y[i];
            xi2 += x[i] ** 2;
            yi2 += y[i] ** 2;
        }

        return ((n * soma - xi * yi) / Math.sqrt((n * xi2 - (xi ** 2)) * (n * yi2 - (xi ** 2)))) * 100

    }
})