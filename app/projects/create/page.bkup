"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // カテゴリーのオプション（参考画像から抽出）
  const categories = [
    { id: "technology", name: "テクノロジー" },
    { id: "design", name: "デザイン" },
    { id: "marketing", name: "マーケティング" },
    { id: "business", name: "ビジネス" },
    { id: "education", name: "教育" },
    { id: "community", name: "コミュニティ" },
    { id: "healthcare", name: "医療" },
    { id: "environment", name: "環境" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // 入力検証
    if (!formData.name || !formData.description || !formData.category) {
      setError("すべての項目を入力してください");
      setIsSubmitting(false);
      return;
    }

    try {
      // APIリクエスト
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "プロジェクトの登録に失敗しました"
        );
      }

      // 成功したらプロジェクト一覧ページに戻る
      router.push("/projects");
    } catch (err) {
      console.error("プロジェクト登録エラー:", err);
      setError(
        err instanceof Error
          ? err.message
          : "プロジェクトの登録中にエラーが発生しました"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">新規プロジェクト</h1>
        <p className="text-gray-600">
          あなたのプロジェクトの詳細を入力してください
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border-l-4 border-red-600 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-semibold text-gray-700">
            プロジェクト名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="例: 地域コミュニティアプリの開発"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block font-semibold text-gray-700"
          >
            プロジェクト詳細 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="プロジェクトの詳細説明をここに入力してください"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <p className="text-sm text-gray-500">
            ※プロジェクトの詳細説明やゴール、メリットなどを記載してください
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block font-semibold text-gray-700"
          >
            カテゴリー <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="" disabled>
              カテゴリーを選択
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "登録中..." : "登録する"}
          </button>
        </div>
      </form>
    </div>
  );
}
