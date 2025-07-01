# Deploy no GitHub Pages

Este projeto está configurado para ser hospedado no GitHub Pages.

## Pré-requisitos

1. Ter um repositório no GitHub
2. Ter o projeto configurado localmente

## Passos para Deploy

### 1. Configurar o Repositório

1. Crie um repositório no GitHub (se ainda não tiver)
2. Faça push do código para o repositório:
   ```bash
   git add .
   git commit -m "Configuração inicial para GitHub Pages"
   git push origin main
   ```

### 2. Configurar GitHub Pages

1. Vá para as configurações do repositório no GitHub
2. Navegue até "Pages" no menu lateral
3. Em "Source", selecione "Deploy from a branch"
4. Escolha a branch "gh-pages" (será criada automaticamente)
5. Clique em "Save"

### 3. Atualizar a URL do Projeto

No arquivo `package.json`, atualize a linha `homepage` com seu nome de usuário:

```json
"homepage": "https://SEU-USUARIO.github.io/relatorio-tsa-cks"
```

### 4. Fazer o Deploy

#### Opção 1: Deploy Manual
```bash
npm run deploy
```

#### Opção 2: Deploy Automático (Recomendado)
O projeto está configurado com GitHub Actions. Apenas faça push para a branch main:

```bash
git add .
git commit -m "Atualização do projeto"
git push origin main
```

O deploy será feito automaticamente.

## Estrutura de Arquivos

- `.github/workflows/deploy.yml` - Configuração do GitHub Actions
- `vite.config.ts` - Configuração do Vite com base path para GitHub Pages
- `package.json` - Scripts de deploy e homepage

## Troubleshooting

### Problema: Páginas não carregam
- Verifique se a URL no `package.json` está correta
- Certifique-se de que o repositório é público ou você tem GitHub Pro

### Problema: Assets não carregam
- Verifique se o `base` no `vite.config.ts` está configurado corretamente
- Certifique-se de que o build foi feito corretamente

### Problema: Deploy não funciona
- Verifique se o GitHub Actions está habilitado no repositório
- Verifique os logs do Actions na aba "Actions" do GitHub

## URLs Importantes

- **Repositório**: `https://github.com/SEU-USUARIO/relatorio-tsa-cks`
- **Site**: `https://SEU-USUARIO.github.io/relatorio-tsa-cks`
- **Actions**: `https://github.com/SEU-USUARIO/relatorio-tsa-cks/actions` 