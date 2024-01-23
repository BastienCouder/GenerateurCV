import axios from "axios";
import { apiUrl } from "../../utils/Utils";

export const GET_PDF_ERRORS = "GET_PDF_ERRORS";
export const CREATE_PDF = "PDF_CREATED";

export const createPDF = (data) => {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/pdf`, data)
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: GET_PDF_ERRORS, payload: res.data.error });
        } else {
          dispatch({ type: CREATE_PDF, payload: res.data });
        }
      })
      .catch((erreur) => {
        console.error("Erreur lors de la création du PDF :", erreur);
        dispatch({
          type: GET_PDF_ERRORS,
          payload: "Une erreur s'est produite lors de la création du PDF.",
        });
      });
  };
};
