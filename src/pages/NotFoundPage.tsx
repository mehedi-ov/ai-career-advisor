import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest">404</h1>
      <div className="bg-white dark:bg-slate-800 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="mt-6">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;