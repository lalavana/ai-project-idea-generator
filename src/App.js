import React, { useEffect, useState } from 'react';
import { fetchAllProjects, saveProjectsToFile } from './utils/projectDataManager';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchAllProjects();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleDownload = () => {
    if (data) {
      saveProjectsToFile(data);
    }
  };

  if (loading) {
    return (
      <div className="App">
        <h1>Loading Project Ideas...</h1>
        <p>Fetching data from multiple sources ⏳</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h1>Error Loading Data</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1> Project Idea Generator</h1>
      
      <div className="stats-container">
        <h2>Data Collection Success!</h2>
        <p>Total Projects: <strong>{data.stats.total}</strong></p>
        
        <h3>By Source:</h3>
        <ul>
          <li>GitHub Projects: {data.stats.bySource.github}</li>
          <li>Public API Projects: {data.stats.bySource.publicAPIs}</li>
        </ul>
        
        <h3>By Difficulty:</h3>
        <ul>
          <li>Beginner: {data.stats.byDifficulty.beginner}</li>
          <li>Intermediate: {data.stats.byDifficulty.intermediate}</li>
          <li>Advanced: {data.stats.byDifficulty.advanced}</li>
        </ul>
        
        <button onClick={handleDownload}>
          💾 Download Project Data
        </button>
        
        <h3>Sample Projects:</h3>
        <div className="sample-projects">
          {data.projects.slice(0, 5).map(project => (
            <div key={project.id} className="project-card">
              <h4>{project.title}</h4>
              <p>{project.description.substring(0, 100)}...</p>
              <p><strong>Difficulty:</strong> {project.difficulty}</p>
              <p><strong>Tech:</strong> {project.techStack.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;