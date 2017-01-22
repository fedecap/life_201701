//alert("hola, Fede, abri la consola con f12"); //ej. cartelito
console.log("esto mande a la consola"); //ej. imprimir a la consola

//TRUCO: para todo lo que me da "fiaca" escribir puedo hacer una "funcion"
//defino una sola vez una funcion, ej. para escribir algo mas corto que "console.log"
p= /* se llama "p" */ function (msj,que) /* el primer parametro lo pongo en la variable (cajita) que se llama "msj", puedo usar otros nombres, varios separados por , */ { /* este es el cuerpo de la funcion, donde aparezca el nombre de u parametro va a poner el valor que recibio */ console.log("LOG",msj,que); } 

p("hola fede, este es el mensaje para la funcion"); //asi uso=aplico mi funcion
/* 1: la compu busca "que es p", encuentra que es una funcion
   2: pone el primer valor entre paretesis en la primer "cajita", ej. msj
   3: pone aca lo que estaba en el cuerpo de la definicion, y lo evalua usando los valores que puso en la cajita (variable) */

//ej. defino otra funcion
peliTipica= function (elBueno, elMalo, laChica, elPlan) {
	p(elBueno+" descansa tranquilo en su casa. Espera la visita de "+laChica+". Pero no llega. "+elMalo+" la rapto para "+elPlan+". "+elBueno+" lo encuentra, le impide "+elPlan+" y rescata a "+laChica);
}

//ej. la uso
peliTipica("Batman","Guason","Batichica","envenenar el agua");
//ej. la uso cambiando el contenido de las "cajitas"
peliTipica("Superman","Chotanor","Luisa Lane","hacer pis en la pileta");

//********************************************************************
//Dos conceptos mas:
//1: lista
listaCuadros= ["boca", "riber", "san lorenzo"];
p("LISTA DE CUADROS", listaCuadros);

segundoCuadro= listaCuadros[1]; // empieza de cero, puedo preguntar el i-esimo
p("SEGUNDO CUADRO", segundoCuadro);

//2: clave -> valor
cuadroAgoles= {boca: 4, riber: 0, "san lorenzo": 3}; //san lorenzo con comillas porque tiene un espacio

p("cuadroAgoles",cuadroAgoles);
golesBoca= cuadroAgoles["boca"];
p("golesBoca",golesBoca);

DBG=0; //con esto controlo si me muestra todo lo que esta haciendo en la consola

//*********************************************************************
//1:Grilla del juego
Filas= 9; //Ahora escribir "Filas" es lo mismo que escribir el numero que esta despues del parentesis (en este caso "3")
Columnas= 9; //Lo mismo
Grilla= [];

filacolumnaAindice= function (fila, columna) {
    var indice= Columnas * fila + columna;
    return indice;
}

celdaCambiar= function (grilla, fila, columna, estado) { //Le paso una grilla, fila y columna y me la devuelve con esa celda en el "estado" en el que le pedi
    var indice= filacolumnaAindice(fila, columna);
    grilla[indice]= estado //Tomamos la grilla y en la posicion "indice" pusimos "estado"
    return grilla;
}

celdaValor= function (grilla, fila, columna) { //Le paso una grilla, fila y columna y me la devuelve el valor de esa celda
    var indice= filacolumnaAindice(fila, columna);
    var valor= grilla[indice]; //si valor estaba vacio o era falso
    DBG && p("celdaValor",[fila,columna,valor]); //si DBG es verdadero, pone cartelito, sino no
    return valor; 
}

grillaAtexto= function (grilla) {
    var r="\n"; //el resultado, empiezo bajando una fila asi me lo imprime legible
    for (var fila=0;fila<Filas;fila++) { //fila empieza valiendo cero, y mientras sea menor que Filas despues de ejecutar cada vuelta le suma uno
        for (var columna=0;columna<Columnas;columna++) {
            r= r+ (celdaValor(grilla,fila,columna)||"-");
        }
        r= r+ "\n"; //al final de cada fila, bajo de renglon
    }
    return r;
}

grillaAhtml= function (grilla) {
    var r="<br>"; //el resultado, empiezo bajando una fila asi me lo imprime legible
    for (var fila=0;fila<Filas;fila++) { //fila empieza valiendo cero, y mientras sea menor que Filas despues de ejecutar cada vuelta le suma uno
        for (var columna=0;columna<Columnas;columna++) {
            r= r +'<span style="color:'+(celdaValor(grilla,fila,columna)=="*" ? "green": "gray")+';">&block;</span>' ;
        }
        r= r+ "\n<br>"; //al final de cada fila, bajo de renglon
    }
    return r;
}

unaGrilla= [];
unaGrillaConElementos= celdaCambiar(unaGrilla,1,1,"*"); 
p("mi grilla",grillaAtexto(unaGrillaConElementos));
p("mi grilla",grillaAtexto(unaGrilla)); //OJO! en este leguaje "unaGrilla" TAMBIEN se me cambio cuando llame a celdaCambiar, PERO me conviene y "por fiaca" lo voy a aprovechar para no tener que estar inventando nombres todo el tiempo

//hago una grilla con la diagonal
unaGrillaDiag= [];
for (filaYcol=0;filaYcol<Math.min(Filas,Columnas);filaYcol++) { //cuando se me acaban las filas o columnas, paro. Math.min me da el minimo
    DBG && p("Poniendo",filaYcol);
    celdaCambiar(unaGrillaDiag,filaYcol,filaYcol,"*");    
}

p("mi grilla diagonal",grillaAtexto(unaGrillaDiag));

//Multiples grillas de prueba
unaGrillaPalito= [];
    celdaCambiar(unaGrillaPalito,3,3,"*")
    celdaCambiar(unaGrillaPalito,3,4,"*")
    celdaCambiar(unaGrillaPalito,3,5,"*")
    
//**************************************************************

vecinasAtexto= function (grilla, lafila, lacolumna) {
    var r="\n";
    for (var fila= Math.max(lafila-1,0);fila<Math.min(lafila+2,Filas);fila++) { //empieza una fila arriba y termina una abajo de la que le pedi
        for (var columna= Math.max(lacolumna-1,0);columna<Math.min(lacolumna+2,Columnas);columna++) {
            r= r+celdaValor(grilla,fila,columna);
        }
        r= r+ "\n"; //al final de cada fila, bajo de renglon
    }
    return r
}

vecinasVivas= function (grilla, lafila, lacolumna) { //U: devuelve la cantidad de vivas para una celda
    var r=0;
    for (var fila= Math.max(lafila-1,0);fila<Math.min(lafila+2,Filas);fila++) { //empieza una fila arriba y termina una abajo de la que le pedi
        for (var columna= Math.max(lacolumna-1,0);columna<Math.min(lacolumna+2,Columnas);columna++) {
            if (fila!=lafila || columna!=lacolumna) { //A: si es de alrededor, pero NO la del centro que me pidieron, cuento
                if (celdaValor(grilla,fila,columna)=="*") {r++}
            }
        }
    }
    return r;
}

grillaVecinasVivas= function (grilla) { //U: devuelve una grilla que dice para cada celda cuantas vecinas vivas tiene
    var r=[];
    for (var fila= 0;fila<Filas;fila++) {
        for (var columna= 0;columna<Columnas;columna++) {
            var vivasEstaCelda= vecinasVivas(grilla, fila, columna);
            celdaCambiar(r,fila,columna,vivasEstaCelda);
        }
    }
    return r;
}

//**********************************************************
// ya tengo que fabrico mi grilla Y puedo contar las vecinas E imprimr lo que conte
x= grillaVecinasVivas(unaGrillaDiag)
p("Vecinas",grillaAtexto(x));

//********************************************************
// 3: Calcula el proximo estado

grillaProximoEst= function (grilla) { //U: calcula el proximo estado para una grilla aplicando las reglas
    var vivas=grillaVecinasVivas(grilla)
    var nueva=[];
    var nuevaVivasCnt=0;
    for (var fila=0;fila<Filas;fila++) {
        for (var columna=0;columna<Columnas;columna++) {
            var v= celdaValor(vivas, fila, columna);
            if (celdaValor(grilla,fila,columna)=="*"){ //A: Está viva
                if (v==2 || v==3){celdaCambiar(nueva,fila,columna,"*"); nuevaVivasCnt++;}
            }
            else {
                if (v==3){celdaCambiar(nueva,fila,columna,"*"); nuevaVivasCnt++;}
            }
        }
    }
    return {grilla: nueva, vivasCnt: nuevaVivasCnt};
}

//******************************************************************
// Animar

animarJuego= function (grilla, pasos) {
    var z= {grilla: grilla, nuevasCnt: 1};
    for (var paso=0;paso<pasos && z.nuevasCnt>0;paso++){
        var t= grillaAtexto(z.grilla);
        p("Paso "+paso, t);
        document.body.innerHTML='<pre>'+t+"</pre>"; //XXX: no anda porque no se ve la animacion y el browser no nos deja esperar entre cuadritos, ver abajo version "programacion functional"
        z=grillaProximoEst(z.grilla)
    }
}

DemoraCuadritoMs= 1000;
animarUnCuadrito= function (grilla, pasos, despues) { //u: esta llamamos para empezar la animacion
    animarUnCuadritoImpl({grilla: grilla, vivasCnt: 1}, pasos,0,despues);
}

animarUnCuadritoImpl= function (grillaYcnt,pasos,paso,despues) { //U: esta es interna, la "recursiva" porque se llama a si misma
    if (paso<pasos && grillaYcnt.vivasCnt>0) {
        var t= grillaAtexto(grillaYcnt.grilla);
        p("Paso "+paso, t);
        document.body.innerHTML='Paso '+paso+"\n"+grillaAhtml(grillaYcnt.grilla);
        var z=grillaProximoEst(grillaYcnt.grilla);
        //A: este paso, ya mostre todo y calcule proximo estado
        setTimeout(function () { animarUnCuadritoImpl(z,pasos,paso+1,despues)},DemoraCuadritoMs); 
        //A: esperar UN segundo y volver a llamar a animarCuandrito con los valores para elcuadrito que sigue
    }
    else { //A: termine los pasos
        if (typeof(despues)=="function") { despues(); }
    }
}