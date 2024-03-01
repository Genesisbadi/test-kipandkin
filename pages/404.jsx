import Link from "next/link";
export default function Custom404() {
  return (
    <div class="bg-gray-100 flex flex-col items-center justify-center h-screen">
      <div class="text-center">
        <h1 class="text-[140px] mb-[15px] font-bold text-primary">404</h1>
        <p class="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</p>
        <p class="text-lg text-gray-700 mb-8">
          {`The page you're looking for doesn't exist.`}
        </p>
        <Link
          href="/"
          class="text-lg font-semibold text-blue-500 hover:underline"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
