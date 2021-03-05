// import { USER_SIGNUP } from "../../reducers/types";
// import axios from "axios";

// export const userSignup = (data) => dispatch => {
//     axios.defaults.withCredentials = true;
//     axios.post(`http://localhost:3001/signup/`, data)
//         .then(response => dispatch({
//             type: USER_SIGNUP,
//             payload: response.data
//         }))
//         .catch(error => {
//             if (error.response && error.response.data) {
//                 return dispatch({
//                     type: USER_SIGNUP,
//                     payload: error.response.data
//                 });
//             }
//             return;
//         });
// }