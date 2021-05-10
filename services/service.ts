import {IApiResources} from "../types/api";
import axios, {AxiosResponse} from "axios";

export class Service {
    protected getUrl(resource: IApiResources) {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        return baseUrl+resource;
        //return "/api"+resource;
    }

    protected async post<TPayload, TRes>(url: string, payload: TPayload): Promise<TRes> {
        console.log("service.post 1")
        try {
            console.log("service.post url=", url)
            const res = await axios.post<TRes, AxiosResponse<TRes>>(url, payload);
            console.log("service.post res=", res)
            if(res && res.data) {
                return res.data;
            }
        } catch(err) {
            console.error(err);
            throw(err);
        }
        throw("Invalid response")
    }

    protected async get<TPayload, TRes>(url: string, payload: TPayload): Promise<TRes> {
        try {
            console.log("service.get url=", url)
            const res = await axios.get<TRes, AxiosResponse<TRes>>(url, {params: payload});
            console.log("service.get res=", res)
            if(res && res.data) {
                return res.data;
            }
        } catch(err) {
            console.error(err);
            throw(err);
        }
        throw("Invalid response")
    }

}