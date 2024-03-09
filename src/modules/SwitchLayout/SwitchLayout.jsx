import React, {useState} from 'react';
import "./styles.css";

const SwitchLayout = ({children}) => {

  const [isFirstChildrenActive, setIsFirstChildrenActive] = useState(true)
  console.log("isFirstChildrenActive", isFirstChildrenActive)

  return (
    <div className="SwitchLayout">
      <div>
        <div className="dib mr2 helvetica silver">
          Enable something
        </div>
        <div className="relative dib">
          <input 
            type="checkbox" 
            className="absolute z-5 w-100 h-100 o-0 pointer checkbox" 
            value={isFirstChildrenActive}
            onChange={() => {
              setIsFirstChildrenActive((prev) => !prev)
            }}
          />
          <div className="relative z-4 dib w3 h2 bg-mid-gray overflow-hidden br4 v-mid bg-animate checkbox-wrapper">
            <div className="absolute right-auto left-0 w2 h2 br4 bg-silver shadow-4 t-cb bg-animate checkbox-toggle"></div>
          </div>
        </div>
      </div>
      { isFirstChildrenActive ? children[0] : children[1]}
    </div>
  )
}

export default SwitchLayout