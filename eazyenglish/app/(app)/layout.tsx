"use client";

import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#58cc02] rounded-xl flex items-center justify-center">
              <span className="text-lg">🦁</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              EazyEnglish
            </h1>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
