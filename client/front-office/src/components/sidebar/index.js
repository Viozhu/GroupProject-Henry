import React from 'react';

import SideBarLogo from './SidebarLogo';
import SideBarContent from './SidebarContent';

const SideBar = () => (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <SideBarLogo />
    <SideBarContent />
  </aside>
);

export default SideBar;
