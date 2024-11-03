import jwt from "jsonwebtoken";

const signJWT = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET || "dfasdf");
};

const verifyJWT = (payload) => {
    return jwt.verify(payload, process.env.JWT_SECRET || "dfasdf");
};

const saltRounds = process.env.SALT;

const generateHash = async (input) => {
    try {
        const hash = await bcrypt.hash(input, Number(saltRounds));
        return hash;
    } catch (error) {
        console.error("Error hash:", error);
        throw error;
    }
};

const comparePassword = async (plainPassword, hash) => {
    try {
        const match = await bcrypt.compare(plainPassword, hash);
        return match;
    } catch (error) {
        console.error("Error password:", error);
        throw error;
    }
};

export { signJWT, verifyJWT, generateHash, comparePassword };
