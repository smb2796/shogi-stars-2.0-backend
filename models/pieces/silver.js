import Piece from './piece.js';

export default class Silver extends Piece {
    constructor (color) {
        super(1, 1, 0, color, color === 'dark' ? '../pieceImages/silver/dark_silver.png' : '../pieceImages/silver/light_silver.png');
    }
}