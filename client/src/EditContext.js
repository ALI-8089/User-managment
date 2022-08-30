import React,{createContext,useState} from 'react'
export const EditContext = createContext(null)
function EditUser({children}) {
    const[userData,setUserData] = useState('')
  return (
    <div>
        <EditContext.Provider value={{userData,setUserData}}>
            {children}
        </EditContext.Provider>
    </div>
  )
}

export default EditUser