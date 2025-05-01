import * as yup from 'yup';

export const userSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup
        .string()
        .required('Phone is required')
        .matches(
            /^[0-9+\-\s()]{7,20}$/,
            'Phone number is not valid'
        ),
    website: yup
        .string()
        .url('Must be a valid URL')
        .required('Website is required'),
    address: yup.object({
        street: yup.string().required('Street is required'),
        suite: yup.string().required('Suite is required'),
        city: yup.string().required('City is required'),
        zipcode: yup.string().required('Zipcode is required'),
    }),
    company: yup.object({
        name: yup.string(),
        catchPhrase: yup.string(),
        bs: yup.string(),
    }),
    // companyName: yup.string(),
});
