
var islas =["Tenerife","El-Hierro","La-Gomera","Fuerteventura","La-Palma","Lanzarote","Gran-Canaria"];
var islasUsadas=[];
var imagenes;
var imagenesUsadas;
var puntuacion;
var jugadas;
$("#contenedor").append("<div id='imagenes'></div>");
toastr.options.closeButton = true;
toastr.options.positionClass = "toast-top-right";
toastr.options.timeOut = 1000;
toastr.options.fadeOut = 1000;
toastr.options.tapToDismiss = false;
$("#dialog").dialog({
    autoOpen: false,
    show: {
    effect: "blind",
    duration: 1000
    },
    closeOnEscape:true
    });

/**
 * Cierra el modal y recarga la pagina para cargar el juego desde 0
 */     
function volver(){
    $( "#dialog" ).dialog( "close" );
    location.reload();
}
/**
 * Crea la notificacion toastr
 * @param {string} tipo - Tipo de toastr
 * @param {string} mensaje - Mensaje a mostrar
 */
function notificacion (tipo , mensaje){
    if( tipo == 'puntua' ) {
        toastr.success(mensaje,'<i>Éxito</i>');
    } else if( tipo == 'nopuntua' ) {
        toastr.error(mensaje,'<i>Fallo</i>');
    } else if( tipo == 'puntuacion') {
        
        toastr.info(mensaje,'Información');
    }
}
/**
 * Creador de las imagenes de los trajes
 * @param {traje} objeto - Objeto que contiene la isla la imagen y el genero
 */
function crear (objeto){
    $("#imagenes").append("<img id='"+objeto.Isla +objeto.Genero+"'src='"+objeto.Image+"' class='trajes'>");
    console.log(" se ha creado"+objeto.Isla+objeto.Genero);
}
/**
 * Función que crea el juego
 * @param {int} img - Número de imagenes que se mostraran en el juego
 */
function crearJuego(img){
    var i = 0;
    nIslas = Math.floor((Math.random()) * (7-4+1)) + 4;
    console.log("esto son las islas que han salido"+nIslas);
    islasUsadas=[];
    puntuacion=0;
    jugadas=0;
    imagenesUsadas=0;
    $("#imagenes").empty();
    $("#contenedor").find("div").not("#imagenes").remove();
    while (i<nIslas) {
        var rand = islas[Math.floor(Math.random() * islas.length)];
    
        if(!islasUsadas.includes(rand)){
            islasUsadas.push(rand);
            i++;
        }
    }
    //Creador de las imagenes si se encuentran en las islas seleccionadas
    traje.forEach(element => {
        if(islasUsadas.includes(element.Isla) && imagenesUsadas<img)
        {
            crear(element);
            $("#"+element.Isla+element.Genero).draggable({
                containment:"#contenedor",
                cursor:"move"
            });
            imagenesUsadas++;
        }
    });
    //Creador de los contenedores
    islasUsadas.forEach(element => {
        $("#contenedor").append("<div id ='"+element+"'class='islas'><p>"+element.replace('-',' ')+"</p></div>");
        $("#"+element).droppable({
        drop: function(event , ui){
            console.log(ui.draggable.attr('id')+"dropped");
            jugadas++;
            console.log(jugadas);
            if(ui.draggable.attr('id').includes(element)){
                console.log(ui.draggable.attr('id'))
                $("#"+ui.draggable.attr('id')).css({"-webkit-filter": "drop-shadow(2px 1px 0 green) drop-shadow(-1px -1px 0 green)",
                                                    "filter": "drop-shadow(2px 1px 0 green) drop-shadow(-1px -1px 0 green)"
                });
                notificacion('puntua','+1 punto');
                puntuacion++;
            }
            else{
                $("#"+ui.draggable.attr('id')).css({"-webkit-filter": "drop-shadow(2px 1px 0 red) drop-shadow(-1px -1px 0 red)",
                "filter": "drop-shadow(2px 1px 0 red) drop-shadow(-1px -1px 0 red)" })
                notificacion('nopuntua','+0 punto');
            }
            $("#"+ui.draggable.attr('id')).draggable("disable");
            //Si se han movido todas las imagenes se mostrara el mensaje final
            if(jugadas==img){
                $("#dialog").find("p").html("Su puntuación es de "+puntuacion);
                $( "#dialog" ).dialog( "open" );
                notificacion('puntuacion',"Puntuación : "+puntuacion);
                console.log("Usted ha acabado con "+ puntuacion);

            }
        }
        })
    });

}

//Iniciamos el juego al cargar la pagina
crearJuego(4);

$("#dificultad").append("<button onclick='facil()'>Fácil</button>");
$("#dificultad").append("<button onclick='medio()'>Medio</button>");
$("#dificultad").append("<button onclick='experto()'>Experto</button>");

//Funciones para los botones
function facil(){
    console.log("facil");
    crearJuego(4)
}
function medio(){
    console.log("medio");
    crearJuego(7)
}
function experto(){
    console.log("experto")
    crearJuego(8)
}
