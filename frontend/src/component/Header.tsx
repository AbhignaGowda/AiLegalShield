"use client";

interface HeaderProps {
  activeTab: string;
  setIsOpen: (open: boolean) => void;
}

const Header = ({ activeTab, setIsOpen }: HeaderProps) => {
  const getPageTitle = (tab: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      analyze: "Contract Analyzer",
      history: "Contract History",
      templates: "Contract Templates",
      settings: "Settings",
    };
    return titles[tab] || "Dashboard";
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">{getPageTitle(activeTab)}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick Actions */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM13 9h7l-7 7V9z" />
            </svg>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
