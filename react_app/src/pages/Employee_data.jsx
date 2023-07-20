import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import EditBtn from './EditBtn';
import DeleteBtn from './Delete';
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../App.scss'
import { useForm } from 'react-hook-form';






const EmployeeData = () => {
    
    //table data
    const [rowData, setRowData] = useState([])
    const [columnDefs, setColumnDefs] = useState([
        {headerName: 'Employee_id', valueGetter: 'node.id' },
        {field: 'Name'},
        {field: 'Email_address'},
        {field:'Phone_number'},
        {field:'Days_worked_in_the_cafe'},
        {field:'Cafe_name'},
        {field:'Edit',
        cellRenderer: EditBtn,
        cellRendererParams: {
            clicked: function(){
                addBtnGetData(this.node.data)
                ToggleEdit()
                
            }
            
        }
        },
        {field: 'Delete',
        cellRenderer:DeleteBtn,
        cellRendererParams: {
            clicked:function () {
                
                handleDelete(this.node.id)
               

            },
                
            
               
        }       
        
        
    },
    {field:'Gender', hide:true}
    

    ])
    const getRowId = useMemo(() => {
        return (params) => params.data.Employee_id;
      }, []);
      
    
      //get employee data from server
    useEffect(() => {
        const fetchEmployeeData = async () =>{
            try{
                const res = await axios.get('http://localhost:5000')
            setRowData(res.data)
            
        }catch(err){
                console.log(err)
            }
        }
        fetchEmployeeData()
    }, [])
    

    // Handle Update 
    
    const [nodeData, setNodeData] = useState({})
    const addBtnGetData = (data) => {
        setNodeData(data)
    }
    console.log(nodeData)
    
    //display input form
    const [displayForm, setDisplayForm] = useState('false')
    const ToggleEdit = () => {
          setDisplayForm(!displayForm)
    }


//handle input  form
const Edit = () => {
    const [formData, setFormData] = useState({
        'employee_id':nodeData.Employee_id,
        'name':nodeData.Name,
        'email_address':nodeData.Email_address,
        'phone_number' : nodeData.Phone_number,
        'start_date': nodeData.Days_worked_in_the_cafe,
        'cafe_name': nodeData.Cafe_name,
        'gender':nodeData.Gender

    })
  
    const handleChangeEdit = (event) => {
      setFormData((prev) => ({...prev, [event.target.name]:event.target.value}))
      
  }
   //handle send updated data when clicked the save button in Edit-form

  const onSubmit =  async () => {
 
    try{
        await axios.put(`http://localhost:5000/` + formData.employee_id, formData)
        window.preventDefault()
        
    } catch(err){
        console.log('Edit err')
        window.location.reload()
    }
    }
    //custom-validations for phone_number
    const validateFirstNumber = (number) => {
        if (number.charAt(0) === 9 || number.charAt(0) === 8  ){
            return true
        }
        return 'Phone Number must starts with 9 or 8'
    }
    

    const { register, handleSubmit, formState: { errors } } = useForm();
        
    return (
        
      <div className={displayForm ?  'toggle': "display"}>
        <form className='form-div' onSubmit={()=>
            {handleSubmit(onSubmit)}}>
               <div className='input-div'>
               <label>Employee_id:</label>
               <input type='text' name='employee_id' value= {formData.employee_id} readOnly/>
               </div>
               <div className='input-div'>
               <label>Name:</label>
                <input type="text" {...register('name', { required: 'Name is required.' })} defaultValue={formData.name} onChange={handleChangeEdit} />
                {errors.name && <span>{errors.name.message}</span>}
                </div>
               <div className='input-div'>
                <label>Email_address:</label>
                <input type="text" {...register('email_address', { required: 'Email is required.' ,  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format.' }})} defaultValue={formData.email_address} onChange={handleChangeEdit} />
                {errors.email_address && <span>{errors.email_address.message}</span>}
                </div>

                <div className='input-div'>
                <label>phone_number:</label>
                <input type="number" {...register('phone_number', { required: 'Phone_number is required.', validate: validateFirstNumber, minLength: { value: 8, message: 'phone number must be 8 characters' }, maxLength: { value: 8, message: 'phone number must be 8 characters.' } })} defaultValue={formData.phone_number} onChange={handleChangeEdit} />
                {errors.phone_number && <span>{errors.phone_number.message}</span>}
                </div>

                <div className='input-div'>
                <label>start_date</label>
                <input type="date" {...register('start_date', { required: 'Start_date is required.' })} defaultValue={formData.start_date} onChange={handleChangeEdit} />
                {errors.start_date && <span>{errors.start_date.message}</span>}
                </div>

                <div className='input-div'>
                <label>Cafe_name</label>
                <input type="text" {...register('cafe_name', { required: 'Cafe_name is required.', minLength: { value: 6, message: 'cafe_name must be at least 6 characters long.' }, maxLength: { value: 10, message: 'cafe_name must not exceed 10 characters.' } })} defaultValue={formData.cafe_name} onChange={handleChangeEdit} />
                {errors.cafe_name && <span>{errors.cafe_name.message}</span>}
                </div>

                <div className='input-div'>
                <label>Gender: </label>
                <input type="text" {...register('gender', { required: 'Gender is required.' })} defaultValue={formData.gender} onChange={handleChangeEdit} />
                {errors.gender && <span>{errors.gender.message}</span>}
                </div>
              
             
               
               <div className='btn-div'>
               <button type ='submit' className='submit'>Submit</button>
               <button onClick={ToggleEdit} className='exit'>Exit</button>
               </div>
            </form>
        </div>
      
      
    )}
    
       
 //handle Delete button 
   
    const handleDelete = async (employee_id) =>{ 
            const cofirmmation = window.confirm('Are you sure you want to delete the data permenantly?')
            if(cofirmmation){
                try{
                    await axios.delete(`http://localhost:5000/${employee_id}`)
                    window.location.reload()
                    console.log(` deleted id: ${employee_id}`)
        
                } catch(err){
                    console.log(err)
                    window.location.reload()
                }  
            }else{
                return 
                
    }
            
        
            
    }
    
     
    
    
    
     
    return(
        <div className="ag-theme-alpine" style={{ height: 600 }}>
            <AgGridReact
            rowData={(rowData.map(data => (
                {Employee_id: data.employee_id, Name: data.name, Email_address: data.email_address, Phone_number:data.phone_number, Days_worked_in_the_cafe: data.start_date.slice(0,10), Cafe_name: data.cafe_name, Gender:data.gender}
            )))}
            columnDefs={columnDefs}
            getRowId={getRowId}
            
            ></AgGridReact>
            <Edit/>
        </div>
    )
    

}
export default EmployeeData

