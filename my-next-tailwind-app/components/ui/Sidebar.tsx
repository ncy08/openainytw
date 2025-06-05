import * as React from "react";

export function Sidebar({
  className = "",
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("light");
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  }, [isDark]);

  return (
    <aside
      className={`h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col gap-6 p-6 ${className}`}
    >
      {/* OpenAI-style logo area */}
      <div className="flex items-center gap-3 pt-2">
        <div className="w-8 h-8 bg-ring rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm" />
        </div>
        <span className="text-lg font-medium text-sidebar-foreground tracking-tight">
          OpenAI Voice
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <a
          href="/voice-agent"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors font-medium"
        >
          <div className="w-5 h-5 bg-ring rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
          </div>
          Voice to Image
        </a>

        <a
          href="/analytics"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors font-medium"
        >
          <div className="w-5 h-5 bg-ring rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
          </div>
          Analytics
        </a>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme Toggle */}
      <div className="border-t border-sidebar-border pt-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors font-medium w-full"
        >
          <div className="w-5 h-5 bg-ring rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
          </div>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Footer content */}
      {children}
    </aside>
  );
}
