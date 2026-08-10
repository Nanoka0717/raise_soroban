"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-orange-50 p-8">
      <div className="mx-auto max-w-md">

        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          先生ページ
        </h1>

        <div className="space-y-4">

          <a
            href="/teacher/students"
            className="block w-full rounded-xl bg-white p-4 text-lg shadow"
          >
            　　　　　　　　　🧑‍🎓 生徒一覧
          </a>

          <a
            href="/students/new"
            className="block w-full rounded-xl bg-white p-4 text-lg shadow"
          >
            　　　　　　　➕ 新しい生徒を追加
          </a>

          <a
            href="/teacher/reservation"
            className="block w-full rounded-xl bg-white p-4 text-lg shadow"
          >
            　　　　　　　　　📍 予約管理
          </a>

          <Link
            href="/teacher/attendance"
            className="block w-full rounded-xl bg-white p-4 text-lg shadow"
          >
            　　　　　　　　　📅 出席管理
          </Link>

            <a
              href="/teacher/tuition"
              className="block w-full rounded-xl bg-white p-4 text-lg shadow"
            >
              　　　　　　　　　💰 月謝管理
            </a>

          <a
            href="/teacher/exam"
            className="block w-full rounded-xl bg-white p-4 text-lg shadow"
          >
            　　　　　　　　　📚 検定結果
          </a>

          <a
            href="/teacher/notice"
            className="block w-full rounded-xl bg-white p-4 text-lg shadow"
          >
            　　　　　　　　　📢 お知らせ
          </a>

          <Link
            href="/teacher/contact"
            className="block w-full rounded-xl bg-white p-4 text-lg shadow"
          >
           　　　　　　　　 📩 お問い合わせ
          </Link>

        <div className="fixed bottom-6 left-6">
         <Link href="/"
               className="rounded-xl border border-orange-500 bg-white px-5 py-3 front-bold text-orange-500 shadow-md">
                ↩︎ トップページに戻る
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
       
       </div>

      </div>
    </main>
  );
}