import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = 10000 * 60 * 15;
    const token = jwt.sign({ uid }, 'codigo_secreto_a_poner_en_el_env', { expiresIn });

    return { token, expiresIn };
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 900 * 1000;

    try {
        const refreshToken = jwt.sign({ uid }, 'codigo_secreto_a_poner_en_el_env', {
            expiresIn,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            //secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn),
        });
    } catch (error) {
        console.log(error);
    }
}

export const generateAdminToken = (uid, res) => {
    const expiresIn = 7200 * 1000;
    const token = jwt.sign({ uid },
        'codigo_secreto_a_poner_en_el_env', { expiresIn });

    res.cookie("adminToken", token, {
        httpOnly: true,
        //secure: !(process.env.MODO === "developer"),
        expires: new Date(Date.now() + expiresIn),
    });
        
    return { token, expiresIn };
}