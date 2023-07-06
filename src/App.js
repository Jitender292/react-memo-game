// App.js
import "./App.css"; // Importing the Css file
import Images from "./Images"; // Importing the Images component
import { useState } from "react"; // Importing the useState hook from React
import { shuffle } from "lodash"; // Importing the shuffle function from the lodash library

function App() {
  const [cards, setCards] = useState(shuffle([...Images, ...Images])); // Initializing the 'cards' state with shuffled array of Images
  const [clicks, setClicks] = useState(0); // Initializing the 'clicks' state with 0
  const [won, setWon] = useState(false); // Initializing the 'won' state with false
  const [activeCards, setActiveCards] = useState([]); // Initializing the 'activeCards' state with an empty array
  const [foundPairs, setFoundPairs] = useState([]); // Initializing the 'foundPairs' state with an empty array

  function flipCard(index) {
    if (won) {
      // If the game is already won, reset the game state
      setCards(shuffle([...Images, ...Images])); // Shuffle the cards again
      setFoundPairs([]); // Reset the foundPairs state
      setWon(false); // Set won state to false
      setClicks(0); // Reset the clicks count
    }
    if (activeCards.length === 0) {
      // If no active cards, set the clicked card as active
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      // If one active card already exists
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        // If the cards match, update the foundPairs state
        if (foundPairs.length + 2 === cards.length) {
          // If all pairs are found, set won state to true
          setWon(true);
        }
        setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      // If two active cards already exist, replace the previous active card with the clicked card
      setActiveCards([index]);
    }
    setClicks(clicks + 1); // Increment the clicks count
  }

  return (
    <div>
      <div className="board">
        {/* Render the cards */}
        {cards.map((card, index) => {
          const flippedToFront =
            activeCards.indexOf(index) !== -1 ||
            foundPairs.indexOf(index) !== -1;
          return (
            <div
              className={"card-outer " + (flippedToFront ? "flipped" : "")}
              onClick={() => flipCard(index)}
            >
              <div className="card">
                <div className="front">
                  <img src={card} alt="" />
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="stats">
        {/* Display game statistics */}
        {won && (
          <>
            You won the game! Congratulations!
            <br />
            Click any card to play again.
            <br />
            <br />
          </>
        )}
        Clicks: {clicks} &nbsp;&nbsp;&nbsp; Found pairs:{foundPairs.length / 2}
      </div>
    </div>
  );
}

export default App;
