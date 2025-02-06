import React, { useState, useEffect } from 'react';

const DeliveryGame = () => {
  const [truckPosition, setTruckPosition] = useState(200); // Horizontal position of the truck
  const [packages, setPackages] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Add packages and obstacles periodically
  useEffect(() => {
    const addItemsInterval = setInterval(() => {
      setPackages((prev) => [
        ...prev,
        { id: Date.now(), left: Math.random() * 350, top: 0 },
      ]);
      setObstacles((prev) => [
        ...prev,
        { id: Date.now(), left: Math.random() * 350, top: 0 },
      ]);
    }, 1000);

    return () => clearInterval(addItemsInterval);
  }, []);

  // Move packages and obstacles down
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPackages((prev) =>
        prev
          .map((pkg) => ({ ...pkg, top: pkg.top + 5 }))
          .filter((pkg) => pkg.top < 400) // Remove packages out of bounds
      );
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, top: obs.top + 5 }))
          .filter((obs) => obs.top < 400) // Remove obstacles out of bounds
      );
    }, 50);

    return () => clearInterval(gameLoop);
  }, []);

  // Check for collisions
  useEffect(() => {
    packages.forEach((pkg) => {
      if (
        pkg.top > 350 &&
        pkg.left > truckPosition - 20 &&
        pkg.left < truckPosition + 50
      ) {
        setScore((prev) => prev + 1); // Collect package
        setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
      }
    });

    obstacles.forEach((obs) => {
      if (
        obs.top > 350 &&
        obs.left > truckPosition - 20 &&
        obs.left < truckPosition + 50
      ) {
        setGameOver(true); // End game on collision
      }
    });
  }, [packages, obstacles, truckPosition]);

  const moveTruck = (direction) => {
    if (direction === 'left' && truckPosition > 0) {
      setTruckPosition((prev) => prev - 20);
    } else if (direction === 'right' && truckPosition < 350) {
      setTruckPosition((prev) => prev + 20);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '400px',
        background: '#eef',
        border: '2px solid #000',
        margin: '20px auto',
        overflow: 'hidden',
      }}
    >
      {gameOver ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#f00',
            fontSize: '24px',
          }}
        >
          <p>Game Over!</p>
          <p>Score: {score}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <>
          {/* Truck */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: `${truckPosition}px`,
              width: '50px',
              height: '30px',
              background: 'orange',
              border: '2px solid #000',
            }}
          ></div>

          {/* Packages */}
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                position: 'absolute',
                top: `${pkg.top}px`,
                left: `${pkg.left}px`,
                width: '20px',
                height: '20px',
                background: 'green',
                borderRadius: '50%',
              }}
            ></div>
          ))}

          {/* Obstacles */}
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              style={{
                position: 'absolute',
                top: `${obs.top}px`,
                left: `${obs.left}px`,
                width: '20px',
                height: '20px',
                background: 'red',
              }}
            ></div>
          ))}

          {/* Score */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Score: {score}
          </div>

          {/* Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <button onClick={() => moveTruck('left')}>Left</button>
            <button onClick={() => moveTruck('right')}>Right</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryGame;
