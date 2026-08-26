"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Notice = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function ParentNoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const savedNotices = JSON.parse(
      localStorage.getItem("notices") || "[]"
    );

    // お知らせデータを整える
    const fixedNotices: Notice[] = savedNotices.map(
      (notice: any, index: number) => ({
        id:
          typeof notice.id === "number"
            ? notice.id
            : Date.now() + index,

        title:
          typeof notice.title === "string"
            ? notice.title
            : "",

        content:
          typeof notice.content === "string"
            ? notice.content
            : "",

        date:
          typeof notice.date === "string"
            ? notice.date
            : "",
      })
    );

    setNotices(fixedNotices);

    // ==========================
    // お知らせを既読にする
    // ==========================

    const readNoticeIds: number[] = JSON.parse(
      localStorage.getItem("parentReadNoticeIds") || "[]"
    );

    const allNoticeIds = fixedNotices.map(
      (notice) => notice.id
    );

    const newReadNoticeIds = Array.from(
      new Set([
        ...readNoticeIds,
        ...allNoticeIds,
      ])
    );

    localStorage.setItem(
      "parentReadNoticeIds",
      JSON.stringify(newReadNoticeIds)
    );
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        {/* タイトル */}
        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          📢 お知らせ
        </h1>

        {/* お知らせがない場合 */}
        {notices.length === 0 ? (

          <div className="rounded-2xl bg-white p-6 text-center shadow-md">
            <p className="text-gray-600">
              お知らせはありません。
            </p>
          </div>

        ) : (

          <div className="space-y-5">

            {notices.map((notice) => (

              <div
                key={notice.id}
                className="rounded-2xl bg-white p-6 shadow-md"
              >

                {/* 日付 */}
                <p className="text-sm text-gray-500">
                  {notice.date}
                </p>

                {/* タイトル */}
                <h2 className="mt-3 text-2xl font-bold text-orange-600">
                  {notice.title}
                </h2>

                {/* お知らせ内容 */}
                <div className="mt-4 rounded-xl bg-orange-50 p-4">

                  <p className="whitespace-pre-wrap leading-7 text-gray-800">
                    {notice.content || "お知らせ内容はありません。"}
                  </p>

                </div>

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
