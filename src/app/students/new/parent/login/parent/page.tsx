"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ParentPage() {
  const [name, setName] = useState("");
  const [hasNotification, setHasNotification] = useState(false);

  const checkNotification = () => {
    const studentName =
      localStorage.getItem("parentStudentName") || "";

    setName(studentName);

    const unreadIds: number[] = JSON.parse(
      localStorage.getItem("parentUnreadContactIds") || "[]"
    );

    setHasNotification(unreadIds.length > 0);
  };

  useEffect(() => {
    checkNotification();

    const handleFocus = () => {
      checkNotification();
    };

    const handlePageShow = () => {
      checkNotification();
    };

    const handleStorage = () => {
      checkNotification();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <h1 className="mb-6 text-center text-3xl font-bold text-orange-600">
        🧮 Raiseそろばん
      </h1>

      <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">

        <h2 className="text-xl font-bold">
          {name ? `${name}さん` : "保護者ページ"}
        </h2>

        <p className="mt-2 text-gray-600">
          保護者マイページ
        </p>

      </div>

      <div className="space-y-4">

        <Link href="/students/new/parent/login/parent/notice">
          <div className="rounded-xl bg-white p-5 shadow-md">
            📢 お知らせ
          </div>
        </Link>

        <Link href="/students/new/parent/login/parent/reservation/confirm">
          <div className="rounded-xl bg-white p-5 shadow-md">
            📅 予約内容の確認
          </div>
        </Link>

        <Link href="/students/new/parent/login/parent/tuition">
          <div className="rounded-xl bg-white p-5 shadow-md">
            💰 月謝確認
          </div>
        </Link>

        <Link href="/students/new/parent/login/parent/exam">
          <div className="rounded-xl bg-white p-5 shadow-md">
            🏆 検定結果
          </div>
        </Link>

        {/* お問い合わせ */}
        <Link href="/students/new/parent/login/parent/contact">
          <div className="relative rounded-xl bg-white p-5 shadow-md">

            ✉️ お問い合わせ

            {hasNotification && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                新着
              </span>
            )}

          </div>
        </Link>

      </div>

      <div className="mt-8">

        <Link
          href="/"
          className="rounded-xl border border-orange-500 bg-white px-5 py-3 font-bold text-orange-500 shadow-md"
        >
          ↩︎ ログイン画面へ戻る
        </Link>

      </div>

    </main>
  );
}