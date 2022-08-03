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
    _tag: 'CSidebarNavItem',
    name: 'Company',
    to: '/Admin/Company',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Departments',
    route: '/Admin/Departments',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Departments',
        to: '/Admin/Departments/AllDepartments',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Department',
        to: '/Admin/Departments/AddNewDepartment',
      },
    ],
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Employees',
    route: '/Admin/Employees',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Employees',
        to: '/Admin/Employees',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Employee',
        to: '/Admin/Employees/AddNewEmployee',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Customers',
    route: '/customers',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Customers',
        to:   '/customers/AllCustomers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Customer',
        to: '/customers/AddNewCustomer',
      },
    ],
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
    _tag: 'CSidebarNavItem',
    name: 'Tickets',
    to: '/Tickets',
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
    _tag: 'CSidebarNavItem',
    name: 'Admin Register',
    to: '/AdminRegister',
    icon: 'cil-user-follow',
  },
 
  {
    _tag: 'CSidebarNavItem',
    name: 'Purchases',
    to: '/Purchases',
    icon: 'cil-calculator',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Slider',
    to: '/Slider',
    icon: "cil-indent-increase",
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Website Settings',
    route: '/Settings',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Settings',
        to: '/Settings/Settings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'API Key',
        to: '/Settings/apiKey',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Privacy Policy',
        to: '/Settings/PrivacyPolicy',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Privacy Policy Arabic',
        to: '/Settings/PrivacyPolicyArabic',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'How To Use',
        to: '/Settings/HowToUse',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'How To Use Arabic',
        to: '/Settings/HowToUseArabic',
      },
      
      {
        _tag: 'CSidebarNavItem',
        name: 'Terms And Conditions',
        to: '/Settings/TermsAndConditions',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Terms And Conditions Arabic',
        to: '/Settings/TermsAndConditionsArabic',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'About Us',
        to: '/Settings/AboutUs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'About Us Arabic',
        to: '/Settings/AboutUsArabic',
      },
    
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Services',
    route: '/Services',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Services',
        to: '/Services/ALLServices',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Stored Services',
        to: '/Services/StoredServices',
      },
 
    
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Offers',
    route: '/Offers',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Offers',
        to: '/Offers/Offers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Offer',
        to: '/Offers/AddNewOffer',
      },
 
    
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Contact Us Requestes',
    to: '/ContactUs',
    icon: 'cil-phone',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'FAQs',
    to: '/FAQs',
    icon: 'cil-align-center',
  },
 
  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Base',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Forms',
        to: '/base/forms',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Jumbotron',
        to: '/base/jumbotrons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navs',
        to: '/base/navs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navbars',
        to: '/base/navbars',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/base/progress-bar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Switches',
        to: '/base/switches',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Buttons',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Brand buttons',
        to: '/buttons/brand-buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Dropdowns',
        to: '/buttons/button-dropdowns',
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Icons',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Notifications',
    route: '/notifications',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Toaster',
        to: '/notifications/toaster'
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Disabled',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Labels']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label danger',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-danger'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label info',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-info'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label warning',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-warning'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
