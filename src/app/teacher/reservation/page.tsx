"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Reservation = {
  name: string;
  phone?: string;
  grade: string;
  day: string[];
  time: string;
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

export default function Page() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationChanges, setReservationChanges] = useState<
    ReservationChange[]
  >([]);

  useEffect(() => {
    // 予約一覧を読み込む
    const savedReservations: Reservation[] = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );

    setReservations(savedReservations);

    // 予約変更を読み込む
    const savedChanges: ReservationChange[] = JSON.parse(
      localStorage.getItem("reservationChanges") || "[]"
    );

    // 表示する
    setReservationChanges(savedChanges);

    // 予約管理ページを開いたので既読にする
    const readChanges = savedChanges.map((change) => ({
      ...change,
      read: true,
    }));

    localStorage.setItem(
      "reservationChanges",
      JSON.stringify(readChanges)
    );

    // 画面上も既読状態にする
    setReservationChanges(readChanges);

    // 先生ページの新着表示も消す
    localStorage.setItem(
      "reservationChangeUnread",
      "false"
    );
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">

      <div className="mx-auto w-full max-w-md">

        {/* タイトル */}
        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          📍 予約管理
        </h1>

        {/* 予約変更のお知らせ */}
        {reservationChanges.length > 0 && (
          <div className="mb-8 rounded-2xl bg-white p-5 shadow-md">

            <h2 className="mb-5 text-xl font-bold text-orange-500">
              🔔 予約変更
            </h2>

            <div className="space-y-5">

              {reservationChanges.map((change) => (
                <div
                  key={change.id}
                  className="rounded-xl border border-orange-200 p-4"
                >

                  <div className="mb-3 flex items-center justify-between">

                    <p className="text-lg font-bold">
                      {change.name}さん
                    </p>

                    {!change.read && (
                      <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                        新着
                      </span>
                    )}

                  </div>

                  <p className="mb-2">
                    <span className="font-bold">
                      学年：
                    </span>
                    {change.grade}
                  </p>

                  <p className="mb-2">
                    <span className="font-bold">
                      変更日：
                    </span>
                    {change.changeFrom}
                    {" → "}
                    {change.changeTo}
                  </p>

                  <p>
                    <span className="font-bold">
                      変更授業時間：
                    </span>
                    {change.time}
                  </p>

                </div>
              ))}

            </div>
          </div>
        )}

        {/* 現在の予約 */}
        <div className="rounded-2xl bg-white p-5 shadow-md">

          <h2 className="mb-5 text-xl font-bold text-orange-500">
            📋 現在の予約
          </h2>

          {reservations.length === 0 ? (

            <p className="py-5 text-center text-gray-500">
              現在予約はありません。
            </p>

          ) : (

            <div className="space-y-5">

              {reservations.map((reservation, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-gray-200 p-4"
                >

                  <p className="mb-2 text-lg font-bold">
                    {reservation.name}さん
                  </p>

                  <p className="mb-2">
                    <span className="font-bold">
                      学年：
                    </span>
                    {reservation.grade}
                  </p>

                  <p className="mb-2">
                    <span className="font-bold">
                      曜日：
                    </span>
                    {reservation.day.join("・")}
                  </p>

                  <p>
                    <span className="font-bold">
                      授業時間：
                    </span>
                    {reservation.time}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* 戻る */}
        <div className="mt-8 text-center">

          <Link
            href="/teacher/home"
            className="inline-block rounded-xl border border-orange-500 bg-white px-6 py-3 font-bold text-orange-500 shadow-md"
          >
            ↩︎ 先生ページに戻る
          </Link>

        </div>

      </div>

    </main>
  );
}