/* eslint-disable react/prop-types */
import { DashIcon, ScreenFullIcon, SearchIcon, XIcon } from "@primer/octicons-react";
import vsCodeLogo from "../assets/vscode-logo.svg";
import headerLinks from "../constants";

function Header() {
  const handleToggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <header id="header" className="grid grid-cols-3 gap-6 border-b border-vsdark-3">
      <div className="flex items-center gap-2 px-2">
        <img src={vsCodeLogo} alt="vs-code-logo" className="size-4" />
        <div className="flex items-center text-xs">
          {headerLinks.map((item) => (
            <button className="py-1 text-vsdark-4 px-2.5 rounded hover:bg-vsdark-3 hover:text-vsdark-5" key={item}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex cursor-pointer items-center rounded-md w-full text-xs bg-black py-1 px-2 justify-center gap-1 text-vsdark-4">
          <SearchIcon size={12} />
          <span>file-explorer</span>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <SystemButton>
          <DashIcon size={20} />
        </SystemButton>
        <SystemButton onClick={handleToggleFullScreen}>
          <ScreenFullIcon size={12} />
        </SystemButton>
        <SystemButton close>
          <XIcon size={20} />
        </SystemButton>
      </div>
    </header>
  );
}

function SystemButton({ children, close, onClick }) {
  const closeClass = close ? "hover:bg-rose-500 hover:text-white" : "hover:bg-vsdark-3";
  return (
    <button
      onClick={onClick}
      className={`${closeClass} min-w-11 cursor-default min-h-9 flex justify-center items-center outline-none text-vsdark-4`}
    >
      {children}
    </button>
  );
}

export default Header;
