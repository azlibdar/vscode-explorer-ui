/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FileTree from "./FileTree";
import filesData from "../data";
import useTree from "../hooks/useTree";

function Explorer({ handleActiveEditorTabs, setActiveEditorTabs, activeEditorTabs, setSelectedTabId }) {
  const defaultFolder = {
    id: Date.now(),
    type: "folder",
    name: "welcome",
    children: [],
  };
  const [fileTree, setFileTree] = useState(filesData || defaultFolder);
  const { insertNode, deleteNode, updateNode } = useTree();

  useEffect(() => {
    if (!fileTree || (Array.isArray(fileTree) && fileTree.length === 0)) {
      const newFolder = {
        id: Date.now(),
        type: "folder",
        name: "welcome",
        children: [],
      };
      setFileTree(newFolder);
    }
  }, [fileTree]);

  const handleRename = (id, newName) => {
    setFileTree(updateNode(fileTree, id, newName));
    setActiveEditorTabs(activeEditorTabs.map((tab) => (tab.id === id ? { ...tab, name: newName } : tab)));
  };

  const handleDelete = (id) => {
    const updatedTree = deleteNode(fileTree, id);
    setFileTree(updatedTree || defaultFolder);
    setActiveEditorTabs(activeEditorTabs.filter((tab) => tab.id !== id));
  };

  const handleAddFile = (parentId, fileName) => {
    const newFile = {
      id: Date.now(),
      type: "file",
      name: fileName,
      data: "// Start typing your code here",
    };

    setFileTree(insertNode(fileTree, parentId, newFile));
    setActiveEditorTabs([...activeEditorTabs, { id: newFile.id, name: newFile.name, data: newFile.data }]);
    setSelectedTabId(newFile.id);
  };

  const handleAddFolder = (parentId, folderName) => {
    const newFolder = {
      id: Date.now(),
      type: "folder",
      name: folderName,
      children: [],
    };

    setFileTree(insertNode(fileTree, parentId, newFolder));
  };

  return (
    <>
      <div className="min-w-80 border-r border-r-vsdark-3 flex flex-col">
        <div className="px-4 py-2 border-b border-b-vsdark-3">
          <h3 className="text-xxs uppercase text-vsdark-4">Explorer</h3>
        </div>
        <div className="p-2 overflow-auto h-full">
          <FileTree
            handleDelete={handleDelete}
            handleAddFile={handleAddFile}
            handleAddFolder={handleAddFolder}
            handleRename={handleRename}
            fileTree={fileTree}
            handleCloseTab
            handleActiveEditorTabs={handleActiveEditorTabs}
          />
        </div>
      </div>
    </>
  );
}

export default Explorer;
