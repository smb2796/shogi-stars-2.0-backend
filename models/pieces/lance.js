import Piece from './piece.js';

export default class Lance extends Piece {
    constructor (color) {
        super(1, 1, 0, color, color === 'dark' ? '../pieceImages/lance/dark_lance.png' : '../pieceImages/lance/light_lance.png');
    }
}