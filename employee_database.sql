CREATE DATABASE employee_data;
CREATE TABLE employee_data(
	employee_id VARCHAR(10),
    `name` VARCHAR(100) NOT NULL,
    email_address VARCHAR(50) NOT NULL UNIQUE,
    phone_number INT NOT NULL,
    gender VARCHAR(8) NOT NULL,
    cafe_name VARCHAR(15) NOT NULL,
    start_date DATE NOT NULL,
    PRIMARY KEY (employee_id)
    
);

INSERT INTO employee_data VALUES('UI123451', 'Kaley Young', 'gh@gmail.com', 97654321,'Male','cafe corner', '2021-10-06');
INSERT INTO employee_data VALUES('UI123452', 'Lewis Young', 'lyoung@gmail.com', 81234562,'Male', 'cafe abc', '2021-06-29');
INSERT INTO employee_data VALUES('UI123453', 'Riley Shaw', 'riley@gmail.com', 81234563,'Male','cafe 123', '2017-01-18');
INSERT INTO employee_data VALUES('UI123454', 'James mathew', 'james@gmail.com', 96234562,'Male', 'cafe 123', '2023-02-10');


