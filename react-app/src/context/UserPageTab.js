import { createContext, useContext, useState} from "react";

export const TabContext = createContext()

export function TabContextProvider(props){
    const [tab, setTab] = useState('photos')
    const [isEditing, setIsEditing] = useState(false)

    return (
        <TabContext.Provider value={{tab, setTab, isEditing, setIsEditing}}>
            {props.children}
        </TabContext.Provider>
    )
}

export const useTab = () => useContext(TabContext)
