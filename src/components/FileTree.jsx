/* eslint-disable react/prop-types */
import { ChevronRightIcon, FileIcon, KebabHorizontalIcon } from "@primer/octicons-react";
import { useState, useEffect, useRef } from "react";

function FileTree({ fileTree, handleActiveEditorTabs, handleAddFile, handleAddFolder, handleDelete, handleRename }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreating, setIsCreating] = useState({
    isFolder: false,
    showInput: false,
    folderId: null,
  });
  const [isRenaming, setIsRenaming] = useState({
    showInput: false,
    name: "",
    newName: "",
    id: null,
  });
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const handleRenameSubmit = () => {
    if (isRenaming.id && isRenaming.newName && isRenaming.name !== isRenaming.newName && isRenaming.newName.trim() !== "") {
      handleRename(isRenaming.id, isRenaming.newName);
    }
    setIsRenaming({
      showInput: false,
      name: "",
      newName: "",
      id: null,
    });
  };

  useEffect(() => {
    if (isRenaming.showInput && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming.showInput]);

  const handleKebabClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");

    if (name.trim() === "") return;

    if (isCreating.isFolder) {
      handleAddFolder(isCreating.folderId, name);
    } else {
      handleAddFile(isCreating.folderId, name);
    }

    e.target.reset();
    setIsCreating({ ...isCreating, showInput: false });
  };

  const handleDropdownItemClick = (action, fileTreeId, fileTreeName) => {
    switch (action) {
      case "newFile":
        setIsExpanded(true);
        setIsCreating({ isFolder: false, showInput: true, folderId: fileTreeId });
        break;
      case "newFolder":
        setIsExpanded(true);
        setIsCreating({ isFolder: true, showInput: true, folderId: fileTreeId });
        break;
      case "rename":
        setIsRenaming({ showInput: true, id: fileTreeId, name: fileTreeName });
        break;
      case "delete":
        handleDelete(fileTreeId);
        break;
      default:
        break;
    }
  };

  if (fileTree.type === "folder") {
    return (
      <>
        <div
          onMouseOver={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
          className="relative text-xs flex select-none cursor-pointer items-center justify-between gap-6 py-1 px-2 pr-1 text-vsdark-5 rounded hover:bg-vsdark-4/20 hover:text-vsdark-6"
        >
          <div className="flex items-center gap-1.5 flex-1" onClick={() => setIsExpanded(!isExpanded)}>
            <span className={`${isExpanded ? "rotate-90" : ""} flex items-center`}>
              <ChevronRightIcon size={12} />
            </span>
            <span className="-mt-[0.5px]">
              {isRenaming.showInput && isRenaming.id === fileTree.id ? (
                <input
                  ref={inputRef}
                  className="w-full h-full border-0 bg-black outline-0 px-0 py-1"
                  defaultValue={fileTree.name}
                  onChange={(e) => setIsRenaming({ ...isRenaming, newName: e.target.value })}
                  onBlur={() => {
                    handleRenameSubmit();
                    setIsRenaming({ showInput: false, id: null });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRenameSubmit();
                    }
                  }}
                />
              ) : (
                fileTree.name
              )}
            </span>
          </div>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={handleKebabClick}
              className={`p-1 rounded flex items-center justify-center hover:bg-vsdark-4/50 hover:text-vsdark-6 focus:bg-vsdark-4/50 focus:text-vsdark-6 ${
                showOptions || isDropdownOpen ? "visible" : "invisible"
              }`}
            >
              <KebabHorizontalIcon size={10} />
            </button>
            <DropdownMenu
              isOpen={isDropdownOpen}
              fileTreeId={fileTree.id}
              fileTreeName={fileTree.name}
              onClose={handleDropdownClose}
              type="folder"
              onItemClick={handleDropdownItemClick}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="pl-2">
            {isCreating.showInput && (
              <form onSubmit={handleSubmission} className="flex items-center w-full gap-1.5">
                <span className="flex items-center justify-center text-vsdark-5">
                  {isCreating.isFolder ? <ChevronRightIcon size={12} /> : <FileIcon size={12} />}
                </span>
                <input
                  onBlur={() => setIsCreating({ ...isCreating, showInput: false })}
                  autoFocus
                  type="text"
                  name="name"
                  className="text-xs outline-none ring-1 ring-vsdark-3 ring-inset w-full py-1 px-2 rounded bg-black text-vsdark-6 focus:ring-blue-400"
                />
              </form>
            )}
            {fileTree.children?.map((child) => (
              <FileTree
                key={child.id}
                handleAddFile={handleAddFile}
                handleAddFolder={handleAddFolder}
                fileTree={child}
                handleRename={handleRename}
                handleActiveEditorTabs={handleActiveEditorTabs}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div
      onClick={() => handleActiveEditorTabs(fileTree.id, fileTree.name, fileTree.data)}
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      className="relative text-xs flex items-center justify-between select-none cursor-pointer py-1 px-2 pr-1 text-vsdark-5 rounded hover:bg-vsdark-4/20 hover:text-vsdark-6"
    >
      <div className="flex items-center gap-1.5 flex-1">
        <FileIcon size={12} />
        <span className="-mt-[0.5px]">
          {isRenaming.showInput && isRenaming.id === fileTree.id ? (
            <input
              ref={inputRef}
              className="w-full h-full border-0 bg-black outline-0 px-0 py-1"
              defaultValue={fileTree.name}
              onChange={(e) => setIsRenaming({ ...isRenaming, newName: e.target.value })}
              onBlur={() => {
                handleRenameSubmit();
                setIsRenaming({ showInput: false, id: null });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit();
                }
              }}
            />
          ) : (
            fileTree.name
          )}
        </span>
      </div>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={handleKebabClick}
          className={`p-1 rounded flex items-center justify-center hover:bg-vsdark-4/50 hover:text-vsdark-6 focus:bg-vsdark-4/50 focus:text-vsdark-6 ${
            showOptions || isDropdownOpen ? "visible" : "invisible"
          }`}
        >
          <KebabHorizontalIcon size={10} />
        </button>
        <DropdownMenu
          isOpen={isDropdownOpen}
          fileTreeId={fileTree.id}
          fileTreeName={fileTree.name}
          onClose={handleDropdownClose}
          type="file"
          onItemClick={handleDropdownItemClick}
        />
      </div>
    </div>
  );
}

function DropdownMenu({ isOpen, onClose, type, onItemClick, fileTreeId, fileTreeName }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleClick = (action) => (e) => {
    e.stopPropagation();
    onItemClick(action, fileTreeId, fileTreeName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="absolute -right-1 top-7 shadow-xl min-w-48 bg-vsdark-3 backdrop-blur-3xl z-10 rounded">
      {type === "folder" && (
        <div className="flex flex-col p-1.5 gap-1">
          <button
            onClick={handleClick("newFile")}
            className="w-full text-left px-3 py-1 text-vsdark-5 hover:bg-vsdark-4/30 hover:text-vsdark-6 rounded text-xs"
          >
            New File...
          </button>
          <button
            onClick={handleClick("newFolder")}
            className="w-full text-left px-3 py-1 text-vsdark-5 hover:bg-vsdark-4/30 hover:text-vsdark-6 rounded text-xs"
          >
            New Folder...
          </button>
        </div>
      )}

      {type === "folder" && <div className="border-t border-vsdark-4/30 mt-1" />}

      <div className="flex flex-col p-1.5 gap-1">
        <button
          onClick={handleClick("rename")}
          className="w-full text-left px-3 py-1 text-vsdark-5 hover:bg-vsdark-4/30 hover:text-vsdark-6 rounded text-xs"
        >
          Rename...
        </button>
        <button
          onClick={handleClick("delete")}
          className="w-full text-left px-3 py-1 text-vsdark-5 hover:bg-vsdark-4/30 hover:text-vsdark-6 rounded text-xs"
        >
          Delete {type === "folder" ? "Folder" : "File"}
        </button>
      </div>
    </div>
  );
}

export default FileTree;
