import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import '../styles/workout.css'; 
import { WorkoutPlans } from '../axios/auth'; 

const Workout = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [currentView] = useState('timeGridDay');
  const calendarRef = useRef(null); 

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        console.log('Fetching workout plans...');
        const response = await WorkoutPlans(); // Fetch workout plans from Strapi
        console.log('Response:', response.dayMaxEventRows); // Log the response
        const formattedData = response.data.map(plan => ({
          title: `${plan.Title} (${plan.WorkoutType})`,
          start: plan.StartTime,
          backgroundColor: plan.WorkoutType === 'Cardio' ? '#ff6961' : '#77dd77',
          description: plan.Description,
        }));
        console.log(formattedData,"sjkbdbskjdkjbsk")
        setWorkoutPlans(formattedData);
      } catch (error) {
        console.error('Error fetching workout plans:', error); // Log the error
      }
    };
    fetchWorkoutPlans();
  }, []);

  const handleEventClick = (info) => {
    alert(`Workout: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  };

  return (
    <div className="workout-container">
      <FullCalendar
        ref={calendarRef} 
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth,dayGridYear',
        }}
        events={workoutPlans} 
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

export default Workout;