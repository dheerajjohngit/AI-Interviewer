import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Results from "./pages/Results";
import History from "./pages/History";

import {
  loadInterviewHistory,
  saveInterviewHistory,
  deleteInterviewHistory,
  clearInterviewHistory,
} from "./services/history";

function App() {
  const [currentPage, setCurrentPage] =
    useState("dashboard");

  const [interviewConfig, setInterviewConfig] =
    useState(null);

  const [interviewResult, setInterviewResult] =
    useState(null);

  const [interviewHistory, setInterviewHistory] =
    useState(() => loadInterviewHistory());

  const handleStartInterview = (config) => {
    setInterviewConfig(config);
    setInterviewResult(null);
    setCurrentPage("interview");
  };

  const handleFinishInterview = (result) => {
    console.log("Interview completed:", result);

    const updatedHistory =
      saveInterviewHistory(result);

    setInterviewHistory(updatedHistory);

    setInterviewResult(result);

    setCurrentPage("results");
  };

  const handleExitInterview = () => {
    setCurrentPage("dashboard");
  };

  const handleViewHistory = (historyItem) => {
    setInterviewResult(historyItem);
    setCurrentPage("results");
  };

  const handleDeleteHistory = (id) => {
    const updatedHistory =
      deleteInterviewHistory(id);

    setInterviewHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    const updatedHistory =
      clearInterviewHistory();

    setInterviewHistory(updatedHistory);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "setup":
        return (
          <InterviewSetup
            onBack={() =>
              setCurrentPage("dashboard")
            }
            onStart={handleStartInterview}
          />
        );

      case "interview":
        return (
          <Interview
            config={interviewConfig}
            onExit={handleExitInterview}
            onFinish={handleFinishInterview}
          />
        );

      case "results":
        return (
          <Results
            result={interviewResult}
            onDashboard={() =>
              setCurrentPage("dashboard")
            }
          />
        );

      case "history":
        return (
          <History
            history={interviewHistory}
            onViewResult={handleViewHistory}
            onDelete={handleDeleteHistory}
            onClear={handleClearHistory}
            onNewInterview={() =>
              setCurrentPage("setup")
            }
          />
        );

      case "dashboard":
      default:
        return (
          <Dashboard
            history={interviewHistory}
            onNewInterview={() =>
              setCurrentPage("setup")
            }
            onViewHistory={handleViewHistory}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#08090c] text-white">
      {currentPage !== "interview" && (
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      )}

      <div className="min-w-0 flex-1">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;