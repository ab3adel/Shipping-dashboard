import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Management']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Companies',
    route: '/companies',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Companies',
        to: '/companies/companies',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'AddNewCompany',
        to: '/companies/AddNewCompany',
      },
   

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Departments',
    route: '/Departments',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Departments',
        to: '/Departments/AllDepartments',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Department',
        to: '/Departments/AddNewDepartment',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tickets',
    to: '/Tickets',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customers',
    to: '/Customers',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Users',
    route: '/users',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Users',
        to: '/users',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New User',
        to: '/users/AddNewUser',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Ticket Types',
    route: '/Types',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Types',
        to: '/Types/AllTypes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Type',
        to: '/Types/AddNewType',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Ticket Statuses',
    route: '/Statuses',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Statuses',
        to: '/Statuses/AllStatuses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Status',
        to:  '/Statuses/AddNewStatus',
      },
    ],
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Ticket Priorities',
    route: '/Priorities',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Priorities',
        to: '/Priorities/AllPriorities',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Priority',
        to:  '/Priorities/AddNewPriority',
      },
    ],
  },
  
  
  
  

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Countries',
    route: '/Countries',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Countries',
        to: '/Countries/AllCountries',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Country',
        to: '/Countries/AddNewCountry',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Cities',
    route: '/Cities',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Cities',
        to: '/Cities/AllCities',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New City',
        to: '/Cities/AddNewCity',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Areas',
    route: '/Areas',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Areas',
        to: '/Areas/AllAreas',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Area',
        to: '/Areas/AddNewArea',
      },
    ],
  },
  


  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
