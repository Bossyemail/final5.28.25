import { useState } from "react";
import { Copy, Trash2, Mail, Pencil } from "lucide-react";

const MOCK_FAVORITES = [
  {
    id: "1",
    subject: "Deposit Reminder",
    body: "Hi Buyer, just a quick reminder that your deposit is due soon. Please let us know if you have any questions!",
    date: "2024-06-01",
  },
  {
    id: "2",
    subject: "Congrats on Closing!",
    body: "Congratulations on closing your new home! Wishing you all the best in this exciting new chapter.",
    date: "2024-05-28",
  },
];

export function Favorites() {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState<typeof MOCK_FAVORITES[0] | null>(null);

  function handleCopy(fav: typeof MOCK_FAVORITES[0]) {
    navigator.clipboard.writeText(`Subject: ${fav.subject}\n\n${fav.body}`);
    setCopiedId(fav.id);
    setTimeout(() => setCopiedId(null), 1200);
  }

  function handleEdit(fav: typeof MOCK_FAVORITES[0]) {
    // Placeholder for edit action
    alert(`Edit favorite: ${fav.subject}`);
  }

  function handleDelete(id: string) {
    setFavorites(favorites => favorites.filter(f => f.id !== id));
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
  }

  function openFavoriteModal(fav: typeof MOCK_FAVORITES[0]) {
    setSelectedFavorite(fav);
    setShowModal(true);
  }
  function closeFavoriteModal() {
    setShowModal(false);
    setSelectedFavorite(null);
  }

  const filteredFavorites = favorites.filter(fav =>
    fav.subject.toLowerCase().includes(search.toLowerCase()) ||
    fav.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Favorites</h2>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center mb-6" style={{ borderRadius: 9999, overflow: 'hidden', background: 'white', border: '1px solid #e5e7eb' }}>
        <input
          type="text"
          placeholder="Search away"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="flex-1 px-5 py-3 text-lg text-zinc-700 placeholder-zinc-400 border-none outline-none bg-transparent"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-black text-white font-bold text-lg rounded-full"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 9999, borderBottomRightRadius: 9999 }}
        >
          SEARCH
        </button>
      </form>
      {filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400">
          <Mail className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium mb-2">No favorites yet</p>
          <p className="text-sm">Save emails to your favorites and they'll show up here for quick access.</p>
        </div>
      ) : (
        <ul className="divide-y divide-zinc-200">
          {filteredFavorites.map(fav => (
            <li
              key={fav.id}
              className="flex items-center group px-2 py-4 transition hover:bg-zinc-50 cursor-pointer"
              onClick={e => {
                if ((e.target as HTMLElement).closest('.copy-btn,.edit-btn,.delete-btn')) return;
                openFavoriteModal(fav);
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold text-zinc-900 truncate">{fav.subject}</div>
                <div className="text-sm text-zinc-500 truncate mt-1">{fav.body}</div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-zinc-400 min-w-[70px] text-right">{fav.date}</span>
                <button
                  onClick={() => handleCopy(fav)}
                  className="ml-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 transition relative copy-btn"
                  aria-label="Copy Email"
                >
                  <Copy className="w-5 h-5 text-zinc-700" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/copy:opacity-100 pointer-events-none transition-opacity">
                    {copiedId === fav.id ? "Copied!" : "Copy"}
                  </span>
                </button>
                <button
                  onClick={() => handleEdit(fav)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 transition relative edit-btn"
                  aria-label="Edit Email"
                >
                  <Pencil className="w-5 h-5 text-zinc-700" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/edit:opacity-100 pointer-events-none transition-opacity">
                    Edit
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(fav.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 transition relative delete-btn"
                  aria-label="Delete Email"
                >
                  <Trash2 className="w-5 h-5 text-zinc-700" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/delete:opacity-100 pointer-events-none transition-opacity">
                    Delete
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Modal for favorite preview */}
      {showModal && selectedFavorite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={closeFavoriteModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700 text-2xl"
              onClick={closeFavoriteModal}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-6">
              <div className="font-semibold text-zinc-800 mb-2">Subject:</div>
              <div className="mb-4 text-base text-zinc-900 whitespace-pre-line">
                {selectedFavorite.subject}
              </div>
              <div className="font-semibold text-zinc-800 mb-2">Body:</div>
              <div className="text-base text-zinc-900 whitespace-pre-line">
                {selectedFavorite.body}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleCopy(selectedFavorite)}
                className="flex items-center gap-2 px-4 py-2 rounded bg-black text-white hover:bg-zinc-800 transition"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={closeFavoriteModal}
                className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 