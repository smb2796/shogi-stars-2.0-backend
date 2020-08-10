import Piece from './piece.js';

export default class Bishop extends Piece {
    constructor (color) {
        super(1, 1, 0, color, color === 'dark' ? '../pieceImages/bishop/dark_bishop.png' : '../pieceImages/bishop/light_bishop.png');
    }
}