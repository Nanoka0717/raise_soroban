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

export default function ParentPage() {
  const [name, setName] = useState("");
  const [hasNotification, setHasNotification] = useState(false);

  const checkNotification = () => {
    const studentName =
      localStorage.getItem("parentStudentName");

    if (studentName) {
      setName(studentName);
    }

    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const myContacts = savedContacts.filter(
      (contact: Contact) =>
        contact.name === studentName
    );

    const readContactIds: number[] = JSON.parse(
      localStorage.getItem("readContactIds") || "[]"
    );

    const unreadReply = myContacts.some(
      (contact: Contact) =>
        contact.reply &&
        contact.reply.trim() !== "" &&
        !readContactIds.includes(contact.id)
    );

    setHasNotification(unreadReply);
  };

  useEffect(() => {
    checkNotification();

    const handlePageShow = () => {
      checkNotification();
    };

    const handleFocus = () => {
      checkNotification();
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <h1 className="text-center text-3xl font-bold text-orange-600 mb-6">
        🧮 Raiseそろばん
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

        <h2 className="text-xl font-bold">
          {name
            ? `${name}さん`
            : "保護者ページ"}
        </h2>

        <p className="mt-2 text-gray-600">
          保護者マイページ
        </p>

      </div>

      <div className="space-y-4">

        <Link href="/students/new/parent/login/parent/notice">
          <div className="bg-white rounded-xl shadow-md p-5">
            📢 お知らせ
          </div>
        </Link>

        <Link href="/students/new/parent/login/parent/reservation/confirm">
          <div className="bg-white rounded-xl shadow-md p-5">
            📅 予約内容の確認
          </div>
        </Link>

        <Link href="/students/new/parent/login/parent/tuition">
          <div className="bg-white rounded-xl shadow-md p-5">
            💰 月謝確認
          </div>
        </Link>

        <Link href="/students/new/parent/login/parent/exam">
          <div className="bg-white rounded-xl shadow-md p-5">
            🏆 検定結果
          </div>
        </Link>

        {/* お問い合わせ */}
        <Link href="/students/new/parent/login/parent/contact">
          <div className="relative bg-white rounded-xl shadow-md p-5">

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