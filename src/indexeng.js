// Player objects with attributes
const player1 = {
  NAME: "Mario",
  SPEED: 4,
  HANDLING: 3,
  POWER: 3,
  POINTS: 0,
  SHELLS: 0,
  BOMBS: 0,
  ROUND_WINS: 0,
  TURBO: false
};

const player2 = {
  NAME: "Luigi",
  SPEED: 3,
  HANDLING: 4,
  POWER: 4,
  POINTS: 0,
  SHELLS: 0,
  BOMBS: 0,
  ROUND_WINS: 0,
  TURBO: false
};

const player3 = {
  NAME: "Peach",
  SPEED: 3,
  HANDLING: 4,
  POWER: 2,
  POINTS: 0,
  SHELLS: 0,
  BOMBS: 0,
  ROUND_WINS: 0,
  TURBO: false
};

const player4 = {
  NAME: "Bowser",
  SPEED: 5,
  HANDLING: 2,
  POWER: 5,
  POINTS: 0,
  SHELLS: 0,
  BOMBS: 0,
  ROUND_WINS: 0,
  TURBO: false
};

const player5 = {
  NAME: "Yoshi",
  SPEED: 2,
  HANDLING: 4,
  POWER: 3,
  POINTS: 0,
  SHELLS: 0,
  BOMBS: 0,
  ROUND_WINS: 0,
  TURBO: false
};

const player6 = {
  NAME: "Donkey Kong",
  SPEED: 2,
  HANDLING: 2,
  POWER: 5,
  POINTS: 0,
  SHELLS: 0,
  BOMBS: 0,
  ROUND_WINS: 0,
  TURBO: false
};

const players = [player1, player2, player3, player4, player5, player6];

// Game functions

// Roll a 6-sided die
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Randomly select a track section type
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "STRAIGHT";
      break;
    case random < 0.66:
      result = "CURVE";
      break;
    default:
      result = "SHOWDOWN";
  }

  return result;
}

// Randomly select a bonus type
async function getRandomBonus() {
  let random = Math.random();
  return random < 0.5 ? "SHELL" : "BOMB";
}

// Display dice roll results
async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`${characterName} 🎲 Rolled ${block} ${diceResult} + ${attribute} = ${
    diceResult + attribute
  }`);
}

// Apply turbo bonus if player won 2 rounds
async function applyTurbo(character) {
  if (character.ROUND_WINS >= 2 && !character.TURBO) {
    character.POINTS += 1;
    character.TURBO = true;
    console.log(`🚀 ${character.NAME} activated TURBO for winning 2 rounds! +1 point!`);
  }
}

// Main game engine
async function playRaceEngine(characters) {
  // Play 5 rounds
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Round ${round}`);
    
    // Get random track section
    let block = await getRandomBlock();
    console.log(`📌 Section: ${block}`);
    
    // Roll dice for all players
    const results = await Promise.all(characters.map(async char => {
      const diceResult = await rollDice();
      let skillValue = 0;
      
      // Determine which skill to use based on track section
      if (block === "STRAIGHT") {
        skillValue = char.SPEED;
      } else if (block === "CURVE") {
        skillValue = char.HANDLING;
      } else {
        skillValue = char.POWER;
      }
      
      // Add turbo bonus if available
      const total = diceResult + skillValue + (char.TURBO ? 1 : 0);
      
      await logRollResult(
        char.NAME,
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
    
    // Find the highest score
    const maxTotal = Math.max(...results.map(r => r.total));
    const winners = results.filter(r => r.total === maxTotal);
    
    // Handle round winner(s)
    if (winners.length === 1) {
      const winner = winners[0].character;
      console.log(`🎉 ${winner.NAME} won the round! +1 point`);
      winner.POINTS++;
      winner.ROUND_WINS++;
      
      // Award random bonus
      const bonus = await getRandomBonus();
      if (bonus === "SHELL") {
        winner.SHELLS++;
        console.log(`🐢 ${winner.NAME} got a protective SHELL!`);
      } else {
        winner.BOMBS++;
        console.log(`💣 ${winner.NAME} got a BOMB to use in showdowns!`);
      }
      
      // Check for turbo activation
      await applyTurbo(winner);
    } else {
      console.log(`🤝 Tie between: ${winners.map(w => w.character.NAME).join(', ')}! No points awarded.`);
    }
    
    // Handle showdowns if this was a showdown section
    if (block === "SHOWDOWN") {
      console.log("\n🥊 Showdown Phase:");
      
      // Sort by total score (weakest vs strongest)
      const sortedResults = [...results].sort((a, b) => a.total - b.total);
      
      // Have players attack each other
      for (let i = 0; i < Math.floor(sortedResults.length / 2); i++) {
        const attacker = sortedResults[i].character;
        const defender = sortedResults[sortedResults.length - 1 - i].character;
        
        // If attacker has bombs, they can attack
        if (attacker.BOMBS > 0) {
          console.log(`💣 ${attacker.NAME} uses a BOMB against ${defender.NAME}!`);
          attacker.BOMBS--;
          
          // Defender can protect with shell
          if (defender.SHELLS > 0) {
            console.log(`🛡️ ${defender.NAME} used a SHELL for protection!`);
            defender.SHELLS--;
          } else if (defender.POINTS > 0) {
            defender.POINTS--;
            console.log(`🐢 ${defender.NAME} lost 1 point!`);
          } else {
            console.log(`${defender.NAME} has no points to lose.`);
          }
        }
      }
    }
    
    // Display current standings
    console.log("\n📊 Current standings:");
    characters.forEach(char => {
      console.log(`${char.NAME}: ${char.POINTS} point(s) | Shells: ${char.SHELLS} | Bombs: ${char.BOMBS} ${char.TURBO ? '| TURBO ACTIVE' : ''}`);
    });
  }
}

// Display final results
async function declareWinner(characters) {
  console.log("\n🏁🏁🏁 FINAL RESULTS 🏁🏁🏁");
  characters.sort((a, b) => b.POINTS - a.POINTS);
  
  // Display ranking
  characters.forEach((char, index) => {
    console.log(`${index + 1}º ${char.NAME}: ${char.POINTS} point(s)`);
  });
  
  // Determine winner(s)
  const maxPoints = characters[0].POINTS;
  const winners = characters.filter(c => c.POINTS === maxPoints);
  
  if (winners.length === 1) {
    console.log(`\n🎉🎉🎉 ${winners[0].NAME} WON THE RACE! 🎉🎉🎉`);
  } else {
    console.log(`\n🤝 TIE BETWEEN: ${winners.map(w => w.NAME).join(', ')}!`);
  }
}

// Main game execution
(async function main() {
  console.log(
    `🏁🚨 MARIOWAY RACE 🏁🚨\nCompetitors: ${players.map(p => p.NAME).join(', ')}\n\nSTARTING...\n`
  );
  
  await playRaceEngine(players);
  await declareWinner(players);
})();
