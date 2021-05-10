import type { NextApiRequest, NextApiResponse } from 'next'

const createChat = (req: NextApiRequest, res: NextApiResponse) => {
    console.log("createChat: req=", req.body);
    res.status(201).json({});
}

export default createChat;