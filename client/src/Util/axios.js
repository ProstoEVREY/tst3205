import axios from "axios";

export async function post(url, body, options) {
    try {
        const responce = await axios.post(url, body, options);
        return responce.data || {};
    } catch(e) {
        throw e;
    }
}