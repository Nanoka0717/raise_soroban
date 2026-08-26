"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Notice = {
  id: number;
  title: string;
  message: string;
  date: string;
};

export default function ParentNoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    // お知らせを取得
    const savedNotices: Notice[] = JSON.parse(
      localStorage.getItem("notices") || "[]"
    );

    setNotices(savedNotices);

    // =========================
    // お知らせを既読にする
    // =========================

    const readNoticeIds = savedNotices.map(
      (notice) => notice.id
    );

    localStorage.setItem(
      "parentReadNoticeIds",
      JSON.stringify(readNoticeIds)
    );

    // 保護者トップに更新を知らせる
    window.dispatchEvent(new Event("storage"));
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        {/* タイトル */}
        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📢 お知らせ
        </h1>

        {/* お知らせがない場合 */}
        {notices.length === 0 ? (

          <div className="rounded-2xl bg-white p-6 text-center shadow-md">

            <p className="text-gray-600">
              現在、お知らせはありません。
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {notices.map((notice) => (

              <div
                key={notice.id}
                className="rounded-2xl bg-white p-5 shadow-md"
              >

                {/* 日付 */}
                <p className="text-sm text-gray-500">
                  {notice.date}
                </p>

                {/* タイトル */}
                <h2 className="mt-2 text-xl font-bold text-orange-600">
                  {notice.title}
                </h2>

                {/* 内容 */}
                <p className="mt-3 whitespace-pre-wrap text-gray-700">
                  {notice.message}
                </p>

              </div>

            ))}

          </div>

        )}

        {/* 保護者ページに戻る */}
        <div className="mt-8">

          <Link
            href="/students/new/parent/login/parent"
            className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
          >
            ↩︎ 保護者ページに戻る
          </Link>

        </div>

      </div>

    </main>
  );
}
