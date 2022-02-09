(function(){
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
            var elements = this.bars;
            elements.push(ball)
            return elements
        }
    }
})();

(function(){
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

window.addEventListener('load',main)//Evento que ejecuta la funcion main al cargar la pagina

function main(){
    //Funcion que ejecuta todos los elementos
    let board = new Board(800,400)
    let canvas = document.getElementById('canvas')
    let board_view = new BoardView(canvas, board)
}