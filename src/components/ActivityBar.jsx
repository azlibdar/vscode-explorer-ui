/* eslint-disable react/prop-types */
import { AppsIcon, BugIcon, CopilotIcon, GearIcon, GitBranchIcon, PackageIcon, PersonIcon, SearchIcon } from "@primer/octicons-react";

function ActivityBar() {
  return (
    <div className="min-w-12 max-w-12 h-full max-h-full border-r border-vsdark-3 flex flex-col justify-between">
      <div>
        <ActivityBarButton active>
          <AppsIcon size={20} />
        </ActivityBarButton>
        <ActivityBarButton>
          <SearchIcon size={20} />
        </ActivityBarButton>
        <ActivityBarButton>
          <BugIcon size={20} />
        </ActivityBarButton>
        <ActivityBarButton>
          <GitBranchIcon size={20} />
        </ActivityBarButton>
        <ActivityBarButton>
          <PackageIcon size={20} />
        </ActivityBarButton>
        <ActivityBarButton>
          <CopilotIcon size={20} />
        </ActivityBarButton>
      </div>
      <div>
        <ActivityBarButton>
          <PersonIcon size={20} />
        </ActivityBarButton>
        <ActivityBarButton>
          <GearIcon size={20} />
        </ActivityBarButton>
      </div>
    </div>
  );
}

function ActivityBarButton({ children, active }) {
  const activeClass = active ? "text-vsdark-6 border-l-2 border-vsdark-4" : "text-vsdark-4";
  return (
    <button
      className={`${activeClass} w-full transition min-h-12 hover:text-vsdark-6 max-h-12 flex cursor-pointer justify-center items-center outline-none`}
    >
      {children}
    </button>
  );
}

export default ActivityBar;
