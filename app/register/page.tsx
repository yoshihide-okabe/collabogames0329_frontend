"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
    alert("登録が完了しました！");
    router.push("/");
  };

  const categories = [
    "システム部",
    "経理部",
    "事業企画部",
    "デザイン部",
    "営業部",
    "アート",
    "音楽",
    "法務部",
    "知財部",
    "情セキ部",
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-lightgreen-50 to-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-lightgreen-200 px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-lightgreen-800">ユーザー登録</h1>
      </header>

      {/* メイン */}
      <main className="flex flex-col items-center justify-start px-4 pt-10 flex-1">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-lightgreen-200 p-6">
          <h2 className="text-xl font-semibold text-lightgreen-800 mb-4 text-center">
            登録フォーム
          </h2>
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

            <Button
              type="submit"
              className="w-full bg-lightgreen-500 hover:bg-lightgreen-600 text-white font-semibold rounded-full shadow-md"
            >
              登録
            </Button>
          </form>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
