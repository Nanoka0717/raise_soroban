"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ParentNoticePage() {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const savedNotices = JSON.parse(
      localStorage.getItem("notices") || "[]"
    );

    setNotices(savedNotices);
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
        📢 お知らせ
      </h1>

      <div className="space-y-4">

        {notices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            お知らせはありません
          </div>
        ) : (
          notices.map((notice, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {notice.title}
              </h2>

              <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                {notice.content}
              </p>
            </div>
          ))
        )}

      </div>

      {/* トップページに戻るボタン */}
      <div className="mt-8">
        <Link
          href="/students/new/parent/login/parent"
          className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
        >
          ↩︎ トップページに戻る
        </Link>
      </div>

    </main>
  );
}
