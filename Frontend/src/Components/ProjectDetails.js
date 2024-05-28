import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectDetails = () => {
  const [details, setDetails] = useState([]);
  const [commentDetails, setCommentDetails] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
    fetchEmployeeDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5217/api/clients");
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5217/api/employees");
      setEmployeeDetails(response.data);
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  const handleReject = async (event, index) => {
    const row = event.target.closest("tr");
    const tds = row.querySelectorAll("td");
    const Company = tds[0].textContent;
    console.log(Company);
    const reqproject = details.find((detail) => detail.clientName === Company);
    const empid = reqproject.employeeId;
    console.log(reqproject)

    const reqemployee = employeeDetails.find((details) => details.employeeId === empid);
    console.log(reqemployee);

    const data = {
      "employeeId": empid,
       "employeeName": reqemployee.employeeName,
      "designation": reqemployee.designation,
      "deparatment": reqemployee.deparatment,
      "comments": [commentDetails[index]],
    };
    

    console.log("Data to send:", data);

    console.log(reqproject.employeeId);

    try {
      const response = await axios
        .put(
          `http://localhost:5217/api/Employees/${empid}?employeeid=${empid}`,
          data
        )
        .then((response) => {
          console.log("Clientdata updated successfully", response.data);
        });
    } catch (error) {
      console.error("Error updating client", error);
    }
  };

  const handleChangeComment = (event, index) => {
    const { value } = event.target;
    const updatedComments = [...commentDetails];
    updatedComments[index] = value;
    setCommentDetails(updatedComments);
  };

  return (
    <div>
      <h1>Employee Project Details</h1>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Project Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={detail.id}>
              <td>{detail.clientName}</td>
              <td>{detail.projectName}</td>
              <td>{detail.status}</td>
              <td>{new Date(detail.startDate).toLocaleDateString()}</td>
              <td>{new Date(detail.endDate).toLocaleDateString()}</td>
              <td>
                <input
                  onChange={(event) => handleChangeComment(event, index)}
                  value={commentDetails[index] || ""}
                  type="text"
                />
              </td>
              <td>
                <button onClick={(event) => handleReject(event, index)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetails;