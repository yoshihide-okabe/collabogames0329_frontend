"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      alert("無効なユーザー名またはパスワード");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-b from-lightgreen-50 to-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-lightgreen-200 px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-lightgreen-800">ログイン</h1>
      </header>

      {/* メイン */}
      <main className="flex flex-col items-center justify-start px-4 pt-16 flex-1">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-lightgreen-200 p-6">
          <h2 className="text-xl font-semibold text-lightgreen-800 mb-4 text-center">
            ログイン
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-lightgreen-700 mb-1"
              >
                ユーザー名
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-lightgreen-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightgreen-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-lightgreen-700 mb-1"
              >
                パスワード
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-lightgreen-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightgreen-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-lightgreen-500 hover:bg-lightgreen-600 text-white font-semibold rounded-full shadow-md"
            >
              ログイン
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-lightgreen-700">
              アカウントをお持ちでない方はこちら
            </p>
            <Button
              variant="outline"
              className="mt-2 border-lightgreen-300 text-lightgreen-700 hover:bg-lightgreen-100 w-full rounded-full"
              onClick={() => router.push("/register")}
            >
              新規登録
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
