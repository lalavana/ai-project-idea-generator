import { fetchPublicAPIs, fetchGitHubProjects } from './apiFetchers';
import { transformGitHubProject, transformPublicAPI } from './dataTransformers';
import { getCachedData, setCachedData } from './cacheManager';

export const fetchAllProjects = async (forceRefresh = false) => {
 // Try to get cached data first
  if (!forceRefresh) {
    const cached = getCachedData();
    if (cached) {
      return cached;
    }
  } 
  try {
    console.log('Starting to fetch all data sources...');
    
    // Fetch all APIs in parallel
    const [publicAPIs, githubRepos] = await Promise.all([
      fetchPublicAPIs(),
      fetchGitHubProjects()
    ]);
    
    console.log(' Raw data fetched:', {
      publicAPIs: publicAPIs.length,
      githubRepos: githubRepos.length
    });
    
    // Transform data to consistent format
    const transformedGitHubProjects = githubRepos.map(transformGitHubProject);
    const transformedAPIProjects = publicAPIs
      .slice(0, 50) // Limit to 50 API projects
      .map(transformPublicAPI);
    
    // Combine all projects
    const allProjects = [
      ...transformedGitHubProjects,
      ...transformedAPIProjects
    ];
    
    console.log('✅ Total projects generated:', allProjects.length);
    
    const result = {
      projects: allProjects,
      stats: {
        total: allProjects.length,
        bySource: {
          github: transformedGitHubProjects.length,
          publicAPIs: transformedAPIProjects.length
        },
        byDifficulty: calculateDifficultyStats(allProjects)
      },
      lastUpdated: new Date().toISOString()
    };
     // Cache the result for future use
    setCachedData(result);
    console.log('Data cached successfully');
    // Return the result
    return result;
    
  } catch (error) {
    console.error('Error in fetchAllProjects:', error);
    return { 
      projects: [], 
      stats: null,
      error: error.message 
    };
  }
};
// Helper function to calculate difficulty statistics
const calculateDifficultyStats = (projects) => {
  const stats = { beginner: 0, intermediate: 0, advanced: 0 };
  
  projects.forEach(project => {
    stats[project.difficulty] = (stats[project.difficulty] || 0) + 1;
  });
  
  return stats;
};

export const saveProjectsToFile = (data) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'projects-data.json';
  link.click();
  
  console.log('💾 Data saved to file!');
};

