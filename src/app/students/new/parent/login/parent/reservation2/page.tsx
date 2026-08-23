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

export default function ReservationChangePage() {
  const router = useRouter();

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  const [grade, setGrade] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const savedReservation =
      sessionStorage.getItem("reservation");

    if (savedReservation) {
      const data = JSON.parse(savedReservation);

      setReservation(data);
      setGrade(data.grade || "");
      setTime(data.time || "");
    }
  }, []);

  const changeReservation = () => {
    if (!reservation) {
      return;
    }

    if (!grade || !fromDate || !toDate || !time) {
      alert("全て入力してください。");
      return;
    }

    const updatedReservation = {
      ...reservation,
      grade: grade,
      changeFrom: fromDate,
      changeTo: toDate,
      time: time,
    };

    sessionStorage.setItem(
      "reservation",
      JSON.stringify(updatedReservation)
    );

    alert("予約内容を変更しました！");

    router.push(
      "/students/new/parent/login/parent/reservation/confirm"
    );
  };

  if (!reservation) {
    return (
      <main className="min-h-screen bg-orange-50 p-6">

        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-md">

          <p className="text-gray-600">
            予約内容がありません。
          </p>

          <Link
            href="/students/new/parent/login/parent/reservation/confirm"
            className="mt-6 block w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
          >
            予約内容の画面に戻る
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md">

        <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
          ✏️ 予約内容変更
        </h1>

        <div className="space-y-6">

          {/* 学年 */}
          <div>
            <label className="mb-2 block font-bold text-gray-600">
              学年
            </label>

            <select
              value={grade}
              onChange={(e) =>
                setGrade(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                学年を選択
              </option>

              <option>年長</option>
              <option>小学1年生</option>
              <option>小学2年生</option>
              <option>小学3年生</option>
              <option>小学4年生</option>
              <option>小学5年生</option>
              <option>小学6年生</option>
            </select>
          </div>

          {/* 変更日 */}
          <div>
            <p className="mb-3 font-bold text-gray-600">
              変更日
            </p>

            <div className="flex items-center gap-3">

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(e.target.value)
                }
                className="min-w-0 flex-1 rounded-lg border p-3"
              />

              <span className="font-bold">
                →
              </span>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(e.target.value)
                }
                className="min-w-0 flex-1 rounded-lg border p-3"
              />

            </div>
          </div>

          {/* 変更授業時間 */}
          <div>
            <p className="mb-3 font-bold text-gray-600">
              変更授業時間
            </p>

            <label className="mb-3 block">
              <input
                type="radio"
                name="time"
                value="16:00〜17:00"
                checked={
                  time === "16:00〜17:00"
                }
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="mr-2"
              />
              16:00〜17:00
            </label>

            <label className="block">
              <input
                type="radio"
                name="time"
                value="17:10〜18:10"
                checked={
                  time === "17:10〜18:10"
                }
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="mr-2"
              />
              17:10〜18:10
            </label>
          </div>

          {/* 予約内容を変更する */}
          <button
            onClick={changeReservation}
            className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
          >
            予約内容を変更する
          </button>

          {/* 予約内容の画面に戻る */}
          <Link
            href="/students/new/parent/login/parent/reservation/confirm"
            className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
          >
            ↩︎ 予約内容の画面に戻る
          </Link>

        </div>

      </div>

    </main>
  );
}