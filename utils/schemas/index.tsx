import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  campaignName: yup
    .string()
    .min(3, 'Campaign name must be at least 3 characters long')
    .required('Required'),
  startDate: yup.date().required('Required'),
  endDate: yup.date().required('Required').min(yup.ref('startDate')),
  rewardDesc: yup
    .string()
    .min(3, 'Reward description must be at least 3 characters long')
    .required('Required'),
  rewardQty: yup
    .number()
    .oneOf([1, 2, 3, 4], 'Invalid quantity type')
    .required('Required'),
  // acceptedTos: yup
  //     .boolean()
  //     .oneOf([true], "By clicking on Submit, I agree to the terms and conditions set out by Nifty Rewards"),
})
