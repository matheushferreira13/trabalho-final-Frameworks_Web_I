# CONTEXTO DO PROJETO - OPERAFLOW SAAS

## VISÃO GERAL
Este é um SaaS multi-tenant de e-commerce.

Cada cliente (lojista) possui:
- sua própria loja
- seus produtos
- seus pedidos
- seu painel admin

Tudo separado por tenant_id.

---

## STACK

Frontend:
- React + TypeScript + Vite

Backend:
- Node.js + Express

Banco:
- PostgreSQL / Supabase

Pagamentos:
- Mercado Pago (Checkout Pro)

Arquitetura:
- multi-tenant via tenant_id

---

## FUNCIONALIDADES

- Loja online (storefront)
- Carrinho
- Checkout
- Integração Mercado Pago
- Painel admin:
  - dashboard
  - produtos
  - pedidos
  - configurações
- Sistema de assinatura SaaS (trial + planos)

---

## REGRAS IMPORTANTES

1. MULTI-TENANT
- Sempre usar tenant_id
- Nunca misturar dados entre lojas
- Nunca confiar em tenant_id vindo do frontend
- Sempre usar req.user.tenant_id no backend

---

2. PAGAMENTOS
- Checkout via Mercado Pago
- Backend cria preferência
- Webhook atualiza pagamento
- Status:
  pending → paid

---

3. SEGURANÇA
- JWT obrigatório nas rotas admin
- validação de dados
- uploads seguros
- rate limit

---

4. FRONTEND
- Mobile first
- UX simples e limpa
- evitar sobreposição de elementos
- feedback visual sempre (loading, erro, sucesso)

---

5. OBJETIVO DO PRODUTO

Criar uma plataforma simples e rápida para lojistas venderem online com:
- boa experiência mobile
- checkout eficiente
- painel fácil de usar

---

## ROADMAP

FASE ATUAL:
- finalizar frontend
- corrigir bugs UX
- testar fluxo de compra
- preparar deploy

PRÓXIMAS FASES:
- melhorar dashboard
- automações
- IA via WhatsApp (n8n)

---

## COMO RESPONDER

Sempre:
- sugerir código limpo
- evitar complexidade desnecessária
- manter padrão do projeto
- pensar em escalabilidade
- respeitar multi-tenant