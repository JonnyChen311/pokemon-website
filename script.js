const form = document.getElementById('poke-form');
const input = document.getElementById('poke-input');
const result = document.getElementById('result');
const pokeSprite = document.getElementById('poke-sprite');
const gifImg = document.getElementById('gif');
const vibeText = document.getElementById('vibe-text');
const resetBtn = document.getElementById('reset-btn');

const GIPHY_KEY = 'qyojpWPRSMNsZiIG6J0miLlcT4SAxI1y'; // <--- Replace this!

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // 🔑 IMPORTANT for mobile

  const pokemonName = input.value.trim().toLowerCase();
  if (!pokemonName) return;

  const pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${pokemonName}&limit=1`;

  try {
    // Fetch Pokémon data
    const pokeRes = await fetch(pokeURL);
    if (!pokeRes.ok) throw new Error('Pokémon not found');
    const pokeData = await pokeRes.json();
    pokeSprite.src = pokeData.sprites.front_default;
    pokeSprite.alt = pokeData.name;

    // Fetch Giphy data
    const gifRes = await fetch(giphyURL);
    const gifData = await gifRes.json();

    if (gifData.data.length > 0) {
      gifImg.src = gifData.data[0].images.original.url;
      gifImg.alt = pokemonName + " gif";
    } else {
      gifImg.src = '';
      gifImg.alt = 'No GIF found';
    }

    vibeText.textContent = `This is what ${pokemonName} feels like.`;

    form.classList.add('hidden');
    result.classList.remove('hidden');

  } catch (error) {
    pokeSprite.src = '';
    gifImg.src = '';
    vibeText.textContent = `Oops! "${pokemonName}" isn’t a real Pokémon.`;
    form.classList.add('hidden');
    result.classList.remove('hidden');
  }
});

// Reset button
resetBtn.addEventListener('click', () => {
  input.value = '';
  result.classList.add('hidden');
  form.classList.remove('hidden');
});
