const HISTORY_STORAGE_KEY = "ai_interviewer_history";

export function loadInterviewHistory() {
  try {
    const storedHistory =
      localStorage.getItem(HISTORY_STORAGE_KEY);

    if (!storedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(storedHistory);

    if (!Array.isArray(parsedHistory)) {
      return [];
    }

    return parsedHistory;
  } catch (error) {
    console.error(
      "Failed to load interview history:",
      error
    );

    return [];
  }
}

export function saveInterviewHistory(result) {
  try {
    const history = loadInterviewHistory();

    const historyEntry = {
      ...result,
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
      completedAt: new Date().toISOString(),
    };

    const updatedHistory = [
      historyEntry,
      ...history,
    ].slice(0, 50);

    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );

    return updatedHistory;
  } catch (error) {
    console.error(
      "Failed to save interview history:",
      error
    );

    return loadInterviewHistory();
  }
}

export function deleteInterviewHistory(id) {
  try {
    const history = loadInterviewHistory();

    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );

    return updatedHistory;
  } catch (error) {
    console.error(
      "Failed to delete interview history:",
      error
    );

    return loadInterviewHistory();
  }
}

export function clearInterviewHistory() {
  try {
    localStorage.removeItem(
      HISTORY_STORAGE_KEY
    );

    return [];
  } catch (error) {
    console.error(
      "Failed to clear interview history:",
      error
    );

    return loadInterviewHistory();
  }
}