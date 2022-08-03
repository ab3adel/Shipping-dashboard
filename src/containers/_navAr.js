import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'DashBoard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
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
    _tag: 'CSidebarNavItem',
    name: 'Shipping Offers',
    to: '/ShippingOffers',

    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Settings',
    to: '/Settings',

    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Companies',
    route: '/companies',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Companies',
        to: '/companies/companies',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Company',
        to: '/companies/AddNewCompany',
      },


    ],
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
    name: 'Reciepients',
    route: '/Reciepients',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Reciepients',
        to: '/Reciepients/AllReciepients',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'إضافة مستلم جديد',
      //   to: '/Reciepients/AddNewReciepient',
      // },
    ],
  },





  {
    _tag: 'CSidebarNavDropdown',
    name: 'Categories',
    route: '/Categories',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Categories',
        to: '/Categories/AllCategories',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Category',
        to: '/Categories/AddNewCategory',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Packages Types',
    route: '/Packages',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Packages Types',
        to: '/Packages/AllPackagesTypes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Pakage Type',
        to: '/Packages/AddNewPakageType',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/DynamicPages',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Pages',
        to: '/DynamicPages/AllPages',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Page',
        to: '/DynamicPages/AddNewPage',
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
        to: '/Cities/AddNewCity'
      },
    ],
  },





  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'المواقع',
  //   route: '/Locations',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'الدول',
  //       to: '/Locations/Countries',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'المدن',
  //       to: '/Locations/Cities',
  //     },

  //   ],
  // },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Contact Us',
    route: '/ContactUs',
    icon: 'cil-phone',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Messages',
        to: '/ContactUs/messages',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Replies',
        to: '/ContactUs/Replies',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'FAQs',
    to: '/FAQs',
    icon: 'cil-align-center',
  },



  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
