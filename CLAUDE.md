# CLAUDE.md

## Project Overview

シンプルなTODOリストアプリケーション。Next.js (App Router) + TypeScript + Tailwind CSSで構築。
GitHub Pagesにデプロイ: https://baggio4ever.github.io/cc-todo-next/

## Tech Stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4

## Project Structure

```
src/
  app/
    layout.tsx    — ルートレイアウト (Server Component)
    page.tsx      — TODOアプリのメインUI (Client Component)
    globals.css   — Tailwindベーススタイル
  types/
    todo.ts       — Todo型定義
```

## Commands

- `npm run dev` — 開発サーバー起動
- `npm run build` — プロダクションビルド (静的エクスポート → `out/`)
- `npm run lint` — ESLintによるコードチェック

## Key Configuration

- `next.config.ts`: `output: "export"` で静的エクスポート、`basePath: "/cc-todo-next"` でGitHub Pages対応
- `@/*` パスエイリアスは `./src/*` にマッピング

## Deployment

- mainブランチへのpushで `.github/workflows/deploy.yml` が自動実行
- GitHub Actions でビルド → GitHub Pagesにデプロイ

## Conventions

- コンポーネントはApp Routerの規約に従う
- クライアントサイドの状態管理にはReact hooksを使用
- UIスタイリングはTailwind CSSのユーティリティクラスを使用
