"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ParentReservationChangePage() {
  const router = useRouter();

  const [grade, setGrade] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");

  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");

  const handleChange = () => {
    if (
      !grade ||
      !fromDate ||
      !fromTime ||
      !toDate ||
      !toTime
    ) {
      alert("全て入力してください。");
      return;
    }

    alert("予約内容を変更しました！");

    router.push(
      "/students/new/parent/login/parent/reservation/confirm"
    );
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📅 予約内容変更
        </h1>

        <div className="space-y-5">

          {/* 学年 */}
          <div className="rounded-2xl bg-white p-5 shadow-md">

            <label className="mb-2 block font-bold">
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

          {/* 予約変更 */}
          <div className="rounded-2xl bg-white p-5 shadow-md">

            <p className="mb-4 font-bold">
              予約変更
            </p>

            {/* 変更前 */}
            <div className="mb-4">

              <p className="mb-2 text-sm text-gray-500">
                変更前
              </p>

              <div className="space-y-2">

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) =>
                    setFromDate(e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />

                <input
                  type="time"
                  value={fromTime}
                  onChange={(e) =>
                    setFromTime(e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />

              </div>

            </div>

            <p className="mb-4 text-center text-xl font-bold">
              ↓
            </p>

            {/* 変更後 */}
            <div>

              <p className="mb-2 text-sm text-gray-500">
                変更後
              </p>

              <div className="space-y-2">

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) =>
                    setToDate(e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />

                <input
                  type="time"
                  value={toTime}
                  onChange={(e) =>
                    setToTime(e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />

              </div>

            </div>

          </div>

          {/* 予約内容を変更する */}
          <button
            onClick={handleChange}
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