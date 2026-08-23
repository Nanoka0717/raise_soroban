"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Reservation = {
  name: string;
  grade: string;
  day: string[];
  time: string;
};

export default function ReservationConfirmPage() {
  const router = useRouter();

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    const savedReservation =
      sessionStorage.getItem("reservation");

    if (savedReservation) {
      setReservation(JSON.parse(savedReservation));
    }
  }, []);

  if (!reservation) {
    return (
      <main className="min-h-screen bg-orange-50 p-6">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md text-center">

          <p className="text-gray-600">
            予約内容がありません。
          </p>

          <button
            onClick={() =>
              router.push(
                "/students/new/parent/login/parent/reservation2"
              )
            }
            className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
          >
            予約入力に戻る
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📋 予約内容の確認
        </h1>

        <div className="space-y-5">

          <div>
            <p className="font-bold text-gray-600">
              お子様のお名前
            </p>
            <p className="mt-1 text-xl font-bold">
              {reservation.name}さん
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">
              学年
            </p>
            <p className="mt-1">
              {reservation.grade}
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">
              曜日
            </p>
            <p className="mt-1">
              {reservation.day.join("・")}
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">
              授業時間
            </p>
            <p className="mt-1">
              {reservation.time}
            </p>
          </div>

          <button
            onClick={() =>
              router.push(
                "/students/new/parent/login/parent/reservation2"
              )
            }
            className="w-full rounded-xl border border-orange-500 py-3 font-bold text-orange-500"
          >
            入力内容を変更する
          </button>

          <button
            onClick={() => {
              alert("予約内容を確認しました！");
            }}
            className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
          >
            この内容で予約する
          </button>

          <Link
            href="/students/new/parent/login/parent"
            className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
          >
            ↩︎ トップページに戻る
         </Link>


        </div>

      </div>

    </main>
  );
}
