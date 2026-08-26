"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Notice = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function ParentPage() {
  const [name, setName] = useState("");
  const [hasNoticeNotification, setHasNoticeNotification] =
    useState(false);

  const checkNoticeNotification = () => {
    // 保護者の名前
    const studentName =
      localStorage.getItem("parentStudentName") || "";

    setName(studentName);

    // お知らせ取得
    const savedNotices: Notice[] = JSON.parse(
      localStorage.getItem("notices") || "[]"
    );

    // 古いお知らせにIDがない場合にIDを付ける
    const fixedNotices = savedNotices.map(
      (notice: any, index: number) => ({
        id:
          typeof notice.id === "number"
            ? notice.id
            : Date.now() + index,
        title: notice.title,
        content: notice.content,
        date: notice.date,
      })
    );

    // IDを保存
    localStorage.setItem(
      "notices",
      JSON.stringify(fixedNotices)
    );

    // 既読のお知らせID
    const readNoticeIds: number[] = JSON.parse(
      localStorage.getItem("parentReadNoticeIds") || "[]"
    );

    // まだ読んでいないお知らせがあるか確認
    const unreadNotice = fixedNotices.some(
      (notice: Notice) =>
        !readNoticeIds.includes(notice.id)
    );

    setHasNoticeNotification(unreadNotice);
  };

  useEffect(() => {
    checkNoticeNotification();

    // ページに戻ってきたとき
    const handlePageShow = () => {
      checkNoticeNotification();
    };

    const handleFocus = () => {
      checkNoticeNotification();
    };

    window.addEventListener(
      "pageshow",
      handlePageShow
    );

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        handlePageShow
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        {/* タイトル */}
        <h1 className="mb-6 text-center text-3xl font-bold text-orange-600">
          🧮 Raiseそろばん
        </h1>

        {/* 保護者情報 */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">

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
          <Link
            href="/students/new/parent/login/parent/notice"
          >
            <div className="relative rounded-xl bg-white p-5 shadow-md">

              📢 お知らせ

              {hasNoticeNotification && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                  新着
                </span>
              )}

            </div>
          </Link>

          {/* 予約内容の確認 */}
          <Link
            href="/students/new/parent/login/parent/reservation/confirm"
          >
            <div className="rounded-xl bg-white p-5 shadow-md">
              📅 予約内容の確認
            </div>
          </Link>

          {/* 月謝確認 */}
          <Link
            href="/students/new/parent/login/parent/tuition"
          >
            <div className="rounded-xl bg-white p-5 shadow-md">
              💰 月謝確認
            </div>
          </Link>

          {/* 検定結果 */}
          <Link
            href="/students/new/parent/login/parent/exam"
          >
            <div className="rounded-xl bg-white p-5 shadow-md">
              🏆 検定結果
            </div>
          </Link>

          {/* お問い合わせ */}
          <Link
            href="/students/new/parent/login/parent/contact"
          >
            <div className="rounded-xl bg-white p-5 shadow-md">
              ✉️ お問い合わせ
            </div>
          </Link>

        </div>

        {/* ログイン画面へ戻る */}
        <div className="mt-8">

          <Link
            href="/"
            className="block rounded-xl border border-orange-500 bg-white px-5 py-3 text-center font-bold text-orange-500 shadow-md"
          >
            ↩︎ ログイン画面へ戻る
          </Link>

        </div>

      </div>

    </main>
  );
}