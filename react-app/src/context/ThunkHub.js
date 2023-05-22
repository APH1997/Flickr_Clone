import { createContext, useState } from 'react';

export const ThunkHubContext = createContext();

export function ThunkHubProvider(props) {

    const [destination, setDestination] = useState('/')

    return (
      <ThunkHubContext.Provider value={{destination, setDestination}}>
        {props.children}
      </ThunkHubContext.Provider>
    )
  }
