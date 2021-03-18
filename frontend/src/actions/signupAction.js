import { USER_SIGNUP } from "./types";
import axios from "axios";
import {uri} from '../uri';

export const userSignup = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${uri}/signup/`, data)
        .then(response => dispatch({
            type: USER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}