import { argv } from 'process';
import { addEmployee, listEmployees, editEmployee, deleteEmployee } from './employeeFunctions.js';

let [,,command, ...data] = argv;

switch (command) {
    case 'add':
        addEmployee(data);
        break;
    case 'list':
        listEmployees(data);
        break;
    case 'edit':
        editEmployee(data);
        break;
    case 'delete':
        deleteEmployee(data[0]);
        break;
    default:
        console.error('Unknown command');
}