import React,{useState,useEffect} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { useHistory } from "react-router-dom";

const TheLayout = () => {
  let history = useHistory();
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  useEffect(()=>{
    if(!tokenString){
      history.push('/login')
    }
  })
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
