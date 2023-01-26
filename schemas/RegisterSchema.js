import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string().required('Campo Obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('Campo Obrigatório'),
    password: yup.string().min(6, 'A senha deve ter no mínimo 6 carateres').required('Campo Obrigatório'),
})