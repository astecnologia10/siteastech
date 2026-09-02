# Briefing → Planilha Google + E-mail

O site é estático (sem servidor). O formulário `/briefing` envia as respostas para um
**Google Apps Script** publicado como "App da Web", que:

1. grava uma linha na sua Planilha Google (uma coluna por pergunta + data/hora);
2. envia um e-mail para `astecnologia.10@gmail.com` com todas as respostas.

## Passo a passo (uma vez só, ~5 min)

1. Crie uma **Planilha Google** nova (sheets.new).
2. Menu **Extensões → Apps Script**.
3. Apague o código de exemplo, cole todo o conteúdo de [`Code.gs`](./Code.gs) e salve (Ctrl+S).
4. Clique em **Implantar → Nova implantação**.
   - Engrenagem ⚙️ → tipo **App da Web**.
   - **Executar como:** Eu (seu e-mail).
   - **Quem pode acessar:** Qualquer pessoa.
   - **Implantar**. O Google vai pedir autorização — aceite (permite enviar e-mail
     em seu nome e editar a planilha).
5. Copie a **URL do app da Web** (termina em `/exec`).
6. Na raiz do projeto, crie um arquivo **`.env`** (ou `.env.local`) com:

   ```
   VITE_BRIEFING_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
   ```

7. Rode `npm run build` de novo e publique. Pronto.

> A coluna "E-mail de confirmação para o cliente" **não** foi ativada.
> Se quiser depois, dá para adicionar um segundo `MailApp.sendEmail` no `Code.gs`.

## Testar

- Abra a URL `/exec` no navegador: deve responder `{"ok":true,"service":"AS Tech briefing"}`.
- Preencha o formulário em `/briefing` e confira a planilha + a caixa de entrada.

## Alterar depois

- **Mudou as perguntas** (`src/lib/briefing.ts`)? O script se adapta sozinho, mas
  a planilha mantém o cabeçalho antigo. Para recriar o cabeçalho, apague a primeira
  linha (ou a aba "Briefings" inteira) e envie um novo briefing de teste.
- **Trocar o e-mail de destino:** edite `EMAIL_TO` no `Code.gs` e **crie uma nova
  implantação** (Implantar → Gerenciar implantações → editar → Nova versão).
