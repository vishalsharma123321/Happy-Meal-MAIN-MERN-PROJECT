import JWT from 'jsonwebtoken';

const authMiddelware = async (req, res, next) => {
    const authHeader = req.headers.authorization;  // Updated to use 'authorization' key
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.send({
            success: false,
            message: "Unauthorized User. Try Again."
        });
    }

    try {
        const token = authHeader.split(' ')[1];  // Get the token after "Bearer"
        const token_decode = JWT.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;  // Assuming `id` is the user ID in token payload
        next();
    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: "Error in the user auth API.",
            error
        });
    }
};

export default authMiddelware;
