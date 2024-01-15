import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getDiagnoseData = () => {
    return axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
        .then(res => res.data);
}

export default {getDiagnoseData};