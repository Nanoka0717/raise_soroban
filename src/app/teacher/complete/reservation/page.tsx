export default function Page() {
  return (
    <main className="min-h-screen bg-orange-50 p-8">
      <div className="mx-auto max-w-md rounded-2x1 bg-white p-6 text-center shdow">
        <h1 className="mb-4 text-2x1 font-bold text-orange-500">
            予約完了
        </h1>

        <p className="mb-6">
          予約が完了しました！  
        </p>

        <a
          href="/"
          className="inline-block rounded-1g bg-orange-500 px-6 py-3 text-white">
           トップページへ戻る
          </a>
      　</div>
    　</main>
  );
}