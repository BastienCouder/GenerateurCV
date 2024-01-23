import { CREATE_PDF, GET_PDF_ERRORS } from "../actions/pdf.actions";

const initialState = {
  pdf: null,
  erreur: "",
};

const pdfReducer = (etat = initialState, action) => {
  switch (action.type) {
    case CREATE_PDF:
      return {
        ...etat,
        pdf: action.payload,
        erreur: "",
      };
    case GET_PDF_ERRORS:
      return {
        ...etat,
        pdf: null,
        erreur: action.payload,
      };
    default:
      return etat;
  }
};

export default pdfReducer;
