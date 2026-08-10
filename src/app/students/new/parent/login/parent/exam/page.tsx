"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ExamResult = {
  examName: string;
  examDate: string;
  grade: string;
  result: string;
  score: string;
};

export default function ParentExamPage() {
  const [name, setName] = useState("");
  const [results, setResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    // ログインしている生徒の名前を取得
    const studentName =
      localStorage.getItem("parentStudentName");

    if (!studentName) {
      return;
    }

    setName(studentName);

    // 検定結果を取得
    const savedResults = JSON.parse(
      localStorage.getItem("examResults") || "{}"
    );

    // この生徒の検定結果だけ取得
    if (savedResults[studentName]) {
      setResults(savedResults[studentName]);
    }
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          🏆 検定結果
        </h1>

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <h2 className="text-xl font-bold">
            {name
              ? `${name}さんの検定結果`
              : "検定結果"}
          </h2>

          {results.length === 0 ? (

            <p className="mt-6 text-center text-gray-600">
              まだ検定結果が登録されていません。
            </p>

          ) : (

            <div className="mt-6 space-y-4">

              {results.map((result, index) => (

                <div
                  key={index}
                  className="rounded-xl border p-4"
                >

                  <p className="text-lg font-bold">
                    {result.examName}
                  </p>

                  <p className="mt-2 text-gray-600">
                    検定日：{result.examDate}
                  </p>

                  <p className="text-gray-600">
                    級：{result.grade}
                  </p>

                  <p className="text-gray-600">
                    得点：{result.score}点
                  </p>

                  <p
                    className={`mt-3 inline-block rounded-lg px-4 py-2 font-bold ${
                      result.result === "合格"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result.result}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* トップページに戻るボタン */}
        <div className="mt-8">

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