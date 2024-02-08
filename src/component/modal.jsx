import React, { useState } from 'react'

const NameModal = ({setName,setIsName}) =>{
    const [userName,setUserName]=useState("")
    const [isError,setError]=useState(false)
    

    const handlename =(e)=>{
        setUserName(e.target.value)
    }


    const handleNameSubmit = (e) => {
        if(userName !== ""){
        setName(userName);
        setIsName(false)
    }else{
        setError(true)
    }
      };

      
      
  return (<>   
    <div id="popup-modal" tabindex="-1" class="name-modal-body">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                
                <div class="p-4 md:p-5 text-center">
                  
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Please Enter the Name</h3>
                    <div className="p-44">
                    <input value={userName}  onChange={handlename} />
                    </div>
                    <br/>

                    {isError && <span className='nameError'> *Enter the Name Before Sumbit</span>}
                    <br/>
                    <br/>
                    <button type="button" class="btn btn-success" onClick={handleNameSubmit}>Submit</button>
                </div>
            </div>
        </div>
    </div>
    </>

  )
}

export default NameModal