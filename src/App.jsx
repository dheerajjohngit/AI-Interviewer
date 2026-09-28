import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Results from "./pages/Results";

function App() {
  const [currentPage, setCurrentPage] =
    useState("dashboard");

  const [interviewConfig, setInterviewConfig] =
    useState(null);

  const [interviewResult, setInterviewResult] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | Start interview
  |--------------------------------------------------------------------------
  */

  const handleStartInterview = (config) => {
    setInterviewConfig(config);
    setInterviewResult(null);
    setCurrentPage("interview");
  };

  /*
  |--------------------------------------------------------------------------
  | Finish interview
  |--------------------------------------------------------------------------
  */

  const handleFinishInterview = (result) => {
    console.log("Interview completed:", result);

    setInterviewResult(result);

    setCurrentPage("results");
  };

  /*
  |--------------------------------------------------------------------------
  | Exit interview
  |--------------------------------------------------------------------------
  */

  const handleExitInterview = () => {
    setCurrentPage("dashboard");
  };

  /*
  |--------------------------------------------------------------------------
  | Render page
  |--------------------------------------------------------------------------
  */

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

      case "dashboard":
      default:
        return (
          <Dashboard
            onNewInterview={() =>
              setCurrentPage("setup")
            }
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