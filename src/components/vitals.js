import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/axiosInstance';
import '../styles/dashboard.css';

const VitalsPage = () => {
    const [activeTab, setActiveTab] = useState('vitals');
    const [vitals, setVitals] = useState({
        WeightInKilograms: '',
        BloodGlucose: '',
        BMI: '',
        weight_loss_goal: '',
        Injury: ''
    });
    const [weightLogs, setWeightLogs] = useState([]);

    useEffect(() => {
        // Fetch vitals from the "HealthVital" collection
        axiosInstance.get('/health-vitals').then(response => {
            setVitals(response.data);
        }).catch(error => {
            console.error('Error fetching vitals:', error);
        });

        // Fetch weight logs from the "Weightlog" collection
        axiosInstance.get('/weight-logs').then(response => {
            setWeightLogs(response.data);
        }).catch(error => {
            console.error('Error fetching weight logs:', error);
        });
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="view-account">
            <div className="module-inner">
                <div className="side-bar">
                    <ul className="nav">
                        <li className={activeTab === 'vitals' ? 'active' : ''}>
                            <a href="#" onClick={() => handleTabClick('vitals')}>Vitals</a>
                        </li>
                        <li className={activeTab === 'weight-logs' ? 'active' : ''}>
                            <a href="#" onClick={() => handleTabClick('weight-logs')}>Weight Logs</a>
                        </li>
                    </ul>
                </div>

                <div className="content-panel">
                    {activeTab === 'vitals' && (
                        <div>
                            <h2 className="title">Vitals</h2>
                            <form className="form-horizontal">
                                <div className="fieldset">
                                    <div className="form-group">
                                        <label className="control-label">Weight (kg)</label>
                                        <input type="text" className="form-control" value={vitals.WeightInKilograms} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Blood Glucose</label>
                                        <input type="text" className="form-control" value={vitals.BloodGlucose} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">BMI</label>
                                        <input type="text" className="form-control" value={vitals.BMI} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Weight Loss Goal</label>
                                        <input type="text" className="form-control" value={vitals.weight_loss_goal} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Injury</label>
                                        <input type="text" className="form-control" value={vitals.Injury} readOnly />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'weight-logs' && (
                        <div>
                            <h2 className="title">Weight Logs</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Log Date</th>
                                        <th>Weight (kg)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weightLogs.map((log, index) => (
                                        <tr key={index}>
                                            <td>{log.logdate}</td>
                                            <td>{log.weight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VitalsPage;
