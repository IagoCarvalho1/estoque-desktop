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
  patrimonio?: string;
  numeroSerie?: string;
  observacao?: string;
}

interface ProdutoEntregue {
  id: number;
  equipamento: string;
  ticket: string;
  categoria: string;
  setor: string;
  quantidade: number;
  patrimonio: string;
  numeroSerie?: string;
  observacao?: string;
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
  const [entregaItem, setEntregaItem] = useState<Produto | null>(null);
  const [viewEntregues, setViewEntregues] = useState(false);
  const [form, setForm] = useState<any>({});

  const abrirModalNovo = () => {
    setEditingItem(null);
    setEntregaItem(null);
    setForm({
      nome: '',
      categoria: '',
      setor: '',
      quantidade: 1,
      patrimonio: '',
      numeroSerie: '',
      observacao: '',
    });

    setShowModal(true);
  };

  const abrirModalEditar = (item: Produto | ProdutoEntregue) => {
    setEditingItem(item);
    setEntregaItem(null);

    setForm({ ...item });

    setShowModal(true);
  };

  const abrirEntregaModal = (item: Produto) => {
    setEntregaItem(item);
    setEditingItem(null);

    setForm({
      equipamento: item.nome,
      categoria: item.categoria,
      setor: '',
      ticket: '',
      quantidade: 1,
      patrimonio: '',
      numeroSerie: '',
      observacao: '',
    });

    setShowModal(true);
  };

  const fecharModal = () => {
    setEditingItem(null);
    setEntregaItem(null);
    setForm({});
    setShowModal(false);
  };

  const salvarItem = () => {
    // Registro de entrega
    if (entregaItem) {
      const qtd = Number(form.quantidade);

      if (qtd > entregaItem.quantidade) {
        alert('Quantidade entregue maior que a disponível!');
        return;
      }

      const novo: ProdutoEntregue = {
        id: produtosEntregues.length + 1,
        equipamento: form.equipamento,
        ticket: form.ticket,
        categoria: form.categoria,
        setor: form.setor,
        quantidade: qtd,
        patrimonio: form.patrimonio || 'NA',
        numeroSerie: form.numeroSerie || '',
        observacao: form.observacao || '',
      };

      setProdutosEntregues(prev => [...prev, novo]);

      // Atualiza estoque
      setProdutos(prev =>
        prev.map(p => (p.id === entregaItem.id ? { ...p, quantidade: p.quantidade - qtd } : p))
      );

      fecharModal();
      return;
    }

    // Edição
    if (editingItem) {
      if ('nome' in editingItem) {
        setProdutos(prev =>
          prev.map(p => (p.id === editingItem.id ? { ...editingItem, ...form } : p))
        );
      } else {
        setProdutosEntregues(prev =>
          prev.map(p => (p.id === editingItem.id ? { ...editingItem, ...form } : p))
        );
      }

      fecharModal();
      return;
    }

    // Novo Produto
    const novo: Produto = {
      id: produtos.length + 1,
      nome: form.nome,
      categoria: form.categoria,
      setor: form.setor,
      quantidade: Number(form.quantidade),
      patrimonio: form.patrimonio,
      numeroSerie: form.numeroSerie,
      observacao: form.observacao,
    };

    setProdutos(prev => [...prev, novo]);

    fecharModal();
  };

  const removerItem = (id: number, entregue = false) => {
    if (!confirm('Deseja realmente remover?')) return;

    if (entregue) {
      setProdutosEntregues(prev => prev.filter(p => p.id !== id));
    } else {
      setProdutos(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>

        <Button
          onClick={() => setViewEntregues(false)}
          className={`w-full text-left px-4 py-2 rounded-lg ${!viewEntregues ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Estoque
        </Button>

        <Button
          onClick={() => setViewEntregues(true)}
          className={`w-full text-left px-4 py-2 rounded-lg ${viewEntregues ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Entregues
        </Button>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8 overflow-x-auto">

        {!viewEntregues ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Estoque de Produtos</h2>

            <Button
              onClick={abrirModalNovo}
              className="bg-green-600 hover:bg-green-700 mb-4"
            >
              Adicionar Produto
            </Button>

            <Table
              columns={['Nome', 'Categoria', 'Setor', 'Qtd', 'Patrimônio', 'Nº Série', 'Observação', 'Ações']}
              data={produtos.map(p => [
                p.nome,
                p.categoria,
                p.setor,
                p.quantidade.toString(),
                p.patrimonio || '',
                p.numeroSerie || '',
                p.observacao || '',
                <div className="flex gap-2">
                  <Button onClick={() => abrirModalEditar(p)} className="bg-blue-600">Editar</Button>
                  <Button onClick={() => removerItem(p.id)} className="bg-red-600">Remover</Button>
                  <Button onClick={() => abrirEntregaModal(p)} className="bg-yellow-600">Entregar</Button>
                </div>
              ])}
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Equipamentos Entregues</h2>

            <Table
              columns={['Equipamento', 'Ticket', 'Categoria', 'Setor', 'Qtd', 'Patrimônio', 'Nº Série', 'Obs', 'Ações']}
              data={produtosEntregues.map(p => [
                p.equipamento,
                p.ticket,
                p.categoria,
                p.setor,
                p.quantidade.toString(),
                p.patrimonio,
                p.numeroSerie || '',
                p.observacao || '',
                <div className="flex gap-2">
                  <Button onClick={() => abrirModalEditar(p)} className="bg-blue-600">Editar</Button>
                  <Button onClick={() => removerItem(p.id, true)} className="bg-red-600">Remover</Button>
                </div>
              ])}
            />
          </>
        )}
      </main>

      {/* MODAL */}
      {showModal && (
        <Modal
          onClose={fecharModal}
          title={
            editingItem
              ? 'Editar Item'
              : entregaItem
              ? 'Registrar Entrega'
              : 'Adicionar Produto'
          }
        >
          {/* Nome / Equipamento */}
          {!entregaItem && (
            <input
              type="text"
              placeholder="Nome do Produto"
              className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          )}

          {/* Equipamento na entrega */}
          {entregaItem && (
            <input
              type="text"
              disabled
              className="w-full p-3 rounded-lg mb-3 bg-gray-800 border border-gray-600 text-gray-400"
              value={form.equipamento}
            />
          )}

          {/* Categoria */}
          <input
            type="text"
            placeholder="Categoria"
            className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />

          {/* Setor */}
          <input
            type="text"
            placeholder="Setor"
            className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
            value={form.setor}
            onChange={(e) => setForm({ ...form, setor: e.target.value })}
          />

          {/* Ticket → só em entregas */}
          {entregaItem && (
            <input
              type="text"
              placeholder="Ticket"
              className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
              value={form.ticket}
              onChange={(e) => setForm({ ...form, ticket: e.target.value })}
            />
          )}

          {/* Quantidade */}
          <input
            type="number"
            placeholder="Quantidade"
            className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
            min={1}
            max={entregaItem?.quantidade}
            value={form.quantidade}
            onChange={(e) => setForm({ ...form, quantidade: Number(e.target.value) })}
          />

          {/* Patrimônio */}
          <input
            type="text"
            placeholder="Patrimônio"
            className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
            value={form.patrimonio}
            onChange={(e) => setForm({ ...form, patrimonio: e.target.value })}
          />

          {/* Nº de Série */}
          <input
            type="text"
            placeholder="Nº de Série"
            className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600"
            value={form.numeroSerie}
            onChange={(e) => setForm({ ...form, numeroSerie: e.target.value })}
          />

          {/* Observação */}
          <textarea
            placeholder="Observação"
            className="w-full p-3 rounded-lg mb-3 bg-gray-700 border border-gray-600 resize-none overflow-hidden"
            value={form.observacao}
            onInput={(e: any) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onChange={(e) => setForm({ ...form, observacao: e.target.value })}
            rows={1}
          />

          {/* BOTÕES */}
          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={fecharModal} className="bg-gray-600 hover:bg-gray-700 px-5">
              Cancelar
            </Button>
            <Button onClick={salvarItem} className="bg-blue-600 hover:bg-blue-700 px-5">
              Salvar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
