import React, { useState, useEffect } from 'react';
import CommonPage from '../../components/common/Admin/CommonPage';

const News = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error("Failed to fetch news", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSave = async (formData, editId) => {
    const token = localStorage.getItem('jwt_token');
    const url = editId ? `http://localhost:8081/api/news/${editId}` : 'http://localhost:8081/api/news';
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
      throw new Error(errorText || 'Failed to save news');
    }

    fetchNews();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`http://localhost:8081/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchNews();
      } else {
        alert("Failed to delete news");
      }
    } catch (error) {
      console.error("Error deleting news", error);
    }
  };

  return (
    <CommonPage
      title="NEWS PAGE"
      buttonText="Add New News"
      data={news}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
};

export default News;
