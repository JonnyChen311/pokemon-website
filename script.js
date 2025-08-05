const form = document.getElementById('poke-form');
const input = document.getElementById('poke-input');
const result = document.getElementById('result');
const pokeSprite = document.getElementById('poke-sprite');
const gifImg = document.getElementById('gif');
const vibeText = document.getElementById('vibe-text');
const resetBtn = document.getElementById('reset-btn');

// 🔑 Replace this with your own Giphy API key
const GIPHY_KEY = 'qyojpWPRSMNsZiIG6J0miLlcT4SAxI1y';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pokemonName = input.value.trim().toLowerCase();
  if (!pokemonName) return;

  const pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${pokemonName}&limit=1`;

  try {
    // Step 1: Fetch from PokéAPI
    const pokeRes = await fetch(pokeURL);
    if (!pokeRes.ok) throw new Error('Not a real Pokémon');
    const pokeData = await pokeRes.json();
    pokeSprite.src = pokeData.sprites.front_default;
    pokeSprite.alt = `${pokemonName} sprite`;

    // Step 2: Fetch from Giphy
    const giphyRes = await fetch(giphyURL);
    const giphyData = await giphyRes.json();

    if (giphyData.data.length > 0) {
      const gifUrl = giphyData.data[0].images.original.url;
      gifImg.src = gifUrl;
      gifImg.alt = `${pokemonName} vibe gif`;
    } else {
      gifImg.src = '';
      gifImg.alt = 'No GIF found';
    }

    vibeText.textContent = `This is what ${pokemonName} feels like.`;

    // Show results
    result.classList.remove('hidden');
    form.classList.add('hidden');

  } catch (err) {
    pokeSprite.src = '';
    gifImg.src = '';
    vibeText.textContent = `"${pokemonName}" isn’t even a real Pokémon.`;
    result.classList.remove('hidden');
    form.classList.add('hidden');
  }
});

// Reset
resetBtn.addEventListener('click', () => {
  input.value = '';
  result.classList.add('hidden');
  form.classList.remove('hidden');
});
