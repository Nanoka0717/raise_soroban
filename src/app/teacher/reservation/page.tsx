"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Reservation = {
  name: string;
  phone?: string;
  grade: string;
  day: string[];
  time: string;

  changeFrom?: string;
  changeTo?: string;
  changeDate?: string;

  originalTime?: string;
};

type ReservationChange = {
  id: number;
  name: string;
  grade: string;
  changeFrom: string;
  changeTo: string;
  time: string;
  read: boolean;
};

export default function ReservationPage() {
  const [reservations, setReservations] = useState<
    Reservation[]
  >([]);

  const [changes, setChanges] = useState<
    ReservationChange[]
  >([]);

  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    // 通常の予約を取得
    const savedReservations = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );

    setReservations(savedReservations);

    // 保護者からの予約変更を取得
    const savedChanges = JSON.parse(
      localStorage.getItem("reservationChanges") || "[]"
    );

    setChanges(savedChanges);

    // 未読の変更があるか確認
    const unreadExists = savedChanges.some(
      (change: ReservationChange) =>
        change.read === false
    );

    setHasNew(unreadExists);

    // 予約管理ページを開いたら既読にする
    if (savedChanges.length > 0) {
      const readChanges = savedChanges.map(
        (change: ReservationChange) => ({
          ...change,
          read: true,
        })
      );

      localStorage.setItem(
        "reservationChanges",
        JSON.stringify(readChanges)
      );

      setChanges(readChanges);

      setHasNew(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        {/* タイトル */}
        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          📍 予約管理
        </h1>

        {/* 予約変更通知 */}
        {hasNew && (
          <div className="mb-6 rounded-2xl bg-white p-5 shadow-md">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">
                🔔 予約変更のお知らせ
              </h2>

              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                新着
              </span>

            </div>

          </div>
        )}

        {/* 保護者からの予約変更 */}
        {changes.length > 0 && (
          <div className="mb-8">

            <h2 className="mb-4 text-xl font-bold text-orange-600">
              🔔 保護者からの予約変更
            </h2>

            <div className="space-y-4">

              {changes.map((change) => (

                <div
                  key={change.id}
                  className="rounded-2xl bg-white p-5 shadow-md"
                >

                  <div className="mb-4 flex items-center justify-between">

                    <h3 className="text-xl font-bold">
                      👤 {change.name}さん
                    </h3>

                    {!change.read && (
                      <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                        新着
                      </span>
                    )}

                  </div>

                  {/* 学年 */}
                  <div className="mb-4">

                    <p className="font-bold text-gray-600">
                      学年
                    </p>

                    <p className="mt-1">
                      {change.grade}
                    </p>

                  </div>

                  {/* 変更日 */}
                  <div className="mb-4">

                    <p className="font-bold text-gray-600">
                      変更日
                    </p>

                    <div className="mt-2 rounded-lg bg-orange-50 p-3 text-center font-bold">

                      {change.changeFrom}

                      <span className="mx-3">
                        →
                      </span>

                      {change.changeTo}

                    </div>

                  </div>

                  {/* 変更授業時間 */}
                  <div>

                    <p className="font-bold text-gray-600">
                      変更授業時間
                    </p>

                    <p className="mt-2 rounded-lg bg-gray-50 p-3">
                      {change.time}
                    </p>

                  </div>

                  {/* 既読表示 */}
                  {change.read && (
                    <p className="mt-4 text-right text-sm text-gray-400">
                      ✓ 既読
                    </p>
                  )}

                </div>

              ))}

            </div>

          </div>
        )}

        {/* 通常の予約 */}
        <div>

          <h2 className="mb-4 text-xl font-bold text-orange-600">
            📋 現在の予約
          </h2>

          {reservations.length === 0 ? (

            <div className="rounded-2xl bg-white p-5 text-center shadow-md">

              <p className="text-gray-600">
                予約はありません。
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {reservations.map(
                (reservation, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-white p-5 shadow-md"
                  >

                    {/* 名前 */}
                    <h3 className="mb-4 text-xl font-bold">
                      👤 {reservation.name}さん
                    </h3>

                    {/* 学年 */}
                    <p>
                      <span className="font-bold">
                        学年：
                      </span>
                      {reservation.grade}
                    </p>

                    {/* 曜日 */}
                    <p className="mt-2">
                      <span className="font-bold">
                        曜日：
                      </span>
                      {reservation.day?.join("・")}
                    </p>

                    {/* 授業時間 */}
                    <p className="mt-2">
                      <span className="font-bold">
                        授業時間：
                      </span>
                      {reservation.time}
                    </p>

                  </div>

                )
              )}

            </div>

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