# TechQuiz - Sistema de Questionários

Um sistema completo de questionários desenvolvido com React (frontend) e Node.js/Express (backend), utilizando MySQL como banco de dados.

## 🚀 Funcionalidades

- **Autenticação de usuários** (registro e login)
- **Sistema de questionários** com múltiplas opções
- **Interface moderna e responsiva**
- **Sistema de pontuação**
- **Proteção de rotas com JWT**

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (JSON Web Tokens)
- bcrypt (criptografia de senhas)
- CORS
- dotenv

### Frontend
- React 19
- React Router DOM
- Axios
- Bootstrap 5
- CSS3 com animações

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MySQL (ou Local Lightning)
- npm ou yarn

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd quiz-project
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` baseado no `.env.example`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=quizdb
DB_SOCKET_PATH=/caminho/para/seu/mysql/socket

# JWT Configuration
JWT_SECRET=sua_chave_secreta_jwt_aqui

# Server Configuration
PORT=5001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Configuração do Banco de Dados

Crie o banco de dados MySQL:

```sql
CREATE DATABASE quizdb;

USE quizdb;

-- Tabela de usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de perguntas
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_option ENUM('A', 'B', 'C', 'D') NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de resultados
CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir algumas perguntas de exemplo
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
('Qual é a linguagem de programação mais popular para desenvolvimento web?', 'Java', 'JavaScript', 'Python', 'C++', 'B', 'JavaScript é amplamente usado tanto no frontend quanto no backend.'),
('O que significa HTML?', 'HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language', 'A', 'HTML significa HyperText Markup Language.'),
('Qual framework React é usado para roteamento?', 'React Router', 'React Navigation', 'React Routes', 'React Links', 'A', 'React Router é a biblioteca padrão para roteamento em React.');
```

### 4. Configuração do Frontend

```bash
cd frontend
npm install
```

Crie um arquivo `.env` na pasta `frontend`:

```env
REACT_APP_API_URL=http://localhost:5001
```

### 5. Executando o Projeto

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

O sistema estará disponível em:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## 📁 Estrutura do Projeto

```
quiz-project/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Rotas de autenticação
│   │   └── quiz.js          # Rotas do questionário
│   ├── db.js               # Configuração do banco
│   ├── server.js           # Servidor principal
│   ├── package.json
│   └── .env.example        # Exemplo de variáveis de ambiente
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx    # Componente de login
│   │   │   ├── Register.jsx # Componente de registro
│   │   │   └── Quiz.jsx     # Componente do questionário
│   │   ├── services/
│   │   │   └── api.js       # Configuração da API
│   │   └── css/             # Estilos CSS
│   ├── package.json
│   └── .env.example         # Exemplo de variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

## 🔐 Segurança

- Senhas são criptografadas usando bcrypt
- Autenticação baseada em JWT
- Validação de dados no backend
- CORS configurado adequadamente
- Variáveis sensíveis em arquivos .env

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente para produção
2. Use um banco de dados MySQL em produção
3. Configure HTTPS
4. Use um processo manager como PM2
5. Configure um proxy reverso (Nginx)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando React e Node.js**
