import { createContext, useContext, useState} from "react";

export const PhotoContext = createContext()

export function PhotoContextProvider(props){

    const [photo, setPhoto] = useState(null)

    return (
        <PhotoContext.Provider value={{photo, setPhoto}}>
            {props.children}
        </PhotoContext.Provider>
    )
}

export const usePhoto = () => useContext(PhotoContext)
