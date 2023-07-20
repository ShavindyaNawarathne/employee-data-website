const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')


app.use(express.json())
app.use(cors())

let database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'password',
    database: 'employee_data'
  });
  database.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/',(req,res)=>{
    const query = 'SELECT * FROM employee_data;'
    database.query(query, (err,data) => {
        if (err) throw res.json(err);
        res.json(data)
        console.log(data)
    })
})

app.post('/',(req,res)=>{
    const query = 'INSERT INTO employee_data(`employee_id`, `name`,`email_address`,`phone_number`,`gender`,`cafe_name`, `start_date`) VALUES (?);'
    const values = [
        req.body.employee_id,
        req.body.name,
        req.body.email_address,
        req.body.phone_number,
        req.body.gender,
        req.body.cafe_name,
        req.body.start_date,
    ]
    database.query(query,[values],(err,data)=>{
        if (err ) throw err
        return res.json('insert successfully')
    })
})

app.delete('/:id',(req,res)=>{
    const id = req.params.id
    const query = 'DELETE FROM employee_data WHERE `employee_id`=?;'
  
    database.query(query,[id],(err,data)=>{
        if (err) throw err
        return res.json('deleted successfully')
    })

})
app.put('/:id',(req,res)=>{
    const query = 'UPDATE employee_data SET `name`=?, `email_address`=?, `phone_number`=?, `gender`= ?, `cafe_name` = ?,  `start_date` = ? WHERE (`employee_id` =?);'
    const id = req.params.id
    values = [
        req.body.name,
        req.body.email_address,
        req.body.phone_number,
        req.body.gender,
        req.body.cafe_name,
        req.body.start_date,
    ]
    database.query(query,[...values, id], (err,data)=>{
        if (err) throw err
        return res.json('updated succefully')
    })

})
app.listen(5000, ()=>{
    console.log("server is listening on port 5000")
})
