import React from 'react';
import { ChevronLeft, Navigation, Calendar, MapPin } from 'lucide-react';
import { useAppStore } from '../store';
import { Menu } from '@headlessui/react';
import { format } from 'date-fns';

const routes = [
  { id: '1', name: 'Nairobi-Mombasa Highway' },
  { id: '2', name: 'Thika Road' },
  { id: '3', name: 'Kisumu-Kakamega Highway' },
];

const dates = [
  '2024-02-01',
  '2024-02-15',
  '2024-03-01',
];

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
      isSidebarOpen ? 'w-64' : 'w-0'
    } overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">RoadWatch AI</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <Menu as="div" className="relative">
              <Menu.Button className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-gray-600" />
                  <span>Select Route</span>
                </div>
                <ChevronLeft className="h-4 w-4 transform -rotate-90" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 w-full mt-2 bg-white rounded-md shadow-lg z-10">
                {routes.map((route) => (
                  <Menu.Item key={route.id}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center px-4 py-2 text-sm`}
                      >
                        {route.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>

          <div>
            <Menu as="div" className="relative">
              <Menu.Button className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <span>Select Date</span>
                </div>
                <ChevronLeft className="h-4 w-4 transform -rotate-90" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 w-full mt-2 bg-white rounded-md shadow-lg z-10">
                {dates.map((date) => (
                  <Menu.Item key={date}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center px-4 py-2 text-sm`}
                      >
                        {format(new Date(date), 'MMM dd, yyyy')}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}