import Employee from '../models/Employee.js';

// GET ALL EMPLOYEES
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ employees, count: employees.length });
    // res.status(200).json({ employees });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// GET AN EMPLOYEE
const getEmployee = async (req, res) => {
  try {
    let { id: employeeId } = req.params;
    const employee = await Employee.findOne({ _id: employeeId });
    if (!employee) {
      return res.status(404).json({ msg: `No employee with ID ${employeeId} found.` });
    }
    res.status(200).json({ employee });
    // res.send('Get a single employee');
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ employee });
    // res.status(201).json({ msg: 'Employee added succesfully' });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    let { id: employeeId } = req.params;
    const employee = await Employee.findOneAndUpdate({ _id: employeeId }, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).json({ msg: `No employee with Id ${employeeId} found.` });
    }
    res.status(200).json({ msg: 'Successfully updated employee' });
    // res.send('Update an existing employee');
  } catch (error) {
    res.status(500).json({ msg: err });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    let { id: employeeId } = req.params;
    const employee = await Employee.findOneAndDelete({ _id: employeeId });
    if (!employee) {
      return res.status(404).json({ msg: `No employee with ID ${employeeId} found.` });
    }
    res.status(200).json({ msg: 'Employee succesfully deleted.' });
    // res.send('Delete an employee');
  } catch (error) {
    res.status(500).json({ msg: err });
  }
};

export { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };
