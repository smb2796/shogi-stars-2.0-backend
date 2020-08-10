import Piece from './piece.js';

export default class Knight extends Piece {
    constructor (color) {
        super(1, 1, 0, color, color === 'dark' ? '../pieceImages/knight/dark_knight.png' : '../pieceImages/knight/light_knight.png');
    }
}