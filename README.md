# Conversor de Horários SIGAA

Extensão do Chrome que converte os horários do SIGAA (Sistema Integrado de Gestão de Atividades Acadêmicas) para um formato mais legível e amigável.

## 📝 Descrição

O SIGAA utiliza códigos como `24T34` para representar horários de disciplinas. Esta extensão converte automaticamente esses códigos em horários legíveis como `SEG 14:00-15:50 QUA 14:00-15:50`.

### Exemplo de Conversão

- **Antes:** `24T34`
- **Depois:** `SEG 14:00-15:50 QUA 14:00-15:50`

**Significado:**
- `24` = Segunda-feira (2) e Quarta-feira (4)
- `T` = Turno da Tarde
- `34` = 3º e 4º períodos (14:00-14:50 e 15:00-15:50)

## 🚀 Instalação

1. Baixe ou clone este repositório
2. Abra o Chrome e acesse `chrome://extensions/`
3. Ative o "Modo do desenvolvedor"
4. Clique em "Carregar sem compactação"
5. Selecione a pasta do projeto

## 📋 Como Usar

1. Navegue até uma página do SIGAA que contenha horários de disciplinas
2. Clique no ícone da extensão na barra de ferramentas
3. Clique em "Converter Horários" para aplicar as conversões
4. Use "Resetar Página" para reverter as alterações

## ⏰ Tabela de Horários

### Dias da Semana
| Código | Dia |
|--------|-----|
| 1 | Domingo |
| 2 | Segunda-feira |
| 3 | Terça-feira |
| 4 | Quarta-feira |
| 5 | Quinta-feira |
| 6 | Sexta-feira |
| 7 | Sábado |

### Turnos e Horários

#### Manhã (M)
| Período | Horário |
|---------|---------|
| M1 | 07:00 - 07:50 |
| M2 | 08:00 - 08:50 |
| M3 | 09:00 - 09:50 |
| M4 | 10:00 - 10:50 |
| M5 | 11:00 - 11:50 |

#### Tarde (T)
| Período | Horário |
|---------|---------|
| T1 | 12:00 - 12:50 |
| T2 | 13:00 - 13:50 |
| T3 | 14:00 - 14:50 |
| T4 | 15:00 - 15:50 |
| T5 | 16:00 - 16:50 |
| T6 | 17:00 - 17:50 |

#### Noite (N)
| Período | Horário |
|---------|---------|
| N1 | 18:00 - 18:50 |
| N2 | 18:50 - 19:40 |
| N3 | 19:40 - 20:30 |
| N4 | 20:30 - 21:20 |
| N5 | 21:20 - 22:10 |
| N6 | 22:10 - 23:00 |

## 🔧 Funcionalidades

- ✅ Conversão automática de códigos de horário
- ✅ Suporte a múltiplos dias da semana
- ✅ Suporte a períodos consecutivos
- ✅ Ajuste automático de layout das páginas
- ✅ Interface simples e intuitiva
- ✅ Função de reset para reverter alterações

## 📁 Estrutura do Projeto

```
sigaa-schedule-conversor/
├── manifest.json          # Configuração da extensão
├── popup.html            # Interface da extensão
├── popup.js              # Lógica da interface
├── converter.js          # Lógica de conversão
├── images/               # Ícones da extensão
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── CLAUDE.md             # Documentação para desenvolvimento
└── README.md             # Este arquivo
```

## 🌐 Páginas Suportadas

A extensão funciona nas seguintes páginas do SIGAA:
- Turmas do currículo
- Turmas equivalentes do currículo  
- Turmas extra currículo
- Portal do discente
- Listagem pública de turmas

## 🧪 Como Testar

### Método 1: Usando uma página do SIGAA
1. Acesse qualquer página do SIGAA que contenha horários (ex: grade de horários, turmas)
2. Carregue a extensão no Chrome
3. Clique no ícone da extensão
4. Teste o botão "Converter Horários"
5. Verifique se os códigos como `24T34` foram convertidos para `SEG 14:00-15:50 QUA 14:00-15:50`

### Método 2: Teste local com HTML
1. Crie um arquivo HTML de teste com conteúdo como:
```html
<!DOCTYPE html>
<html>
<body>
    <p>Disciplina: Programação - 24T34</p>
    <p>Matemática: 357N12</p>
    <p>Física: 1M345</p>
</body>
</html>
```
2. Abra o arquivo no Chrome
3. Execute a extensão e verifique as conversões

### Método 3: Teste no Console do DevTools
1. Abra qualquer página
2. Pressione F12 para abrir o DevTools
3. Na aba Console, cole o código do `converter.js`
4. Execute as funções de teste:
```javascript
// Adicionar texto de teste à página
document.body.innerHTML += '<p>Teste: 24T34, 357N12, 1M345</p>';

// Executar conversão
processSchedules();
```

### Casos de Teste Recomendados
- `24T34` → `SEG 14:00-15:50 QUA 14:00-15:50`
- `357N12` → `TER 19:40-20:30 QUI 19:40-20:30 SEX 19:40-20:30 SAB 19:40-20:30`
- `1M345` → `DOM 09:00-11:50`
- `7T6` → `SAB 17:00-17:50`
- `2N1` → `SEG 18:00-18:50`

## 👨‍💻 Desenvolvimento

### Tecnologias
- JavaScript vanilla
- Chrome Extension Manifest V3
- HTML/CSS para interface

### Arquitetura
- `converter.js`: Contém a lógica principal de conversão
- `popup.js`: Gerencia a interface e comunicação com as abas
- `manifest.json`: Define permissões e configurações

## 🤝 Contribuição

Baseado no trabalho de **Luthiery Costa**. Contribuições são bem-vindas!

## 📄 Licença

Este projeto é disponibilizado como código aberto para uso educacional e melhorias no sistema SIGAA.

---

*Desenvolvido para facilitar a vida dos estudantes e usuários do SIGAA* 🎓