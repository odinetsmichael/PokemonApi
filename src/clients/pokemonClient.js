import axios from "axios";
import { constants } from "@/constants/endpoints";

export let client = (function () {
    async function getAll(offset, limit){
        let response = await axios.get(`${constants.BASE_URL}${constants.Endpoints.POKEMON}?offset=${offset}&limit=${limit}`);
        return response.data;
    }

    async function getByName(name){
        let response = await axios.get(`${constants.BASE_URL}${constants.Endpoints.POKEMON}/${name}`);
        return response.data;
    }

    return {
        getAll : getAll,
        getByName : getByName,
    };
})();
