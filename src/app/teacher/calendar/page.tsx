"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
export default function CalendarPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const savedReservations = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );
    setReservations(savedReservations);
}, []);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(
       year,
       month + 1,
       0
    ).getDate();

    const selectedReservations =reservations.filter(
             (reservation) => reservation.date === selectedDate
             );

    const selectDate = (day: number) => {
      const date =`${year}/${month +1}/${day}`;
      setSelectedDate(date)
    };

    const hasReservation = (day: number) => {
        const date = `${year}/${month + 1}/${day}`;
        
        return reservations.some(
          (reservation) => reservation.date === date
        );
       };
     
     return (
        <main className="min-h-screen bg-orange-50 p-6">
          <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
            📅予約カレンダー
          </h1>        

         <div className="bg-white rounded-xl shadow-md p-5">

          <h2 className="text-xl font-bold text-center mb-4">
            {year}年 {month + 1}月
          </h2>
        
         <div className="grid grid-cols-7 gap-2">
            {Array.from(
               { length: daysInMonth },
               (_, i) => i + 1
              ).map((day) => (
                 <button
                   key={day}
                   onClick={() => selectDate(day)}
                   className={`rounded-xl border py-3 transition ${
                     selectedDate === `${year}/${month +1}/${day}`
                       ? "bg-orange-500 text-white"
                       : hasReservation(day)
                       ? "bg-orange-100 border-orange-400"
                       : "bg-white hover:bg-orange-100"
                   }`}
                   >
                  
                   <span
                      className={`font-bold text-lg ${
                        new Date(year, month, day).toDateString() ===
                        today.toDateString()
                          ? "border-2 border-blue-500 rounded-full px-2 py-1"
                          : new Date(year, month, day).getDay() === 0 ||
                            new Date(year, month, day).getDay() === 6
                          ? "text-orange-500"
                          : "text-gray-800"
                      }`}
                    >
                     {day}
                   </span>
                 </button>
              ))}
              </div>
             </div>

             {selectedDate && (
                <div className="bg-white rounded-xl shadow-md p-5 mt-6">
                  <h2 className="text-xl font-bold mb-4">
                    📅 {selectedDate} の予約
                  </h2>

                  {selectedReservations.length === 0 ? (
                  <p>
                    予約はありません
                  </p>
                ) : (
                  selectedReservations.map(
                    (reservation, index) => (
                      <div
                        key={index}
                        className="border-b py-3">
                        <p className="font-bold">
                            {reservation.name}さん
                        </p>

                        <p>
                            {reservation.time}
                        </p>
                      <Link
      href="/teacher/home"
      className="block w-full rounded-xl border border-orange-500 py-3 text-center font-bold text-orange-500">
      ↩︎ 先生ページに戻る
      </Link>
                       </div>
                    )
                  )
                )}
            </div>
          )}
       </main>
    );
 }
