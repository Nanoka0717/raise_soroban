"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Contact = {
  id: number;
  name: string;
  message: string;
  date: string;
  reply: string;
};

export default function ParentContactPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // ログインしているお子様の名前
    const studentName =
      localStorage.getItem("parentStudentName");

    if (studentName) {
      setName(studentName);
    }

    // お問い合わせを取得
    const savedContacts = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    // 自分のお問い合わせだけ表示
    const myContacts = savedContacts.filter(
      (contact: Contact) =>
        contact.name === studentName
    );

    setContacts(myContacts);
  }, []);

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("お問い合わせ内容を入力してください");
      return;
    }

    if (!name) {
      alert("お子様の名前が確認できません");
      return;
    }

    const contact: Contact = {
      id: Date.now(),
      name,
      message,
      date: new Date().toLocaleString("ja-JP"),
      reply: "",
    };

    const oldContacts = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    const newContacts = [
      ...oldContacts,
      contact,
    ];

    localStorage.setItem(
      "contacts",
      JSON.stringify(newContacts)
    );

    setContacts([
      ...contacts,
      contact,
    ]);

    setMessage("");

    alert("お問い合わせを送信しました！");
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="mx-auto max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          📩 お問い合わせ
        </h1>

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <p className="mb-6 text-gray-600">
            ご質問やご相談がありましたら、
            下記からお問い合わせください。
          </p>

          <div className="mb-5">

            <label className="mb-2 block font-bold">
              お名前
            </label>

            <input
              type="text"
              value={name}
              readOnly
              className="w-full rounded-lg border bg-gray-100 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-bold">
              お問い合わせ内容
            </label>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="お問い合わせ内容を入力してください"
              rows={6}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-bold text-white"
          >
            送信する
          </button>

        </div>

        {/* 過去のお問い合わせ */}
        <div className="mt-6">

          <h2 className="mb-4 text-xl font-bold text-orange-600">
            📬 お問い合わせ履歴
          </h2>

          {contacts.length === 0 ? (
            <div className="rounded-2xl bg-white p-5 shadow-md">
              <p className="text-gray-600">
                お問い合わせ履歴はありません。
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="rounded-2xl bg-white p-5 shadow-md"
                >

                  <p className="text-sm text-gray-500">
                    {contact.date}
                  </p>

                  <p className="mt-3 font-bold text-gray-600">
                    お問い合わせ
                  </p>

                  <p className="mt-2 rounded-lg bg-gray-50 p-3">
                    {contact.message}
                  </p>

                  {contact.reply ? (
                    <div className="mt-4">

                      <p className="font-bold text-orange-600">
                        👩‍🏫 先生からの返信
                      </p>

                      <p className="mt-2 rounded-lg bg-orange-50 p-3">
                        {contact.reply}
                      </p>

                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-gray-500">
                      先生からの返信をお待ちください。
                    </p>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

        <button
          onClick={() =>
            router.push(
              "/students/new/parent/login/parent"
            )
          }
          className="mt-6 w-full rounded-xl border border-orange-500 py-3 font-bold text-orange-500"
        >
          トップページに戻る
        </button>

      </div>

    </main>
  );
}

