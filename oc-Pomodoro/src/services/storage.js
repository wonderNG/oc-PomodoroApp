const STORAGE_KEY = "pomodoro_stats_v1";

const DEFAULT_STATS = {
  totalStarted: 0,
  totalCompleted: 0,
  totalFocusMinutes: 0, // Needed to calculate average duration
};



export function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? { ...DEFAULT_STATS, ...JSON.parse(data) } : DEFAULT_STATS;
  } catch (error) {
    console.error("Failed to load stats from localStorage:", error);
    return DEFAULT_STATS;
  }
}



export function saveData(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Failed to save stats to localStorage:", error);
  }
}



export function recordSessionStart() {
  const current = loadData();
  const updated = {
    ...current,
    totalStarted: current.totalStarted + 1
  };
  saveData(updated);
  return updated;
}



export function recordSessionComplete(durationMinutes) {
  const current = loadData();
  const updated = {
    ...current,
    totalCompleted: current.totalCompleted + 1,
    totalFocusMinutes: current.totalFocusMinutes + durationMinutes,
  };
  saveData(updated);
  return updated;
}