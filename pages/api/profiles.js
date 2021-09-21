import { ADMIN_BUSINESS_CARD } from "../../lib/api";
import { slugify } from "../../lib/utils";


export default async function (req, res) {
    try {
        let vCardsJS = require('vcards-js');
        var vCard = vCardsJS();
        //set properties
        vCard.firstName = req.body.name;
        vCard.organization = 'Next ADV';
        //vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
        vCard.workPhone = req.body.phone;
        vCard.workEmail = req.body.email
        //vCard.birthday = new Date(1985, 0, 1);
        vCard.title = 'Software Developer';
        //vCard.url = 'https://github.com/enesser';
        //save to file
        vCard.saveToFile(`./${slugify(req.body.name)}.vcf`);
        //get as formatted string
        return res.status(200).send(vCard);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err)
    }

}