import type { NextApiRequest, NextApiResponse } from 'next'

const logout = (req: NextApiRequest, res: NextApiResponse) => {
    console.log("AuthAPI.logout: req=", req);
    res.status(200).json({});
}

export default logout;