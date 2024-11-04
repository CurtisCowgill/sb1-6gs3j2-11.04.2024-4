import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Calendar,
  Users,
  HardHat,
  UserCircle,
  Building2,
  MapPin,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  ClipboardList
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  subItems?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Projects', href: '/projects', icon: FolderKanban },
  { title: 'Work Orders', href: '/work-orders', icon: ClipboardList },
  { title: 'Schedule', href: '/schedule', icon: Calendar },
  { title: 'Customers', href: '/customers', icon: Users },
  { title: 'Crews', href: '/crews', icon: HardHat },
  { title: 'Employees', href: '/employees', icon: UserCircle },
  { title: 'Vendors', href: '/vendors', icon: Building2 },
  {
    title: 'Locations',
    href: '/locations',
    icon: MapPin,
    subItems: [
      { title: 'Neighborhood', href: '/locations/neighborhood' },
      { title: 'City', href: '/locations/city' },
      { title: 'County', href: '/locations/county' },
      { title: 'State', href: '/locations/state' },
      { title: 'Inspection Jurisdiction', href: '/locations/inspection' },
    ],
  },
  {
    title: 'Safety',
    href: '/safety',
    icon: Shield,
    subItems: [
      { title: 'Overview', href: '/safety' },
      { title: 'Incidents', href: '/safety/incidents' },
      { title: 'Toolbox Talks', href: '/safety/toolbox-talks' },
      { title: 'Resources', href: '/safety/resources' },
      { title: 'Certifications', href: '/safety/certifications' },
    ],
  },
  {
    title: 'Fleet',
    href: '/fleet',
    icon: Truck,
    subItems: [
      { title: 'Overview', href: '/fleet' },
      { title: 'Vehicles', href: '/fleet/vehicles' },
      { title: 'Equipment', href: '/fleet/equipment' }
    ],
  }
];

const LeftNav: React.FC = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setOpenSubmenu(null);
    }
  };

  const handleSubmenuClick = (href: string) => {
    if (isExpanded) {
      setOpenSubmenu(openSubmenu === href ? null : href);
    }
  };

  return (
    <div
      className={`relative bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={toggleNav}
        className="absolute -right-3 top-16 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50"
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? (
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>

      <div className="p-4 border-b flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Nies Foundations Dashboard"
        >
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          {isExpanded && (
            <span className="font-semibold truncate">Nies Foundations</span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => handleSubmenuClick(item.href)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                      location.pathname.startsWith(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600'
                    }`}
                    aria-expanded={openSubmenu === item.href}
                    aria-label={item.title}
                  >
                    {React.createElement(item.icon, {
                      className: "h-5 w-5 flex-shrink-0"
                    })}
                    {isExpanded && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            openSubmenu === item.href ? 'rotate-180' : ''
                          }`}
                        />
                      </>
                    )}
                  </button>
                  {isExpanded && openSubmenu === item.href && (
                    <div className="ml-6 space-y-1 mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={`block px-3 py-2 text-sm rounded-md ${
                            location.pathname === subItem.href
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          aria-current={location.pathname === subItem.href ? 'page' : undefined}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    location.pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                  aria-label={item.title}
                >
                  {React.createElement(item.icon, {
                    className: "h-5 w-5 flex-shrink-0"
                  })}
                  {isExpanded && (
                    <span className="truncate">{item.title}</span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t p-4">
        <div className={`flex items-center gap-2 mb-4 ${isExpanded ? '' : 'justify-center'}`}>
          <UserCircle className="h-8 w-8 flex-shrink-0 text-gray-400" />
          {isExpanded && (
            <div className="min-w-0">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-sm text-gray-500 truncate">john@example.com</p>
            </div>
          )}
        </div>
        <Link
          to="/logout"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 ${
            isExpanded ? '' : 'justify-center'
          }`}
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {isExpanded && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default LeftNav;