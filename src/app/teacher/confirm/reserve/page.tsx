"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReservationConfirmPage() {
  const [reservation, setReservation] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("reservation");

    if (data) {
      setReservation(JSON.parse(data));
    }
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <h1 className="mt-8 w-full rounded-lg bg-orange-500 py-3 text-center text-white font-bold">
        予約内容確認
      </h1>

      {/* 予約内容 */}
      {reservation && (
        <div className="mt-6">
          
          <p className="text-lg font-bold">
            お名前
          </p>
          <p>{reservation.name}</p>

          <p className="mt-5 text-lg font-bold">
            電話番号
          </p>
          <p>{reservation.phone}</p>

          <p className="mt-5 text-lg font-bold">
            学年
          </p>
          <p>{reservation.grade}</p>

          <p className="mt-5 text-lg font-bold">
            曜日
          </p>
          <p>{reservation.day.join("・")}</p>

          <p className="mt-5 text-lg font-bold">
            授業時間
          </p>
          <p>{reservation.time}</p>

        </div>
      )}

      {/* 予約を確定するボタン */}
      <button
        onClick={() =>
          router.push("/teacher/complete/reservation")
        }
        className="mt-8 w-full rounded-lg bg-orange-500 py-3 text-white font-bold"
      >
        予約を確定する
      </button>

      {/* 先生ページに戻る */}
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