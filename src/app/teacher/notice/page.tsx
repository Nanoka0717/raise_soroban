"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Notice = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function TeacherNoticePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const savedNotices: Notice[] = JSON.parse(
      localStorage.getItem("notices") || "[]"
    );

    setNotices(savedNotices);
  }, []);

  const savedNotice = () => {
    if (!title.trim() || !content.trim()) {
      alert("タイトルと内容を入力してください。");
      return;
    }

    const newNotice: Notice = {
      id: Date.now(),
      title: title,
      content: content,
      date: new Date().toLocaleDateString("ja-JP"),
    };

    const updatedNotices = [
      newNotice,
      ...notices,
    ];

    localStorage.setItem(
      "notices",
      JSON.stringify(updatedNotices)
    );

    setNotices(updatedNotices);

    setTitle("");
    setContent("");

    alert("お知らせを登録しました！");
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-600">
          📢 お知らせ登録
        </h1>

        {/* お知らせ登録 */}

        <div className="mb-6 rounded-xl bg-white p-6 shadow-md">

          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <textarea
            placeholder="お知らせ内容を入力してください"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-4 h-40 w-full rounded-lg border p-3"
          />

          <button
            onClick={savedNotice}
            className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
          >
            登録する
          </button>

        </div>

        {/* 登録済みのお知らせ */}

        <h2 className="mb-4 text-2xl font-bold">
          登録済みのお知らせ
        </h2>

        <div className="space-y-4">

          {notices.length === 0 ? (

            <div className="rounded-xl bg-white p-5 text-center shadow-md">
              お知らせはありません
            </div>

          ) : (

            notices.map((notice) => (

              <div
                key={notice.id}
                className="rounded-xl bg-white p-5 shadow-md"
              >

                <p className="text-sm text-gray-500">
                  {notice.date}
                </p>

                <h3 className="mt-1 text-lg font-bold">
                  {notice.title}
                </h3>

                <p className="mt-2 whitespace-pre-wrap">
                  {notice.content}
                </p>

              </div>

            ))

          )}

        </div>

        {/* 先生ページに戻る */}

        <div className="mt-8">

          <Link
            href="/teacher/home"
            className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
          >
            ↩︎ 先生ページに戻る
          </Link>

        </div>

      </div>

    </main>
  );
}

