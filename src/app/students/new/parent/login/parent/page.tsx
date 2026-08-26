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

type Notice = {
  id: number;
  title: string;
  message: string;
  date: string;
};

export default function ParentPage() {
  const [name, setName] = useState("");
  const [hasContactNotification, setHasContactNotification] =
    useState(false);

  const [hasNoticeNotification, setHasNoticeNotification] =
    useState(false);

  const checkNotifications = () => {
    const studentName =
      localStorage.getItem("parentStudentName") || "";

    setName(studentName);

    // =========================
    // お問い合わせの新着
    // =========================

    const contacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const readContactIds: number[] = JSON.parse(
      localStorage.getItem("parentReadContactIds") || "[]"
    );

    const unreadReply = contacts.some(
      (contact) =>
        contact.name === studentName &&
        contact.reply &&
        contact.reply.trim() !== "" &&
        !readContactIds.includes(contact.id)
    );

    setHasContactNotification(unreadReply);

    // =========================
    // お知らせの新着
    // =========================

    const notices: Notice[] = JSON.parse(
      localStorage.getItem("notices") || "[]"
    );

    const readNoticeIds: number[] = JSON.parse(
      localStorage.getItem("parentReadNoticeIds") || "[]"
    );

    // 1つでも未読のお知らせがあれば「新着」
    const unreadNotice = notices.some(
      (notice) =>
        !readNoticeIds.includes(notice.id)
    );

    setHasNoticeNotification(unreadNotice);
  };

  useEffect(() => {
    checkNotifications();

    const handleFocus = () => {
      checkNotifications();
    };

    const handlePageShow = () => {
      checkNotifications();
    };

    const handleStorage = () => {
      checkNotifications();
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

        {/* =========================
            お知らせ
        ========================= */}

        <Link
          href="/students/new/parent/login/parent/notice"
          className="block"
        >
          <div className="relative rounded-xl bg-white p-5 shadow-md">

            <span>
              📢 お知らせ
            </span>

            {hasNoticeNotification && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                新着
              </span>
            )}

          </div>
        </Link>

        {/* =========================
            予約内容の確認
        ========================= */}

        <Link
          href="/students/new/parent/login/parent/reservation/confirm"
          className="block"
        >
          <div className="rounded-xl bg-white p-5 shadow-md">
            📅 予約内容の確認
          </div>
        </Link>

        {/* =========================
            月謝確認
        ========================= */}

        <Link
          href="/students/new/parent/login/parent/tuition"
          className="block"
        >
          <div className="rounded-xl bg-white p-5 shadow-md">
            💰 月謝確認
          </div>
        </Link>

        {/* =========================
            検定結果
        ========================= */}

        <Link
          href="/students/new/parent/login/parent/exam"
          className="block"
        >
          <div className="rounded-xl bg-white p-5 shadow-md">
            🏆 検定結果
          </div>
        </Link>

        {/* =========================
            お問い合わせ
        ========================= */}

        <Link
          href="/students/new/parent/login/parent/contact"
          className="block"
        >
          <div className="relative rounded-xl bg-white p-5 shadow-md">

            <span>
              ✉️ お問い合わせ
            </span>

            {hasContactNotification && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                新着
              </span>
            )}

          </div>
        </Link>

      </div>

      {/* ログイン画面へ戻る */}

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