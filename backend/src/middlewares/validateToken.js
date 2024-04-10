import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("No token provided");

        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, 'codigo_secreto_a_poner_en_el_env');
        req.uid = uid;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
};