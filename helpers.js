import fs from 'fs';
const filePath = 'employess.json';

function validateEmployee(emp) {
    const requiredFields = ['name', 'email', 'salary'];
    for (let field of requiredFields) {
        if (!emp[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    validateData(emp);
}

function validateData(emp) {
    let regex = /^[A-Za-z]+$/;
    if (!regex.test(emp.name)) {
        throw new Error('Name must be letters only');
    }

    const emailRegex = /^[a-zA-Z0-9.]+@(gmail|yahoo|outlook)\.(com|net|org)$/;
    if (!emailRegex.test(emp.email)) {
        throw new Error('Invalid email format');
    }

    const salary = Number(emp.salary);
    if (isNaN(salary) || salary <= 0) {
        throw new Error('Salary must be a positive number');
    }

    if (emp.level) {
        const validLevels = ['Jr', 'Mid-level', 'Sr', 'Lead'];
        if (!validLevels.includes(emp.level)) {
            throw new Error('Level must be one of: Jr, Mid-level, Sr, Lead');
        }
    }

    if (emp.experience) {
        const experience = Number(emp.experience);
        if (isNaN(experience) || experience < 0 || experience > 50) {
            throw new Error('Years of experience must be a number between 0 and 50');
        }
    }
}

function handleData(data, emp){
    data.forEach(item => {
        let [key, value] = item.split('=');
        if (key.startsWith('--') && value) {
            emp[key.replace(/^--/, '')] = value;
        }
    });
}

function readData() {
    if (!isFileExist()) {
        throw new Error("File Not Found");
    } else {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            if (!Array.isArray(data)) {
                throw new Error("Invalid file format: Expected an array.");
            }
            return data;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }
}

function formatOutput(emp) {
    return Object.entries(emp)
        .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
        .join(' ');
}

function saveData(employees) {
    if (!isFileExist()) {
        throw new Error("File Not Found");
    } else {
        try {
            fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));
        } catch (error) {
            console.error("Error saving data:", error.message);
        }
    }
}

function isFileExist() {
    return fs.existsSync(filePath);
}

function parseArgs(argsArray) {
    const data = {};
    
    argsArray.forEach(arg => {
        if (arg.startsWith("--")) {
            const [key, value] = arg.substring(2).split("=");
            if (key && value) {
                data[key] = value;
            }
        }
    });

    return data;
}

function filterOutput(data, employees) {
    const parsedData = parseArgs(data);
    return employees.filter(emp => {
        return Object.entries(parsedData).every(([key, value]) => {
            if (!(key in emp)) return false;

            const empValue = emp[key].toString().trim().toLowerCase();
            const filterValue = value.toString().trim().toLowerCase();

            if (!isNaN(empValue) && !isNaN(filterValue)) {
                return Number(empValue) === Number(filterValue);
            }

            return empValue === filterValue;
        });
    });
}

export {
    validateEmployee,
    handleData,
    readData,
    formatOutput,
    saveData,
    isFileExist,
    filterOutput
};