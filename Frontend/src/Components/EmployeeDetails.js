import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDetails = () => {
  const [details, setDetails] = useState([]);
  const [form, setForm] = useState({EmployeeId: '', EmployeeName: '', Designation: '', Deparatment: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const response = await axios.get('http://localhost:5217/api/employees');
    setDetails(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5217/api/Employees/${form.id}`, form);
    } else {
      await axios.post('http://localhost:5217/api/Employees', form);
    }
    setForm({employeeId: '', employeeName: '', designation: '', deparatment: '' });
    setIsEditing(false);
    fetchDetails();
  };

  const handleEdit = (detail) => {
    setForm(detail);
   setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5217/api/Employees/${id}`);
    fetchDetails();
  };

  return (
    <div>
      <h1>Employee Details</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="employeeId" placeholder=" Employee Id" value={form.employeeId} onChange={handleChange} required />
        <input type="text" name="employeeName" placeholder=" Employee Name" value={form.employeeName} onChange={handleChange} required />
        <input type="text" name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
        <input type="text" name="deparatment" placeholder="Deparatment" value={form.deparatment} onChange={handleChange} required />
        <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Deparatment</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
              <tr key={detail.id}>
              <td>{detail.employeeId}</td>
              <td>{detail.employeeName}</td>
              <td>{detail.designation}</td>
              <td>{detail.deparatment}</td>
              <td>
                <button  onClick={() => handleEdit(detail)}>Edit</button> 
                &nbsp;&nbsp;&nbsp;
                <button  onClick={() => handleDelete(detail.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default EmployeeDetails;