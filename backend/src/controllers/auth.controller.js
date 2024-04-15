import { generateToken, generateRefreshToken } from '../helpers/generateTokens.js';

export const refreshToken = (req, res) => {
    try {
        let refreshTokenCookie = req.cookies?.refreshToken;
        if (!refreshTokenCookie) throw new Error("No refresh token provided");

        const { id } = jwt.verify(refreshTokenCookie, 'codigo_secreto_a_poner_en_el_env');

        const { token, expiresIn } = generateToken(id);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        delete user.password;
        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    // https://stackoverflow.com/questions/27978868/destroy-cookie-nodejs
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
};
