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

export default function ParentReservationPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [day, setDay] = useState<string[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const savedReservation =
      sessionStorage.getItem("reservation");

    if (savedReservation) {
      const reservation: Reservation =
        JSON.parse(savedReservation);

      setName(reservation.name);
      setGrade(reservation.grade);
      setDay(reservation.day);
      setTime(reservation.time);
    }
  }, []);

  const handleUpdate = () => {
    if (!name || !grade || day.length === 0 || !time) {
      alert("全て入力してください。");
      return;
    }

    const reservation = {
      name,
      grade,
      day,
      time,
    };

    sessionStorage.setItem(
      "reservation",
      JSON.stringify(reservation)
    );

    router.push(
      "/students/new/parent/login/parent/reservation/confirm"
    );
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📅 予約内容を変更
        </h1>

        <div className="space-y-5">

          {/* お名前 */}
          <div>
            <label className="mb-2 block font-bold">
              お子様のお名前
            </label>

            <input
              type="text"
              value={name}
              readOnly
              className="w-full rounded-lg border bg-gray-100 p-3"
            />
          </div>

          {/* 学年 */}
          <div>
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

          {/* 曜日 */}
          <div>
            <p className="mb-2 font-bold">
              曜日
            </p>

            {[
              "火曜日",
              "水曜日",
              "金曜日",
            ].map((d) => (
              <label
                key={d}
                className="mb-2 block"
              >
                <input
                  type="checkbox"
                  checked={day.includes(d)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDay([...day, d]);
                    } else {
                      setDay(
                        day.filter(
                          (item) => item !== d
                        )
                      );
                    }
                  }}
                  className="mr-2"
                />

                {d}
              </label>
            ))}
          </div>

          {/* 授業時間 */}
          <div>
            <p className="mb-2 font-bold">
              授業時間
            </p>

            <label className="mb-2 block">
              <input
                type="radio"
                name="time"
                value="16:00~17:00"
                checked={
                  time === "16:00~17:00"
                }
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="mr-2"
              />

              16:00~17:00
            </label>

            <label className="block">
              <input
                type="radio"
                name="time"
                value="17:10~18:10"
                checked={
                  time === "17:10~18:10"
                }
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="mr-2"
              />

              17:10~18:10
            </label>
          </div>

          {/* 変更内容を確認 */}
          <button
            onClick={handleUpdate}
            className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
          >
            変更内容を確認する
          </button>

          {/* 戻る */}
          <Link
            href="/students/new/parent/login/parent/reservation/confirm"
            className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
          >
            ↩︎ 予約内容の確認に戻る
          </Link>

        </div>

      </div>

    </main>
  );
}