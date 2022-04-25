import axios from 'axios';

// Base URL > https://api.cartolafc.globo.com/
// atletas/mercado  -- Lista de todos os jogadores (retorna todas as informações)
// clubes  >> Lista de clubes
// rodadas >> Lista das rodadas do campeonato (1 até 38)
// partidas >> Próximas partidas do campeonato
// mercado/status >> Status do mercado
// mercado/destaques >> Lista dos jogadores mais escalados
// partidas/[rodada] >> rodada especifica
// atletas/pontuados >> Pontuação da rodada em andamento
// pos-rodada/destaques >> Time que mais pontuou na rodada anterior
// esquemas >> Lista os esquemas táticos (4-3-3) etc...

const api = axios.create({
    baseURL: 'https://api.cartolafc.globo.com'
});

export default api;