import React,{useState} from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

const Purchases = React.lazy(() => import('./views/purchases/purchases'));
const ContactUs = React.lazy(() => import('./views/contactUs/contactUs'));
const User = React.lazy(() => import('./views/users/User'));
const AdminRegister = React.lazy(() => import('./views/adminRegister/adminRegister'));
const AdminProfile = React.lazy(() => import('./views/adminProfile/adminProfile'));
const FAQs = React.lazy(() => import('./views/faqs/faqs'));
const Settings = React.lazy(() => import('./views/settings/settings/settings'));
const PrivacyPolicy = React.lazy(() => import('./views/settings/privacyPolicy/privacyPolicy'));
const PrivacyPolicyAr= React.lazy(() => import('./views/settings/privacyPolicyAr/privacyPolicy'));
const Terms = React.lazy(() => import('./views/settings/terms/termsAndConditions'));
const TermsAr = React.lazy(() => import('./views/settings/termsAr/termsAndConditions'));
const HowToUse = React.lazy(() => import('./views/settings/howToUse/howToUse'));
const HowToUseAr = React.lazy(() => import('./views/settings/howToUseAr/howToUse'));
const AboutUs = React.lazy(() => import('./views/settings/aboutUs/aboutUs'));
const AboutUsAr = React.lazy(() => import('./views/settings/aboutUsAr/aboutUs'));
const APIKey = React.lazy(() => import('./views/settings/apiKey/apiKey'));
const AllServices = React.lazy(() => import('./views/services/allServices/allServices'));
const StoredServices = React.lazy(() => import('./views/services/storedServices/storedServices'));
const AddNewOffer = React.lazy(() => import('./views/offers/addNewOffer/addNewOffer'));
const Offers = React.lazy(() => import('./views/offers/offers/offres'));
const Offer = React.lazy(() => import('./views/offers/offer/offre'));
const Slider = React.lazy(() => import('./views/slider/slider'));

const AddNewCompany = React.lazy(() => import('./views/companies/addNewCompany/addNewCompany'));
const Companies = React.lazy(() => import('./views/companies/companies/companies'));
const Company = React.lazy(() => import('./views/companies/company/company'));
const Users = React.lazy(() => import('./views/users/Users'));
const AddNewUser = React.lazy(() => import('./views/users/addNewUser/addNewUser'));
const UserUpdate = React.lazy(() => import('./views/users/userUpdate/userUpdate'));
const Countries = React.lazy(() => import('./views/countries/countries'));
const AddNewCountry = React.lazy(() => import('./views/countries/AddNewCountry/AddNewCountry'));
const UpdateCountry = React.lazy(() => import('./views/countries/countryUpdate/countryUpdate'));
const Cities = React.lazy(() => import('./views/cities/cities'));
const AddNewCity = React.lazy(() => import('./views/cities/AddNewCity/AddNewCity'));
const UpdateCity = React.lazy(() => import('./views/cities/cityUpdate/cityUpdate'));
const Areas = React.lazy(() => import('./views/areas/areas'));
const AddNewArea = React.lazy(() => import('./views/areas/AddNewArea/AddNewArea'));
const UpdateArea = React.lazy(() => import('./views/areas/areaUpdate/areaUpdate'));
const Departments = React.lazy(() => import('./views/departments/Departments'));
const AddNewDepartment = React.lazy(() => import('./views/departments/AddNewDepartment/AddNewDepartment'));
const UpdateDepartment = React.lazy(() => import('./views/departments/DepartmentUpdate/DepartmentUpdate'));
const Types = React.lazy(() => import('./views/TicketTypes/Types'));
const AddNewType = React.lazy(() => import('./views/TicketTypes/AddNewType/AddNewType'));
const TypeUpdate = React.lazy(() => import('./views/TicketTypes/TypeUpdate/TypeUpdate'));
const Statuses = React.lazy(() => import('./views/TicketStatuses/Statuses'));
const AddNewStatus = React.lazy(() => import('./views/TicketStatuses/AddNewStatus/AddNewStatus'));
const StatusUpdate = React.lazy(() => import('./views/TicketStatuses/StatusUpdate/StatusUpdate'));

const AddNewPriority = React.lazy(() => import('./views/TicketPriorities/AddNewPriority/AddNewPriority'));
const Priorities = React.lazy(() => import('./views/TicketPriorities/Priorities'));
const UpdatePriority = React.lazy(() => import('./views/TicketPriorities/UpdatePriority/UpdatePriority'));
const Customers = React.lazy(() => import('./views/Customers/Customers'));
const Tickets = React.lazy(() => import('./views/Tickets/Tickets'));
//  admin components
const AdminCompany = React.lazy(() => import('./views/Admin/company/company'));
const Employees = React.lazy(() => import('./views/Admin/Employees/Users'));
const AddNewEmployee = React.lazy(() => import('./views/Admin/Employees/addNewUser/addNewUser'));
const EmployeeUpdate = React.lazy(() => import('./views/Admin/Employees/userUpdate/userUpdate'));
const AdminDepartments = React.lazy(() => import('./views/Admin/departments/Departments'));
const AdminAddNewDepartment = React.lazy(() => import('./views/Admin/departments/AddNewDepartment/AddNewDepartment'));
const AdminUpdateDepartment = React.lazy(() => import('./views/Admin/departments/DepartmentUpdate/DepartmentUpdate'));
const AllCustomers = React.lazy(() => import('./views/Customers/ALLCustomers/ALLCustomers'));
const AddNewCustomer = React.lazy(() => import('./views/Customers/AddNewCustomer/AddNewCustomer'));
const UpdateCustomer = React.lazy(() => import('./views/Customers/UpdateCustomer/UpdateCustomer'));
const ExtremeCRM = React.lazy(() => import('./views/ExtremeCRM/ExtremeCRM'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/AdminRegister', name: 'Admin Register', component: AdminRegister },
  { path: '/AdminProfile', name: 'Admin Profile', component: AdminProfile },
  { path: '/Faqs', name: 'FAQs', component: FAQs },
  { path: '/Slider', name: 'Slider', component: Slider },
  { path: '/ContactUs', name: 'Contact Us Requests', component: ContactUs },
  { path: '/Settings', name: 'Settings', component: Settings ,exact: true},
  { path: '/Settings/APIKey', name: 'API Key', component: APIKey },
  { path: '/Settings/Settings', name: 'Settings', component: Settings },
  { path: '/Settings/PrivacyPolicy', name: 'Privacy Policy', component: PrivacyPolicy },
  { path: '/Settings/PrivacyPolicyArabic', name: 'Privacy Policy Arabic', component: PrivacyPolicyAr },
  { path: '/Settings/TermsAndConditions', name: 'Terms and Conditions', component: Terms },
  { path: '/Settings/TermsAndConditionsArabic', name: 'Terms and Conditions Arabic', component: TermsAr },
  { path: '/Settings/HowToUse', name: 'How To Use', component: HowToUse },
  { path: '/Settings/HowToUseArabic', name: 'How To Use Arabic', component: HowToUseAr },
  { path: '/Settings/AboutUS', name: 'About Us', component: AboutUs },
  { path: '/Settings/AboutUSArabic', name: 'About Us Arabic', component: AboutUsAr },
  { path: '/Services', name: 'Services', component: AllServices ,exact: true},
  { path: '/Services/AllServices', name: 'All Services', component: AllServices },
  { path: '/Services/StoredServices', name: 'Stored Services', component: StoredServices },
  { path: '/Offers', name: 'Offers', component: Offers ,exact: true},
  { path: '/Offers/Offers', name: 'Offers', component: Offers },
  { path: '/Offers/AddNewOffer', name: 'Add New Offer', component: AddNewOffer },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  
  { path: '/Purchases', exact: true,  name: 'Purchases', component: Purchases },
  { path: '/Offer/:id', exact: true, name: 'Offer Details', component: Offer },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User }
  // routes for Crm english
  { path: '/companies', name: 'Companies', component: Companies ,exact: true},
  { path: '/companies/companies', name: 'Companies', component: Companies },
  { path: '/companies/AddNewCompany', name: 'Add New Company', component: AddNewCompany },
  { path: '/companies/Company/:id',  name: 'Company Details', component: Company },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/Update/:id',   name: 'Update User', component: UserUpdate },
  { path: '/users/AddNewUser',  name: 'Add New User', component: AddNewUser },
  { path: '/Countries', exact: true,  name: 'Countries', component: Countries },
  { path: '/Countries/AllCountries',   name: 'All Countries', component: Countries },
  { path: '/Countries/AddNewCountry',  name: 'Add New Country', component: AddNewCountry },
  { path: '/Country/Update/:id',   name: 'Update Country', component: UpdateCountry },
  { path: '/Cities', exact: true,  name: 'Cities', component: Cities },
  { path: '/Cities/AllCities',  name: 'All Cities', component: Cities },
  { path: '/Cities/AddNewCity',  name: 'Add New City', component: AddNewCity },
  { path: '/Country/:CountryId/CityUpdate/:id',   name: 'Update City', component: UpdateCity },
  { path: '/Areas', exact: true,  name: 'Areas', component: Areas },
  { path: '/Areas/AllAreas',  name: 'All Areas', component: Areas },
  { path: '/Areas/AddNewArea',  name: 'Add New Area', component: AddNewArea },
  { path: '/Country/:CountryId/City/:CityId/AreaUpdate/:id',   name: 'Update Area', component: UpdateArea },
  { path: '/Departments', exact: true,  name: 'Departments', component: Departments },
  { path: '/Departments/AllDepartments',  name: 'All Departments', component: Departments },
  { path: '/Departments/AddNewDepartment',  name: 'Add New Department', component: AddNewDepartment },
  { path: '/Departments/Update/:id',   name: 'Update Department', component: UpdateDepartment },
  { path: '/Types', exact: true,  name: 'Types', component: Types },
  { path: '/Types/AllTypes',  name: 'All Ticket Types', component: Types },
  { path: '/Types/AddNewType',  name: 'Add New Ticket Type', component: AddNewType },
  { path: '/Types/Update/:id',   name: 'Update Ticket Type', component: TypeUpdate },
  { path: '/Statuses', exact: true,  name: 'Statuses', component: Statuses },
  { path: '/Statuses/AllStatuses',  name: 'All Ticket Statuses', component: Statuses },
  { path: '/Statuses/AddNewStatus',  name: 'Add New Ticket Status', component: AddNewStatus },
  { path: '/Statuses/Update/:id',   name: 'Update Ticket Status', component: StatusUpdate },

  { path: '/Priorities', exact: true,  name: 'Priorities', component: Priorities },
  { path: '/Priorities/AllPriorities',  name: 'All Ticket Priorities', component: Priorities },
  { path: '/Priorities/AddNewPriority',  name: 'Add New Ticket Priority', component: AddNewPriority },
  { path: '/Priorities/Update/:id',   name: 'Update Ticket Priority', component: UpdatePriority },
  { path: '/Customers',exact: true, name: 'Customers', component: Customers },
  { path: '/Tickets', name: 'Tickets', component: Tickets },
  // admin routes
  { path: '/Admin/Company',  name: 'Company', component: AdminCompany },
  { path: '/Admin/Employees', exact: true,  name: 'Employees', component: Employees },
  { path: '/Admin/Employees/Update/:id',   name: 'Update Employee', component: EmployeeUpdate },
  { path: '/Admin/Employees/AddNewEmployee',  name: 'Add New Employee', component: AddNewEmployee },
  { path: '/Admin/Departments', exact: true,  name: 'Departments', component: AdminDepartments },
  { path: '/Admin/Departments/AllDepartments',  name: 'All Departments', component: AdminDepartments },
  { path: '/Admin/Departments/AddNewDepartment',  name: 'Add New Department', component: AdminAddNewDepartment },
  { path: '/Admin/Departments/Update/:id',   name: 'Update Department', component: AdminUpdateDepartment },
  { path: '/customers', exact: true,  name: 'Customers', component: AllCustomers },
  { path: '/customers/AllCustomers', name: 'All Customers', component: AllCustomers },
  { path: '/customers/AddNewCustomer', name: 'Add New Customers', component: AddNewCustomer },
  { path: '/customers/UpdateCustomer/:id', name: 'Update Customers', component: UpdateCustomer },
  { path: '/ExtremeCRM/:tel', exact: true, name: 'ExtremeCRM', component: ExtremeCRM }

];

export default routes;
