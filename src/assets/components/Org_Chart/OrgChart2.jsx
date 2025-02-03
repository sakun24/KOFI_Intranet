import React, { useState, useEffect } from "react";
import OrgChart from "@dabeng/react-orgchart";
import Select from "react-select";
import "./OrgChart2.css";
import PfDefault from "../../images/Kofi_Group.webp";

const BASE_URL = "http://192.168.123.90";

const OrgChart2 = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepts, setSelectedDepts] = useState(["KOFI Group"]); // Default to "All Departments"
    const [orgData, setOrgData] = useState(null);
    const [allEmployees, setAllEmployees] = useState({});

    useEffect(() => {
        fetch(`${BASE_URL}/api/employees`)
            .then(response => response.json())
            .then(data => {
                const departmentNames = Object.keys(data.employees_by_department);
                setDepartments(departmentNames);
                setAllEmployees(data.employees_by_department);
                fetchHierarchy(["KOFI Group"], data.employees_by_department); // Load KOFI Group departments initially
            })
            .catch(error => console.error("Error fetching departments:", error));
    }, []);

    const handleDepartmentChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setSelectedDepts(selectedValues);
        fetchHierarchy(selectedValues, allEmployees);
    };

    const fetchHierarchy = (selectedDepartments, employeesData) => {
        let selectedEmployees = [];

        if (selectedDepartments.includes("KOFI Group")) {
            selectedEmployees = Object.values(employeesData).flat(); // Merge KOFI Group employees
        } else {
            selectedEmployees = selectedDepartments.flatMap(dept => employeesData[dept] || []);
        }

        console.log("Selected Employees:", selectedEmployees);
        const hierarchy = buildHierarchy(selectedEmployees, selectedDepartments);
        setOrgData(hierarchy);
    };

    const buildHierarchy = (selectedEmployees, departmentNames) => {
        if (!selectedEmployees || selectedEmployees.length === 0) return null;

        const map = {};

        selectedEmployees.forEach(emp => {
            map[emp.id] = { 
                id: emp.id, 
                name: emp.name, 
                title: emp.position, 
                photo: emp.photo, 
                parentId: emp.manager_id, 
                children: [],
                department: emp.department 
            };
        });

        const roots = [];

        selectedEmployees.forEach(emp => {
            const manager = map[emp.manager_id];

            if (manager) {
                if (manager.department !== emp.department) {
                    emp.managerFromAnotherDepartment = true;
                }
                manager.children.push(map[emp.id]);
            } else {
                roots.push(map[emp.id]);
            }
        });

        return roots.length === 1 
            ? roots[0] 
            : { id: "root", name: departmentNames.join(", "), children: roots };
    };

    const MyNodeComponent = ({ nodeData }) => {
        const imageUrl = nodeData.photo ? `${BASE_URL}/StaffPhotos/${nodeData.photo}` : PfDefault;

        return (
            <div className="org-node">
                <img src={imageUrl} alt={nodeData.name} className="profile-pic" />
                <div className="node-info">
                    <strong>{nodeData.name}</strong>
                    <p>{nodeData.title}</p>
                    {nodeData.managerFromAnotherDepartment && (
                        <p className="manager-note">Manager from another department</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
              <h1 style={{ textAlign: "center" , fontWeight: "bold" }}>
                <span style={{ color: "#540000" }}>KO</span>
                <span style={{ color: "#F5821F" }}>FI</span> GROUP | Organizational Chart
                </h1>

            <h2>Select Departments</h2>
            <Select
                options={[{ value: "KOFI Group", label: "KOFI Group", image: PfDefault }, ...departments.map(dept => ({ value: dept, label: dept }))]}
                onChange={handleDepartmentChange}
                isMulti
                defaultValue={[{ value: "KOFI Group", label: "KOFI Group", image: PfDefault }]}
                placeholder="Choose departments..."
                getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {e.image && (
                            <img 
                                src={e.image} 
                                alt={e.label} 
                                style={{ width: 20, height: 20, marginRight: 10, borderRadius: "50%" }} 
                            />
                        )}
                        {e.label}
                    </div>
                )}
            />

            {orgData ? <OrgChart datasource={orgData} NodeTemplate={MyNodeComponent} /> : <p>Loading chart...</p>}
        </div>
    );
    
};

export default OrgChart2;
