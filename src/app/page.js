import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">User Authentication System</h1>
      <p className="mt-4 text-lg">Prevention is better than cure</p>
      <Image 
        src="/authentication-illustration.png" // Corrected path
        alt="Shift Planning System Logo" 
        width={500} 
        height={200} 
        className="mt-8"
      />
      <p className="mt-8 text-center">
        Main page
      </p>
      <div className="mt-8">
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Let's Start
        </Link>
      </div>
    </main>
  );
}
