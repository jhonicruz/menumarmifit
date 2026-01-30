# 🍽️ Cardápio do Dia - Guia de Configuração

## Como funciona?

A seção "Cardápio do Dia" carrega automaticamente os dados de uma **planilha do Google Sheets** pública. Assim, o dono do restaurante pode editar os pratos sem precisar mexer no código!

---

## ⚙️ Passo 1: Criar a Planilha no Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Clique em **"+ Criar"**
3. Escolha **"Planilha em branco"**
4. Renomeie para **"Cardápio Marmifit"** (ou qualquer nome)

---

## 📋 Passo 2: Estruturar a Planilha

Na primeira linha, crie as seguintes **colunas**:

| Coluna A | Coluna B      | Coluna C  | Coluna D   |
| -------- | ------------- | --------- | ---------- |
| **nome** | **descricao** | **preco** | **imagem** |

### Exemplo de dados:

| nome                  | descricao               | preco | imagem      |
| --------------------- | ----------------------- | ----- | ----------- |
| Filé de Peixe         | Filé grelhado com limão | 45.90 | https://... |
| Estrogonofe de Frango | Peito de frango cremoso | 42.50 | https://... |
| Lasanha Bolonhesa     | Massa fresca com molho  | 38.00 | https://... |

**Notas:**

- **Nome**: Obrigatório (nome do prato)
- **Descrição**: Opcional (pequena descrição)
- **Preço**: Obrigatório (use . ou , para decimal)
- **Imagem**: Opcional (URL da imagem)
  - Se não colocar imagem, um placeholder será exibido
  - Use URLs completas: `https://...`

---

## 🔗 Passo 3: Publicar a Planilha

1. Clique em **"Compartilhar"** (canto superior direito)
2. Altere de **"Restrito"** para **"Qualquer pessoa com o link"**
3. Escolha **"Visualizador"** (apenas leitura)
4. Clique em **"Copiar link"**

**IMPORTANTE:** A planilha DEVE estar compartilhada com "Qualquer pessoa com o link" para que o site consiga acessar os dados!

---

## 🔧 Passo 4: Configurar o Código

Abra o arquivo `assets/scripts/modules/cardapioDodia.js` e substitua apenas o **ID da planilha**:

```javascript
const SHEET_ID = "1a2b3c4d5e6f7g8h9i0jk"; // SUBSTITUA COM SEU ID
const SHEET_NAME = "Planilha1"; // MANTENHA "Planilha1" (padrão do Google)
```

### Como encontrar o ID:

Na URL da planilha:

```
https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXX/edit
                                    ↑
                              Copie isto (ID)
```

**NOTA:** O nome da aba deve ser **"Planilha1"** (padrão do Google Sheets). Se você renomeou a aba, altere aqui também.

---

## 🚀 Passo 5: Testar

1. Salve as alterações
2. Recarregue seu site
3. Verifique se os pratos aparecem na seção "Cardápio do Dia"

---

## 📝 Para Alterar o Cardápio

**Diariamente**, o dono apenas precisa:

1. Abrir a planilha (não precisa compartilhar novamente)
2. Editar os pratos
3. Apertar **Ctrl+S** para salvar
4. **Pronto!** O site atualiza automaticamente em segundos

---

## ⚠️ Troubleshooting

### Os pratos não aparecem?

- Verifique se o SHEET_ID está correto
- Verifique se a planilha está publicada ("Qualquer pessoa com o link")
- Abra o console (F12) e procure por erros
- Verifique se há dados na planilha

### Imagens não carregam?

- Certifique-se de que a URL da imagem é pública
- Use URLs completas com `https://`
- Teste a URL no navegador

### Cache antigo aparecendo?

- Limpe o cache do navegador (Ctrl+Shift+Del)
- Recarregue a página (Ctrl+F5)

---

## 💡 Dicas

- **Máximo de 2 pratos**: Para melhor visual, recomenda-se não colocar mais de 2-3 pratos por dia
- **Horários**: Você pode usar a coluna "descricao" para indicar horário ("Disponível até 14h")
- **Imagens**: Use imagens de boa qualidade (mínimo 300x300px)
- **Preços**: Sem símbolo R$, apenas o número

---

## 📸 Onde encontrar imagens grátis?

- [Unsplash](https://unsplash.com)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)
- [Freepik](https://freepik.com)

Procure por "food", "comida", "prato", etc.

---

**Pronto! Agora o cardápio do dia está funcionando e você pode alterar sempre que quiser!** 🎉
