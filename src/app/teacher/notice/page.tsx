"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeacherNoticePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const savedNotices = JSON.parse(
      localStorage.getItem("notices") || "[]"
    );

    setNotices(savedNotices);
  }, []);

  const savedNotice = () => {
    if (!title.trim() || !content.trim()) {
      alert("タイトルと内容を入力してください。");
      return;
    }

    const newNotice = {
      title,
      content,
      date: new Date().toLocaleDateString("ja-JP"),
    };

    const updatedNotices = [newNotice, ...notices];

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

        <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
          📢 お知らせ登録
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            placeholder="お知らせ内容を入力してください"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-3 h-40 mb-4"
          />

          <button
            onClick={savedNotice}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
          >
            登録する
          </button>

        </div>

        <h2 className="text-2xl font-bold mb-4">
          登録済みのお知らせ
        </h2>

        <div className="space-y-4">

          {notices.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              お知らせはありません
            </div>
          ) : (
            notices.map((notice, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-5"
              >

                <p className="text-sm text-gray-500">
                  {notice.date}
                </p>

                <h3 className="text-lg font-bold mt-1">
                  {notice.title}
                </h3>

                <p className="mt-2 whitespace-pre-wrap">
                  {notice.content}
                </p>

              </div>
            ))
          )}

        </div>

        {/* 先生ページに戻るボタン */}
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
