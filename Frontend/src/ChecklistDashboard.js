import React, { useState, useEffect } from "react";
import axios from "axios";

const ChecklistDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/application");
        const application = response.data.data;

        // Perform calculations for Loan-to-Value (LTV)
        const loanToValue = (application.loanRequired / application.purchasePrice) * 100;

        // Prepare the checklist results
        const checklist = [
          { rule: "Valuation Fee Paid", passed: application.isValuationFeePaid },
          { rule: "UK Resident", passed: application.isUkResident },
          { rule: "Risk Rating Medium", passed: application.riskRating === "Medium" },
          { rule: "LTV Below 60%", passed: loanToValue < 60 },
        ];

        setData(checklist);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data from the server.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1>Checklist Dashboard</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{item.rule}:</strong>{" "}
            <span style={{ color: item.passed ? "green" : "red" }}>
              {item.passed ? "Passed" : "Failed"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistDashboard;
