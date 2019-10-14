import mongoose, { Schema, Document } from 'mongoose'
import { generateJWTToken } from '../utils/JWT'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator';



export interface IUserModel extends IUser, Document {
    comparePasswords(pass : string): Promise<boolean>;
    generateGWT() : string;
  }

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    confirmed: boolean;
    confirm_hash?: string;

}

const UserSchema: Schema = new Schema(
    {
       
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        confirm_hash: String,

    }
);

UserSchema.pre('save', async function (next) {
    let user: IUser = <IUser>this;

    if (user.isModified('password') || user.isNew) {
        const salt = await bcrypt.genSalt(10)
        user.password  = await bcrypt.hash(user.password, salt);
        user.confirm_hash = await bcrypt.hash(new Date().toString()+user.email,salt);
        next();
    }
    else
        return next();
})

UserSchema.methods.comparePasswords =  function (pass: string) {
    const isMatch = bcrypt.compareSync( pass, this.password || '');
    return isMatch;
}

UserSchema.methods.generateGWT = function () {

    return generateJWTToken({
        _id: this._id, 
        email : this.email, 
        name : this.name
    });
    
}

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUserModel>('User', UserSchema);