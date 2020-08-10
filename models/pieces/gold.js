import Piece from './piece.js';

export default class Gold extends Piece {
    constructor (color) {
        super(1, 0, 0, color, color === 'dark' ? '../pieceImages/gold/dark_gold.png' : '../pieceImages/gold/light_gold.png');
    }
}