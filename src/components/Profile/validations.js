import * as yup from "yup";

const validations = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  phone: yup.string().min(7).required(),
  postalCode: yup.string().min(5).required(),
  address: yup.string().required(),
  city: yup.string().required(),
});
// dropdown : https://stackoverflow.com/questions/55978417/how-to-properly-use-yup-schema-with-single-react-select

export default validations;
