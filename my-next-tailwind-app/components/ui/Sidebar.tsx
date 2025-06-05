import * as React from "react";

export function Sidebar({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <aside
      className={`h-screen w-56 bg-black text-white border-black flex flex-col gap-4 p-4 ${className}`}
    >
      <nav className="flex flex-col gap-4 mt-8">
        <a href="/voice-agent" className="font-medium hover:underline text-lg">Voice to Image</a>
        <a href="/analytics" className="font-medium hover:underline text-lg">Analytics</a>
        <span className="font-medium text-lg text-gray-500 cursor-not-allowed opacity-60">Analytics (coming soon)</span>
      </nav>
      <div className="flex-1" />
      {children}
    </aside>
  );
}