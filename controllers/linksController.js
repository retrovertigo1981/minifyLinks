const { envConfig } = require("../config")
const db = require("../models")
const { generateShortCode } = require("../utils")
const { Link } = db

const linkController = {}

linkController.getLinksByUserId = async (req, res, next) => {
    const {userId}  = req.params
    try {
        const links = await Link.findAll({ where: { userId } });
        return res.status(200).json(links);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los enlaces" });
    }
}

linkController.createLink = async (req, res, next) => {
    // console.log('req.user en controlador:', req.user); // Para depurar
    // if (!req.user) {
    //     return res.status(401).json({ message: "Debes estar autenticado para crear un enlace" });
    // }
    const userId = req.user ? req.user?._id : null;
    const { originalLink } = req.body;

    try {
        if (!originalLink) {
            return res.status(400).json({ message: "El campo originalLink es requerido" });
        }

        // Generación de código único
        let shortCode;
        let isUnique = false;
        while (!isUnique) {
            shortCode = generateShortCode();
            const existingCode = await Link.findOne({ where: { shortLink: shortCode } });
            if (!existingCode) isUnique = true;
        }

        const shortLink = shortCode;
        const shortLinkResponse = `${envConfig.BASE_URL}/${shortLink}`;

        const newLink = await Link.create({
            userId,
            originalLink,
            shortLink,
            clickCount: 0,
        });

        res.status(201).json({ Link: shortLinkResponse });
    } catch (error) {
        next(error);
    }
};

linkController.redirectLink = async (req, res, next) => {
    const {shortCode} = req.params
    try {
        const link = await Link.findOne({where: {shortLink: shortCode}})

        if (!link) {
            return res.status(404).json({Error: "Enlace no econtrado"})
        }
        
        link.clickCount += 1;
        await link.save();

        res.redirect(link.originalLink)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    linkController
}   