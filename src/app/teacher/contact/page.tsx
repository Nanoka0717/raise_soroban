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

export default function TeacherContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [replyText, setReplyText] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    setContacts(savedContacts);

    // 先生がお問い合わせ画面を開いたので既読にする
    const readIds = savedContacts.map(
      (contact) => contact.id
    );

    localStorage.setItem(
      "teacherReadContactIds",
      JSON.stringify(readIds)
    );
  };

  const sendReply = (id: number) => {
    const text = replyText[id];

    if (!text || !text.trim()) {
      alert("返信内容を入力してください。");
      return;
    }

    const updatedContacts = contacts.map((contact) =>
      contact.id === id
        ? {
            ...contact,
            reply: text,
          }
        : contact
    );

    setContacts(updatedContacts);

    localStorage.setItem(
      "contacts",
      JSON.stringify(updatedContacts)
    );

    // 保護者側に「新着」を付ける
    const unreadIds: number[] = JSON.parse(
      localStorage.getItem(
        "parentUnreadContactIds"
      ) || "[]"
    );

    if (!unreadIds.includes(id)) {
      unreadIds.push(id);
    }

    localStorage.setItem(
      "parentUnreadContactIds",
      JSON.stringify(unreadIds)
    );

    setReplyText({
      ...replyText,
      [id]: "",
    });

    alert("返信しました！");
  };

  // 同じ名前の問い合わせをまとめる
  const groupedContacts = contacts.reduce(
    (groups: { [key: string]: Contact[] }, contact) => {
      if (!groups[contact.name]) {
        groups[contact.name] = [];
      }

      groups[contact.name].push(contact);

      return groups;
    },
    {}
  );

  return (
    <main className="min-h-screen bg-orange-50 p-4">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📩 お問い合わせ
        </h1>

        {Object.keys(groupedContacts).length === 0 ? (

          <div className="rounded-2xl bg-white p-6 text-center shadow-md">
            <p className="text-gray-600">
              お問い合わせはありません。
            </p>
          </div>

        ) : (

          <div className="space-y-6">

            {Object.entries(groupedContacts).map(
              ([studentName, studentContacts]) => (

                <div
                  key={studentName}
                  className="overflow-hidden rounded-2xl bg-white shadow-md"
                >

                  {/* トーク相手 */}
                  <div className="border-b bg-white px-5 py-4">

                    <h2 className="text-xl font-bold">
                      👤 {studentName}さん
                    </h2>

                  </div>

                  {/* トーク画面 */}
                  <div className="space-y-4 bg-gray-100 p-4">

                    {studentContacts.map((contact) => (

                      <div key={contact.id}>

                        {/* 日付 */}
                        <p className="mb-2 text-center text-xs text-gray-500">
                          {contact.date}
                        </p>

                        {/* 保護者のメッセージ */}
                        <div className="flex justify-start">

                          <div className="max-w-[80%]">

                            <p className="mb-1 text-xs text-gray-500">
                              保護者
                            </p>

                            <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                              <p className="whitespace-pre-wrap">
                                {contact.message}
                              </p>
                            </div>

                          </div>

                        </div>

                        {/* 先生の返信 */}
                        {contact.reply && (
                          <div className="mt-3 flex justify-end">

                            <div className="max-w-[80%]">

                              <p className="mb-1 text-right text-xs text-gray-500">
                                先生
                              </p>

                              <div className="rounded-2xl rounded-tr-sm bg-orange-500 px-4 py-3 text-white shadow-sm">
                                <p className="whitespace-pre-wrap">
                                  {contact.reply}
                                </p>
                              </div>

                            </div>

                          </div>
                        )}

                        {/* 返信入力 */}
                        <div className="mt-4">

                          <textarea
                            value={
                              replyText[contact.id] || ""
                            }
                            onChange={(e) =>
                              setReplyText({
                                ...replyText,
                                [contact.id]:
                                  e.target.value,
                              })
                            }
                            placeholder="返信内容を入力してください"
                            rows={3}
                            className="w-full rounded-xl border bg-white p-3"
                          />

                          <button
                            onClick={() =>
                              sendReply(contact.id)
                            }
                            className="mt-2 w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
                          >
                            返信する
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              )
            )}

          </div>

        )}

        {/* 先生ページへ戻る */}
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