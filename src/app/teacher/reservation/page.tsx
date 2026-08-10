"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReservationPage() {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const savedReservations = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );

    setReservations(savedReservations);
  }, []);

  // 予約を削除する
  const deleteReservation = (index: number) => {
    const ok = window.confirm("この予約を削除しますか？");

    if (!ok) {
      return;
    }

    const updatedReservations = reservations.filter(
      (_, i) => i !== index
    );

    setReservations(updatedReservations);

    localStorage.setItem(
      "reservations",
      JSON.stringify(updatedReservations)
    );

    alert("予約を削除しました！");
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
        📅 予約管理
      </h1>

      <div className="space-y-4">

        {reservations.length === 0 ? (
          <p className="text-center text-gray-600">
            予約はありません。
          </p>
        ) : (
          reservations.map((reservation, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-5 shadow-md"
            >

              <p className="text-xl font-bold text-gray-800">
                {reservation.name}さん
              </p>

              <p className="mt-2 text-gray-700">
                学年：{reservation.grade}
              </p>

              <p className="text-gray-700">
                曜日：{reservation.days}
              </p>

              <p className="text-gray-700">
                授業時間：{reservation.time}
              </p>

              {/* 削除ボタン */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => deleteReservation(index)}
                  className="rounded-lg bg-red-500 px-5 py-2 font-bold text-white"
                >
                  削除
                </button>
              </div>

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

    </main>
  );
}