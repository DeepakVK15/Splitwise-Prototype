// import { USER_LOGIN, USER_LOGOUT } from "../../reducers/types";
// import axios from "axios";

// export const userLogin = (data) => dispatch => {
//     axios.defaults.withCredentials = true;
//     axios.post("http://localhost:3001/login", data)
//         .then(response => dispatch({
//             type: USER_LOGIN,
//             payload: response.data
//         }))
//         .catch(error => {
//             if (error.response && error.response.data) {
//                 return dispatch({
//                     type: USER_LOGIN,
//                     payload: error.response.data
//                 });
//             }
//         });
// }

// export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});