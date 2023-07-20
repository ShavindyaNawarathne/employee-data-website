import React, {useState } from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import '../App.scss'




const Update = () => {
    const [rowEntry, setRowEntry] = useState({
        'employee_id':'',
        'name':'',
        'email_address':'',
        'phone_number' : null,
        'start_date': '',
        'cafe_name': '',
        'gender':''

    })

    const onSubmit =  async event => {
        
        try{
            await axios.post('http://localhost:5000/',rowEntry)
            window.location.reload()
        } catch(err){
            console.log('update err')
            window.location.reload()
            
        }
    }
    const handleChange = (event) => {
        setRowEntry((prev) => ({...prev, [event.target.name]:event.target.value}))
        
    }
    const [displayForm, setDisplayForm] = useState('false')

  const Toggle = () => {
        setDisplayForm(!displayForm)
  }
  const validateFirstNumber = (number) => {
    if (number.charAt(0) === 9 || number.charAt(0) === 8  ){
        return true
    }
    return 'Phone Number must starts with 9 or 8'
    }
    const validateFirstTwoLetters = (id) =>{
        if(id.slice(0,1) === 'UI'){
            return true
        } return 'invalid Id format, format:UIXXXXXX'
    }
    
   
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    
             return(
            <div>
                <button onClick={Toggle} className = 'update-btn'>ADD NEW EMPLOYEE</button>
                <div className={displayForm ?  'toggle': "display"}  >
                
                    <form className='form-div' onSubmit={()=>{
                        handleSubmit(onSubmit)}} >

                    <div className='input-div'>
                    <label>Employee_id:</label>
                    <input type='text' name='employee_id' {...register('name', { required: 'Employee ID is required.', validate:validateFirstTwoLetters, minLength: { value: 8, message: 'phone number must be 8 characters' }, maxLength: { value: 8, message: 'Employee_id must be 8 characters.' }}) }onChange={handleChange}  placeholder='Employee_id' />
                    {errors.employee_id && <span>{errors.employee_id.message}</span>}
                    </div>
                    <div className='input-div'>
                    <label>Name:</label>
                        <input type="text" {...register('name', { required: 'Name is required.' })} onChange={handleChange} placeholder='Employee name'  />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div className='input-div'>
                        <label>Email_address:</label>
                        <input type="text" {...register('email_address', { required: 'Email is required.' ,  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format.' }})}  onChange={handleChange} placeholder='Employee email_address' />
                        {errors.email_address && <span>{errors.email_address.message}</span>}
                    </div>

                    <div className='input-div'>
                        <label>phone_number:</label>
                        <input type="number" {...register('phone_number', { required: 'Phone_number is required.', validate: validateFirstNumber, minLength: { value: 8, message: 'phone number must be 8 characters' }, maxLength: { value: 8, message: 'phone number must be 8 characters.' } })} onChange={handleChange} placeholder='phone_number' />
                        {errors.phone_number && <span>{errors.phone_number.message}</span>}
                    </div>

                    <div className='input-div'>
                        <label>start_date</label>
                        <input type="date" {...register('start_date', { required: 'Start_date is required.' })}  onChange={handleChange} placeholder='start_date' />
                        {errors.start_date && <span>{errors.start_date.message}</span>}
                    </div>

                    <div className='input-div'>
                        <label>Cafe_name</label>
                        <input type="text" {...register('cafe_name', { required: 'Cafe_name is required.', minLength: { value: 6, message: 'cafe_name must be at least 6 characters long.' }, maxLength: { value: 10, message: 'cafe_name must not exceed 10 characters.' } })} onChange={handleChange} placeholder='cafe_name' />
                        {errors.cafe_name && <span>{errors.cafe_name.message}</span>}
                    </div>

                    <div className='input-div'>
                        <label>Gender: </label>
                        <input type="text" {...register('gender', { required: 'Gender is required.' })}  onChange={handleChange} placeholder='gender' />
                        {errors.gender && <span>{errors.gender.message}</span>}
                    </div>
                    
                    
                    
                    <div className='btn-div'>
                        <button type ='submit' className='submit'>Submit</button>
                        <button onClick={Toggle} className='exit'>Exit</button>
                    </div>
                </form>    
            </div>
        </div>
        
    )
        
        
    
}
export default Update