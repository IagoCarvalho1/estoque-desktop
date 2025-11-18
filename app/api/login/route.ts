import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Simulação de validação
  if (username === "admin" && password === "1234") {
    const response = NextResponse.json({ message: "Login sucesso" });
    // Cookie de 1h
    response.cookies.set({
      name: "token",
      value: "meu-token-fake",
      maxAge: 3600,
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ message: "Usuário ou senha inválidos" }, { status: 401 });
}
