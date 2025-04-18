import React from 'react'
import { Spin } from 'antd'

const Spinner = () => {
  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
          <Spin size="large" tip="Loading..." />
        </div>
    </div>
  )
}

export default Spinner
