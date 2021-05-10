import type { NextApiRequest, NextApiResponse } from 'next'
import {AuthController} from "../../server/src/auth";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("AuthAPI: req=", req);
    try {
        const session = await AuthController.instance().login(req.body.username, req.body.password);
        res.status(200).json({session} );
    } catch(err) {
        res.status(403).json({error: err});
    }
}

export default login;