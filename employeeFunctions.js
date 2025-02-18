import { validateEmployee, handleData, readData, formatOutput, saveData, isFileExist, filterOutput}
from './helpers.js';

function addEmployee(data) {
    try {
        let employees = readData();
        
        const nextId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;

        let emp = { id: nextId };
        
        handleData(data, emp);

        if (!emp.level) {
            emp.level = 'Jr';
        }

        if (!emp.experience) {
            emp.experience = 0;
        }

        validateEmployee(emp);
        
        employees.push(emp);
        saveData(employees);

        console.log('Employee added successfully:', emp);
    } catch (e) {
        console.error('Error:', e.message);
    }
}

function listEmployees(data) {
    if (!isFileExist()) {
        console.log('No employees found.');
    } else {
        var employees = readData();
        const id = data[0];
        if(data.length > 0){
            employees = filterOutput(data, employees);
            if(employees.length === 0){
                console.log("No employees found");
                return;
            }
        } else if (!isNaN(id)) {
            const employee = employees.find(emp => emp.id === Number(id));
            if(!employee){
                console.log(`No employee found with ID: ${id}`);
            }else{
                const employeeDetails = formatOutput(employee);
                console.log(`Employee: ${employeeDetails}`);
            }
            return;
        }
        const employeeDetails = employees.map(emp => formatOutput(emp));
        console.log('Employees:\n', employeeDetails
        .join('\n-----------------------------------------------------------------\n'));
    }
}

function editEmployee(data) {
    try{
        if (!isFileExist()) {
            console.log('No employees found.');
        } else {
            let employees = readData();
    
            const index = employees.findIndex(emp => emp.id === Number(data[0]));
    
            if (index === -1) {
                console.log(`No employee found with ID: ${id}`);
            } else {
                let emp = employees[index];
    
                handleData(data, emp);
    
                validateEmployee(emp);
    
                employees[index] = emp;
    
                saveData(employees);
    
                console.log('Employee updated successfully:', emp);
            }
        }
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
}

function deleteEmployee(id) {
    try{
        if (!isFileExist()) {
            console.log('No employees found.');
        } else {
            let employees = readData();
    
            const newEmployees = employees.filter(emp => emp.id !== Number(id));
    
            if (newEmployees.length === employees.length) {
                console.log(`No employee found with ID: ${id}`);
            } else {
                saveData(newEmployees);
                console.log(`Employee with ID: ${id} deleted successfully.`);
            }
        }
    }catch(error){
        console.error(error.message);
    }
}

export {
    addEmployee,
    listEmployees,
    editEmployee,
    deleteEmployee
};