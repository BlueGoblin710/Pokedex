/* 
    Tell us about your project below! 👇
    
    Which API did you use?
    I chose the PokeAPI (https://pokeapi.co/) because it’s a comprehensive, easy-to-use resource for Pokemon data like stats, types, and abilities. It’s well documented and popular among developers, making it perfect for a fun, interactive Pokemon project.
    
    Why did you choose that one?
    I picked it because I wanted a Pokemon search tool where you don’t have to keep scrolling back to the search bar. Growing up with Pokemon and owning cards now worth millions inspired me. I built this for my daughter, who has special needs and loves Pokemon, so she can enjoy it on her phone via GitHub Pages.
    
    How did you interact with the API, technically?
    I used Axios to fetch data from the API and updated the DOM with the Pokemon’s details. I also added CSS animations, like a shaking Pokémon image, for extra flair.
    
    What does your project do? How does it work?
    Users can search for a Pokemon by name to see its stats, types, abilities, and image. The background color shifts based on the Pokémon’s primary type, and there’s a loading state with a placeholder image while data is fetched.
    
    If you were going to keep coding this project, what would you build next?
    I’d add a browsable Pokedex, a favorites list, and a side by side Pokemon comparison feature. Plus, I’d enhance the UI/UX with more animations and smoother transitions.
*/

// Function to handle the search button click and grab Pokemon data
function showPoke() {
    // Grab the input element where the user types the Pokemon name
    const pokemonName = document
      // Find the input field using its ID "pokemon-input"
      .getElementById("pokemon-input")
      // Get whatever the user typed in there
      .value// Make it lowercase so the API doesn’t get picky
      .toLowerCase()
      // Trim off any extra spaces they might’ve added
      .trim();
  
    // Check if they forgot to type anything
    if (!pokemonName) {
      // Pop up a little alert to nudge them to enter a name
      alert("Please enter a Pokemon name!");
      // Bail out of the function if there’s nothing to work with
      return;
    }
  
    // Grab the image element where the Pokemon picture will pop up
    const pokeImg = document.getElementById("poke-mon");
    // Get the placeholder that shows up before the image loads
    const placeholder = document.querySelector(".placeholder");
    // Grab the div where I’ll dump all the Pokemon info
    const infoDiv = document.getElementById("poke-info");
  
    // Hide the placeholder so it’s out of the way while loading
    placeholder.style.display = "none";
    // Show the image spot so it’s ready for the Pokemon pic
    pokeImg.style.display = "block";
    // Clear out the image source to start fresh
    pokeImg.src = "";
    // Make the info div visible so we can show stuff in it
    infoDiv.style.display = "block";
    // Toss in a "Loading..." message while we fetch the data
    infoDiv.innerHTML = "<span class='loading'>Loading...</span>";
  
    // Fire off an Axios request to snag data from the PokeAPI
    axios
      // Hit the PokeAPI with the Pokemon name to get its details
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      // Deal with the data once the API sends it back
      .then((response) => {
        // Stash the Pokemon data from the response so I can use it
        const pokemon = response.data;
  
        // Set the image to the Pokemon’s official artwork from the API
        pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
        // Pull off the "shake" class to reset the animation
        pokeImg.classList.remove("shake");
        // Trick the browser into restarting the animation with a reflow
        void pokeImg.offsetWidth;
        // Slap the "shake" class back on to make the image wiggle
        pokeImg.classList.add("shake");
  
        // Grab the Pokemon’s main type to pick a background color
        const primaryType = pokemon.types[0].type.name;
        // Set up an object with colors for each Pokemon type
        const typeColors = {
          // Normal type gets a chill beige vibe
          normal: "#A8A77A",
          // Fire type goes with a fiery orange
          fire: "#EE8130",
          // Water type rocks a cool blue
          water: "#6390F0",
          // Electric type zaps with bright yellow
          electric: "#F7D02C",
          // Grass type feels fresh with green
          grass: "#7AC74C",
          // Ice type has a frosty light cyan
          ice: "#96D9D6",
          // Fighting type punches with red
          fighting: "#C22E28",
          // Poison type oozes a sneaky purple
          poison: "#A33EA1",
          // Ground type digs into a sandy tan
          ground: "#E2BF65",
          // Flying type soars with light purple
          flying: "#A98FF3",
          // Psychic type glows with pink
          psychic: "#F95587",
          // Bug type buzzes in lime green
          bug: "#A6B91A",
          // Rock type stands solid with brown
          rock: "#B6A136",
          // Ghost type haunts with dark purple
          ghost: "#735797",
          // Dragon type roars with deep purple
          dragon: "#6F35FC",
          // Dark type lurks in shadowy brown
          dark: "#705746",
          // Steel type shines with sleek gray
          steel: "#B7B7CE",
          // Fairy type sparkles in pastel pink
          fairy: "#D685AD",
        };
        // Change the page background to match the Pokemon’s type, or white if it’s weird
        document.body.style.backgroundColor =
          typeColors[primaryType] || "#ffffff";
        // Store the type color so I can use it for the info div too
        const typeColor = typeColors[primaryType] || "#ffffff";
        // Set a CSS variable on the info div with that color
        infoDiv.style.setProperty("--type-color", typeColor);
  
        // Make a little function to turn hex colors into RGB
        const hexToRgb = (hex) => {
          // Pull out the red part from the hex code
          const r = parseInt(hex.slice(1, 3), 16);
          // Grab the green part from the hex code
          const g = parseInt(hex.slice(3, 5), 16);
          // Snag the blue part from the hex code
          const b = parseInt(hex.slice(5, 7), 16);
          // Smash them together into an RGB string
          return `${r}, ${g}, ${b}`;
        };
        // Convert the type color to RGB for a glow effect
        const typeColorRgb = hexToRgb(typeColor);
        // Set another CSS variable with the RGB version
        infoDiv.style.setProperty("--type-color-rgb", typeColorRgb);
  
        // Create a quick function to capitalize the first letter of words
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        // Format the Pokemon’s types with commas for the display
        const typesText = pokemon.types
          .map((type) => capitalize(type.type.name))
          .join(", ");
        // Format the types with "and" for the speech part
        const typesSpeech = pokemon.types
          .map((type) => capitalize(type.type.name))
          .join(" and ");
  
        // Make sure the info div is showing for the data
        infoDiv.style.display = "block";
        // Fill the info div with the Pokemon’s stats and stuff
        infoDiv.innerHTML = `
                <h2>${
                  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                }</h2>
                <p>ID: ${pokemon.id}</p>
                <p>Height: ${pokemon.height / 10} m</p>
                <p>Weight: ${pokemon.weight / 10} kg</p>
                <p>Type: ${typesText}</p>
            `;
        // Clear out the animation classes to reset them
        infoDiv.classList.remove("slideIn", "glowPulse");
        // Force a reflow so the animations kick off again
        void infoDiv.offsetWidth;
        // Add some slick slide-in and glow animations
        infoDiv.classList.add("slideIn", "glowPulse");
  
        // Build a string for the Pokédex-style voice readout
        const pokedexText = [
          // Start with the Pokemon’s name, nice and proper
          `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}.`,
          // Toss in its ID number
          `Number ${pokemon.id}.`,
          // Convert height to meters and add it
          `Height: ${pokemon.height / 10} meters.`,
          // Convert weight to kilograms and throw that in
          `Weight: ${pokemon.weight / 10} kilograms.`,
          // Finish with the types for the speech
          `Type: ${typesSpeech}.`,
        ].join(" ");
        // Set up a new speech object with that text
        const utterance = new SpeechSynthesisUtterance(pokedexText);
        // Pick US English for the voice
        utterance.lang = "en-US";
        // Drop the pitch a bit for that Pokédex robot vibe
        utterance.pitch = 0.7;
        // Slow it down a touch so it’s easy to hear
        utterance.rate = 0.85;
        // Crank the volume all the way up
        utterance.volume = 1;
  
        // Grab all the voices the browser’s got for speech
        const voices = window.speechSynthesis.getVoices();
        // Hunt for a robotic voice that feels right, or just use the default
        const roboticVoice =
          voices.find(
            // Check each voice to see if it’s one I like
            (voice) =>
              // Try for Google’s US English voice first
              voice.name.includes("Google US English") ||
              // Or Microsoft’s David voice
              voice.name.includes("Microsoft David") ||
              // Or maybe Zira from Microsoft
              voice.name.includes("Zira") ||
              // Just grab the default if nothing else fits
              voice.default
          ) || voices[0];
        // Set the speech to use that robotic voice
        utterance.voice = roboticVoice;
        // Stop any other talking that’s going on
        window.speechSynthesis.cancel();
        // Kick off the Pokédex voice with the details
        window.speechSynthesis.speak(utterance);
      })
      // Catch any hiccups from the API call
      .catch((error) => {
        // Spit out the error to the console so I can see what went wrong
        console.error("Error:", error);
        // Set the info div text color to white for the error message
        infoDiv.style.setProperty("--type-color", "#ffffff");
        // Show a fun error message if the Pokemon isn’t found
        infoDiv.innerHTML =
          "<div class='error'>Pokemon not found! Try again, Trainer!</div>";
        // Wipe the animation classes to start fresh
        infoDiv.classList.remove("slideIn", "glowPulse");
        // Force a reflow to get the animations going again
        void infoDiv.offsetWidth;
        // Add back the slide-in and glow effects for the error
        infoDiv.classList.add("slideIn", "glowPulse");
  
        // Set up a speech object to say the error out loud
        const errorUtterance = new SpeechSynthesisUtterance(
          "Pokemon not found. Try again, Trainer."
        );
        // Use US English for the error voice too
        errorUtterance.lang = "en-US";
        // Keep the pitch low for that Pokédex feel
        errorUtterance.pitch = 0.7;
        // Slow it down a bit so it’s clear
        errorUtterance.rate = 0.85;
        // Turn the volume up all the way
        errorUtterance.volume = 1;
        // Grab the list of voices again for the error
        const voices = window.speechSynthesis.getVoices();
        // Look for a robotic voice, same as before
        const roboticVoice =
          voices.find(
            // Check each voice for the ones I want
            (voice) =>
              // Go for Google’s US English if it’s there
              voice.name.includes("Google US English") ||
              // Or Microsoft’s David voice
              voice.name.includes("Microsoft David") ||
              // Or Zira if that’s an option
              voice.name.includes("Zira") ||
              // Fall back to whatever’s default
              voice.default
          ) || voices[0];
        // Set the error speech to that robotic voice
        errorUtterance.voice = roboticVoice;
        // Cut off any other speech that’s still going
        window.speechSynthesis.cancel();
        // Play the error message out loud
        window.speechSynthesis.speak(errorUtterance);
  
        // Hide the Pokemon image since we didn’t get one
        pokeImg.style.display = "none";
        // Bring back the placeholder to show there’s no result
        placeholder.style.display = "block";
      });
  }
  
  // Add a listener to load voices when the browser’s ready
  window.speechSynthesis.onvoiceschanged = () => {
    // Keep this empty since I grab voices when I need them
  };
  