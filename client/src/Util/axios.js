import axios from "axios";

export async function post(url, body) {
    try {
        const responce = await axios.post(url, body);
        return responce.data || {};
    } catch(e) {
        throw e;
    }
}