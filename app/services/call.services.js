module.exports = erreurCall = (error, res) => {
    const message = "Une erreur survient lors de votre requête. Reessayer plus tard.";
    console.log(error);
    return res.status(500).json({message, error : error.message});
}