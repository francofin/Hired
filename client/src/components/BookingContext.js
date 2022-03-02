import React, { useState } from "react"

const BookingContext = React.createContext([{}, () => {}])

const BookingProvider = (props) => {
  const [state, setState] = useState({})
  console.log(props);
  return (
    <BookingContext.Provider value={[state, setState]}>
      {props.children}
    </BookingContext.Provider>
  )
}

export { BookingContext, BookingProvider }
