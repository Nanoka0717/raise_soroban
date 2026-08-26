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
  const [replyText, setReplyText] = useState("");

  // お問い合わせを読み込む
  const loadContacts = () => {
    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    setContacts(savedContacts);
  };

  useEffect(() => {
    loadContacts();

    // 先生がお問い合わせ画面を開いたので既読にする
    const savedContacts: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const readIds = savedContacts.map(
      (contact: Contact) => contact.id
    );

    localStorage.setItem(
      "teacherReadContactIds",
      JSON.stringify(readIds)
    );
  }, []);

  // 返信する
  const sendReply = () => {
    if (!replyText.trim()) {
      alert("返信内容を入力してください。");
      return;
    }

    if (contacts.length === 0) {
      alert("お問い合わせがありません。");
      return;
    }

    /*
     * まだ返信していない一番新しいお問い合わせを探す
     */
    const unansweredContacts = contacts.filter(
      (contact) =>
        !contact.reply ||
        contact.reply.trim() === ""
    );

    if (unansweredContacts.length === 0) {
      alert(
        "返信できる新しいお問い合わせがありません。"
      );
      return;
    }

    const targetContact =
      unansweredContacts[unansweredContacts.length - 1];

    const updatedContacts = contacts.map(
      (contact) =>
        contact.id === targetContact.id
          ? {
              ...contact,
              reply: replyText.trim(),
            }
          : contact
    );

    // 画面を更新
    setContacts(updatedContacts);

    // localStorageに保存
    localStorage.setItem(
      "contacts",
      JSON.stringify(updatedContacts)
    );

    /*
     * 保護者側に「新着」を表示する
     */
    const unreadIds: number[] = JSON.parse(
      localStorage.getItem(
        "parentUnreadContactIds"
      ) || "[]"
    );

    if (!unreadIds.includes(targetContact.id)) {
      unreadIds.push(targetContact.id);
    }

    localStorage.setItem(
      "parentUnreadContactIds",
      JSON.stringify(unreadIds)
    );

    // 入力欄を空にする
    setReplyText("");

    alert("返信しました！");
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

          {/* ヘッダー */}
          <div className="border-b bg-white px-5 py-4">

            <h2 className="text-xl font-bold">
              👤 保護者とのトーク
            </h2>

            {contacts.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {contacts[0].name}さん
              </p>
            )}

          </div>

          {/* メッセージ一覧 */}
          <div className="min-h-[400px] space-y-5 bg-gray-100 p-4">

            {contacts.length === 0 ? (

              <div className="py-20 text-center">

                <p className="text-gray-500">
                  まだお問い合わせはありません。
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
                  <div className="flex justify-start">

                    <div className="max-w-[80%]">

                      <p className="mb-1 text-xs text-gray-500">
                        保護者
                      </p>

                      <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">

                        <p className="whitespace-pre-wrap break-words">
                          {contact.message}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* 先生の返信 */}
                  {contact.reply &&
                    contact.reply.trim() !== "" && (

                    <div className="mt-3 flex justify-end">

                      <div className="max-w-[80%]">

                        <p className="mb-1 text-right text-xs text-gray-500">
                          先生
                        </p>

                        <div className="rounded-2xl rounded-tr-sm bg-orange-500 px-4 py-3 text-white shadow-sm">

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

          {/* 返信入力欄 */}
          <div className="border-t bg-white p-4">

            <textarea
              value={replyText}
              onChange={(e) =>
                setReplyText(e.target.value)
              }
              placeholder="メッセージを入力してください"
              rows={3}
              className="w-full rounded-xl border p-3"
            />

            <button
              onClick={sendReply}
              className="mt-3 w-full rounded-xl bg-orange-500 py-3 text-lg font-bold text-white"
            >
              送信する
            </button>

          </div>

        </div>

        {/* 先生ページへ戻る */}
        <div className="mt-6">

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