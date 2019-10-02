import mongoose, { Schema, Document } from 'mongoose'

export interface ILot extends Document {
    name: string;
    description: string;
    /*creator: { 
        type : Schema.Types.ObjectId;
        ref : string;
    };*/
    start_price: number;
    current_price: number;
    min_step: number;
    finish_time: Date;
}

const LotSchema = new Schema (
    {
        name: {
            type : String,
            required: true
        },
        description: String,
       /* creator: {
            type : Schema.Types.ObjectId, 
            ref : "User", 
            requierd: true
        },*/
        start_price: {
            type : Number,
            min : 1,
            required : true
        },
        current_price: {
            type : Number,
            min : 1,
            required: true
        },
        min_step: {
            type : Number,
            min: 1,
            required: true
        },
        finish_time: {
            type : Date,
            required: true
        }
    }, {
        timestamps: true
    }
);

export default mongoose.model<ILot>('Lot', LotSchema);