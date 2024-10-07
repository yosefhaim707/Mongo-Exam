import mongoose, { Document, Schema } from 'mongoose';


export interface IGame extends Document {
    title: string;
    genre: string;
    price: number;
    releaseDate: Date;
    publisher: string;
    tags: string[];
}

const GameSchema: Schema = new Schema ({
    title: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    tags: { type: [String], required: true }
});

export default mongoose.model<IGame>('Game', GameSchema)