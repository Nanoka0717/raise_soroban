"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TuitionPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [payments, setPayments] = useState<any>({});

  useEffect(() => {
    const savedStudents = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );

    setStudents(savedStudents);

    const savedPayments = JSON.parse(
      localStorage.getItem("payments") || "{}"
    );

    setPayments(savedPayments);
  }, []);

  const changePayment = (
    name: string,
    status: "支払い済み" | "未払い"
  ) => {
    const updatedPayments = {
      ...payments,
      [name]: {
        status,
        paymentDate: payments[name]?.paymentDate || "",
      },
    };

    setPayments(updatedPayments);

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );
  };

  const changePaymentDate = (
    name: string,
    paymentDate: string
  ) => {
    const updatedPayments = {
      ...payments,
      [name]: {
        status: payments[name]?.status || "未払い",
        paymentDate,
      },
    };

    setPayments(updatedPayments);

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
        💰 月謝管理
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
              className="rounded-xl bg-white p-5 shadow-md"
            >

              <p className="text-xl font-bold">
                {student.name}さん
              </p>

              <p className="text-gray-700">
                学年：{student.grade}
              </p>

              <p className="mb-4 text-gray-700">
                月謝：6,000円
              </p>

              {/* 支払いボタン */}
              <div className="flex gap-3">

                <button
                  onClick={() =>
                    changePayment(
                      student.name,
                      "支払い済み"
                    )
                  }
                  className={`rounded-lg px-4 py-2 text-white ${
                    payments[student.name]?.status ===
                    "支払い済み"
                      ? "bg-green-600"
                      : "bg-green-400"
                  }`}
                >
                  支払い済み
                </button>

                <button
                  onClick={() =>
                    changePayment(
                      student.name,
                      "未払い"
                    )
                  }
                  className={`rounded-lg px-4 py-2 text-white ${
                    payments[student.name]?.status ===
                    "未払い"
                      ? "bg-red-600"
                      : "bg-red-400"
                  }`}
                >
                  未払い
                </button>

              </div>

              {/* 支払日 */}
              <div className="mt-4">

                <label className="mb-2 block font-bold">
                  支払日
                </label>

                <input
                  type="date"
                  value={
                    payments[student.name]?.paymentDate ||
                    ""
                  }
                  onChange={(e) =>
                    changePaymentDate(
                      student.name,
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border p-2"
                />

              </div>

              {/* 現在の状態 */}
              <div className="mt-4 rounded-lg bg-gray-50 p-4 text-center">

                <p className="text-sm text-gray-500">
                  現在の状態
                </p>

                <p
                  className={`mt-1 text-2xl font-bold ${
                    payments[student.name]?.status ===
                    "支払い済み"
                      ? "text-green-600"
                      : payments[student.name]?.status ===
                        "未払い"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  {payments[student.name]?.status ||
                    "未設定"}
                </p>

              </div>

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

    </main>
  );
}