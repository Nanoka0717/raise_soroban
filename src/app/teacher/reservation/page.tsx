"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ReservationChange = {
  id: number;
  name: string;
  grade: string;
  changeFrom: string;
  changeTo: string;
  time: string;
  read: boolean;
};

export default function Page() {
  const [hasNewReservation, setHasNewReservation] =
    useState(false);

  useEffect(() => {
    const checkNewReservation = () => {
      const savedChanges: ReservationChange[] =
        JSON.parse(
          localStorage.getItem("reservationChanges") || "[]"
        );

      const unread = savedChanges.some(
        (change) => change.read === false
      );

      setHasNewReservation(unread);
    };

    // 最初に確認
    checkNewReservation();

    // ページに戻ってきたときに確認
    const handleFocus = () => {
      checkNewReservation();
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

          {/* 生徒一覧 */}
          <a
            href="/teacher/students"
            className="flex justify-center text-center"
          >
            🧑‍🎓 生徒一覧
          </a>

          {/* 新しい生徒を追加 */}
          <a
            href="/students/new"
            className="flex justify-center text-center"
          >
            ➕ 新しい生徒を追加
          </a>

          {/* 予約管理 */}
          <Link
            href="/teacher/reservation"
            className="flex items-center justify-center gap-3 text-center"
          >
            <span>
              📍 予約管理
            </span>

            {hasNewReservation && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                新着
              </span>
            )}
          </Link>

          {/* 出席管理 */}
          <Link
            href="/teacher/attendance"
            className="flex justify-center text-center"
          >
            📅 出席管理
          </Link>

          {/* 月謝管理 */}
          <a
            href="/teacher/tuition"
            className="flex justify-center text-center"
          >
            💰 月謝管理
          </a>

          {/* 検定結果 */}
          <a
            href="/teacher/exam"
            className="flex justify-center text-center"
          >
            📚 検定結果
          </a>

          {/* お知らせ */}
          <a
            href="/teacher/notice"
            className="flex justify-center text-center"
          >
            📢 お知らせ
          </a>

          {/* お問い合わせ */}
          <Link
            href="/teacher/contact"
            className="flex justify-center text-center"
          >
            📩 お問い合わせ
          </Link>

          {/* ログイン画面へ戻る */}
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