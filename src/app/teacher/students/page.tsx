"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentListPage() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    setStudents(data);
  }, []);

  // 生徒を削除する
  const deleteStudent = (index: number) => {
    const ok = window.confirm("この生徒を削除しますか？");

    if (!ok) {
      return;
    }

    const updatedStudents = students.filter(
      (_, i) => i !== index
    );

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    alert("生徒を削除しました！");
  };

  return (
    <main className="min-h-screen bg-orange-50 p-8">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          生徒一覧
        </h1>

        <div className="space-y-4">

          {students.length === 0 ? (
            <p className="text-center">
              登録されている生徒はいません。
            </p>
          ) : (
            students.map((student, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-4 shadow"
              >

                <p className="text-lg font-bold">
                  {student.name}
                </p>

                <p>
                  電話番号：{student.phone}
                </p>

                <p>
                  {student.grade}
                </p>

                <p>
                  {student.day}
                </p>

                <p>
                  {student.time}
                </p>

                {/* 削除ボタン */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => deleteStudent(index)}
                    className="rounded-lg bg-red-500 px-5 py-2 font-bold text-white"
                  >
                    削除
                  </button>
                </div>

              </div>
            ))
          )}

        </div>

        {/* 先生ページに戻る */}
        <div className="mt-8">

          <Link
            href="/teacher/home"
            className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
          >
            ↩︎ 先生ページに戻る
          </Link>

        </div>

      </div>

    </main>
  );
}

