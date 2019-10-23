import mongoose, { Schema, Document } from 'mongoose'

export interface ILot extends Document {
    name: string;
    description: string;
    creator: { 
        type : Schema.Types.ObjectId;
        ref : string;
    };
    startPrice: number;
    minStep: number;
    finishTime: Date;
    images: Array<string>;
}

const LotSchema = new Schema (
    {
        name: {
            type : String,
            required: true
        },
        description: String,
        creator: {
            type : Schema.Types.ObjectId, 
            ref : "User", 
            required: true
        },
        startPrice: {
            type : Number,
            min : 1,
            required : true
        },
        minStep: {
            type : Number,
            min: 1,
            required: true
        },
        finishTime: {
            type : Date,
            required: true
        },
        images: {
            type : Array,
        }
    }, {
        timestamps: true
    }
);

export default mongoose.model<ILot>('Lot', LotSchema);