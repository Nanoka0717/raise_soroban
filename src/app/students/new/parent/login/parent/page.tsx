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

  useEffect(() => {
    // ログインしているお子様の名前
    const studentName =
      localStorage.getItem("parentStudentName");

    if (studentName) {
      setName(studentName);
    }

    // お問い合わせを取得
    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    // 自分のお問い合わせだけ取得
    const myContacts = savedContacts.filter(
      (contact: Contact) =>
        contact.name === studentName
    );

    // 先生から返信があるか確認
    const replyExists = myContacts.some(
      (contact: Contact) =>
        contact.reply && contact.reply.trim() !== ""
    );

    setHasNotification(replyExists);
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

        {/* お知らせ */}
        <Link href="/students/new/parent/login/parent/notice">
          <div className="bg-white rounded-xl shadow-md p-5">
            📢 お知らせ
          </div>
        </Link>

        {/* 予約内容の確認 */}
        <Link href="/students/new/parent/login/parent/reservation/confirm">
          <div className="bg-white rounded-xl shadow-md p-5">
            📅 予約内容の確認
          </div>
        </Link>

        {/* 月謝確認 */}
        <Link href="/students/new/parent/login/parent/tuition">
          <div className="bg-white rounded-xl shadow-md p-5">
            💰 月謝確認
          </div>
        </Link>

        {/* 検定結果 */}
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
      {/* ログイン画面へ戻るボタン　*/}
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