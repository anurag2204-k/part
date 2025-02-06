import { useEffect, useState } from "react";
import type { User } from "./types/user";

import Card1 from "./components/Card1";
import Card2 from "./components/Card2";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=1&seed=dfabc")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Professional Card</h2>
            {user && <Card1 user={user} />}
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Trial Card</h2>
            {user && <Card2 user={user} />}
          </div>
        </div>
    </div>
  );
}