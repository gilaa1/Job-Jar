import React, { useState, useEffect, useRef } from 'react';

const JumpGame = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(400);
  const [playerTop, setPlayerTop] = useState(150);
  const [score, setScore] = useState(0);

  const gameAreaRef = useRef(null);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (obstacleLeft > -50) {
        setObstacleLeft((prev) => prev - 5);
      } else {
        setObstacleLeft(400); // Reset obstacle
        setScore((prev) => prev + 1); // Increase score
      }

      if (!isJumping && playerTop < 150) {
        setPlayerTop((prev) => prev + 4); // Gravity effect
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [isJumping, obstacleLeft, playerTop]);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      let jumpHeight = 0;
      const jumpInterval = setInterval(() => {
        if (jumpHeight < 50) {
          setPlayerTop((prev) => prev - 5); // Jump up
          jumpHeight += 5;
        } else {
          clearInterval(jumpInterval);
          setIsJumping(false); // End jump
        }
      }, 20);
    }
  };

  // Check for collision
  useEffect(() => {
    if (
      obstacleLeft < 50 &&
      obstacleLeft > 0 &&
      playerTop >= 130 // Player and obstacle collide
    ) {
      alert(`Game Over! Your score: ${score}`);
      setObstacleLeft(400);
      setScore(0);
    }
  }, [obstacleLeft, playerTop, score]);

  return (
    <div
      ref={gameAreaRef}
      style={{
        position: 'relative',
        width: '400px',
        height: '200px',
        background: '#ddd',
        overflow: 'hidden',
        border: '2px solid #000',
      }}
      onClick={handleJump}
    >
      <div
        style={{
          position: 'absolute',
          bottom: `${150 - playerTop}px`,
          left: '50px',
          width: '20px',
          height: '20px',
          background: 'blue',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: `${obstacleLeft}px`,
          width: '20px',
          height: '20px',
          background: 'red',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          fontSize: '16px',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default JumpGame;
