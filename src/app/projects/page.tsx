import BgGradient from '@/components/common/BgGradient'
import Projects from '@/components/home/project/Project'
import React from 'react'

const page = () => {
  return (
     <div className="relative w-full">
          <BgGradient />
          <div className="flex flex-col w-full">
            {/* <CreateProject /> */}
            <Projects />
          </div>
        </div>
  )
}

export default page