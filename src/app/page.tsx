import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">
    <div className="w-full max-w-md bg-white rounded-3x1 shadow-x1 p-8">

      <div className="text-center">
        <h1 className="text-5x1 font-bold text-orange-500">
          🧮Raise そろばん
          </h1>
          
          <p className="mt-4 text-gray-600">
            楽しみながら、力を伸ばそう！
          </p>
        </div>
      
        <div className="mt-10 space-y-4 flex flex-col items-center">
        <Link
          href="/teacher/login"  
          className="block w-64 bg-orange-500 text-white py-4 rounded-lg text-lg font-semibold text-center"
          >
        👩‍🏫先生ログイン
         </Link>

         <Link
           href="/students/new/parent/login"
           className="block w-64 bg-blue-500 text-white py-4 rounded-lgs text-lg font-semibold text-crnter">
            
               　　　　　　 🧑‍🧑‍🧒保護者ログイン
　　　　　　</Link>

        </div>

      </div>
    </main>
  );
}
