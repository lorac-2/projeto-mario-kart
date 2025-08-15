const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
  CASCOS: 0,
  BOMBAS: 0,
  VITORIAS_RODADA: 0,
  TURBO: false
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
  CASCOS: 0,
  BOMBAS: 0,
  VITORIAS_RODADA: 0,
  TURBO: false
};

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
  CASCOS: 0,
  BOMBAS: 0,
  VITORIAS_RODADA: 0,
  TURBO: false
};

const player4 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
  CASCOS: 0,
  BOMBAS: 0,
  VITORIAS_RODADA: 0,
  TURBO: false
};

const player5 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
  CASCOS: 0,
  BOMBAS: 0,
  VITORIAS_RODADA: 0,
  TURBO: false
};

const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
  CASCOS: 0,
  BOMBAS: 0,
  VITORIAS_RODADA: 0,
  TURBO: false
};

const players = [player1, player2, player3, player4, player5, player6];

// Funções
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function getRandomBonus() {
  let random = Math.random();
  return random < 0.5 ? "CASCO" : "BOMBA";
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`${characterName} 🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${
    diceResult + attribute
  }`);
}

async function applyTurbo(character) {
  if (character.VITORIAS_RODADA >= 2 && !character.TURBO) {
    character.PONTOS += 1;
    character.TURBO = true;
    console.log(`🚀 ${character.NOME} ativou TURBO por vencer 2 rodadas! +1 ponto!`);
  }
}

async function playRaceEngine(characters) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);
    
    // Sortear bloco
    let block = await getRandomBlock();
    console.log(`📌 Bloco: ${block}`);
    
    // Obter resultados dos dados para todos os jogadores
    const results = await Promise.all(characters.map(async char => {
      const diceResult = await rollDice();
      let skillValue = 0;
      
      if (block === "RETA") {
        skillValue = char.VELOCIDADE;
      } else if (block === "CURVA") {
        skillValue = char.MANOBRABILIDADE;
      } else {
        skillValue = char.PODER;
      }
      
      // Aplicar bônus de turbo se disponível
      const total = diceResult + skillValue + (char.TURBO ? 1 : 0);
      
      await logRollResult(
        char.NOME,
        block.toLowerCase(),
        diceResult,
        skillValue + (char.TURBO ? 1 : 0)
      );
      
      return {
        character: char,
        diceResult,
        total
      };
    }));
    
    // Encontrar o maior resultado
    const maxTotal = Math.max(...results.map(r => r.total));
    const winners = results.filter(r => r.total === maxTotal);
    
    if (winners.length === 1) {
      const winner = winners[0].character;
      console.log(`🎉 ${winner.NOME} venceu a rodada! +1 ponto`);
      winner.PONTOS++;
      winner.VITORIAS_RODADA++;
      
      // Dar bônus aleatório ao vencedor
      const bonus = await getRandomBonus();
      if (bonus === "CASCO") {
        winner.CASCOS++;
        console.log(`🐢 ${winner.NOME} ganhou um CASCO de proteção!`);
      } else {
        winner.BOMBAS++;
        console.log(`💣 ${winner.NOME} ganhou uma BOMBA para usar em confrontos!`);
      }
      
      // Verificar e aplicar turbo se necessário
      await applyTurbo(winner);
    } else {
      console.log(`🤝 Empate entre: ${winners.map(w => w.character.NOME).join(', ')}! Nenhum ponto foi marcado.`);
    }
    
    // Verificar confrontos se o bloco for CONFRONTO
    if (block === "CONFRONTO") {
      console.log("\n🥊 Fase de Confrontos:");
      
      // Ordenar por total para confrontos (menor confronta com maior)
      const sortedResults = [...results].sort((a, b) => a.total - b.total);
      
      for (let i = 0; i < Math.floor(sortedResults.length / 2); i++) {
        const attacker = sortedResults[i].character;
        const defender = sortedResults[sortedResults.length - 1 - i].character;
        
        if (attacker.BOMBAS > 0) {
          console.log(`💣 ${attacker.NOME} usa uma BOMBA contra ${defender.NOME}!`);
          attacker.BOMBAS--;
          if (defender.CASCOS > 0) {
            console.log(`🛡️ ${defender.NOME} usou um CASCO para se proteger!`);
            defender.CASCOS--;
          } else if (defender.PONTOS > 0) {
            defender.PONTOS--;
            console.log(`🐢 ${defender.NOME} perdeu 1 ponto!`);
          } else {
            console.log(`${defender.NOME} não tem pontos para perder.`);
          }
        }
      }
    }
    
    console.log("\n📊 Pontuação atual:");
    characters.forEach(char => {
      console.log(`${char.NOME}: ${char.PONTOS} ponto(s) | Cascos: ${char.CASCOS} | Bombas: ${char.BOMBAS} ${char.TURBO ? '| TURBO ATIVO' : ''}`);
    });
  }
}

async function declareWinner(characters) {
  console.log("\n🏁🏁🏁 RESULTADO FINAL 🏁🏁🏁");
  characters.sort((a, b) => b.PONTOS - a.PONTOS);
  
  characters.forEach((char, index) => {
    console.log(`${index + 1}º ${char.NOME}: ${char.PONTOS} ponto(s)`);
  });
  
  const maxPoints = characters[0].PONTOS;
  const winners = characters.filter(c => c.PONTOS === maxPoints);
  
  if (winners.length === 1) {
    console.log(`\n🎉🎉🎉 ${winners[0].NOME} VENCEU A CORRIDA! 🎉🎉🎉`);
  } else {
    console.log(`\n🤝 EMPATE ENTRE: ${winners.map(w => w.NOME).join(', ')}!`);
  }
}

(async function main() {
  console.log(
    `🏁🚨 CORRIDA MARIOWAY 🏁🚨\nCompetidores: ${players.map(p => p.NOME).join(', ')}\n\nCOMEÇANDO...\n`
  );
  
  await playRaceEngine(players);
  await declareWinner(players);
})();