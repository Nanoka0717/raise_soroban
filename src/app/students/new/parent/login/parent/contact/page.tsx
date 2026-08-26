"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Contact = {
  id: number;
  name: string;
  message: string;
  date: string;
  reply: string;
};

export default function ParentContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const studentName =
      localStorage.getItem("parentStudentName") || "";

    setName(studentName);

    loadContacts(studentName);

    // この画面を開いたら先生からの返信を既読にする
    const unreadIds: number[] = JSON.parse(
      localStorage.getItem(
        "parentUnreadContactIds"
      ) || "[]"
    );

    if (unreadIds.length > 0) {
      localStorage.setItem(
        "parentUnreadContactIds",
        JSON.stringify([])
      );
    }
  }, []);

  const loadContacts = (studentName: string) => {
    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const myContacts = savedContacts.filter(
      (contact) =>
        contact.name === studentName
    );

    setContacts(myContacts);
  };

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("お問い合わせ内容を入力してください");
      return;
    }

    if (!name) {
      alert("お子様の名前が確認できません");
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name: name,
      message: message,
      date: new Date().toLocaleString("ja-JP"),
      reply: "",
    };

    const oldContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const newContacts = [
      ...oldContacts,
      newContact,
    ];

    localStorage.setItem(
      "contacts",
      JSON.stringify(newContacts)
    );

    setContacts([
      ...contacts,
      newContact,
    ]);

    setMessage("");

    // 先生側に新着を付ける
    const teacherReadIds: number[] = JSON.parse(
      localStorage.getItem(
        "teacherReadContactIds"
      ) || "[]"
    );

    const updatedTeacherReadIds =
      teacherReadIds.filter(
        (id) => id !== newContact.id
      );

    localStorage.setItem(
      "teacherReadContactIds",
      JSON.stringify(updatedTeacherReadIds)
    );

    alert("お問い合わせを送信しました！");
  };

  const goBack = () => {
    window.location.href =
      "/students/new/parent/login/parent";
  };

  return (
    <main className="min-h-screen bg-orange-50 p-4">

      <div className="mx-auto max-w-md">

        {/* タイトル */}
        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📩 お問い合わせ
        </h1>

        {/* トーク画面 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">

          {/* 相手の名前 */}
          <div className="border-b bg-white px-5 py-4">

            <h2 className="text-xl font-bold">
              👩‍🏫 先生とのトーク
            </h2>

            {name && (
              <p className="mt-1 text-sm text-gray-500">
                {name}さん
              </p>
            )}

          </div>

          {/* メッセージ一覧 */}
          <div className="space-y-4 bg-gray-100 p-4">

            {contacts.length === 0 ? (

              <div className="py-10 text-center">

                <p className="text-gray-500">
                  まだお問い合わせはありません。
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  下から先生にお問い合わせできます。
                </p>

              </div>

            ) : (

              contacts.map((contact) => (

                <div key={contact.id}>

                  {/* 日付 */}
                  <p className="mb-2 text-center text-xs text-gray-500">
                    {contact.date}
                  </p>

                  {/* 保護者のメッセージ */}
                  <div className="flex justify-end">

                    <div className="max-w-[80%]">

                      <p className="mb-1 text-right text-xs text-gray-500">
                        保護者
                      </p>

                      <div className="rounded-2xl rounded-tr-sm bg-orange-500 px-4 py-3 text-white shadow-sm">

                        <p className="whitespace-pre-wrap">
                          {contact.message}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* 先生の返信 */}
                  {contact.reply && (

                    <div className="mt-3 flex justify-start">

                      <div className="max-w-[80%]">

                        <p className="mb-1 text-xs text-gray-500">
                          先生
                        </p>

                        <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">

                          <p className="whitespace-pre-wrap">
                            {contact.reply}
                          </p>

                        </div>

                      </div>

                    </div>

                  )}

                </div>

              ))

            )}

          </div>

          {/* 新しいメッセージ入力 */}
          <div className="border-t bg-white p-4">

            <p className="mb-2 font-bold text-gray-600">
              メッセージを送る
            </p>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="メッセージを入力してください"
              rows={3}
              className="w-full rounded-xl border p-3"
            />

            <button
              onClick={handleSubmit}
              className="mt-3 w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
            >
              送信する
            </button>

          </div>

        </div>

        {/* トップページに戻る */}
        <button
          onClick={goBack}
          className="mt-6 w-full rounded-xl border border-orange-500 py-3 font-bold text-orange-500"
        >
          ↩︎ トップページに戻る
        </button>

      </div>

    </main>
  );
}