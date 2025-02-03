import React, { useState, useEffect } from "react";
import OrgChart from "@dabeng/react-orgchart";

const OrgChartComponent = () => {
  const [department, setDepartment] = useState("IT Department"); // Default department
  const [treeData, setTreeData] = useState(null);
  const [error, setError] = useState(null);

  const departments = [
    "IT Department",
    "HR Department",
    "Finance Department",
    "Sales Department",
  ]; // Example departments

  const fetchOrgChartData = (dept) => {
    setTreeData(null); // Reset chart before loading new data
    setError(null); // Clear previous errors

    fetch(
      `https://script.google.com/macros/s/AKfycbzycTJQIIKbq5jwErfZQjVSZqQ1QKPoaef8ZsVELWmPaTvQcgNrFXpL7GaKlhIfkzMz/exec?sheet=${encodeURIComponent(dept)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          throw new Error("No data found for this department.");
        }
        const tree = buildTree(data);
        setTreeData(tree);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchOrgChartData(department);
  }, [department]);

  // Convert flat data to tree
  const buildTree = (flatData) => {
    let map = {};
    let root = null;

    flatData.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });

    flatData.forEach((item) => {
      if (!item.parentId || item.parentId === "null") {
        root = map[item.id];
      } else if (map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      }
    });

    return root;
  };

  return (
    <div>
      <h2>Dynamic Organization Chart</h2>

      {/* Department Selector */}
      <label>Select Department: </label>
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      {/* Display Org Chart or Error Message */}
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : treeData ? (
        <OrgChart datasource={treeData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrgChartComponent;
