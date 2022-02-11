(function () {//MODELO
    //Funcion anonima que se ejecuta a si misma. Closure
    /* NOTA: self tiene inicialmente asignado el objeto Window. 
    Por tanto, las funciones son asignadas a este objeto y pueden usarse
    fuera de la funcion anónima */
    self.Board = function (width, height) {//Objeto pizarron del juego
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements() { //Método que retorna las barras y la pelota
            let elements = this.bars.map(function(bar){ return bar});
            elements.push(this.ball)
            return elements
        }
    }
})();

(function () {
    self.Ball = function (x, y, radius, board) {
        this.x = x
        this.y = y
        this.radius = radius
        this.speed_y = 0
        this.speed_x = 3

        board.ball = this
        this.kind = "circle"
    }

})();

(function () {
    /**
     * Define el objeto Bar
     * @param {number} x La posicion en x de la barra
     * @param {number} y La posicion en y de la barra
     * @param {number} width El ancho de la barra
     * @param {number} height  La altura de la barra
     * @param {object} board Objeto tipo Board. Representa donde se va a dibujar la barra
     */
    self.Bar = function (x, y, width, height, board) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.board = board
        this.board.bars.push(this)//adiciona un objeto Bar (this) al atributo bars[] del objeto board
        this.kind = "rectangle" //Le indica al canvas qué forma tiene el objeto
        this.speed = 20
    }

    self.Bar.prototype = {

        down: function () {
            this.y += this.speed
        },
        up: function () {
            this.y -= this.speed
        },
        toString: function () {//Metodo que se retorna cuando se castea el objeto a un string
            return 'x: ' + this.x + " y: " + this.y
        }
    }
})();

(function () {//VISTA
    self.BoardView = function (canvas, board) {
        this.canvas = canvas
        //Las dimensiones del canvas son modificadas por las dimensiones del Board
        this.canvas.width = board.width
        this.canvas.height = board.height
        this.board = board
        //contexto: es el objeto a traves del cual se puede dibujar en JS
        this.contexto = canvas.getContext("2d")
    }

    self.BoardView.prototype = {
        clean: function () {
            this.contexto.clearRect(0, 0, this.board.width, this.board.height)
        },
        draw: function () {
            for (let i = this.board.elements.length - 1; i >= 0; i--) {
                let elemento = this.board.elements[i]

                draw(this.contexto, elemento)
            }
        },
        play: function () {
            this.clean()
            this.draw()
        }
    }

    /**
     * NOTA: Helper methods: métodos que no pertenecen al scope de un objeto.
     * Son una de las ventajas de lenguajes con paradigmas hibridos funcional y OO.
     * Son funciones que pueden estar fuera de una clase
     */

    /**
     * Dibuja los elementos
     * @param {object} contexto contexto del canvas
     * @param {object} element elemento a dibujar
     */
    function draw(contexto, element) {

        if (element !== null && element.hasOwnProperty("kind")) {

            switch (element.kind) {
                case "rectangle":

                    //funcion del contexto que dibuja un cuadrado
                    contexto.fillRect(element.x, element.y, element.width, element.height)
                    break;
                case "circle":
                    contexto.beginPath()
                    contexto.arc(element.x, element.y, element.radius, 0, 7)
                    contexto.fill()
                    contexto.closePath()
                    break;

                // default:
                //     break;
            }
        }
    }
})()

var board = new Board(800, 400)
//NOTA: let no permite declarar dos variables con el mismo nombre con el mismo scope, en tanto que var sí
var bar_1 = new Bar(20, 100, 40, 100, board)
var bar_2 = new Bar(740, 100, 40, 100, board)
var canvas = document.getElementById("canvas")
var board_view = new BoardView(canvas, board)
var ball = new Ball(350, 100, 10, board)

//El listener del evento de mover las barras se ubica en el document para que sea global y detectado desde cualquier parte de la pagina
document.addEventListener('keydown', function (e) {
    e.preventDefault()

    //NOTA: keyCode está deprecado. Es recomentable usar e.code o e.key
    // console.log('code', e.code, typeof e.code);
    // console.log('key', e.key, typeof e.key)
    //console.log(e.keyCode);//keyCode identifica la tecla presionada mediante un numero
    if (e.code == 'ArrowUp') {
        bar_1.up()
    } else if (e.code == 'ArrowDown') {
        bar_1.down()
    } else if (e.code == 'KeyW') {
        bar_2.up()
    } else if (e.code == 'KeyS') {
        bar_2.down()
    }
})


/*NOTA: el objeto window tiene scope global. 
Cualquier elemento asignado a él puede accederse desde cualquier
parte del script, siempre que se esté en la misma ventana
*/

//La linea inferior ya no es necesaria, porque la funcion controlador (main) se va a ejecutar en cada moviento de la barra
//window.addEventListener("load", main)//Evento que ejecuta la funcion main al cargar la pagina.
window.requestAnimationFrame(controller)


function controller() {//CONTROLADOR
    //Funcion que ejecuta todos los elementos
    /**
     * El controlador (funcion controler()) le pasa a la vista (funcion BoardView()) el modelo (funcion Board()
     */

    //NOTA: Estas variables se ubican fuera de las funciones, para modificar su alcance a global
    /* let board = new Board(800, 400)
    let bar = new Bar(20,100,40,100, board) //No es necesario crear un objeto Bar, pues la funcion se auto adiciona al board al invocar el "constructor"
    let bar = new Bar(740,100,40,100, board)
    let canvas = document.getElementById("canvas")
    let board_view = new BoardView(canvas, board) */


    //Los metodos clean() y draw() se dejan en el metodo play()
    // board_view.clean();
    // board_view.draw();
    board_view.play();    
    window.requestAnimationFrame(controller)

}