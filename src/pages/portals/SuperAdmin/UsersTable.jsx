import React from 'react'
import { Link } from 'react-router-dom';

const UsersTable = ({ headings, dynamicData, triggerUserDelete}) => {

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
        {dynamicData.map(dataRow => {
          return (
            <div key={dataRow[0]} className="cf ph2-ns">
              {dataRow.map((data, i) => {
                  if (dataRow.length - 1 !== i) {
                    return (
                      <div key={data} className="fl w-100 w-25-ns pa2">
                        <div className="outline bg-red pv4">{data}</div>
                      </div>
                    )
                  }
              })}
              <div className="fl w-100 w-25-ns pa2">
                <button 
                  className="outline bg-red pv4"
                  onClick={() => {

                    triggerUserDelete(dataRow[dataRow.length - 1])
                  }}
                >
                  Delete
                </button>
                <button 
                  className="outline bg-red pv4"
                  onClick={() => {
                    alert(dataRow[dataRow.length - 1])
                  }}  
                >
                  Edit
                </button>
                <Link 
                  className="outline bg-red pv4"
                  to={`/admin/user/${dataRow[dataRow.length - 1]}`} 
                >
                  Details
                </Link>
              </div>

            </div>
          )
        })}
      </section>
    </div>
  )
}

export default UsersTable