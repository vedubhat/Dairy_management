import React from 'react'
import data_table_context from './DataTableContext'
const Data_table_state = (props) => {
    let test = [1 ,2 ,3];
    return (
        <data_table_context.Provider value={{test}}>
            {props.children}
        </data_table_context.Provider>
    )
}

export default Data_table_state;
