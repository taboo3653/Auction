import mongoose, { Schema, Document } from 'mongoose'

export interface IBid extends Document {
    value : Number;
    user : { 
        type : Schema.Types.ObjectId;
        ref : string;
    };
    lot : { 
        type : Schema.Types.ObjectId;
        ref : string;
    };
}

const BidSchema = new Schema (
    {
        value: {
            type : Number,
            required: true
        },
        user: {
            type : Schema.Types.ObjectId, 
            ref : "User", 
            requierd: true
        },
        lot: {
            type : Schema.Types.ObjectId, 
            ref : "Lot", 
            requierd: true
        }

    }, {
        timestamps: true
    }
);

export default mongoose.model<IBid>('Bid', BidSchema);