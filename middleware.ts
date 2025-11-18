import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, senha } = await req.json();

  if (!email || !senha) {
    return NextResponse.json(
      { error: "Email e senha são obrigatórios" },
      { status: 400 }
    );
  }

  // Simulação de login bem-sucedido
  if (email === "admin@admin.com" && senha === "123") {
    const token = "token-falso-" + Math.random().toString(36).substring(2);

    return NextResponse.json({
      ok: true,
      token,
      user: {
        nome: "Administrador",
        email,
      },
    });
  }

  return NextResponse.json(
    { error: "Credenciais inválidas" },
    { status: 401 }
  );
}
