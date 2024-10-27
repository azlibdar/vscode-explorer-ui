import { useState } from "react";
import ActivityBar from "./components/ActivityBar";
import Editor from "./components/Editor";
import Explorer from "./components/Explorer";
import Header from "./components/Header";

function App() {
  const [activeEditorTabs, setActiveEditorTabs] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState(null);

  const handleCloseTab = (tabId) => {
    const updatedActiveEditorTabs = activeEditorTabs.filter((tab) => tab.id !== tabId);

    setActiveEditorTabs(updatedActiveEditorTabs);

    if (activeEditorTabs.length !== 1) {
      setSelectedTabId(updatedActiveEditorTabs.at(-1).id);
    } else {
      setSelectedTabId(null);
    }
  };

  const handleActiveEditorTabs = (tabId, tabName, tabData) => {
    const newTab = {
      id: tabId,
      name: tabName,
      data: tabData,
    };

    const isAlreadyOpened = activeEditorTabs.some((activeTab) => activeTab.id === tabId);

    if (!isAlreadyOpened) {
      setActiveEditorTabs([...activeEditorTabs, newTab]);
      setSelectedTabId(tabId);
    } else {
      setSelectedTabId(tabId);
    }
  };
  return (
    <main className="w-full flex flex-col h-dvh overflow-hidden">
      <Header />
      <section className="w-full h-full flex max-h-full">
        <ActivityBar />
        <Explorer
          handleActiveEditorTabs={handleActiveEditorTabs}
          activeEditorTabs={activeEditorTabs}
          setActiveEditorTabs={setActiveEditorTabs}
          setSelectedTabId={setSelectedTabId}
        />
        <Editor
          activeEditorTabs={activeEditorTabs}
          handleCloseTab={handleCloseTab}
          selectedTabId={selectedTabId}
          setSelectedTabId={setSelectedTabId}
        />
      </section>
    </main>
  );
}

export default App;
