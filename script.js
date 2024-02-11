let matrices = [];

//Te cambia la pantalla del home a la config
document.getElementById('newGame').addEventListener('click', function() {
    // Ocultar el primer div
    document.getElementById('pgTitle').classList.add('oculto');

    // Mostrar el segundo div
    document.getElementById('pgHome').classList.remove('oculto');
    document.getElementById('pgHome').classList.add('visible');
});

document.getElementById('Cerrar').addEventListener('click', function() {
   
    document.getElementById('pgRecords').classList.add('oculto');
});

document.getElementById('top5').addEventListener('click', function() {
    document.getElementById('pgRecords').classList.remove('oculto');
});




//Te cambia la pantalla de la config a el juego
document.getElementById('startGame').addEventListener('click', function(){
    // Ocultar el primer div
    document.getElementById('pgHome').classList.remove('visible');
    document.getElementById('pgHome').classList.add('oculto');

    // Mostrar el segundo div
    document.getElementById('pgJuego').classList.remove('oculto');
    document.getElementById('pgJuego').classList.add('visible');

    
    //Te crea 4 matrices
    for (let i = 0; i < 4; i++) {
        // Crear una matriz 5x5 con números aleatorios sin repetición
        const matriz = crearMatriz(size.value);

        
    
        // Mostrar la matriz
        console.log(`Matriz ${i + 1}:`);
        matriz.forEach((fila) => {
            console.log(fila);
        });
        console.log();

        matrices.push(matriz);
    }

    
    cartonNombreJugador1.textContent = puntosNombreJugador1.textContent = player1.value;
    cartonNombreJugador2.textContent = puntosNombreJugador2.textContent = player2.value;
    cartonNombreJugador3.textContent = puntosNombreJugador3.textContent = player3.value;
    cartonNombreJugador4.textContent = puntosNombreJugador4.textContent = player4.value;
    
    
    let sizeGrid = `repeat(${size.value}, 1fr)`;
    let elementos = document.getElementsByClassName("mini-grid");
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.gridTemplateColumns = sizeGrid;
        elementos[i].style.gridTemplateRows = sizeGrid;
    }

    for (let i = 0; i < 4; i++) {
        let nombrediv = "grid"+(i+1)
        for (let j = 0; j < size.value; j++){
            for (let k = 0; k < size.value; k++){
                const div = document.createElement('div');
                if(matrices[i][j][k][1] == false){
                    div.classList.add('no-seleccionado');
                }else{
                    div.classList.add('seleccionado');
                }
                div.textContent = matrices[i][j][k][0];
                document.getElementById(nombrediv).appendChild(div);
            }
        }
    }

    
});

//verifica si el carton tiene el numero y cambia su estado y color
function tieneNumero(ultimoNumero){
    //Te cambia el color del cuadro del div
    let elementos = document.getElementsByClassName("no-seleccionado");
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].textContent == ultimoNumero){
            elementos[i].classList.add('seleccionado');
            elementos[i].classList.remove('no-seleccionado');
        }
    } 

    //console.log(matrices);

    //Te cambia el false a true
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < size.value; j++){
            for (let k = 0; k < size.value; k++){
                if(matrices[i][j][k][0] == ultimoNumero){
                    matrices[i][j][k][1] = true;
                    let coordenadaY = j;
                    let coordenadaX = k;
                    let matrizRevisar = i

                    validarVertical(coordenadaX, matrizRevisar);
                    validarHorizontal(coordenadaY, matrizRevisar);
                    //validarDiagonales(coordenadaX, coordenadaY, matrizRevisar);
                    validarTodos(matrizRevisar);
                }
            }
        }
    }


}

//verifica la combinacion de lineas para hacer puntos
function validarVertical(coordenadaX, matrizRevisar){
    let contador = 0;
    for (let j = 0; j < size.value; j++){
        if (matrices[matrizRevisar][j][coordenadaX][1] == true){
            contador = contador +1;
        }
    }
    if (contador == size.value){
        sumarPuntos("v", matrizRevisar);
    }

}
function validarHorizontal(coordenadaY, matrizRevisar){
    let contador = 0;
    for (let j = 0; j < size.value; j++){
        if (matrices[matrizRevisar][coordenadaY][j][1] == true){
            contador = contador +1;
        }
    }
    if (contador == size.value){
        sumarPuntos("h", matrizRevisar);
    }

}
function validarDiagonales(coordenadaX, coordenadaY, matrizRevisar){
    if(coordenadaX == coordenadaY || coordenadaX+1 + coordenadaY+1 == size.value+1){

        console.log(coordenadaX, coordenadaY);
        let contador = 0;
        for (let j = 0; j < size.value; j++){
            //console.log(j+"!!!!!!");
            for (let i = 0; i < size.value; i++){
                if (matrices[matrizRevisar][j][j][1] == true){
                    console.log("paso");
                    console.log(matrices[matrizRevisar][j][j][0]+"!!!!!!");
                    console.log(matrices[matrizRevisar][j][j][1]);
                    contador = contador +1;
                }else if(matrices[matrizRevisar][j][i][1] == true && i+j == size.value+1){
                    console.log("paso2");
                    console.log(matrices[matrizRevisar][j][i][0]+"!!!!!!");
                    console.log(matrices[matrizRevisar][j][i][1]);
                    contador = contador +1;
                }else if(matrices[matrizRevisar][i][j][1] == true && i+j == size.value+1){
                    console.log("paso3");
                    console.log(matrices[matrizRevisar][i][j][0]+"!!!!!!");
                    console.log(matrices[matrizRevisar][i][j][1]);
                    contador = contador +1;
                }
            }
            break
        }

        console.log("Esto es un contador"+contador)
        if ((contador == 8 && size.value == 4) || (contador == (size.value*2)-1)){
            sumarPuntos("d", matrizRevisar);
        }
    }

}
function validarTodos(matrizRevisar){
    let contador = 0;
    for(let i = 0; i < size.value; i++){
        for(let j = 0; j < size.value; j++){
            if (matrices[matrizRevisar][i][j][1] == true){
                contador = contador +1;
            }
        }
    }
    //console.log("Esto es un contador"+contador)
    if (contador == size.value*size.value){
        sumarPuntos("t", matrizRevisar);
    }
}

//funcion para calcular y sumar puntos
function sumarPuntos(tipoPunto, jugador){
    if (tipoPunto == "v"){
        let puntaje = 1
        if(jugador == 0){
            
            puntosJ1.textContent = parseInt(puntosJ1.textContent)+puntaje;
            console.log(puntosJ1.textContent);console.log(puntosJ1.textContent);
        }
        else if(jugador == 1){
            
            puntosJ2.textContent = parseInt(puntosJ2.textContent)+puntaje;
            console.log(puntosJ2.textContent);console.log(puntosJ2.textContent);
        }
        else if(jugador == 2){
            
            puntosJ3.textContent = parseInt(puntosJ3.textContent)+puntaje;
            console.log(puntosJ3.textContent);console.log(puntosJ3.textContent);
        }
        else if(jugador == 3){
            
            puntosJ4.textContent = parseInt(puntosJ4.textContent)+puntaje;
            console.log(puntosJ4.textContent);console.log(puntosJ4.textContent);
        }
    }
    else if (tipoPunto == "h"){
        let puntaje = 1
        if(jugador == 0){
            puntosJ1.textContent = parseInt(puntosJ1.textContent)+puntaje;
        }
        else if(jugador == 1){
            puntosJ2.textContent = parseInt(puntosJ2.textContent)+puntaje;
        }
        else if(jugador == 2){
            puntosJ3.textContent = parseInt(puntosJ3.textContent)+puntaje;
        }
        else if(jugador == 3){
            puntosJ4.textContent = parseInt(puntosJ4.textContent)+puntaje;
        }
    }
    else if (tipoPunto == "d"){
        let puntaje = 3
        if(jugador == 0){
            puntosJ1.textContent = parseInt(puntosJ1.textContent)+puntaje;
        }
        else if(jugador == 1){
            puntosJ2.textContent = parseInt(puntosJ2.textContent)+puntaje;
        }
        else if(jugador == 2){
            puntosJ3.textContent = parseInt(puntosJ3.textContent)+puntaje;
        }
        else if(jugador == 3){
            puntosJ4.textContent = parseInt(puntosJ4.textContent)+puntaje;
        }
    }
    else if (tipoPunto == "t"){
        let puntaje = 5
        if(jugador == 0){
            puntosJ1.textContent = parseInt(puntosJ1.textContent)+puntaje;
        }
        else if(jugador == 1){
            puntosJ2.textContent = parseInt(puntosJ2.textContent)+puntaje;
        }
        else if(jugador == 2){
            puntosJ3.textContent = parseInt(puntosJ3.textContent)+puntaje;
        }
        else if(jugador == 3){
            puntosJ4.textContent = parseInt(puntosJ4.textContent)+puntaje;
        }
        culminarJuego();
    }

}



function culminarJuego(){
    // Ocultar el primer div
    //document.getElementById('pgJuego').classList.remove('visible');
    //document.getElementById('pgJuego').classList.add('oculto');

    // Mostrar el segundo div
    document.getElementById('pgCierre').classList.remove('oculto');
    //document.getElementById('pgCierre').classList.add('visible');


    let listad = [
        [puntosNombreJugador1.textContent, parseInt(puntosJ1.textContent)], 
        [puntosNombreJugador2.textContent, parseInt(puntosJ2.textContent)], 
        [puntosNombreJugador3.textContent, parseInt(puntosJ3.textContent)], 
        [puntosNombreJugador4.textContent, parseInt(puntosJ4.textContent)]];

    // Ordena la lista en función del número entero en la segunda posición
    listad.sort((a, b) => {
        // Compara los números en la segunda posición de los subarrays
        return b[1] - a[1];
    });


    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let spanInterno = document.createElement('span');

        console.log(listad[i][0], listad[i][1])
        spanInterno.textContent = listad[i][1];
        span.textContent = listad[i][0];


        span.appendChild(spanInterno);
        li.appendChild(span);
        let punto = document.getElementById("puntos")
        punto.appendChild(li);
    }



}




// Función para generar un número aleatorio del 1 al 50
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 50) + 1;
}

// Función para crear una matriz nxn con números aleatorios sin repetición
function crearMatriz(n) {
    const matriz = [];
    let numeros = [];
    for (let i = 0; i < n; i++) {
        
        const fila = [];
        for (let j = 0; j < n; j++) {
            // Obtener un índice aleatorio de la lista
            let indiceAleatorio = generarNumeroAleatorio();
            console.log(numeros);
            console.log(indiceAleatorio);
            while (numeros.includes(indiceAleatorio)) {
                console.log("entro");
                indiceAleatorio = generarNumeroAleatorio();
            }
            // Agregar el número aleatorio a la fila
            let numero = [indiceAleatorio, false];
            fila.push(numero);
            numeros.push(indiceAleatorio);
        }
        // Agregar la fila a la matriz
        matriz.push(fila);
    }
    return matriz;
}








//Crea un numero nuevo para le bingo y lo almacena en una lista
const numerosAleatoriosg = [];
let rondas= 0;
document.getElementById('newNumber').addEventListener('click', function() {
    // Lista para almacenar los números aleatorios

        rondas = rondas +1
        console.log(rondas);
        document.getElementById('contador').textContent = rondas;

        //Genera los numeros aleatorios
        let numero = generarNumeroAleatorio();
        while (numerosAleatoriosg.includes(numero)) {
            // Si el número aleatorio ya está en la lista, generar otro
            numero = generarNumeroAleatorio();
        }

        //te muestra el numero en el centro y luego lo anexa a la lista
        document.getElementById('lastNumber').textContent = numero;
        numerosAleatoriosg.push(numero)

        //console.log(numerosAleatoriosg);
        //console.log(numero);
        tieneNumero(numero);

        if(rondas == 25){
            culminarJuego();
            
        }

});

document.getElementById('Home').addEventListener('click', function() {
    rondas = 0;
    document.getElementById('contador').textContent = rondas;

    document.getElementById('pgJuego').classList.remove('visible');
    document.getElementById('pgJuego').classList.add('oculto');

    document.getElementById('pgCierre').classList.add('oculto');

    
    document.getElementById('pgTitle').classList.remove('oculto');


});

document.getElementById('Reset').addEventListener('click', function() {
    rondas = 0;
    document.getElementById('contador').textContent = rondas;

    document.getElementById('pgJuego').classList.remove('visible');
    document.getElementById('pgJuego').classList.add('oculto');

    document.getElementById('pgCierre').classList.add('oculto');


    document.getElementById('pgHome').classList.remove('oculto');
    document.getElementById('pgHome').classList.add('visible');


});

