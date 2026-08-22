"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Contact = {
  id: number;
  name: string;
  message: string;
  date: string;
  reply: string;
};

export default function Page() {
  const [hasNewContact, setHasNewContact] = useState(false);

  const checkNewContact = () => {
    const contacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const readIds: number[] = JSON.parse(
      localStorage.getItem("teacherReadContactIds") || "[]"
    );

    const unread = contacts.some(
      (contact) => !readIds.includes(contact.id)
    );

    setHasNewContact(unread);
  };

  useEffect(() => {
    checkNewContact();

    const handleFocus = () => {
      checkNewContact();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-orange-50 px-4 py-8">

      <div className="mx-auto w-full max-w-md">

        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          先生ページ
        </h1>

        <div className="space-y-4">

          <a
            href="/teacher/students"
            className="flex justify-center text-center"
          >
            🧑‍🎓 生徒一覧
          </a>

          <a
            href="/students/new"
            className="flex justify-center text-center"
          >
            ➕ 新しい生徒を追加
          </a>

          <a
            href="/teacher/reservation"
            className="flex justify-center text-center"
          >
            📍 予約管理
          </a>

          <Link
            href="/teacher/attendance"
            className="flex justify-center text-center"
          >
            📅 出席管理
          </Link>

          <a
            href="/teacher/tuition"
            className="flex justify-center text-center"
          >
            💰 月謝管理
          </a>

          <a
            href="/teacher/exam"
            className="flex justify-center text-center"
          >
            📚 検定結果
          </a>

          <a
            href="/teacher/notice"
            className="flex justify-center text-center"
          >
            📢 お知らせ
          </a>

          {/* お問い合わせ */}
          <Link
            href="/teacher/contact"
            className="flex items-center justify-center"
          >
            📩 お問い合わせ

            {hasNewContact && (
              <span className="ml-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                新着
              </span>
            )}
          </Link>

          <div className="mt-8 text-center">

            <Link
              href="/"
              className="inline-block rounded-xl border border-orange-500 bg-white px-5 py-3 font-bold text-orange-500 shadow-md"
            >
              ↩︎ ログイン画面へ戻る
            </Link>

          </div>

        </div>
      </div>

    </main>
  );
}