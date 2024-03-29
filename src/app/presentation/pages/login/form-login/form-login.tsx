import { useFormContext } from 'react-hook-form';

import { ROUTES } from '~/app/main/types';
import {
  ArrowPrev,
  IconButton,
  LogoSkyTech
} from '~/app/presentation/components';
import { EyePasswordIcon } from '~/app/presentation/components/icons/eye-password-icon';
import TextInput from '~/app/presentation/components/text-input/text-input';
import { useToggle } from '~/app/presentation/hooks';

import {
  BackPageButton,
  BoxLogo,
  Button,
  ForgotPasswordButton,
  FormContainer,
  TitleForm
} from './form-login-styles';

interface Props {
  onSubmit: (values) => void;
  isLoading: boolean;
}
const FormLogin = ({ onSubmit, isLoading }: Props) => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const { handleSubmit } = useFormContext();

  const typePassword = showPassword ? 'text' : 'password';
  return (
    <FormContainer component='form' onSubmit={handleSubmit(onSubmit)}>
      <BackPageButton href='/' title='voltar' icon={<ArrowPrev />} />
      <BoxLogo>
        <LogoSkyTech />
      </BoxLogo>
      <TitleForm variant='h1'>Login</TitleForm>

      <TextInput name='email' label='Email' inputProps={{ maxLength: 256 }} />

      <TextInput
        type={typePassword}
        name='password'
        label='Senha'
        inputProps={{ maxLength: 50 }}
        InputProps={{
          endAdornment: (
            <IconButton
              type='button'
              onClick={toggleShowPassword}
              icon={<EyePasswordIcon visibility={showPassword} />}
            />
          )
        }}
      />

      <Button {...{ isLoading }} type='submit'>
        Entrar
      </Button>

      <ForgotPasswordButton
        title='esqueci minha senha'
        href={ROUTES.RESET_PASSWORD}
      />
    </FormContainer>
  );
};

export default FormLogin;
