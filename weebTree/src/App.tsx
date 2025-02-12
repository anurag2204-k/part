import { useEffect, useState } from "react";
import type { User } from "./types/user";

import Card1 from "./components/Card1";
import Footer from "./components/Footer";

export default function App() {
  const [cnt, setCnt] = useState(1);
  const [list, setList] = useState<User[]>([]);
  const [page, setPage] = useState(1); // Current pagination page

  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${cnt}&results=1&seed=abc`)
      .then((res) => res.json())
      .then((data) => {
        setList((prevList) => [...prevList, data.results[0]]);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [cnt]);

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedList = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Professional Card</h2>
            {paginatedList.map((user: User) => (
              <div key={user.email}>
                <Card1 user={user} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {list.length > itemsPerPage && (
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="p-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-200 rounded">Page {page}</span>
            <button
              className="p-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={startIndex + itemsPerPage >= list.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer cnt={cnt} setCnt={setCnt} />
    </>
  );
}
