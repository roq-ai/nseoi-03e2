import * as yup from 'yup';

export const dataValidationSchema = yup.object().shape({
  option_type: yup.string().required(),
  strike_price: yup.number().integer().required(),
  expiry_date: yup.date().required(),
  client_id: yup.string().nullable().required(),
});
