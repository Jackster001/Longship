import React from 'react';

export default function connectionForm(props){
    onSubmit =(e)=> {
        findUser()
    }
    return (
        <div>
            <form onSubmit={(e)=>this.onSubmit(e)}>
                    <select id="relationship" name="cars">
                        <option value="Significant Other">Significant Other</option>
                        <option value="Family Member">Family Member</option>
                        <option value="Friend">Friend</option>
                    </select>
                    <center><button className='submitButton'>Sign Up</button></center>
            </form>
        </div>
    )
}