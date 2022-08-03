import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

// sidebar nav config
import navigation from './_nav'
import navigationAr from './_navAr'
import navigationAdminEn from './_navAdminEn'
import navigationAdminAr from './_navAdminAr'
import './st.scss'
const TheSidebar = () => {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const user_roles = localStorage.getItem("user_roles");
  const [role, setRole] = useState([])
  useEffect(() => {
    // setRole(JSON.parse(user_roles))
  }, [user_roles])

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <img className='sidelogo'
          src={'avatars/logo.png'}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>



      <CSidebarNav>
        <CCreateElement
          items={navigationAr}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>




      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
