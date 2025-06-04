import { useState } from "react";
import { Copy, Trash2, Mail, Pencil, Plus } from "lucide-react";

const MOCK_FAVORITES = [
  {
    id: "1",
    subject: "Deposit Reminder",
    body: "Hi Buyer, just a quick reminder that your deposit is due soon. Please let us know if you have any questions!",
    date: "2024-06-01",
    category: "Deposits"
  },
  {
    id: "2",
    subject: "Congrats on Closing!",
    body: "Congratulations on closing your new home! Wishing you all the best in this exciting new chapter.",
    date: "2024-05-28",
    category: "Closing"
  },
];

const CONTRACT_STAGES = {
  LISTING: "Listing",
  OFFER_STAGE: "Offer Stage",
  CONDO_HOA: "Condo / HOA",
  CONTRACT_SELLER: "Contract Seller Side",
  CONTRACT_BUYER: "Contract Buyer Side",
  DEPOSITS: "Deposits",
  DUE_DILIGENCE: "Due Diligence",
  FINANCING: "Financing",
  TITLE: "Title",
  PRE_CLOSING: "Pre-Closing",
  CLOSING: "Closing",
  POST_CLOSING: "Post-Closing",
  SOUTH_FLORIDA: "South Florida",
  TC_TOOLS: "TC Tools"
} as const;

export function Favorites() {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState<typeof MOCK_FAVORITES[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ subject: '', body: '', category: '' });
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

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

  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch = fav.subject.toLowerCase().includes(search.toLowerCase()) || fav.body.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || fav.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedFavorites = filteredFavorites.reduce((acc, fav) => {
    const cat = fav.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(fav);
    return acc;
  }, {} as Record<string, typeof MOCK_FAVORITES[0][]>);

  return (
    <div className="w-full font-sans pl-32 pr-16 sm:pl-8 sm:pr-4 xs:pl-2 xs:pr-2 dark:bg-[#424242] dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', color: '#232326', WebkitFontSmoothing: 'antialiased' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6 gap-3">
          <h2 className="text-3xl font-bold dark:text-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#232326' }}>Favorites</h2>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            onClick={() => { setShowAddModal(true); setAddError(''); setAddSuccess(false); setNewTemplate({ subject: '', body: '', category: '' }); }}
            aria-label="Add New Template"
            title="Add New Template"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        {/* Category Slider */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ WebkitOverflowScrolling: 'touch' }}>
          {[null,
            CONTRACT_STAGES.LISTING,
            CONTRACT_STAGES.OFFER_STAGE,
            CONTRACT_STAGES.CONDO_HOA,
            CONTRACT_STAGES.CONTRACT_SELLER,
            CONTRACT_STAGES.CONTRACT_BUYER,
            CONTRACT_STAGES.DEPOSITS,
            CONTRACT_STAGES.DUE_DILIGENCE,
            CONTRACT_STAGES.FINANCING,
            CONTRACT_STAGES.TITLE,
            CONTRACT_STAGES.PRE_CLOSING,
            CONTRACT_STAGES.CLOSING,
            CONTRACT_STAGES.POST_CLOSING,
            CONTRACT_STAGES.SOUTH_FLORIDA,
            CONTRACT_STAGES.TC_TOOLS
          ].map(category => (
            <button
              key={category || 'All'}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center justify-center px-6 py-2 rounded border text-sm font-medium transition-colors whitespace-nowrap
                ${selectedCategory === category || (!selectedCategory && !category)
                  ? 'bg-black text-white border-black'
                  : 'bg-white dark:bg-[#616161] text-zinc-700 dark:text-[#e0e0e0] border-zinc-300 dark:border-[#757575] hover:bg-zinc-100 dark:hover:bg-[#757575]'}
              `}
              aria-pressed={selectedCategory === category || (!selectedCategory && !category)}
            >
              {category || 'All'}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center mb-6" style={{ borderRadius: 9999, overflow: 'hidden', background: 'white', border: '1px solid #e5e7eb' }}>
          <input
            type="text"
            placeholder="Search away"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="flex-1 px-5 py-3 text-lg text-zinc-700 dark:text-[#e0e0e0] placeholder-zinc-400 dark:placeholder-[#bdbdbd] border-none outline-none bg-transparent"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-black text-white font-bold text-lg rounded-full"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 9999, borderBottomRightRadius: 9999 }}
          >
            SEARCH
          </button>
        </form>
        {Object.keys(groupedFavorites).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400 dark:text-[#bdbdbd]">
            <Mail className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium mb-2">No favorites yet</p>
            <p className="text-sm">Save emails to your favorites and they'll show up here for quick access.</p>
          </div>
        ) : (
          Object.entries(groupedFavorites).map(([category, favs]) => (
            <div key={category}>
              <ul>
                {favs.map((fav, idx) => (
                  <li
                    key={fav.id}
                    className={`flex items-center group px-2 py-4 transition hover:bg-zinc-50 dark:hover:bg-[#616161] cursor-pointer${idx !== favs.length - 1 ? ' border-b-2 border-black dark:border-[#616161]' : ''}`}
                    onClick={e => {
                      if ((e.target as HTMLElement).closest('.copy-btn,.edit-btn,.delete-btn')) return;
                      openFavoriteModal(fav);
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-zinc-900 dark:text-[#e0e0e0] truncate">{fav.subject}</div>
                      <div className="text-sm text-zinc-500 dark:text-[#bdbdbd] truncate mt-1">{fav.body}</div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleCopy(fav)}
                        className="ml-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-[#616161] transition relative copy-btn"
                        aria-label="Copy Email"
                      >
                        <Copy className="w-5 h-5 text-zinc-700 dark:text-[#e0e0e0]" />
                        <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/copy:opacity-100 pointer-events-none transition-opacity">
                          {copiedId === fav.id ? "Copied!" : "Copy"}
                        </span>
                      </button>
                      <button
                        onClick={() => handleEdit(fav)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-[#616161] transition relative edit-btn"
                        aria-label="Edit Email"
                      >
                        <Pencil className="w-5 h-5 text-zinc-700 dark:text-[#e0e0e0]" />
                        <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/edit:opacity-100 pointer-events-none transition-opacity">
                          Edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDelete(fav.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-[#616161] transition relative delete-btn"
                        aria-label="Delete Email"
                      >
                        <Trash2 className="w-5 h-5 text-zinc-700 dark:text-[#e0e0e0]" />
                        <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/delete:opacity-100 pointer-events-none transition-opacity">
                          Delete
                        </span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
        {/* Modal for favorite preview */}
        {showModal && selectedFavorite && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={closeFavoriteModal}
          >
            <div
              className="bg-white dark:bg-[#424242] rounded-xl shadow-xl w-full max-w-3xl sm:max-w-lg p-6 relative"
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-zinc-400 dark:text-[#bdbdbd] hover:text-zinc-700 dark:hover:text-[#e0e0e0] text-2xl"
                onClick={closeFavoriteModal}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-6">
                <div className="font-semibold text-zinc-800 dark:text-[#e0e0e0] mb-2">Subject:</div>
                <div className="mb-4 text-base text-zinc-900 dark:text-[#e0e0e0] whitespace-pre-line">
                  {selectedFavorite.subject}
                </div>
                <div className="font-semibold text-zinc-800 dark:text-[#e0e0e0] mb-2">Body:</div>
                <div className="text-base text-zinc-900 dark:text-[#e0e0e0] whitespace-pre-line">
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
                  className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-200 dark:bg-[#616161] text-zinc-700 dark:text-[#e0e0e0] hover:bg-zinc-300 dark:hover:bg-[#757575] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Add Template Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowAddModal(false)}>
            <div
              className="bg-white dark:bg-[#424242] rounded-2xl shadow-xl w-full max-w-xl p-8 relative flex flex-col"
              style={{ fontFamily: 'Inter, sans-serif', maxWidth: 600 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-zinc-400 dark:text-[#bdbdbd] hover:text-zinc-700 dark:hover:text-[#e0e0e0] text-2xl"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-xl font-bold mb-4 text-black dark:text-[#e0e0e0]">Add New Template</h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!newTemplate.subject.trim() || !newTemplate.body.trim()) {
                    setAddError('Title and Body are required.');
                    return;
                  }
                  setFavorites(favs => [
                    {
                      id: Date.now().toString(),
                      subject: newTemplate.subject,
                      body: newTemplate.body,
                      date: new Date().toISOString().slice(0, 10),
                      category: newTemplate.category || 'Uncategorized',
                    },
                    ...favs,
                  ]);
                  setAddSuccess(true);
                  setTimeout(() => setShowAddModal(false), 800);
                }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-[#e0e0e0]">Title<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newTemplate.subject}
                    onChange={e => setNewTemplate(t => ({ ...t, subject: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-[#757575] bg-white dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Template title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-[#e0e0e0]">Body<span className="text-red-500">*</span></label>
                  <textarea
                    value={newTemplate.body}
                    onChange={e => setNewTemplate(t => ({ ...t, body: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-[#757575] bg-white dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-black resize-none min-h-[160px]"
                    placeholder="Email body..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-[#e0e0e0]">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={e => setNewTemplate(t => ({ ...t, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-[#757575] bg-white dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Uncategorized</option>
                    {Object.values(CONTRACT_STAGES).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                {addError && <div className="text-red-500 text-sm">{addError}</div>}
                {addSuccess && <div className="text-green-600 text-sm">Template added!</div>}
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 rounded-full bg-black text-white font-bold hover:bg-zinc-800 transition-colors"
                >
                  Save
                </button>
              </form>
              {/* Live Preview */}
              {(newTemplate.subject || newTemplate.body) && (
                <div className="mt-6 p-4 rounded-xl bg-[#EFE1E1] dark:bg-[#616161] border border-zinc-200 dark:border-[#757575]">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-[#bdbdbd] mb-1">Preview</div>
                  <div className="text-base font-semibold text-zinc-900 dark:text-[#e0e0e0] mb-1">{newTemplate.subject || <span className="italic text-zinc-400">(No title)</span>}</div>
                  <div className="text-sm text-zinc-700 dark:text-[#e0e0e0] whitespace-pre-line">{newTemplate.body || <span className="italic text-zinc-400">(No body)</span>}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 