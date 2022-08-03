import './pagination.scss'


import {CButton} from '@coreui/react'

export const Pagination =(props) =>{
let {total,current_page,fetchFAQs} =props
let arr = new Array(total).fill(0)
let end = 5
let start=0
if (current_page >=5){
  if (arr.length - current_page > 5) {
    end= current_page +3
    start = current_page -2
  }
  if  (arr.length-current_page === 0){
    end=arr.lenth
    start=current_page -1

  }
  if (arr.length-current_page < 5 && arr.length-current_page >0) {
     end = arr.length
     start = current_page-2

  }
  else {
    end= current_page+1
    start = current_page -5
  }
}
if (current_page <5) {

  start =0
  end=total
}

  return (
    <div className='pagination'>
          <div className="pagesList">

             <CButton aria-label="Previous" disabled={current_page === 1}
             onClick={()=>fetchFAQs(current_page -1)}>
                <span aria-hidden="true">&laquo;</span>
              </CButton>
              {
                arr.slice(start,end).map((ele,index)=>{
                  return (
                    <CButton className={current_page -1 === index+start ?"active":""}
                        onClick={()=>fetchFAQs(index +start + 1)}>
                      {index +start + 1}
                    </CButton>
                  )
                })
              }

              <CButton aria-label="Next" disabled={current_page === total}
                  onClick={()=>fetchFAQs(current_page +1)}>
                <span aria-hidden="true">&raquo;</span>
              </CButton>
          </div>
  </div>
  )
}
