export default class Piece {
    constructor (in_play, promotable, promoted, color, piece_image) {
        this.in_play = in_play;
        this.promotable = promotable;
        this.promoted = promoted;
        this.color = color;
        this.piece_image = piece_image;
    }
}