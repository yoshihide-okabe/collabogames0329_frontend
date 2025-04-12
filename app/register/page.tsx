"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isNewUser, setIsNewUser] = useState(true); // 新規ユーザーかどうかのフラグ
  const router = useRouter();

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNewUser && password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    alert(isNewUser ? "登録が完了しました！" : "変更が完了しました！");
    router.push("/");
  };

  const handleCancel = () => {
    // 入力内容をクリア
    setName("");
    setPassword("");
    setConfirmPassword("");
    setSelectedCategories([]);
  };

  const toggleUserType = () => {
    setIsNewUser(!isNewUser);
    // ユーザータイプが変更されたらフォームをリセット
    setName("");
    setPassword("");
    setConfirmPassword("");
    setSelectedCategories([]);
  };

  const categories = [
    "システム部",
    "経理部",
    "事業企画部",
    "デザイン部",
    "営業部",
    "人事部",
    "音楽",
    "法務部",
    "知財部",
    "情報セキュリティ部",
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-lightgreen-50 to-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-lightgreen-200 px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-lightgreen-800">
          {isNewUser ? "ユーザー登録" : "ユーザー情報変更"}
        </h1>
      </header>

      {/* メイン */}
      <main className="flex flex-col items-center justify-start px-4 pt-10 flex-1 overflow-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-lightgreen-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-lightgreen-800 text-center w-full">
              {isNewUser ? "新規登録フォーム" : "情報変更フォーム"}
            </h2>
          </div>

          <div className="mb-4 flex justify-center">
            <Button
              type="button"
              variant="outline"
              className={`mr-2 ${
                isNewUser ? "bg-lightgreen-100 border-lightgreen-500" : ""
              }`}
              onClick={() => isNewUser || toggleUserType()}
            >
              新規登録
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`${
                !isNewUser ? "bg-lightgreen-100 border-lightgreen-500" : ""
              }`}
              onClick={() => isNewUser && toggleUserType()}
            >
              情報変更
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-lightgreen-700 mb-1"
              >
                名前
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-lightgreen-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightgreen-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {isNewUser && (
              <>
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

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm text-lightgreen-700 mb-1"
                  >
                    パスワード（確認）
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 border border-lightgreen-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightgreen-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm text-lightgreen-700 mb-1">
                カテゴリーを選択してください
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={
                      selectedCategories.includes(category)
                        ? "default"
                        : "outline"
                    }
                    className={`rounded-full text-xs h-8 w-full ${
                      selectedCategories.includes(category)
                        ? "bg-lightgreen-500 text-white"
                        : "border-lightgreen-300 bg-lightgreen-50 text-lightgreen-700 hover:bg-lightgreen-100"
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-lightgreen-500 hover:bg-lightgreen-600 text-white font-semibold rounded-full shadow-md"
              >
                {isNewUser ? "登録" : "変更"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-lightgreen-300 text-lightgreen-700 hover:bg-lightgreen-100 rounded-full"
                onClick={handleCancel}
              >
                キャンセル
              </Button>
            </div>
          </form>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
