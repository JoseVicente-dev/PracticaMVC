(function(){//MODELO
    //Funcion anonima que se ejecuta a si misma. Closure
    /* NOTA: self tiene inicialmente asignado el objeto Window. 
    Por tanto, las funciones son asignadas a este objeto y pueden usarse
    fuera de la funcion anónima */
    self.Board = function(width, height){//Objeto pizarron del juego
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.protoype = {
        get elements(){ //Método que retorna las barras y la pelota
            let elements = this.bars;
            elements.push(ball)
            return elements
        }
    }
})();

(function (){
    /**
     * 
    * @param {number} x La posicion en x de la barra
     * @param {number} y La posicion en y de la barra
     * @param {number} width El ancho de la barra
     * @param {number} height  La altura de la barra
     * @param {object} board Objeto tipo Board
     */
    self.Bar = function (x,y,width, height, board){
        this.

    }
})();

(function(){//VISTA
    self.BoardView = function(canvas, board){
        this.canvas = canvas
        //Las dimensiones del canvas son modificadas por las dimensiones del Board
        this.canvas.width = board.width
        this.canvas.height = board.height
        this.board = board
        //contexto: es el objeto a traves del cual se puede dibujar en JS
        this.ctx = canvas.getContext('2d')
    }
})()

/*NOTA: el objeto window tiene scope global. 
Cualquier elemento asignado a él puede accederse desde cualquier
parte del script, siempre que se esté en la misma ventana
*/
window.addEventListener('load',main)//Evento que ejecuta la funcion main al cargar la pagina

function main(){//CONTROLADOR
    //Funcion que ejecuta todos los elementos
    let board = new Board(800,400)
    let canvas = document.getElementById('canvas')
    /**
     * El controlador (funcion main()) le pasa a la vista (funcion BoardView()) el modelo (funcion Board()
     */
    let board_view = new BoardView(canvas, board)
}