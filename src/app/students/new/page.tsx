"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone]= useState("");
  const [grade, setGrade]= useState("");
  const [day, setDay]= useState<string[]>([]);
  const [time, setTime]= useState("");
  
  const addStudent = () => {
    if (!name || !grade || day.length === 0 || !time) {
        alert("全て入力してください。");
        return;
    }

    const reservation = {
            name,
            phone,
            grade,
            day,
            time,
        };

        sessionStorage.setItem(
            "reservation",
            JSON.stringify(reservation)
        );

        const oldReservations = JSON.parse(
  localStorage.getItem("reservations") || "[]"
);

localStorage.setItem(
  "reservations",
  JSON.stringify([...oldReservations, reservation])
);

// 生徒情報を保存
const oldStudents = JSON.parse(
  localStorage.getItem("students") || "[]"
);

const newStudent = {
  name,
  phone,
  grade,
  day,
  time,
};

localStorage.setItem(
  "students",
  JSON.stringify([...oldStudents, newStudent])
);

        router.push("/teacher/confirm/reserve");
  };

  return (

    <main className="min-h-screen bg-orange-50 p-8">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">

      <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
        👦 新しい生徒を追加
      </h1>
      
      <div className="space-y-4">

        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) =>setName(e.target.value)} 
          className="w-full rounded-lg border p-3"/>
                
        <input 
          type="tel" 
           placeholder="電話番号"
           value={phone}
           onChange={(e) => setPhone(e.target.value)}
           className="w-full rounded-lg border p-3"/>

        <select 
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full rounded-lg border p-3">
        
        <option value="">学年を選択</option>
        <option>年長</option>
        <option>小学1年生</option>
        <option>小学2年生</option>
        <option>小学3年生</option>
        <option>小学4年生</option>
        <option>小学5年生</option>
        <option>小学6年生</option>
        </select>
        
        <div>
          <p className="mb-2 font-bold">
            曜日
          </p>
          {["火曜日","水曜日","金曜日"].map((d) => (
            <label key={d}
                   className="block">
            <input
              type="checkbox"
              checked={day.includes(d)}
              onChange={(e) => {
                if (e.target.checked) { setDay([...day, d]);
                } else {
            
                    setDay(day.filter((item) => item !== d));}
                }}
                />{""}
                {d}
                </label>
          ))}
          </div>

      <div>
        <p className="mb-2 font-bold">
        授業時間
        </p>

        <label className="block">
           <input 
             type="radio" 
             name="time" 
             value="16:00~17:00"
             checked={time === "16:00~17:00"}
             onChange={(e) => setTime(e.target.value)}/>{" "}
           16:00~17:00
        </label>

        <label className="block">
           <input 
             type="radio" 
             name="time" 
             value="17:10~18:10"
             checked={time === "17:10~18:10"}
             onChange={(e) => setTime(e.target.value)}/>{" "}
           17:10~18:10    
        </label>
      </div>
 
     <button
       onClick={addStudent}
       className="w-full rounded-xl bg-orange-500 py-3 text-white font-bold">
                                                     予約する
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