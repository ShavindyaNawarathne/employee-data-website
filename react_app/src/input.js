function Input(obj){
    return(
        <div >
            <input type='text' name='employee_id' id='employee_id' placeholder="Enter Employee_id: UIXXXXXX"  validation = {
                {
                    required: {
                        value: true,
                        message: 'required'
                    },
                    length:{
                        value: 8,
                        message: 'ID should be eight characters; FORMAT: UIXXXXXXXX'
                    },
                    
                }
                        
                }

                />

            <input type='text' name='name' id='name' placeholder="Enter Employee Name"  validation= {
                {
                    required: {
                        value: true,
                        message: 'required'
                    },
                }
            } />
            <input type='email' name='email_address' id='email' placeholder="Enter Employee Email"   validation= {
                {
                    required: {
                        value: true,
                        message: 'required'
                    },
                }
            } />
            <input type='number' name='phone_number' id='phone-number' placeholder="Enter Employee Phone Number"   validation= {
                {
                    required: {
                        value: true,
                        message: 'required'
                    },
                
                }
            } />
            <input type='date' name='start_date' id='days-worked' placeholder="Enter Employee start date: format yyyy:mm:dd"   validation= {
                {
                    required: {
                        value: true,
                        message: 'required'
                    },
                }
            } />
            <input type='text' name='cafe_id' id='cafe_id' placeholder="Enter cafe-id"   validation= {
                {
                    required: {
                        value: true,
                        message: 'required'
                    },
                    
                }
            } />
            <input type='text' name='gender' id='gender' placeholder="Employee Gender: Male/Female"   validation= {
                {
                    required: {
                        value: true,
                        message: 'required'
                    },
                    
                }
            } />
            </div>
    )
}
export default Input