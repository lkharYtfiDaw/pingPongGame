
 import { EnvelopeIcon, UserGroupIcon, ArrowLeftOnRectangleIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';

 export const navLinks = [
   {
     id: 0,
     title: "Dashboard",
     icon: <HomeIcon className="nav-icon" />,
   },
   {
     id: 1,
     title: "Profile",
     icon: <UserIcon className="nav-icon" />,
   },
   {
     id: 2,
     title: "Messages",
     icon: <EnvelopeIcon className="nav-icon" />,
   },
   {
     id: 3,
     title: "Friends",
     icon: <UserGroupIcon className="nav-icon" />,
   },
   {
     id: 4,
     title: "LogOut",
     icon: <ArrowLeftOnRectangleIcon className="nav-icon" />,
   },
 ];