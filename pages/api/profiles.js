import { ADMIN_BUSINESS_CARD } from "../../lib/api";

export default async function(req, res) {
    console.log(req);

    try{
        const response = await fetch(`${ADMIN_BUSINESS_CARD}/profiles`);
        const json = await response.json();
        return res.status(response.status).send(json);

    }catch(err){
        console.error(e);
        return res.status(500).send(err);
    }
}