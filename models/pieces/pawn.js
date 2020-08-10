import Piece from './piece.js';

export default class Pawn extends Piece {
    constructor (color) {
        super(1, 1, 0, color, color === 'dark' ? '../pieceImages/pawn/dark_pawn.png' : '../pieceImages/pawn/light_pawn.png');
    }
}