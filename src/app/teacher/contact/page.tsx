"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Contact = {
  id: number;
  name: string;
  message: string;
  reply: string;
};

export default function TeacherContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [replyText, setReplyText] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const savedContacts = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    setContacts(savedContacts);
  }, []);

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

    setReplyText({
      ...replyText,
      [id]: "",
    });

    alert("返信しました！");
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📩 お問い合わせ
        </h1>

        {contacts.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-md">
            <p className="text-gray-600">
              お問い合わせはありません。
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {contacts.map((contact) => (

              <div
                key={contact.id}
                className="rounded-2xl bg-white p-6 shadow-md"
              >

                <h2 className="mb-4 text-xl font-bold">
                  👤 {contact.name}さん
                </h2>

                <div className="mb-4">

                  <p className="font-bold text-gray-600">
                    お問い合わせ内容
                  </p>

                  <p className="mt-2 rounded-lg bg-gray-50 p-4">
                    {contact.message}
                  </p>

                </div>

                <div>

                  <p className="font-bold text-gray-600">
                    返信
                  </p>

                  <textarea
                    value={replyText[contact.id] || ""}
                    onChange={(e) =>
                      setReplyText({
                        ...replyText,
                        [contact.id]: e.target.value,
                      })
                    }
                    placeholder="返信内容を入力してください"
                    className="mt-2 w-full rounded-lg border p-3"
                    rows={4}
                  />

                  <button
                    onClick={() => sendReply(contact.id)}
                    className="mt-3 w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
                  >
                    返信する
                  </button>

                </div>

                {contact.reply && (

                  <div className="mt-5">

                    <p className="font-bold text-gray-600">
                      現在の返信
                    </p>

                    <p className="mt-2 rounded-lg bg-orange-50 p-4">
                      {contact.reply}
                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>
        )}

        {/* 先生ページに戻るボタン */}
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