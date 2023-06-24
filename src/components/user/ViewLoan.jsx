import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import Details from '../user/Details';
import { ListGroup } from "react-bootstrap";

export default function ViewLoan() {
  const [id, setId] = useState();
  const [loanId, setLoanId] = useState();
  const [applicantName, setName] = useState();
  const [applicantAddress, setAddress] = useState();
  const [applicantMobile, setMobile] = useState();
  const [applicantEmail, setEmail] = useState();
  const [applicantAadhaar, setAadhaar] = useState();
  const [applicantPan, setPan] = useState();
  const [applicantSalary, setSalary] = useState();
  const [status, setStatus] = useState();
  const [item, setItem] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("please login first");
      navigate("/");
    }
  });

  const loan = (e) => {
    e.preventDefault();
    fetch(`http://localhost:54754/user/viewLoan?loanId=${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result == null) {
          alert("No loan found");
        }
        setLoanId(result.loanId);
        setName(result.applicantName);
        setAddress(result.applicantAddress);
        setMobile(result.applicantMobile);
        setEmail(result.applicantEmail);
        setAadhaar(result.applicantAadhaar);
        setPan(result.applicantPan);
        setSalary(result.applicantSalary);
        setStatus(result.status);
      }).catch((err) => {
        alert("No loan found");
      });
    const item = { loanId, applicantName, applicantAddress, applicantMobile, applicantEmail, applicantAadhaar, applicantPan, applicantSalary, status };
    setItem(item);
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <p id="track_application_text">
          Track Your Loan Application
        </p>
        <form onSubmit={loan}>
          <input type="text" id="enterLoanId" placeholder="Enter your Loan Id" onChange={(e) => setId(e.target.value)}></input>
          <button type="submit" id="trackButton">Track</button>
        </form>
        <hr />
        <ListGroup>
          <ListGroup.Item><p><strong>Applicant name : </strong>{applicantName}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Phone no : </strong> {applicantMobile}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant PAN no : </strong> {applicantPan}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Address : </strong> {applicantAddress}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Loan Id : </strong> {loanId}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Salary : </strong> {applicantSalary}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Email : </strong> {applicantEmail}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Aadhar : </strong> {applicantAadhaar}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Loan Status : </strong> {status}</p></ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}