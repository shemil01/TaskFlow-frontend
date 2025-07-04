import BgGradient from '@/components/common/BgGradient'
import CreateProject from '@/components/home/projectSection'
import React from 'react'

const page = () => {
  return (
     <div className="relative w-full">
          <BgGradient />
          <div className="flex flex-col w-full">
            <CreateProject />
          </div>
        </div>
  )
}

export default page