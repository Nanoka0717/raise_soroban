"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ParentLoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const inputName = name.trim();

    // 名前が入力されていない場合
    if (inputName === "") {
      setError("お子様のお名前を入力してください");
      return;
    }

    // 登録されている生徒を取得
    const students = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    // 入力された名前が登録されているか確認
    const student = students.find(
      (student: { name: string }) =>
        student.name === inputName
    );

    // 登録されていない場合
    if (!student) {
      setError("登録されていない名前です");
      return;
    }

    // 登録されている場合
    setError("");

    localStorage.setItem(
      "parentStudentName",
      student.name
    );

    router.push(
      "/students/new/parent/login/parent"
    );
  };

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
          🧮 保護者ログイン
        </h1>

        <div>

          <label className="block mb-2 font-semibold">
            お子様の名前
          </label>

          <input
            type="text"
            placeholder="お名前"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className="w-full border rounded-lg p-3"
          />

          {error && (
            <p className="mt-2 text-red-500 font-bold">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-bold"
          >
            ログイン
          </button>

         <div className="fixed bottom left-6">
       <Link href="/"
             className="rounded-xl border-border-orange-500 bg-white px-5 py-3 font-bold text-orange-500 shadow-md">
                ↩︎ トップページに戻る
        </Link>
    </div>


        </div>

      </div>

    </main>
  );
}