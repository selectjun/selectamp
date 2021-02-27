import LoginTemplete from '../../components/Login/LoginTemplete';
import LoginForm from '../../components/Login/LoginForm';

export type LoginProps = {};

export default function Login({}: LoginProps) {
  return (
    <LoginTemplete>
      <LoginForm />
    </LoginTemplete>
  );
};