"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExamPage() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const savedStudents = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    setStudents(savedStudents);
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          🧮 検定結果
        </h1>

        <div className="space-y-4">

          {students.length === 0 ? (
            <p className="text-center text-gray-600">
              生徒が登録されていません。
            </p>
          ) : (
            students.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-5"
              >

                <p className="text-xl font-bold text-gray-800">
                  {student.name}さん
                </p>

                <p className="text-gray-700">
                  学年：{student.grade}
                </p>

                <p className="text-gray-700">
                  珠算：
                </p>

                <p className="text-gray-700">
                  暗算：
                </p>

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

      </div>

    </main>
  );
}