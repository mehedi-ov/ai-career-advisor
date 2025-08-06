import { NavLink } from 'react-router-dom';
import { ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'AI Advisor', href: '/advisor', icon: BriefcaseIcon },
  // Add more links as needed
];

const Sidebar = () => {
  return (
    <nav className="space-y-1 p-2">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          end={item.href === '/dashboard'} // `end` prop for exact match on root dashboard link
          className={({ isActive }) =>
            cn(
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
              isActive
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
            )
          }
        >
          <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;