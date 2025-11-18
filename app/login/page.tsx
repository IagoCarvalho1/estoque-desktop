'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    // Redireciona direto para a página do estoque
    router.push("/estoque");
  }

  return (
    <div className="login-container animate-fadeIn">
      <div className="login-card animate-slideDown">
        <h1 className="login-title">
          Estoque <span className="login-title2">Desktop</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="login-input mt-4"
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

        <button
          className="login-button animate-press"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
