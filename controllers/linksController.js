const { envConfig } = require("../config")
const db = require("../models")
const { generateShortCode } = require("../utils")
const { Link } = db

const linkController = {}

linkController.getLinksByUserId = async (req, res, next) => {
    const { userId } = req.params
    console.log(userId)
    try {
        const links = await Link.findAll({ where: { userId: userId } });
        return res.status(200).json(links);
    } catch (error) {
        next(error);
    }
}

linkController.createLink = async (req, res, next) => {

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
    const { shortCode } = req.params
    try {
        const link = await Link.findOne({ where: { shortLink: shortCode } })

        if (!link) {
            return res.status(404).json({ Error: "Enlace no econtrado" })
        }

        link.clickCount += 1;
        await link.save();

        const userIp = req.ip
        console.log(userIp)

        res.redirect(link.originalLink)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    linkController
}   