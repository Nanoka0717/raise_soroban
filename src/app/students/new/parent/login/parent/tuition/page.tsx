"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Payment = {

  status: "支払い済み" | "未払い";

  paymentDate: string;

};

type Student = {

  name: string;

  phone: string;

  grade: string;

  day: string[];

  time: string;

};

export default function ParentTuitionPage() {

  const [name, setName] = useState("");

  const [student, setStudent] = useState<Student | null>(null);

  const [payment, setPayment] = useState<Payment>({

    status: "未払い",

    paymentDate: "",

  });

  // 曜日の数によって月謝を決める

  const getTuition = (days: string[]) => {

    if (days.length === 1) return 6000;

    if (days.length === 2) return 8500;

    if (days.length >= 3) return 10000;

    return 0;

  };

  useEffect(() => {

    // ログインしている生徒の名前を取得

    const studentName =

      localStorage.getItem("parentStudentName");

    if (!studentName) {

      return;

    }

    setName(studentName);

    // 生徒一覧を取得

    const savedStudents = JSON.parse(

      localStorage.getItem("students") || "[]"

    );

    const foundStudent = savedStudents.find(

      (student: Student) =>

        student.name === studentName

    );

    if (foundStudent) {

      setStudent(foundStudent);

    }

    // 支払い情報を取得

    const savedPayments = JSON.parse(

      localStorage.getItem("payments") || "{}"

    );

    if (savedPayments[studentName]) {

      setPayment(savedPayments[studentName]);

    }

  }, []);

  // 月謝を計算

  const tuition = student

    ? getTuition(student.day)

    : 0;

  return (

    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">

          💰 月謝の確認

        </h1>

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <h2 className="text-xl font-bold">

            {name

              ? `${name}さんの月謝`

              : "月謝確認"}

          </h2>

          <div className="mt-6 space-y-5">

            {/* 今月の月謝 */}

            <div>

              <p className="font-bold text-gray-600">

                今月の月謝

              </p>

              <p className="mt-2 text-3xl font-bold text-orange-500">

                {tuition.toLocaleString()}円

              </p>

            </div>

            {/* 授業曜日 */}

            <div>

              <p className="font-bold text-gray-600">

                授業曜日

              </p>

              <p className="mt-1">

                {student

                  ? student.day.join("・")

                  : "未登録"}

              </p>

            </div>

            {/* 支払い状況 */}

            <div>

              <p className="font-bold text-gray-600">

                支払い状況

              </p>

              <p

                className={`mt-2 inline-block rounded-lg px-4 py-2 font-bold ${

                  payment.status === "支払い済み"

                    ? "bg-green-100 text-green-700"

                    : "bg-red-100 text-red-700"

                }`}

              >

                {payment.status}

              </p>

            </div>

            {/* 支払日 */}

            <div>

              <p className="font-bold text-gray-600">

                支払日

              </p>

              <p className="mt-1">

                {payment.paymentDate

                  ? payment.paymentDate

                  : "未登録"}

              </p>

              <Link
            href="/students/new/parent/login/parent"
            className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500"
          >
            ↩︎ トップページに戻る
             </Link>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}

