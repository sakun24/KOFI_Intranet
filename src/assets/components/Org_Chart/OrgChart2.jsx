import React, { useState, useEffect, useRef } from "react";
import OrgChart from "@dabeng/react-orgchart";
import Select from "react-select";
import "./OrgChart2.css";
import PfDefault from "../../images/Kofi_Group.png";

const BASE_URL = "http://192.168.123.90";

const OrgChart2 = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepts, setSelectedDepts] = useState(["KOFI Group"]);
    const [orgData, setOrgData] = useState(null);
    const [allEmployees, setAllEmployees] = useState({});
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    const orgchartRef = useRef(null);
    const handleNodeClick = (event) => {
        event.stopPropagation(); // Stop event from triggering selection
    };
    

    useEffect(() => {
        fetch(`${BASE_URL}/api/employees`)
            .then(response => response.json())
            .then(data => {
                const departmentNames = Object.keys(data.employees_by_department);
                setDepartments(departmentNames);
                setAllEmployees(data.employees_by_department);
                fetchHierarchy(["KOFI Group"], data.employees_by_department);
            })
            .catch(error => console.error("Error fetching departments:", error));
    }, []);

    const generateFilename = (selectedDepts) => {
        return selectedDepts.join("-").replace(/\s+/g, '_');
    };

    const [filename, setFilename] = useState(generateFilename(selectedDepts));

    const onNameChange = (event) => {
        setFilename(event.target.value);
    };

    const handleDepartmentChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setSelectedDepts(selectedValues);
        setFilename(generateFilename(selectedValues)); // Update filename when departments change
        fetchHierarchy(selectedValues, allEmployees);
    };

    const fetchHierarchy = (selectedDepartments, employeesData) => {
        let selectedEmployees = [];

        if (selectedDepartments.includes("KOFI Group")) {
            selectedEmployees = Object.values(employeesData).flat();
        } else {
            selectedEmployees = selectedDepartments.flatMap(dept => employeesData[dept] || []);
        }

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
            <div className="org-node" style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                <img 
                    src={imageUrl} 
                    alt={nodeData.name} 
                    className="profile-pic" 
                    onLoad={() => setImagesLoaded(true)}
                    onError={() => setImagesLoaded(false)}
                />
                <div className="node-info" style={{ fontSize: '14px' }}>
                    <strong>{nodeData.name}</strong>
                    <p>{nodeData.title}</p>
                    {nodeData.managerFromAnotherDepartment && (
                        <p className="manager-note" style={{ fontStyle: 'italic', color: 'red' }}>Manager from another department</p>
                    )}
                </div>
            </div>
        );
    };

    const exportTo = () => {
        if (orgchartRef.current && imagesLoaded) {
            setIsExporting(true);
            setTimeout(() => {
                orgchartRef.current.exportTo(filename, "pdf", ); // Only export as PDF
                setIsExporting(false);
                setModalOpen(false); // Close the modal after export
            }, 1000);
        } else {
            console.error("OrgChart reference is not available or images are not fully loaded.");
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
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

            {/* Export Modal */}
            {modalOpen && (
                <div className="modal" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
                    <h3>Export Organizational Chart</h3>
                    <section className="ExportBar">
                        <label htmlFor="txt-filename">Filename:</label>
                        <input
                            id="txt-filename"
                            type="text"
                            value={filename}
                            onChange={onNameChange}
                            style={{ fontSize: "1rem", marginRight: "2rem" }}
                        />
                        <button onClick={exportTo} disabled={isExporting}>
                            {isExporting ? "Exporting..." : "Export as PDF"}
                        </button>
                    </section>
                    <button onClick={() => setModalOpen(false)} style={{ marginTop: '10px' }}>Close</button>
                </div>
            )}

        {orgData ? (
            <div className="no-select">
                <OrgChart
                    ref={orgchartRef}
                    datasource={orgData}
                    NodeTemplate={MyNodeComponent}
                    pan={true}
                    fit={true}
                />
            </div>
        ) : (
            <p>Loading chart...</p>
        )}
            <button onClick={() => setModalOpen(true)} style={{ marginTop: '20px',float:"right", padding: '10px', backgroundColor: '#F5821F', color: 'white', border: 'none' , cursor:'pointer' }}> Export</button>
        </div>
    );
};

export default OrgChart2;
