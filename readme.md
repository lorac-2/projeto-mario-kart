# Mario Kart JS Challenge - Enhanced Version

<h1>Felipão's Project Challenge: Mario Kart.JS</h1>

<table>
    <tr>
        <td>
            <img src="./docs/header.gif" alt="Mario Kart" width="200">
        </td>
        <td>
            <b>Objective:</b>
            <p>Mario Kart is a racing game series developed and published by Nintendo. Our challenge is to create the logic for a video game that simulates Mario Kart races, considering the rules and mechanics below.</p>
        </td>
    </tr>
</table>

<h2>Players</h2>
<table style="border-collapse: collapse; width: 800px; margin: 0 auto;">
    <tr>
        <td style="border: 1px solid black; text-align: center;">
            <p>Mario</p>
            <img src="./docs/mario.gif" alt="Mario Kart" width="60" height="60">
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Speed: 4</p>
            <p>Handling: 3</p>
            <p>Power: 3</p>
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Peach</p>
            <img src="./docs/peach.gif" alt="Mario Kart" width="60" height="60">
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Speed: 3</p>
            <p>Handling: 4</p>
            <p>Power: 2</p>
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Yoshi</p>
            <img src="./docs/yoshi.gif" alt="Mario Kart" width="60" height="60">
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Speed: 2</p>
            <p>Handling: 4</p>
            <p>Power: 3</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; text-align: center;">
            <p>Bowser</p>
            <img src="./docs/bowser.gif" alt="Mario Kart" width="60" height="60">
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Speed: 5</p>
            <p>Handling: 2</p>
            <p>Power: 5</p>
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Luigi</p>
            <img src="./docs/luigi.gif" alt="Mario Kart" width="60" height="60">
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Speed: 3</p>
            <p>Handling: 4</p>
            <p>Power: 4</p>
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Donkey Kong</p>
            <img src="./docs/dk.gif" alt="Mario Kart" width="60" height="60">
        </td>
        <td style="border: 1px solid black; text-align: center;">
            <p>Speed: 2</p>
            <p>Handling: 2</p>
            <p>Power: 5</p>
        </td>
    </tr>
</table>

<p></p>

<h3>🕹️ Rules & Mechanics:</h3>

<b>Players:</b>

<input type="checkbox" id="jogadores-item" checked />
<label for="jogadores-item">The game features 6 playable characters with unique attributes</label>

<b>Race Structure:</b>

<ul>
  <li><input type="checkbox" id="pistas-1-item" checked /> <label for="pistas-1-item">Characters will race on a random track with 5 rounds</label></li>
  <li><input type="checkbox" id="pistas-2-item" checked /> <label for="pistas-2-item">Each round, a random track section will be drawn: Straight, Curve or Showdown</label>
    <ul>
      <li><input type="checkbox" id="pistas-2-1-item" checked /> <label for="pistas-2-1-item">STRAIGHT: Roll a 6-sided die and add SPEED attribute - winner gains 1 point</label></li>
      <li><input type="checkbox" id="pistas-2-2-item" checked /> <label for="pistas-2-2-item">CURVE: Roll a 6-sided die and add HANDLING attribute - winner gains 1 point</label></li>
      <li><input type="checkbox" id="pistas-2-3-item" checked /> <label for="pistas-2-3-item">SHOWDOWN: Roll a 6-sided die and add POWER attribute - loser loses 1 point</label></li>
      <li><input type="checkbox" id="pistas-2-4-item" checked /> <label for="pistas-2-4-item">No player can have negative points (values below 0)</label></li>
    </ul>
  </li>
</ul>

<b>New Features:</b>
<ul>
  <li><input type="checkbox" id="bonus-1-item" checked /> <label for="bonus-1-item">Round winners receive random bonus items (Shell or Bomb)</label></li>
  <li><input type="checkbox" id="bonus-2-item" checked /> <label for="bonus-2-item">Shells: Protect against attacks in Showdown sections</label></li>
  <li><input type="checkbox" id="bonus-3-item" checked /> <label for="bonus-3-item">Bombs: Can be used to attack opponents in Showdown sections</label></li>
  <li><input type="checkbox" id="bonus-4-item" checked /> <label for="bonus-4-item">Turbo: Players who win 2 rounds get +1 Turbo point</label></li>
</ul>

<b>Victory Condition:</b>

<input type="checkbox" id="vitoria-item" checked />
<label for="vitoria-item">The player with most points after 5 rounds wins the race</label>

<h3>🚀 How to Run:</h3>
<ol>
  <li>Clone the repository</li>
  <li>Open the index.html file in your browser</li>
  <li>Check the console for game output</li>
</ol>

<h3>📝 Notes:</h3>
<ul>
  <li>All game actions and results are displayed in the browser console</li>
  <li>The game automatically runs 5 rounds and declares a winner</li>
  <li>Player stats are shown after each round</li>
</ul>

<h3>🎮 Enjoy the race!</h3>