import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>

        <a >WODEX</a>
        <span className="ml-1">&copy; 2022 KWT Shipping System.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a >WODEX</a>

      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
