import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = 10000 * 60 * 15;
    const token = jwt.sign({ uid }, 'codigo_secreto_a_poner_en_el_env', { expiresIn });

    return { token, expiresIn };
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign({ uid }, 'codigo_secreto_a_poner_en_el_env', {
            expiresIn,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            //secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
        });
    } catch (error) {
        console.log(error);
    }
}