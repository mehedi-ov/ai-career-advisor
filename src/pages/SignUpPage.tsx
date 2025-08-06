
import SignUpForm from '../components/auth/SignUpForm';
import { Meteors } from '../components/ui/Meteors';

const SignUpPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 overflow-hidden">
      <SignUpForm />
      <Meteors number={20} />
    </div>
  );
};

export default SignUpPage;