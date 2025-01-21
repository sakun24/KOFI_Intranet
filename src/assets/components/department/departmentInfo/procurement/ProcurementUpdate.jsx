import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { OrbitProgress } from 'react-loading-indicators';
import './style.css';

const ProcurementUpdate = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        axios.get('https://script.google.com/macros/s/AKfycbwOcm4Brow5pT1nW_EGwoWK1-Gd1aSVUEVl23YY2akIul_367fv6XUU6dgeraE8XWHW/exec') // Add your API URL here
            .then(response => {
                const formatDate = (dateString) => {
                    const options = { day: '2-digit', month: 'short', year: 'numeric' };
                    return new Date(dateString).toLocaleDateString('en-GB', options);
                };

                const formattedData = response.data.map(item => ({
                    ...item,
                    dateOfPR: formatDate(item['Date of PR']),
                    datePending: formatDate(item['Date Pending']),
                    dateCompleted: formatDate(item['Date Completed'])
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setLoading(false);
            });
    }, []);

    const handleSort = () => {
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a['Date of PR']);
            const dateB = new Date(b['Date of PR']);
            return sortOrder === 'asc' ? dateB - dateA : dateA - dateB;
        });

        setData(sortedData);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const renderTableHeader = () => {
        const headers = [
            'PR No.', 'Department', 'Requestor name', 'Date of PR', 'Description','Need Date', 'Status', 'Date Pending', 'Date Completed', 'Remarks/Action Required'
        ];
        return headers.map((header, index) => (
            <th key={index}>{header}</th>
        ));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-GB', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const renderTableRows = () => {
        return data.map((item, index) => {
            // Determine the color for the entire row based on the 'Status' value
            let rowClass = '';
            if (item['Status'] === 'Completed') {
                rowClass = 'completed-row'; // Assign a class for the entire row
            }
    
            return (
                <tr key={index} className={rowClass}>
                    <td>{item['PR No.']}</td>
                    <td>{item['Department']}</td>
                    <td>{item['Requestor name']}</td>
                    <td>{item['Date of PR'] ? formatDate(item['Date of PR']) : ""}</td>
                    <td>{item['Description']}</td>
                    <td>{item['Need Date'] ? formatDate(item['Need Date']) : ""}</td>
                    <td>{item['Status']}</td>
                    <td>{item['Date Pending'] ? formatDate(item['Date Pending']) : ""}</td>
                    <td>{item['Date Completed'] ? formatDate(item['Date Completed']) : ""}</td>
                    <td>{item['Remarks/Action Required']}</td>
                </tr>
            );
        });
    };
    
    
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <OrbitProgress variant="split-disc" dense color="#f79100" size="large" text="" textColor="" />
            </div>
        );
    }

    return (
        <div id="procurement-update">
            <h1>Purchase Requisition Status Update</h1>
            <button className='D_pr-sort' onClick={handleSort}>
                Sort by Date of PR ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </Table>
        </div>
    );
};

export default ProcurementUpdate;
