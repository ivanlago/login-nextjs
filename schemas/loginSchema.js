import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string().email('Digite um e-mail válido').required('Campo Obrigatório'),
    password: yup.string().required('Campo Obrigatório'),
})