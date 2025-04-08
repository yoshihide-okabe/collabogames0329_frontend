// src/services/auth.ts

import axios from "axios";

const API_URL = "http://localhost:8000";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserData {
  username: string;
  disabled?: boolean;
}

// アクセストークンをローカルストレージから取得
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

// HTTPクライアントの設定
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエスト時にトークンを追加するインターセプター
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ログイン関数
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  try {
    const response = await axios.post(`${API_URL}/token`, formData);

    // トークンをローカルストレージに保存
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("isLoggedIn", "true");

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ユーザー登録関数
export const register = async (userData: LoginCredentials) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// ログアウト関数
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("isLoggedIn");
};

// 現在のユーザー情報を取得
export const getCurrentUser = async (): Promise<UserData | null> => {
  try {
    const response = await apiClient.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

// トークンの有効性を検証
export const validateToken = async (): Promise<boolean> => {
  try {
    await apiClient.get("/validate-token");
    return true;
  } catch (error) {
    logout(); // 無効なトークンの場合はログアウト
    return false;
  }
};
