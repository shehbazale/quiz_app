
import React, { useCallback } from "react";

interface DifficultyStarsProps {
  difficulty: string;
}

const DifficultyStars: React.FC<DifficultyStarsProps> = ({ difficulty }) => {
  const DifficultyStars = useCallback(() => {
    let stars = 0;
    if (difficulty === "easy") stars = 1;
    else if (difficulty === "medium") stars = 2;
    else if (difficulty === "hard") stars = 3;

    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < stars ? "light-gray" : "gray"}
            viewBox="0 0 24 24"
            width="15"
            height="15"
          >
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        ))}
      </div>
    );
  }, [difficulty]);

  return <>{DifficultyStars()}</>;
};

export default DifficultyStars;
