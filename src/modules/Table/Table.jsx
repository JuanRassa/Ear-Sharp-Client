import React from 'react'

const Table = ({ headings, dynamicData}) => {
  console.log("dynamicData", dynamicData)
  return (
    <div>
      <section>
        <div className="cf ph2-ns">
          {headings.map(heading => {
            return (
              <div key={heading} className="fl w-100 w-25-ns pa2">
                <div className="outline bg-blue pv4">{heading}</div>
              </div>
            )
          })}
        </div>
      </section>
      <section>
        {dynamicData.map((dataRow, index) => {
          return (
            <div className="cf ph2-ns">
              {dataRow[0]}
              <div className="fl w-100 w-25-ns pa2">

                <div className="outline bg-red pv4">dsdas</div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Table