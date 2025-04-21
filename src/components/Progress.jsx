import React from 'react'
import { Line } from 'rc-progress';

const Progress = ({data}) => {
  return (
    <div>
      <div className="p-5 flex items-center">
              {data.length > 0 && (
                <>
                  <div className="flex-grow">
                    <Line
                      percent={((data.filter((item) => item.isChecked).length / data.length) * 100).toFixed(0)}
                      strokeWidth={8}
                      strokeColor="#D3D3D3"
                    />
                  </div>
                  <div className="text-2xl font-bold py-3 px-4 text-white">
                    <div className="flex gap-1">
                      {data.reduce((total, item) => total + item.isChecked, 0)}
                      <p>/</p>
                      {data.length}
                    </div>
                    <div>Task</div>
                  </div>
                </>
              )}
            </div>
    </div>
  )
}

export default Progress
