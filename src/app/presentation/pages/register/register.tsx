import { useNavigate } from 'react-router';

import { RegisterForm } from '~/app/application/auth/domain/models';
import { useRegisterMutation } from '~/app/application/auth/store/hooks';
import { ROUTES } from '~/app/main/types';

import { useForm, useToastAlert } from '../../hooks';
import FormRegister from './form-register/form-register';
import { FormProvider } from 'react-hook-form';

const Register = () => {
  const navigate = useNavigate();

  const methods = useForm<RegisterForm>();
  const [register, { isError, isSuccess, error, isLoading }] =
    useRegisterMutation();
  const createUser = (values: RegisterForm) => {
    register({
      document: values.document,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      phoneNumber: values.phoneNumber
    });
  };

  const redirect = () => navigate(ROUTES.LOGIN);

  useToastAlert({
    error: error,
    isError: isError
  });

  useToastAlert({
    isSuccess: isSuccess,
    successMessage: 'Cadastro realizado com sucesso',
    onSuccess: () => redirect()
  });

  return (
    <FormProvider {...methods}>
      <FormRegister onSubmit={createUser} {...{ isLoading }} />
    </FormProvider>
  );
};

export default Register;
