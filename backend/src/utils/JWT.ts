import jwt from 'jsonwebtoken';

export const verifyJWTToken = (token: string) =>
{
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            <string>process.env.JWT_SECRET,
            (err: jwt.VerifyErrors, decodedData: string | object) => {
                
                if (err || !decodedData) {
                    return reject(err);
                }
                resolve(decodedData);
            });
    });
}
export const generateJWTToken = (data:object) => {
    const token = jwt.sign(
        {data},
        <jwt.Secret>process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: 'HS256',
        });
    return token;
}




