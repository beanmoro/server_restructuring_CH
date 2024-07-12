import jwt from 'jsonwebtoken';

export const createToken = (user) =>{
    const { _id, email } = user;

    const token = jwt.sign(
        {_id, email },
        "bdf52d63151c49b14c5cf1d8e5e0b6e9843c6c44c58d7b9f33d3abf6db6e2bb1962a839fb71efebd5fa2b4912b23a30d94dd5c57d7683d062c64b168d1a13ff8",
        {expiresIn: "1m"}
    );
    return token;
};

export const verifyToken = (token) => {
    const decode = jwt.verify(token, "bdf52d63151c49b14c5cf1d8e5e0b6e9843c6c44c58d7b9f33d3abf6db6e2bb1962a839fb71efebd5fa2b4912b23a30d94dd5c57d7683d062c64b168d1a13ff8");
    return decode;
}