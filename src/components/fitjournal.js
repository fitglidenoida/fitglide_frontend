import React, { useState, useEffect } from 'react';
import { Stats, weightLogs, updateHealthVital, updateweightLogs, addweightLogs } from '../axios/auth';

const FitJournal = () => {
  const [activeTab, setActiveTab] = useState('healthvitals');
  const [healthVitals, setHealthVitals] = useState({ documentId: null });
  const [weightLogsData, setWeightLogsData] = useState([]);  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newWeightLog, setNewWeightLog] = useState({ logdate: '', weight: '' });
  const [username, setUsername] = useState(null);
  const documentId = JSON.parse(localStorage.getItem("user")).documentId;
  useEffect(() => {
    const userdetail = JSON.parse(localStorage.getItem("user"));
    if (userdetail && userdetail.username) {
      Stats(userdetail.username)
        .then(response => {
          if (response?.data?.length > 0) {
            console.log('Fetched fitjournal data:', response.data[0]);
            setHealthVitals(response.data[0]);
            setUsername(userdetail.username); // Store the username
            setFormData(response.data[0]);
          } else {
            console.log("No fitjournal data found.");
          }
        })
        .catch(e => console.log("Error fetching fitjournal data", e));
    } else {
      console.error('User not authenticated');
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetchHealthVitals();
      //fetchWeightLogs();
    }
  }, [username]);

  console.log("Health Vitals:", healthVitals);
  console.log("Document ID:", healthVitals.documentId);
  const fetchHealthVitals = async () => {
    try {
      const response = await api.get('/health-vitals', { params: { populate: 'username' } });
      const healthVitals = response.data?.data;
  
      if (!healthVitals || healthVitals.length === 0) {
        console.warn("No health vitals found in API response.");
        return;
      }
  
      const { documentId, ...rest } = healthVitals[0];
      console.log("Document ID:", documentId);
      setHealthVitals({ documentId, ...rest });
    } catch (error) {
      console.error("Error fetching health vitals:", error.response?.data || error);
    }
  };

  const fetchWeightLogs = async () => {
    try {
      const response = await weightLogs(username);
      if (response.data && Array.isArray(response.data)) {
        console.log(response.data,"response")
        const validLogs = response.data.filter(log => log.attributes && log.attributes.logdate);
        console.log(response.data,"validlogs")
        setWeightLogsData(response.data);
      } else {
        console.warn('No weight logs found for the user.');
        setWeightLogsData([]);
      }
    } catch (error) {
      console.error('Error fetching weight logs:', error);
      setWeightLogsData([]); // Fallback to empty array on error
    }
  };

  const handleEdit = (type) => {
    setIsEditing(true);
    setFormData(type === 'healthvitals' ? { ...healthVitals } : {});
  };

  const handleSave = async (type) => {
    try {
      if (type === 'healthvitals') {
        const { documentId, ...rest } = healthVitals;
        if (!documentId) {
          console.error("Document ID is missing");
          return;
        }
  
        const updatedData = {
          WeightInKilograms: formData.WeightInKilograms || rest.WeightInKilograms,
          BloodGlucose: formData.BloodGlucose || rest.BloodGlucose,
          // Add other fields as needed
        };
  
        console.log("Updating health vital with data:", updatedData);
  
        await updateHealthVital({ documentId, data: updatedData });
  
        // Immediately fetch the updated health vitals
        
        await fetchHealthVitals(); 
      }
  
      setIsEditing(false);
      setFormData({});
    } catch (error) {
      console.error(`Error updating ${type}:`, error.response?.data || error);
    }
    try {
        if (type === 'weightlogs') {
          // Ensure logdate and weight are provided
          if (!newWeightLog.logdate || !newWeightLog.weight) {
            console.error('Log date and weight are required');
            return;
          }
    
          // Prepare payload
          const payload = {
           
              // username, // Ensure username is included
              logdate: newWeightLog.logdate,
              weight: newWeightLog.weight,
              username: {
                connect: [documentId]
            }
            
          };
    
          console.log('Adding weight log:', payload);
    
          // Make the POST request
          await addweightLogs(payload);
    
          // Refresh weight logs after adding
          await fetchWeightLogs();
    
          // Reset input fields
          setNewWeightLog({ logdate: '', weight: '' });
        }
        
        setIsEditing(false);
        setFormData({});
      } catch (error) {
        console.error(`Error adding weight log:`, error.response?.data || error);
      }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
    setNewWeightLog({ logdate: '', weight: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'logdate' || name === 'weight') {
      setNewWeightLog((prev) => ({ ...prev, [name]: value }));
    }
    

    console.log(healthVitals,'health',formData,)
  };

  const handleWeightLogEdit = (log) => {
    if (!log?.attributes) {
      console.error("Invalid log data:", log);
      return;
    }
    setIsEditing(true);
    setFormData(log.attributes);
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
          onClick={() => {setActiveTab('weightlogs'),fetchWeightLogs()}}
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
                  value={formData.WeightInKilograms}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>Blood Glucose:</label>
                <input
                  type="text"
                  name="BloodGlucose"
                  value={formData.BloodGlucose}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>Weight Loss Goal:</label>
                <input
                  type="text"
                  name="weight_loss_goal"
                  value={formData.weight_loss_goal}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>BMR:</label>
                <input
                  type="text"
                  name="BMR"
                  value={formData.BMR}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>BMI:</label>
                <input
                  type="text"
                  name="BMI"
                  value={formData.BMI}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="settings-input-group">
                <label>Report:</label>
                <input
                  type="text"
                  name="report"
                  value={formData.report}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="settings-button-container">
              {!isEditing && <button onClick={() => handleEdit('healthvitals')}>Edit</button>}
              {isEditing && (
                <>
                  <button onClick={() => handleSave('healthvitals')}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'weightlogs' && (
          <div className="tab-panel active">
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
  <div className="settings-input-group" style={{marginTop:"25px"}}>
  <label>  </label>
    <button onClick={() => handleSave('weightlogs')}>Add Weight Log</button>
  </div>
  {/* <div className="settings-button-container settings-input-group">
    <button onClick={() => handleSave('weightlogs')}>Add Weight Log</button>
  </div> */}
  <div className="weight-log-list">
    <table>
      <thead>
      <th>Date</th>
      <th>Weight</th>

      </thead>
      <tbody>
      {weightLogsData.length > 0 && weightLogsData.map((log) => {
        const logDate = log?.logdate || 'No Date Available';
        const weight = log?.weight || 'No Weight Available';
        return (
          <tr key={log.id}>
            <td>{logDate}</td>
            <td>{weight}</td>

          </tr>
        )

      })
    }
                
        
      </tbody>
      
    </table>
  {/* {console.log(weightLogsData,"bjdfjd")}
                {weightLogsData.length > 0 && weightLogsData.map((log) => {
                    const logDate = log?.logdate || 'No Date Available';
                    const weight = log?.weight || 'No Weight Available';
                    return (
                      <table>
                    <div key={log.id} className="weight-log-item">
                    <div>{logDate}</div>
                    <div>{weight} kg</div>
                    <button onClick={() => handleWeightLogEdit(log)}>Edit</button>
                    </div>
                    );
                    })} */}
                </div>
</div>



          </div>
        )}
      </div>
    </div>
  );
};

export default FitJournal;