"use client";

import React, { useState } from "react";
import Button from "./Button";

type EntregaModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
};

export default function EntregaModal({
  open,
  onClose,
  onSubmit,
}: EntregaModalProps) {
  if (!open) return null;

  const [formData, setFormData] = useState({
    ticket: "",
    equipamento: "",
    categoria: "",
    setor: "",
    responsavel: "",
    quantidade: "",
  });

  function updateField(field: string, value: string) {
    setFormData({ ...formData, [field]: value });
  }

  function handleSubmit() {
    onSubmit(formData);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Registrar Entrega</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Número do chamado (Ticket)"
            className="login-input"
            onChange={(e) => updateField("ticket", e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome do Equipamento"
            className="login-input"
            onChange={(e) => updateField("equipamento", e.target.value)}
          />
          <input
            type="text"
            placeholder="Categoria"
            className="login-input"
            onChange={(e) => updateField("categoria", e.target.value)}
          />
          <input
            type="text"
            placeholder="Setor Entregue"
            className="login-input"
            onChange={(e) => updateField("setor", e.target.value)}
          />
          <input
            type="text"
            placeholder="Responsável pela Entrega"
            className="login-input"
            onChange={(e) => updateField("responsavel", e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            className="login-input"
            onChange={(e) => updateField("quantidade", e.target.value)}
          />
        </div>

        {/* BOTÕES - CANCELAR + SALVAR ESQUERDA / FECHAR DIREITA */}
        <div className="flex justify-between items-center mt-6 w-full">

          {/* Cancelar + Salvar → ESQUERDA */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2"
            >
              Cancelar
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2"
            >
              Salvar
            </Button>
          </div>

          {/* Fechar → DIREITA */}
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-4 py-2"
          >
            Fechar
          </Button>
        </div>

      </div>
    </div>
  );
}
