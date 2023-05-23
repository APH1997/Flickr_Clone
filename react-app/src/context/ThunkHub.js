import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const ThunkHubContext = createContext();

export function ThunkHubProvider(props) {
    const history = useHistory()

    function dispatchThunkHub(resource, method, destination){
      history.push(`/thunk/hub/${resource.toUpperCase()}/${method.toUpperCase()}/${destination}`)
    }

    return (
      <ThunkHubContext.Provider value={{destination, setDestination}}>
        {props.children}
      </ThunkHubContext.Provider>
    )
  }

  export const useThunkHub = () => useContext(ThunkHubContext)
