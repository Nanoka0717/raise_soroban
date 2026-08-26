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

  const loadContacts = () => {
    const studentName =
      localStorage.getItem("parentStudentName") || "";

    setName(studentName);

    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const myContacts = savedContacts.filter(
      (contact: Contact) =>
        contact.name === studentName
    );

    setContacts(myContacts);
  };

  useEffect(() => {
    loadContacts();

    /*
     * この画面を開いた＝
     * 保護者が先生からの返信を確認した
     */

    const studentName =
      localStorage.getItem("parentStudentName") || "";

    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const myContacts = savedContacts.filter(
      (contact: Contact) =>
        contact.name === studentName &&
        contact.reply &&
        contact.reply.trim() !== ""
    );

    const oldReadIds: number[] = JSON.parse(
      localStorage.getItem("parentReadContactIds") || "[]"
    );

    const newReadIds = [...oldReadIds];

    myContacts.forEach((contact) => {
      if (!newReadIds.includes(contact.id)) {
        newReadIds.push(contact.id);
      }
    });

    localStorage.setItem(
      "parentReadContactIds",
      JSON.stringify(newReadIds)
    );

    // 画面を開いたので通知を更新
    window.dispatchEvent(new Event("storage"));
  }, []);

  /*
   * 保護者から新しいお問い合わせを送信
   */
  const sendMessage = () => {
    if (!message.trim()) {
      alert("お問い合わせ内容を入力してください。");
      return;
    }

    if (!name) {
      alert("お子様の名前が確認できません。");
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name: name,
      message: message.trim(),
      date: new Date().toLocaleString("ja-JP"),
      reply: "",
    };

    const oldContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const updatedContacts = [
      ...oldContacts,
      newContact,
    ];

    localStorage.setItem(
      "contacts",
      JSON.stringify(updatedContacts)
    );

    /*
     * 先生側の新着通知
     */
    const teacherReadIds: number[] = JSON.parse(
      localStorage.getItem("teacherReadContactIds") || "[]"
    );

    const newTeacherReadIds =
      teacherReadIds.filter(
        (id) => id !== newContact.id
      );

    localStorage.setItem(
      "teacherReadContactIds",
      JSON.stringify(newTeacherReadIds)
    );

    setContacts([
      ...contacts,
      newContact,
    ]);

    setMessage("");

    alert("送信しました！");
  };

  const goBack = () => {
    window.location.href =
      "/students/new/parent/login/parent";
  };

  return (
    <main className="min-h-screen bg-orange-50 p-4">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📩 お問い合わせ
        </h1>

        {/* LINE風トーク */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">

          {/* ヘッダー */}
          <div className="border-b bg-white px-5 py-4">

            <h2 className="text-xl font-bold">
              👩‍🏫 先生とのトーク
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {name}さん
            </p>

          </div>

          {/* メッセージ一覧 */}
          <div className="min-h-[400px] space-y-5 bg-gray-100 p-4">

            {contacts.length === 0 ? (

              <div className="py-20 text-center">
                <p className="text-gray-500">
                  まだメッセージはありません。
                </p>
              </div>

            ) : (

              contacts.map((contact) => (

                <div key={contact.id}>

                  {/* 日付 */}
                  <p className="mb-2 text-center text-xs text-gray-500">
                    {contact.date}
                  </p>

                  {/* 保護者 */}
                  <div className="flex justify-end">

                    <div className="max-w-[80%]">

                      <p className="mb-1 text-right text-xs text-gray-500">
                        保護者
                      </p>

                      <div className="rounded-2xl rounded-tr-sm bg-green-400 px-4 py-3 shadow-sm">

                        <p className="whitespace-pre-wrap break-words">
                          {contact.message}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* 先生 */}
                  {contact.reply &&
                    contact.reply.trim() !== "" && (

                    <div className="mt-3 flex justify-start">

                      <div className="max-w-[80%]">

                        <p className="mb-1 text-xs text-gray-500">
                          先生
                        </p>

                        <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">

                          <p className="whitespace-pre-wrap break-words">
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

          {/* 送信欄 */}
          <div className="border-t bg-white p-4">

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
              onClick={sendMessage}
              className="mt-3 w-full rounded-xl bg-orange-500 py-3 text-lg font-bold text-white"
            >
              送信する
            </button>

          </div>

        </div>

        {/* 戻る */}
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