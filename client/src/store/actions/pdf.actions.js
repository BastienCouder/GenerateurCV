import axios from "axios";
import { apiUrl } from "../../utils/Utils";

export const GET_PDF_ERRORS = "GET_PDF_ERRORS";
export const READ_PDF = "READ_PDF";
export const CREATE_PDF = "CREATED_PDF";

export const readPdf = () => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/pdf`)
      .then((res) => {
        dispatch({ type: READ_PDF, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const createPDF = (data) => {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/pdf`, data)
      .then((res) => {
        dispatch({ type: CREATE_PDF, payload: res.data });
        console.log(data);
      })
      .catch((erreur) => {
        console.error("Erreur lors de la création du PDF :", erreur, data);
        dispatch({
          type: GET_PDF_ERRORS,
          payload: "Une erreur s'est produite lors de la création du PDF.",
        });
      });
  };
};
