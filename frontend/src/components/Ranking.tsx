// frontend/src/components/Ranking.tsx
import React, { useEffect, useState } from "react";

interface UserRank {
  username: string;
  matches: number;
  win: number;
}

const Ranking: React.FC = () => {
  const [users, setUsers] = useState<UserRank[]>([]);

  const loadRanking = async () => {
    const res = await fetch(
      "https://tic-tac-toe-vercel-backend.vercel.app/api/users/ranking"
    );
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-bold">Ranking (Top 3)</h2>
      <ul className="mt-4">
        {users.map((user, idx) => (
          <li key={idx} className="mb-2">
            {idx + 1}. {user.username} - {user.win} Wins / {user.matches}{" "}
            Matches
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
