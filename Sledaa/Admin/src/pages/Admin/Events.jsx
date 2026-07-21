import React, { useState, useEffect } from 'react';
import CommonPage from '../../components/common/Admin/CommonPage';

const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSave = async (formData, editId) => {
    const token = localStorage.getItem('jwt_token');
    const url = editId ? `http://localhost:8081/api/events/${editId}` : 'http://localhost:8081/api/events';
    const method = editId ? 'PUT' : 'POST';

    console.log('[handleSave] token:', token ? 'found' : 'MISSING - NOT LOGGED IN!');
    console.log('[handleSave] url:', url, '| method:', method);

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    console.log('[handleSave] response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[handleSave] backend error:', errorText);
      throw new Error(errorText || 'Failed to save event');
    }

    fetchEvents();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`http://localhost:8081/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchEvents();
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <CommonPage
      title="EVENTS PAGE"
      buttonText="Add New Event"
      data={events}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
};

export default Events;
