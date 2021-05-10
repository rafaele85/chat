import type { NextApiRequest, NextApiResponse } from 'next'
import {IChat} from "../../types/chat";

const chatList = (req: NextApiRequest, res: NextApiResponse) => {
    console.log("ChatListApi: req=", req.query);
    const c: IChat = {
        id: "dfghfgh",
        friendEmail: "434@dfdf.com"
    }
    res.status(200).json(
        [c]
    )
}

export default chatList;