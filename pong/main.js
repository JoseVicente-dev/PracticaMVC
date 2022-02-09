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
            let elements = this.bars;
            elements.push(this.ball)
            return elements
        }
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
    }

    self.Bar.prototype = {

        down: function () {

        },
        up: function () {

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
        draw: function () {
            for (let i = this.board.elements.length - 1; i >= 0; i--) {
                let elemento = this.board.elements[i]
                
                draw(this.contexto, elemento)
            }
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

                // default:
                //     break;
            }
        }

    }

})()

/*NOTA: el objeto window tiene scope global. 
Cualquier elemento asignado a él puede accederse desde cualquier
parte del script, siempre que se esté en la misma ventana
*/
window.addEventListener("load", main)//Evento que ejecuta la funcion main al cargar la pagina

function main() {//CONTROLADOR
    //Funcion que ejecuta todos los elementos
    /**
     * El controlador (funcion main()) le pasa a la vista (funcion BoardView()) el modelo (funcion Board()
     */
    let board = new Board(800, 400)
    let bar = new Bar(20,100,40,100, board) //No es necesario crear un objeto Bar, pues la funcion se auto adiciona al board al invocar el "constructor"
    let canvas = document.getElementById("canvas")
    let board_view = new BoardView(canvas, board)
    board_view.draw();
}