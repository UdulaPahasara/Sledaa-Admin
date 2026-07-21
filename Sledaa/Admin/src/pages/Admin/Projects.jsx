import React, { useState, useEffect } from 'react';
import CommonPage from '../../components/common/Admin/CommonPage';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (formData, editId) => {
    const token = localStorage.getItem('jwt_token');
    const url = editId ? `http://localhost:8081/api/projects/${editId}` : 'http://localhost:8081/api/projects';
    const method = editId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to save project');
    }

    fetchProjects();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`http://localhost:8081/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  return (
    <CommonPage
      title="PROJECTS PAGE"
      buttonText="Add New Project"
      data={projects}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
};

export default Projects;
