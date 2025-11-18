'use client';

import { useState } from 'react';
import Table from '../components/Header';
import Button from '../components/Button';
import Modal from '../components/ProductTable';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  setor: string;
  quantidade: number;
}

interface ProdutoEntregue {
  id: number;
  equipamento: string;
  ticket: string;
  categoria: string;
  setor: string;
  quantidade: number;
  patrimonio: string;
}

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: 'Notebook', categoria: 'Eletrônicos', setor: 'TI', quantidade: 12 },
    { id: 2, nome: 'Cadeira', categoria: 'Móveis', setor: 'Administrativo', quantidade: 25 },
  ]);

  const [produtosEntregues, setProdutosEntregues] = useState<ProdutoEntregue[]>([
    { id: 1, equipamento: 'Mouse', ticket: '12345', categoria: 'Periférico', setor: 'TI', quantidade: 1, patrimonio: 'NA' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Produto | ProdutoEntregue | null>(null);
  const [form, setForm] = useState<any>({});
  const [viewEntregues, setViewEntregues] = useState(false); // qual tabela mostrar

  const abrirModal = (item?: Produto | ProdutoEntregue) => {
    if (item) {
      setEditingItem(item);
      setForm({ ...item });
    } else {
      setEditingItem(null);
      setForm({
        nome: '',
        categoria: '',
        setor: '',
        quantidade: 0,
        equipamento: '',
        ticket: '',
        patrimonio: 'NA',
      });
    }
    setShowModal(true);
  };

  const fecharModal = () => setShowModal(false);

  const salvarItem = () => {
    if (editingItem) {
      if ('nome' in editingItem) {
        setProdutos((prev) =>
          prev.map((p) => (p.id === editingItem.id ? { ...editingItem, ...form } : p))
        );
      } else {
        setProdutosEntregues((prev) =>
          prev.map((p) => (p.id === editingItem.id ? { ...editingItem, ...form } : p))
        );
      }
    } else {
      if (form.nome) {
        const novo: Produto = { id: produtos.length + 1, ...form };
        setProdutos((prev) => [...prev, novo]);
      } else {
        const novo: ProdutoEntregue = { id: produtosEntregues.length + 1, ...form };
        setProdutosEntregues((prev) => [...prev, novo]);
      }
    }
    fecharModal();
  };

  const removerItem = (id: number, entregue = false) => {
    if (confirm('Deseja realmente remover este item?')) {
      if (entregue) setProdutosEntregues((prev) => prev.filter((p) => p.id !== id));
      else setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar simples */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <Button
          onClick={() => setViewEntregues(false)}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            !viewEntregues ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Estoque
        </Button>
        <Button
          onClick={() => setViewEntregues(true)}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            viewEntregues ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Equipamentos Entregues
        </Button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8 overflow-x-auto">
        {!viewEntregues ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Estoque de Produtos</h2>
            <Button onClick={() => abrirModal()} className="mb-4 bg-green-600 hover:bg-green-700">
              Adicionar Produto
            </Button>

            <Table
              columns={['Nome', 'Categoria', 'Setor', 'Quantidade', 'Ações']}
              data={produtos.map((p) => [
                p.nome,
                p.categoria,
                p.setor,
                p.quantidade.toString(),
                <div className="flex gap-2">
                  <Button onClick={() => abrirModal(p)} className="bg-blue-600 hover:bg-blue-700">Editar</Button>
                  <Button onClick={() => removerItem(p.id)} className="bg-red-600 hover:bg-red-700">Remover</Button>
                </div>,
              ])}
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Equipamentos Entregues</h2>
            <Button onClick={() => abrirModal()} className="mb-4 bg-green-600 hover:bg-green-700">
              Adicionar Entrega
            </Button>

            <Table
              columns={['Equipamento', 'Ticket', 'Categoria', 'Setor', 'Quantidade', 'Patrimônio', 'Ações']}
              data={produtosEntregues.map((p) => [
                p.equipamento,
                p.ticket,
                p.categoria,
                p.setor,
                p.quantidade.toString(),
                p.patrimonio,
                <div className="flex gap-2">
                  <Button onClick={() => abrirModal(p)} className="bg-blue-600 hover:bg-blue-700">Editar</Button>
                  <Button onClick={() => removerItem(p.id, true)} className="bg-red-600 hover:bg-red-700">Remover</Button>
                </div>,
              ])}
            />
          </>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <Modal onClose={fecharModal} title={editingItem ? 'Editar Item' : form.nome ? 'Adicionar Produto' : 'Adicionar Entrega'}>
          {form.nome ? (
            <>
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              <input
                type="text"
                placeholder="Categoria"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              />
              <input
                type="text"
                placeholder="Setor"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.setor}
                onChange={(e) => setForm({ ...form, setor: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantidade"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.quantidade}
                onChange={(e) => setForm({ ...form, quantidade: Number(e.target.value) })}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Equipamento"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.equipamento}
                onChange={(e) => setForm({ ...form, equipamento: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ticket"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.ticket}
                onChange={(e) => setForm({ ...form, ticket: e.target.value })}
              />
              <input
                type="text"
                placeholder="Categoria"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              />
              <input
                type="text"
                placeholder="Setor"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.setor}
                onChange={(e) => setForm({ ...form, setor: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantidade"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.quantidade}
                onChange={(e) => setForm({ ...form, quantidade: Number(e.target.value) })}
              />
              <input
                type="text"
                placeholder="Patrimônio"
                className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
                value={form.patrimonio}
                onChange={(e) => setForm({ ...form, patrimonio: e.target.value })}
              />
            </>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={fecharModal} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
            <Button onClick={salvarItem} className="bg-blue-600 hover:bg-blue-700">Salvar</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
