import Piece from './piece.js';

export default class King extends Piece {
    constructor (color) {
        super(1, 0, 0, color, color === 'dark' ? '../pieceImages/king/dark_king.png' : '../pieceImages/king/light_king.png');
    }
}