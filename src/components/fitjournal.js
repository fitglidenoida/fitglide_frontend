import React, { useState, useEffect } from 'react';
import { Stats, weightLogs, updateHealthVital, updateweightLogs, addweightLogs } from '../axios/auth';

const FitJournal = () => {
  const [activeTab, setActiveTab] = useState('healthvitals');
  const [healthVitals, setHealthVitals] = useState({});
  const [weightLogsData, setWeightLogsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newWeightLog, setNewWeightLog] = useState({ logdate: '', weight: '' });

  useEffect(() => {
    fetchHealthVitals();
    fetchWeightLogs();
  }, []);

  const fetchHealthVitals = async () => {
    const username = 'exampleUsername'; // Replace with dynamic username
    try {
      const response = await Stats(username);
      if (response.data && response.data[0]) {
        setHealthVitals(response.data[0].attributes);
      }
    } catch (error) {
      console.error('Error fetching health vitals:', error);
    }
  };

  const fetchWeightLogs = async () => {
    const username = 'exampleUsername'; // Replace with dynamic username
    try {
      const response = await weightLogs(username);
      setWeightLogsData(response.data);
    } catch (error) {
      console.error('Error fetching weight logs:', error);
    }
  };

  const handleEdit = (type) => {
    setIsEditing(true);
    if (type === 'healthvitals') {
      setFormData(healthVitals);
    } else if (type === 'weightlogs') {
      setFormData({});
    }
  };

  const handleSave = async (type) => {
    try {
      if (type === 'healthvitals') {
        await updateHealthVital(formData);
        fetchHealthVitals();
      } else if (type === 'weightlogs') {
        if (formData.id) {
          await updateweightLogs(formData); // Update existing log
        } else {
          await addweightLogs(formData); // Add new log
        }
        fetchWeightLogs();
      }
      setIsEditing(false);
      setFormData({});
      setNewWeightLog({ logdate: '', weight: '' }); // Clear new weight log fields
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
    setNewWeightLog({ logdate: '', weight: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'logdate' || name === 'weight') {
      setNewWeightLog((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleWeightLogEdit = (log) => {
    setIsEditing(true);
    setFormData(log.attributes); // Pre-fill form data with the selected log
  };

  return (
    <div className="settings-form-container">
      <div className="settings-tabs">
        <button
          className={`settings-tab ${activeTab === 'healthvitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('healthvitals')}
        >
          Health Vitals
        </button>
        <button
          className={`settings-tab ${activeTab === 'weightlogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('weightlogs')}
        >
          Weight Logs
        </button>
      </div>

      <div className="settings-tab-content">
        {activeTab === 'healthvitals' && (
          <div className="tab-panel active">
            <div className="settings-form-sections">
            <div className="settings-input-group">
                <label>Weight (kg):</label>
                <input
                  type="text"
                  name="WeightInKilograms"
                  value={isEditing ? formData.WeightInKilograms || '' : healthVitals.WeightInKilograms || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>Blood Glucose:</label>
                <input
                  type="text"
                  name="BloodGlucose"
                  value={isEditing ? formData.BloodGlucose || '' : healthVitals.BloodGlucose || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>Weight Loss Goal:</label>
                <input
                  type="text"
                  name="weight_loss_goal"
                  value={isEditing ? formData.weight_loss_goal || '' : healthVitals.weight_loss_goal || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>BMR:</label>
                <input
                  type="text"
                  name="BMR"
                  value={isEditing ? formData.BMR || '' : healthVitals.BMR || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>BMI:</label>
                <input
                  type="text"
                  name="BMI"
                  value={isEditing ? formData.BMI || '' : healthVitals.BMI || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>Report:</label>
                <input
                  type="text"
                  name="report"
                  value={isEditing ? formData.report || '' : healthVitals.report || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="settings-button-container">
              {!isEditing && <button className="settings-submit-button" onClick={() => handleEdit('healthvitals')}>Edit</button>}
              {isEditing && (
                <>
                  <button className="settings-submit-button" onClick={() => handleSave('healthvitals')}>Save</button>
                  <button className="settings-submit-button" onClick={handleCancel}>Cancel</button>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'weightlogs' && (
          <div className="tab-panel active">
            {/* Weight Log Input Fields */}
            <div className="settings-form-sections">
              <div className="settings-input-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="logdate"
                  value={newWeightLog.logdate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="settings-input-group">
                <label>Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  value={newWeightLog.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="settings-button-container">
                <button className="settings-submit-button" onClick={() => handleSave('weightlogs')}>Add Weight Log</button>
              </div>
            </div>

            {/* Display existing weight logs */}
            <div className="weight-log-list">
              {weightLogsData.map((log, index) => (
                <div key={index} className="weight-log-item">
                  <div>{log.attributes.logdate}</div>
                  <div>{log.attributes.weight} kg</div>
                  <button
                    className="settings-submit-button"
                    onClick={() => handleWeightLogEdit(log)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default FitJournal;