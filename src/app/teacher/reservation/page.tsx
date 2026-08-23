
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
    // 現在の予約を読み込む
    const savedReservations: Reservation[] = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );

    setReservations(savedReservations);

    // 予約変更を読み込む
    const savedChanges: ReservationChange[] = JSON.parse(
      localStorage.getItem("reservationChanges") || "[]"
    );

    // 予約管理ページを開いたので既読にする
    const readChanges = savedChanges.map((change) => ({
      ...change,
      read: true,
    }));

    localStorage.setItem(
      "reservationChanges",
      JSON.stringify(readChanges)
    );

    setReservationChanges(readChanges);

    // 新着表示を消す
    localStorage.setItem(
      "reservationChangeUnread",
      "false"
    );
  }, []);

  // =========================
  // 予約変更を削除
  // =========================

  const deleteReservationChange = (id: number) => {
    const ok = window.confirm(
      "この予約変更を削除しますか？"
    );

    if (!ok) {
      return;
    }

    const updatedChanges =
      reservationChanges.filter(
        (change) => change.id !== id
      );

    setReservationChanges(updatedChanges);

    localStorage.setItem(
      "reservationChanges",
      JSON.stringify(updatedChanges)
    );

    // 予約変更が全部なくなったら新着も消す
    if (updatedChanges.length === 0) {
      localStorage.setItem(
        "reservationChangeUnread",
        "false"
      );
    }
  };

  // =========================
  // 現在の予約を削除
  // =========================

  const deleteReservation = (index: number) => {
    const ok = window.confirm(
      "この予約を削除しますか？"
    );

    if (!ok) {
      return;
    }

    const updatedReservations =
      reservations.filter(
        (_, i) => i !== index
      );

    setReservations(updatedReservations);

    localStorage.setItem(
      "reservations",
      JSON.stringify(updatedReservations)
    );
  };

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">

      <div className="mx-auto w-full max-w-md">

        {/* タイトル */}
        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          📍 予約管理
        </h1>

        {/* =========================
            予約変更
        ========================= */}

        <div className="mb-8 rounded-2xl bg-white p-5 shadow-md">

          <h2 className="mb-5 text-xl font-bold text-orange-500">
            🔔 予約変更
          </h2>

          {reservationChanges.length === 0 ? (

            <p className="py-5 text-center text-gray-500">
              予約変更はありません。
            </p>

          ) : (

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

                  <p className="mb-4">
                    <span className="font-bold">
                      変更授業時間：
                    </span>
                    {change.time}
                  </p>

                  {/* 削除ボタン */}
                  <button
                    onClick={() =>
                      deleteReservationChange(
                        change.id
                      )
                    }
                    className="w-full rounded-lg bg-red-500 py-2 font-bold text-white"
                  >
                    🗑 削除
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* =========================
            現在の予約
        ========================= */}

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

              {reservations.map(
                (reservation, index) => (

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

                    <p className="mb-4">
                      <span className="font-bold">
                        授業時間：
                      </span>
                      {reservation.time}
                    </p>

                    {/* 削除ボタン */}
                    <button
                      onClick={() =>
                        deleteReservation(index)
                      }
                      className="w-full rounded-lg bg-red-500 py-2 font-bold text-white"
                    >
                      🗑 削除
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* 先生ページに戻る */}

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