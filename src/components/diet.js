import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import '../styles/workout.css'; 
import { DietPlans } from '../axios/auth'; // Axios function to fetch diet plans

const Diet = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [currentView] = useState('timeGridDay'); // Default view is set to daily
  const calendarRef = useRef(null); // Reference for the FullCalendar instance

  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        console.log('Fetching diet plans...');
        const response = await DietPlans(); // Fetch diet plans from Strapi
        console.log('Response:', response.data);
        const formattedData = response.data.map(plan => ({
          title: `${plan.diet_name} (${plan.Diet})`, // Name and linked Diet
          start: plan.Date, // Combine Date and Time into start
          backgroundColor: '#87CEEB', // Set color for diet plans (you can customize)
          //description: plan.DietComponents.map(component => component.name).join(', '), // Map diet components
        }));
        console.log(formattedData);
        setDietPlans(formattedData);
      } catch (error) {
        console.error('Error fetching diet plans:', error);
      }
    };
    fetchDietPlans();
  }, []);

  const handleEventClick = (info) => {
    alert(`Diet Plan: ${info.event.title}\nComponents: ${info.event.extendedProps.description}`);
  };

  return (
    <div className="diet-container">
      <FullCalendar
        ref={calendarRef} 
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth,dayGridYear',
        }}
        events={dietPlans} 
        eventClick={handleEventClick} 
        eventDisplay="block" 
        dayMaxEventRows={3} 
        nowIndicator={true} 
        slotDuration={'00:30:00'} 
        slotLabelInterval={'00:30:00'} 
        views={{
          timeGridDay: {
            buttonText: 'Day',
            slotLabelFormat: {
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
            },
          },
          timeGridWeek: {
            buttonText: 'Week',
          },
          dayGridMonth: {
            buttonText: 'Month',
          },
          dayGridYear: {
            buttonText: 'Year',
          },
        }}
        key={currentView} 
      />
    </div>
  );
};

export default Diet;