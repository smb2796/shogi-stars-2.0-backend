import Piece from './piece.js';

export default class Rook extends Piece {
    constructor (color) {
        super(1, 1, 0, color, color === 'dark' ? '../pieceImages/rook/dark_rook.png' : '../pieceImages/rook/light_rook.png');
    }
}