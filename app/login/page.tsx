'use client';

import { useState } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    try {
      const token = await invoke<string>("login_usuario", { email, senha });

      localStorage.setItem("auth_token", token);

      router.push("/estoque"); // redireciona para o dashboard
    } catch (err) {
      alert("Login inválido");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          Estoque <span className="login-title2">Desktop</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="login-input mt-3"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
