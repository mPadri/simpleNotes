import React from 'react';

// onClick dan title adalah props yng nntinya dihal tujuan bisa diisi value yang diinginkan
const Button =({title, onClick, loading})=>{
    if(loading === true){
        return(
            <button className="btn disable">Loading...</button>
        )
    }
    return(
        <button className="btn" onClick={onClick}>{title}</button>
    )
}

export default Button;