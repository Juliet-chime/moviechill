import React from 'react'
import '../../App.css'

const Searchinput = (props) => {
    return (
        <div className='col col-sm-4'>
            <input
            className="form-control"
            placeholder='Type to search....'
            value={props.value}
            onChange={event => props.setSearchValue(event.target.value)}
            />
        </div>
    )
}

export default Searchinput
