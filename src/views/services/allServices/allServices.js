import React,{useState,useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CPagination,
  CDataTable,
  CSelect,
  CLink,
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './allServices.scss'

import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";
  
import '../../../globalVar'
const AllServices = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const[fetchedData,setfetchedData]=useState([])
  const[refresh,setRefresh]=useState('')
  const [errorMessage, setErrorMessage] = useState();
  
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const userId = localStorage.getItem("user_id");
  const user_id = JSON.parse(userId);
  const [pageStatus,setPageStatus]=useState(0)
const [upData,setUpData]=useState({
  facebook:'',
twitter:'',
linkedin:'',
instagram:'',
email:'',
address:'',phone:''
})
const{ facebook,
twitter,
linkedin,
instagram,
email,
address,phone
}=upData;
const [types,setTypes]=useState([])
const [activeType,setActiveType]=useState('0')
const [categories,setCategories]=useState([])
const [activeCat,setActiveCat]=useState('0')

function getUnique(array, key) {
  if (typeof key !== 'function') {
    const property = key;
    key = function(item) { return item[property]; };
  }
  return Array.from(array.reduce(function(map, item) {
    const k = key(item);
    if (!map.has(k)) map.set(k, item);
    return map;
  }, new Map()).values());
}



useEffect(async()=>{
  const fetchSettings=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/services/getAllServices`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,

          Accept: "application/json",
        },

    
      }
    );
    const response = await responsee.json();
    
    console.log(response);

    if(response){
      let temp=[]
     
     await response.map((service,index)=>{
       
      temp.push({
        checked:false,
        index:index,
        id:service.service,
        name: service.name,
        type: service.type,
        rate: service.rate,
        min: service.min,
        max: service.max,
        dripfeed:service.dripfeed,
        refill:service.refill,
        category:service.category})
  
     })
     await setTotalPages(Math.ceil(response.length/12))
        setfetchedData(temp)
        setTypes(getUnique(response, 'type'))
        setCategories(getUnique(response, 'category'))
     }

  // if(response){
  //  setfetchedData(response)
  //  setTotalPages(Math.ceil(response.length/12))
  //  console.log(Math.ceil(response.length/12))
  // }
    if(response.message&&response.message=="Unauthorized or invalid token!"){
    localStorage.removeItem("token");
    localStorage.clear()
 
  history.push("/login");
    }
   
  } catch (err) {
    console.log(err);
   
  }

  // setLoading(false)
  
  
  }

  fetchSettings()
},[])

// console.log('procceed',fetchedData);



const handleData=(e)=>{
  setUpData({...upData,[e.target.name]:e.target.value})

  setErrorMessage('')
  setSuccessAdd('')
}

const handleCat=(e)=>{
 setActiveCat(e.target.value)
 setActiveType('0')
  // setErrorMessage('')
  // setSuccessAdd('')
}
const handleType=(e)=>{
  setActiveType(e.target.value)
  setActiveCat('0')
   // setErrorMessage('')
   // setSuccessAdd('')
 }
 


const handleUpdateProfile=async(e)=>{
  e.preventDefault()
  setLoading(true)
  
  setErrorMessage('')
  setSuccessAdd('')


  let temp=[]
     
  await fetchedData.filter(item=>item.checked==true).map((service,index)=>{
    
   temp.push({
    
    service:service.id,
     name: service.name,
     type: service.type,
     rate: service.rate,
     min: service.min,
     max: service.max,
     dripfeed:service.dripfeed,
     refill:service.refill,
     category:service.category})

  })


try {
  const responsee = await fetch(
    `${global.apiUrl}/services/storeSelectedServices`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
                   "Content-Type": "application/json",
                  //'Access-Control-Allow-Origin': 'https://localhost:3000',
                  // 'Access-Control-Allow-Credentials': 'true',
        Accept: "application/json",
      },
      body:JSON.stringify({services:temp})
      ,
  
    }
  );
  const response = await responsee.json();
  console.log('response',response);
  console.log(response);
  setVisible(10)
  if(response.message&&response.message=="Services stored successfully!"){
    await  setVisible(6)
    setSuccessAdd("Services stored successfully!")
//  setRefresh(!refresh)
//  setVisible(6)
  }
  else{
   
    let errors=[]

    await Object.keys(response.errors).map((item, i) => {
            console.log(   temp[parseInt(response.errors[item][0].split('.')[1])].service,i )  
            // setErrorMessage({...errorMessage,[`error${i}`]:`${temp[parseInt(response.errors[item][0].split('.')[1])].service} already stored`})
            
         errors.push({err:`Service ${temp[parseInt(response.errors[item][0].split('.')[1])].service+" "+temp[parseInt(response.errors[item][0].split('.')[1])].name} Already Stored`})     
  }        
           
     )
     setVisible(10)
     setErrorMessage(errors)

    
    }
  
 
} catch (err) {
  console.log(err);
 
}

setLoading(false)
}

const[maxIndex,setMaxIndex]=useState()
// useEffect(
//   ()=>{
//     setMaxIndex(currentPage*12)

//   },[currentPage])
  const checkUnCheck=async(e,index)=>{
    setErrorMessage('')
      await setfetchedData(
        fetchedData.map(item => 
            item.index === index 
            ? 
            {...item, checked :e.target.checked} 
            
            : item 
    ))

  }
  
  const checkUnCheckall=async(e,status)=>{
   console.log(status)
   setErrorMessage('')
   if ( activeCat=='0'&&activeType=='0'){
 setfetchedData(
      fetchedData.map(item => 
          item.index == '0'
          ? 
          {...item, checked :status} 
          
          :   {...item, checked :status}  
  ))
  }
  else if(activeCat=='0'&&activeType!=='0'){
setfetchedData(
      fetchedData.map(item => 
          item.type === activeType
          ? 
          {...item, checked :status} 
          
          : {item}  
  ))
   
  }
  else if(activeCat!=='0'&&activeType=='0'){
  
      setfetchedData(
      fetchedData.map(item => 
          item.category === activeCat
          ? 
          {...item, checked :status} 
          
          :   {...item, checked :item.checked}  
  ))
   
  }
   else{
      setfetchedData(
      fetchedData.map(item => 
          item.index == '0'
          ? 
          {...item, checked :status} 
          
          :   {...item, checked :status}  
  ))
   
   }
    

  
 
}

  
  const setFilter=()=>{
  if ( activeCat=='0'&&activeType=='0'){
    return  fetchedData
  }
  else if(activeCat=='0'&&activeType!=='0'){
    return fetchedData.filter(item=>item.type==activeType)
  }
  else if(activeCat!=='0'&&activeType=='0'){
    return fetchedData.filter(item=>item.category==activeCat)
  }
   else{
    return  fetchedData
   }
    

  }
  
  
  
  console.log(errorMessage)
  
  console.log(fetchedData)
  const fields = ['checked','index','id','name','type','rate','min','max','dripfeed', 'refill', 'category']
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   
      <CContainer>

     {pageStatus==0&&<>
      {fetchedData&&   <CCard>
          <CCardHeader>
          <CRow className=" row-gap-15 ">
          
            <CCol md="3" lg="3" xl="3" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            All Services
            </CCol>
            <CCol md="9" lg="9" xl="9" >
            {/* className="row-gap-15 col-gap-15 " */}
                  <CButton color="success"  className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>setPageStatus(1)} >view selected 
                  </CButton>
            </CCol>
            <CCol md="4" lg="3" xl="3" >
          {fetchedData&& <div><input type='checkbox' id='chekall'
           
           onChange={(e)=>checkUnCheckall(e,e.target.checked)}
           /> <label htmlFor='chekall'>Check all</label></div>}

          </CCol>
          <CCol md="4" lg="4" xl="4" >
            {categories.length>0&&
             <CSelect custom name="select" id="select" value={activeCat} onChange={(e)=>handleCat(e)}>
               <option value='0' >All Categories</option>
         {   categories.map((item)=>{
              return(
                <option key={item.category} value={item.category}>{item.category}</option>
              )
            })}
            
            </CSelect>
            }
    
          </CCol>
          <CCol md="4" lg="4" xl="4" >
         
       {types.length>0&&
             <CSelect custom name="select" id="select" value={activeType} onChange={(e)=>handleType(e)}>
               <option value='0' >All Types</option>
         {   types.map((item)=>{
              return(
                <option key={item.type} value={item.type}>{item.type}</option>
              )
            })}
            
            </CSelect>
            }

          </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
          <CRow>
      {/* <CCol lg={12}>
        {fetchedData&&fetchedData.map((service,index)=>{
          return(<>
            {index>=maxIndex-12&&index<maxIndex&&<div key={service.id}>{service.id}</div> }
          </>
          
            
          )
        })}
             
              </CCol> */}
              {/* <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
             
                        <tr >
                          <td>Facebook</td>
                          <td><strong></strong></td>
                        </tr>
                        <tr >
                          <td>Instagram</td>
                          <td><strong></strong></td>
                        </tr>
                        <tr >
                          <td>Twitter</td>
                          <td><strong></strong></td>
                        </tr>
                        <tr >
                          <td>Linkedin</td>
                          <td><strong></strong></td>
                        </tr>
                </tbody>
              </table>
              </CCol> */}
    </CRow>  
    {/* {totalPages&&      <CPagination
            align="center"
            addListClass="some-class"
            activePage={currentPage}
            pages={totalPages}
            onActivePageChange={setCurrentPage}
            className='faqsPage'
          />} */}


          <CRow className='servicesTabel'>
   { fetchedData.length>0&&      <CDataTable
              items={
                setFilter()
                
                }
              fields={fields}
              bordered
             striped 
             sorter
             columnFilter
              itemsPerPage={12}
              pagination
              scopedSlots = {{
                'checked':
                  (item)=>(
                    <td>
                      {/* <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge> */}
                      {item.checked==true?
                      <><input
                      onChange={(e)=>checkUnCheck(e,item.index)}
                      
                      type='checkbox' checked={item.checked}></input></>
                      :<><input checked={item.checked} onChange={(e)=>checkUnCheck(e,item.index)} type='checkbox'></input></>}
                    </td>
                  )

              }}
            />
}


          </CRow>
          </CCardBody>
        </CCard>
       
}
     </>}
    


{fetchedData&&pageStatus==1&&<>


         {/* mx-4 */}
            <CCard className="">

            <CForm onSubmit={(e)=>{handleUpdateProfile(e)}}>

            <CCardHeader>
          <CRow className=" row-gap-15">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           Store Selected services <strong>({fetchedData.filter(item=>item.checked==true).length})</strong>
            </CCol>
            <CCol md="6" lg="6" xl="6">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>setPageStatus(0)} >Back
                  </CButton>
            </CCol>
            </CRow>
          </CCardHeader>

              <CCardBody className="p-4">
{/*           
              <CRow className="justify-content-center">
              <CCol md="6" lg="6" xl="6">
              <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        F
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.facebook}
                    
                    name='facebook'
                    type="url" placeholder="Facebook"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        T
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.twitter}
                    
                    name='twitter'
                    type="url" placeholder="Twitter"  />
                  </CInputGroup>
               
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                       L
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.linkedin}
                    
                    name='linkedin'
                    type="url" placeholder="Linked in"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                       L
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.instagram}
                    
                    name='instagram'
                    type="url" placeholder="Instagram"  />
                  </CInputGroup>
                 </CCol>
          <CCol md="6" lg="6" xl="6">
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        @
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.email}
                    
                    name='email'
                    type="email" placeholder="Email"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.address}

                    name='address'
                    type="text" placeholder="Address"  />
                  </CInputGroup>
               
                  

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText> <CIcon name="cil-phone" />
                       </CInputGroupText>
                    </CInputGroupPrepend>
                    
                    <PhoneInput className='form-control'
                    // onChange={handleData}
                       
                    name='phone'
      placeholder="Phone Number"
      value={fetchedData.phone}
      // defaultCountry="SA"
      onChange={setValue}
      
      />
                  </CInputGroup>
                  </CCol>
      
                 
                 </CRow> */}
                      <CRow className='servicesTabel'>
   { fetchedData&&      <CDataTable
              items={
               fetchedData.filter(item=>item.checked==true)
                 
                }
              fields={fields}
              bordered
             striped 

              itemsPerPage={12}
              pagination
              scopedSlots = {{
                'checked':
                  (item)=>(
                    <td>
                      {/* <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge> */}
                      {item.checked?
                      <><input
                      onChange={(e)=>checkUnCheck(e,item.index)}
                      
                      type='checkbox' checked></input></>
                      :<><input  onChange={(e)=>checkUnCheck(e,item.index)} type='checkbox'></input></>}
                    </td>
                  )
              }
            
            }
         
            
          
            />
}


          </CRow>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow className="justify-content-center">
         
                   { errorMessage&& 
                   <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                   color="danger"
                   // closeButton
                   show={visible}
                   // closeButton
                   onShowChange={setVisible}
              > 
            {errorMessage.map((err)=>{
              return(
                <>{err.err}<br/></>  
              )
            })}
               {/* {     Object.keys(errorMessage).map((item, i) => (
              
         <>{errorMessage[item]}<br/></>  
            
                      
                
          ))} */}
          </CAlert>
          
          }
          
              
              
              
                { succesAdd&& 
                
                
                <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                color="success"
                show={visible}
                // closeButton
                onShowChange={setVisible}
                // closeButton
              >
            {succesAdd}
              </CAlert>
              
              
              }
            
                  <CCol  md="6" lg="6" xl="6" xs="12" sm="12" >
               { fetchedData.filter(item=>item.checked==true).length>0&&   <CButton color="success" block type='submit'>Save
                  {loading&&<>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>}
                  </CCol>
                
                </CRow>
              </CCardFooter>
              <CRow><CCol md='12' className='p-4'><CAlert className='col-md-12 ' color="info">
               Hint :&nbsp; Go to &nbsp; 
                <CLink className="alert-link" to='/Services/StoredServices'>Stored Services</CLink>.
                &nbsp;  For More Updates
              </CAlert></CCol> </CRow>
              </CForm>


            </CCard>
       
       



</>}
    






     
      </CContainer>
    </div>
  )
}

export default AllServices
