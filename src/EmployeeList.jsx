import React from 'react';
import { Badge, Button, Table, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import EmployeeFilter from './EmployeeFilter.jsx';
import EmployeeAdd from './EmployeeAdd.jsx';

// STATELESS COMPONENT
function EmployeeTable(props) {
  // GET THE URL
  const { search } = useLocation();
  // GET THE PARAMETERS FROM TEH URL
  const query = new URLSearchParams(search);
  // GET THE  EMPLOYEES WITH STATUS 'EMPLOYED'
  const q = query.get('employed');

  const employeeRows = props.employees
    .filter((employee) => (q ? String(employee.currentlyEmployed) === q : true))
    .map((employee) => <EmployeeRow key={employee._id} employee={employee} deleteEmployee={props.deleteEmployee} />);

  return (
    <Card>
      <Card.Header as='h5'>
        All Employees <Badge bg='secondary'>{employeeRows.length}</Badge>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Table striped size='sm'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Extension</th>
                <th>Email</th>
                <th>Title</th>
                <th>Date Hired</th>
                <th>Currently Employeed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{employeeRows}</tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export class EmployeeRow extends React.Component {
  // function onDeleteClick() {
  //   props.deleteEmployee(props.employee._id);
  // }
  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      modalVisible: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // componentDidMount() {
  //   const employee = this.props.employees;
  // }

  toggleModal() {
    this.setState({ toggleModal: !this.state.modalVisible });
  }

  handleSubmit() {}

  render() {
    return (
      <>
        <tr>
          <td>
            <Link to={`/edit/${this.props.employee._id}`}>{this.props.employee.name}</Link>
          </td>
          <td>{this.props.employee.extension}</td>
          <td>{this.props.employee.email}</td>
          <td>{this.props.employee.title}</td>
          <td>{this.props.employee.dateHired.toDateString()}</td>
          <td>{this.props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
          <td>
            <Button variant='danger' size='sm' onClick={this.toggleModal}>
              X
            </Button>
            <Modal show={this.state.modalVisible} onHide={this.toggleModal} centered></Modal>
          </td>
        </tr>
      </>
    );
  }
}
//onDeleteClick this was on button for onClick
export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  // CALLED AS SOON AS THE COMPONENT IS INSERTED INTO THE DOM
  componentDidMount() {
    this.loadData();
  }
  // LOAD DATA FUNCTION
  loadData() {
    fetch('/api/employees')
      .then((response) => response.json())
      .then((data) => {
        // console.log('Total count of employees:', data.count);
        data.employees.forEach((employee) => {
          employee.dateHired = new Date(employee.dateHired);
        });
        this.setState({ employees: data.employees });
      })
      .catch((err) => console.log(err));
  }

  createEmployee(employee) {
    // USE FETCH, RETURN RECORD IN RESPONSE AND CONVERT DATE HIRED TO OBJECT
    fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((newEmployee) => {
        newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired);
        const newEmployees = this.state.employees.concat(newEmployee.employee);
        this.setState({ employees: newEmployees });
        console.log('Total count of employees', newEmployees.length);
      })
      .catch((err) => console.log(err));
  }
  // DELETE FUNCTION
  deleteEmployee(id) {
    fetch(`/api/employees/${id}`, { method: 'DELETE' }).then((response) => {
      if (!response.ok) {
        console.log('Failed to delete employee');
      } else {
        this.loadData();
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <EmployeeAdd createEmployee={this.createEmployee} />
        <EmployeeFilter />
        <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
      </React.Fragment>
    );
  }
}
