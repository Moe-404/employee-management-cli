# Employee Management CLI

This project is a command-line interface (CLI) application for managing employee records. It allows you to add, list, edit, and delete employees using a JSON file as the data store.

## Features

- **Add Employee**: Add a new employee with details such as name, email, salary, level, and experience.
- **List Employees**: List all employees or filter them based on specific criteria.
- **Edit Employee**: Edit the details of an existing employee by ID.
- **Delete Employee**: Remove an employee from the records by ID.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/employee-management-cli.git
   cd employee-management-cli
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm init
   ```

## Usage

Below are the available commands and their usage:

### Add an Employee
```bash
node index.js add --name=John --email=john.doe@gmail.com --salary=50000 --level=Mid-level --experience=5
```

### List Employees

List all employees:
```bash
node index.js list
```

Filter employees by criteria:
```bash
node index.js list --name=John --level=Jr
```

### Edit an Employee
```bash
node index.js edit <id> --name=Jane --salary=60000
```

### Delete an Employee
```bash
node index.js delete <id>
```

## Data Validation

The application enforces the following validation rules:

- **Name**: Must contain only letters
- **Email**: Must be a valid email format (example@domain.com)
- **Salary**: Must be a positive number
- **Level**: Must be one of: Jr, Mid-level, Sr, Lead
- **Experience**: Must be a number between 0 and 50 years

## Data Storage

Employee data is stored in a JSON file named `employees.json`. The file structure is automatically managed by the application.

## Helper Functions

The project includes several helper functions:

- **validateEmployee**: Validates employee data for required fields and correct formats
- **handleData**: Processes command-line input data
- **readData**: Reads employee data from JSON file
- **formatOutput**: Formats employee data for display
- **saveData**: Saves updated employee data
- **isFileExist**: Checks if data file exists
- **filterOutput**: Filters employees based on criteria

## Required Fields

Each employee record must include:
- name
- email
- salary

Optional fields:
- level (defaults to 'Jr')
- experience (defaults to 0)

## Error Handling

The application includes comprehensive error handling for:
- Invalid data formats
- Missing required fields
- File operations
- Invalid commands
- Non-existent employee IDs
## Contact

For questions or feedback, please contact [mohamed.eid.moe@gmail.com](mailto:mohamed.eid.moe@gmail.com).