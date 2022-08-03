import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'لوحة التحكم',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['إدارة']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'الشركات',
    route: '/companies',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الشركات',
        to: '/companies/companies',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة شركة جديدة',
        to: '/companies/AddNewCompany',
      },
   

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'الأقسام',
    route: '/Departments',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الأقسام',
        to: '/Departments/AllDepartments',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة قسم جديد',
        to: '/Departments/AddNewDepartment',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'البطاقات',
    to: '/Tickets',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'الزبائن',
    to: '/Customers',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'المستخدمون',
    route: '/users',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل المستخدمين',
        to: '/users',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة مستخدم جديد',
        to: '/users/AddNewUser',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'أنواع البطاقات',
    route: '/Types',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الأنواع',
        to: '/Types/AllTypes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة نوع جديد',
        to: '/Types/AddNewType',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'حالات البطاقة',
    route: '/Statuses',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الحالات',
        to: '/Statuses/AllStatuses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة حالة جديدة',
        to:  '/Statuses/AddNewStatus',
      },
    ],
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'أولويات البطاقة',
    route: '/Priorities',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الأولويات',
        to: '/Priorities/AllPriorities',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة أولوية جديدة',
        to:  '/Priorities/AddNewPriority',
      },
    ],
  },
  
  
  
  

  {
    _tag: 'CSidebarNavDropdown',
    name: 'الدول',
    route: '/Countries',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الدول',
        to: '/Countries/AllCountries',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة دولة جديدة',
        to: '/Countries/AddNewCountry',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'المدن',
    route: '/Cities',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل المدن',
        to: '/Cities/AllCities',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة مدينة جديدة',
        to: '/Cities/AddNewCity',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'المناطق',
    route: '/Areas',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل المناطق',
        to: '/Areas/AllAreas',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة منطقة جديدة',
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
