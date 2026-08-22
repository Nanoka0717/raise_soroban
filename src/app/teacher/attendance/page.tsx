"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = {
  name: string;
  phone?: string;
  grade?: string;
  day?: string;
  time?: string;
};

type AttendanceData = {
  date: string;
  studentName: string;
  day: string;
  time: string;
  transfer: "有" | "無";
  transferText: string;
};

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);

  const [date, setDate] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState("");

  const [selectedDay, setSelectedDay] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [transfer, setTransfer] =
    useState<"有" | "無">("無");

  const [transferText, setTransferText] =
    useState("");

  useEffect(() => {
    // 生徒一覧を取得
    const savedStudents: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    setStudents(savedStudents);

    // 今日の日付を入れる
    const today = new Date();

    const year = today.getFullYear();
    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      today.getDate()
    ).padStart(2, "0");

    setDate(`${year}-${month}-${day}`);
  }, []);

  // 生徒を選択したとき
  const handleStudentChange = (
    name: string
  ) => {
    setSelectedStudent(name);

    const student = students.find(
      (student) =>
        student.name === name
    );

    if (student) {
      setSelectedDay(
        student.day || ""
      );

      setSelectedTime(
        student.time || ""
      );
    } else {
      setSelectedDay("");
      setSelectedTime("");
    }
  };

  // 保存
  const saveAttendance = () => {
    if (!date) {
      alert("日付を選択してください");
      return;
    }

    if (!selectedStudent) {
      alert("生徒を選択してください");
      return;
    }

    if (!selectedDay) {
      alert("出席曜日を確認してください");
      return;
    }

    if (!selectedTime) {
      alert("出席時間を確認してください");
      return;
    }

    if (
      transfer === "有" &&
      !transferText.trim()
    ) {
      alert("振替内容を入力してください");
      return;
    }

    const savedAttendance: AttendanceData[] =
      JSON.parse(
        localStorage.getItem("attendance") ||
          "[]"
      );

    const newAttendance: AttendanceData = {
      date,
      studentName: selectedStudent,
      day: selectedDay,
      time: selectedTime,
      transfer,
      transferText:
        transfer === "有"
          ? transferText
          : "",
    };

    localStorage.setItem(
      "attendance",
      JSON.stringify([
        ...savedAttendance,
        newAttendance,
      ])
    );

    alert("出席情報を保存しました！");
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-600">
          📅 出席管理
        </h1>

        <div className="space-y-5">


          {/* 生徒名前 */}
          <div className="rounded-2xl bg-white p-5 shadow-md">

            <label className="mb-2 block font-bold">
              👤 生徒名前
            </label>

            <select
              value={selectedStudent}
              onChange={(e) =>
                handleStudentChange(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
            >

              <option value="">
                生徒を選択してください
              </option>

              {students.map(
                (student, index) => (
                  <option
                    key={index}
                    value={student.name}
                  >
                    {student.name}
                  </option>
                )
              )}

            </select>

          </div>

          {/* 出席曜日 */}
          <div className="rounded-2xl bg-white p-5 shadow-md">

            <label className="mb-2 block font-bold">
              📆 出席曜日
            </label>

            <input
              type="text"
              value={selectedDay}
              readOnly
              placeholder="生徒を選択してください"
              className="w-full rounded-lg border bg-gray-100 p-3"
            />

          </div>

          {/* 出席時間 */}
          <div className="rounded-2xl bg-white p-5 shadow-md">

            <label className="mb-2 block font-bold">
              ⏰ 出席時間
            </label>

            <input
              type="text"
              value={selectedTime}
              readOnly
              placeholder="生徒を選択してください"
              className="w-full rounded-lg border bg-gray-100 p-3"
            />

          </div>

          {/* 今月の振替日 */}
          <div className="rounded-2xl bg-white p-5 shadow-md">

            <p className="mb-3 font-bold">
              🔄 今月の振替日
            </p>

            <div className="flex gap-6">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="transfer"
                  value="有"
                  checked={
                    transfer === "有"
                  }
                  onChange={() =>
                    setTransfer("有")
                  }
                />
                有
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="transfer"
                  value="無"
                  checked={
                    transfer === "無"
                  }
                  onChange={() =>
                    setTransfer("無")
                  }
                />
                無
              </label>

            </div>

            {/* 振替ありの場合 */}
            {transfer === "有" && (

              <div className="mt-4">

                <label className="mb-2 block text-sm font-bold text-gray-600">
                  振替内容
                </label>

                <input
                  type="text"
                  value={transferText}
                  onChange={(e) =>
                    setTransferText(
                      e.target.value
                    )
                  }
                  placeholder="例：8月25日16:00 → 8月27日17:10"
                  className="w-full rounded-lg border p-3"
                />

              </div>

            )}

          </div>

        </div>

        {/* 保存 */}
        <button
          onClick={saveAttendance}
          className="mt-8 w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
        >
          保存する
        </button>

        {/* 先生ページに戻る */}
        <Link
          href="/teacher/home"
          className="mt-3 block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
        >
          ↩︎ 先生ページに戻る
        </Link>

      </div>

    </main>
  );
}