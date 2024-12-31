import React, { useEffect, useState } from "react";
import trophy from "../../public/finalist-no_background.png";

interface UserRank {
  username: string;
  matches: number;
  win: number;
  winRate: number;
}

const Ranking: React.FC = () => {
  const [users, setUsers] = useState<UserRank[]>([]);

  const loadRanking = async () => {
    const res = await fetch(
      "https://tic-tac-toe-7u0u.onrender.com/api/users/ranking"
    );
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <div className="h-screen pt-24 bg-stone-800 font-MICRO">
      <h2 className="ml-16 text-5xl font-bold text-green-600">Ranking</h2>
      <ol className="mt-32 text-center">
        {users.map((user, idx) => (
          <li
            key={idx}
            className={`mb-16 ${
              idx === 0
                ? "text-amber-400 text-7xl"
                : idx === 1
                ? "text-stone-300 text-5xl"
                : "text-yellow-600 text-3xl"
            }`}
          >
            {idx === 0 && (
              <img
                src={trophy}
                alt="trophy"
                className="inline-block h-auto w-14"
              />
            )}{" "}
            {idx + 1}. {user.username} {user.win}
            <span
              className={`${
                idx === 0 ? "text-3xl" : idx === 1 ? "text-xl" : "text-base"
              }`}
            >
              Wins
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Ranking;
