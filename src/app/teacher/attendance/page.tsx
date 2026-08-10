"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AttendancePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});

  useEffect(() => {
    const savedStudents = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );

    setStudents(savedStudents);

    const savedAttendance = JSON.parse(
      localStorage.getItem("attendance") || "{}"
    );

    setAttendance(savedAttendance);
  }, []);

  const updateAttendance = (
    name: string,
    status: "出席" | "欠席"
  ) => {
    setAttendance({
      ...attendance,
      [name]: status,
    });
  };

  const saveAttendance = () => {
    localStorage.setItem(
      "attendance",
      JSON.stringify(attendance)
    );

    alert("出席状況を保存しました！");
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
        📅 出席管理
      </h1>

      <div className="space-y-4">

        {students.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            生徒がいません
          </div>
        ) : (
          students.map((student, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5"
            >

              <h2 className="text-xl font-bold">
                {student.name}さん
              </h2>

              {/* 出席状況を表示 */}
              <div className="mt-3 rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">
                  今日の出席状況
                </p>

                <p
                  className={`mt-1 text-2xl font-bold ${
                    attendance[student.name] === "出席"
                      ? "text-green-600"
                      : attendance[student.name] === "欠席"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  {attendance[student.name] || "未選択"}
                </p>
              </div>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() =>
                    updateAttendance(student.name, "出席")
                  }
                  className={`px-4 py-2 rounded-lg text-white ${
                    attendance[student.name] === "出席"
                      ? "bg-green-600"
                      : "bg-green-400"
                  }`}
                >
                  出席
                </button>

                <button
                  onClick={() =>
                    updateAttendance(student.name, "欠席")
                  }
                  className={`px-4 py-2 rounded-lg text-white ${
                    attendance[student.name] === "欠席"
                      ? "bg-red-600"
                      : "bg-red-400"
                  }`}
                >
                  欠席
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      <button
        onClick={saveAttendance}
        className="w-full mt-8 bg-orange-500 text-white py-3 rounded-xl font-bold"
      >
        保存
      </button>

      <Link
        href="/teacher/home"
        className="block w-full mt-3 rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
      >
        ↩︎ 先生ページに戻る
      </Link>

    </main>
  );
}                