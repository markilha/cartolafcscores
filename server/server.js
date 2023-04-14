const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware para fazer o parsing do corpo das requisições em JSON
app.use(bodyParser.json());

// Middleware para permitir requisições de outros domínios (CORS)
app.use(cors());

// Configurar as rotas da API
// Exemplo de rota de teste
app.get('/', (req, res) => {
  res.send('API RESTful funcionando!');
});

app.get('/api/cartolafc', async (req, res) => {
    try {
      const url = 'https://api.cartolafc.globo.com/atletas/mercado';  
      // Fazer a requisição para a API
      const response = await axios.get(url);  
      // Enviar a resposta em formato JSON
      res.json(response.data);
    } catch (error) {
      // Tratar erros de requisição
      res.status(500).json({ error: 'Erro ao obter dados da API' });
    }
  });

// Iniciar o servidor
const port = 5000; // Porta em que a API irá rodar
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

