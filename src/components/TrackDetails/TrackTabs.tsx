import React, { useEffect, useState } from "react";
import { smoothScrollToId } from "../../utils/smoothScroll";

const tabs = [
  { name: "Overview", id: "overview" },
  { name: "Weekly Tasks", id: "weekly-tasks" },
  { name: "Sessions", id: "sessions" },
  { name: "Resources", id: "resources" },
  { name: "Schedule", id: "schedule" },
];

const TrackTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      let current = "overview";
      let closestTop = -Infinity;

      for (const tab of tabs) {
        const section = document.getElementById(tab.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Find the section whose top is closest to the 200px threshold
          if (rect.top <= 200 && rect.top > closestTop) {
            closestTop = rect.top;
            current = tab.id;
          }
        }
      }
      setActiveTab((prev) => (prev !== current ? current : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // 128px = 64px navbar + ~33px tabs bar + buffer.
    // Matches the scroll-mt-32 (128px) already set on each section in TrackDetailsPage.
    smoothScrollToId(id, 128);
    setActiveTab(id);
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <div className="border-b border-red-200 mt-6 sticky top-16 bg-gray-50 z-40">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => scrollToSection(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${
                activeTab === tab.id
                  ? "border-red-600 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TrackTabs;
