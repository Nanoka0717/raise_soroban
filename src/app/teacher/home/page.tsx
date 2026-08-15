"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-orange-50 px-4 py-8">
      <div className="mx-auto w-full max-w-md">

        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          先生ページ
        </h1>

        <div className="space-y-4">

          <a
            href="/teacher/students"
            className="flex text-center justify-center"
          >
            🧑‍🎓 生徒一覧
          </a>

          <a
            href="/students/new"
            className="flex text-center justify-center"
          >
            ➕ 新しい生徒を追加
          </a>

          <a
            href="/teacher/reservation"
            className="flex text-center justify-center"
          >
            📍 予約管理
          </a>

          <Link
            href="/teacher/attendance"
            className="flex text-center justify-center"
          >
            📅 出席管理
          </Link>

          <a
            href="/teacher/tuition"
            className="flex text-center justify-center"
          >
            💰 月謝管理
          </a>

          <a
            href="/teacher/exam"
            className="flex text-center justify-center"
          >
            📚 検定結果
          </a>

          <a
            href="/teacher/notice"
            className="flex text-center justify-center"
          >
            📢 お知らせ
          </a>

          <Link
            href="/teacher/contact"
            className="flex text-center justify-center"
          >
            📩 お問い合わせ
          </Link>

          {/* ログイン画面へ戻るボタン */}
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