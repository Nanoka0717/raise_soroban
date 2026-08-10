"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();
  
  const handleLogin = () => {
    // 仮ログイン
    if (id === "teacher" && password === "1234"){
        alert("ログインしました！");
        router.push("/teacher/home");
      } else {
        alert("IDまたはパスワードが違います。");}
      };
    return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
          🧮 先生ログイン
        </h1>

      <div className="space-y-5">
         <div>
          <label className="block mb-2 font-semibold">
               ID
          </label>
          <input 
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="IDを入力"
              />
         </div>

         <div>
          <label className="block mb-2 font-semibold">
                パスワード
          </label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="パスワードを入力"/>
        </div>

        <button 
           onClick={handleLogin}
           className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600">
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