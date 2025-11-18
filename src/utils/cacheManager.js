const CACHE_KEY = 'projectsCache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

export const getCachedData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    
    if (!cached) {
      console.log('📭 No cached data found');
      return null;
    }
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - timestamp > CACHE_DURATION) {
      console.log('⏰ Cache expired');
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    console.log('✅ Using cached data');
    return data;
    
  } catch (error) {
    console.error('❌ Cache read error:', error);
    return null;
  }
};

export const setCachedData = (data) => {
  try {
    const cacheObject = {
      data,
      timestamp: Date.now()
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
    console.log('💾 Data cached successfully');
    
  } catch (error) {
    console.error('❌ Cache write error:', error);
  }
};

export const clearCache = () => {
  localStorage.removeItem(CACHE_KEY);
  console.log('🗑️ Cache cleared');
};