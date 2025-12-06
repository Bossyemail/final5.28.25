import { useState } from "react";
import { Copy, Trash2, Mail, Pencil, Plus } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useUser } from "@clerk/nextjs";
import Fuse from "fuse.js";

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

// Updated CONTRACT_STAGES with all categories
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
  POST_CLOSING_COMPLETION: "Post-Closing & File Completion",
  SOUTH_FLORIDA: "South Florida",
  TC_TOOLS: "TC Tools",
  DIFFICULT_CONVERSATIONS: "Difficult Conversations",
  LEAD_GENERATION: "Lead Generation & First Contact",
  BUYER_COMMUNICATION: "Buyer Communication",
  SELLER_COMMUNICATION: "Seller Communication",
  TRANSACTION_COORDINATION: "Transaction Coordination",
  REPAIRS_NEGOTIATIONS: "Repairs, Negotiations & Extensions",
  TITLE_ASSOCIATION: "Title, Association & Closing Coordination",
  CLOSING_WEEK: "Closing Week",
  COMPLIANCE_DOCUMENTS: "Compliance & Document Requests",
  REACTIVATION_NURTURE: "Reactivation & Past Client Nurture"
} as const;

export function Favorites() {
  const { subscription } = useSubscription();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin === true;
  const isRoyalty = subscription?.priceId === 'price_1SMfAgEApsNPWe3P2oUBGwvg';
  const hasFullAccess = isRoyalty || isAdmin;

  if (!hasFullAccess) {
    return (
      <div className="w-full pl-8 pr-8 sm:pl-4 sm:pr-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
        <div className="max-w-4xl mx-auto py-8">
          <h2 className="text-2xl font-normal mb-6 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>Favorites</h2>
          <p className="text-base font-medium mb-2 text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>This feature is only available for Inbox Royalty subscribers.</p>
          <p className="text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Please upgrade your plan to access favorites.</p>
        </div>
      </div>
    );
  }

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

  const fuse = new Fuse(favorites, {
    keys: ["subject", "body"],
    threshold: 0.35, // adjust for fuzziness
  });

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

  function openFavoriteModal(fav: typeof MOCK_FAVORITES[0]) {
    setSelectedFavorite(fav);
    setShowModal(true);
  }
  function closeFavoriteModal() {
    setShowModal(false);
    setSelectedFavorite(null);
  }

  const filteredFavorites = searchInput.trim()
    ? fuse.search(searchInput).map(result => result.item)
    : favorites.filter(fav => {
        const matchesCategory = !selectedCategory || fav.category === selectedCategory;
        return matchesCategory;
      });

  const groupedFavorites = filteredFavorites.reduce((acc, fav) => {
    const cat = fav.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(fav);
    return acc;
  }, {} as Record<string, typeof MOCK_FAVORITES[0][]>);

  return (
    <div className="w-full pl-8 pr-8 sm:pl-4 sm:pr-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center mb-8 gap-3">
          <h2 className="text-2xl font-normal text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>Favorites</h2>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-none border border-[#161616] bg-[#161616] text-white hover:bg-[#292929] transition-colors focus:outline-none focus:ring-2 focus:ring-[#161616]"
            onClick={() => { setShowAddModal(true); setAddError(''); setAddSuccess(false); setNewTemplate({ subject: '', body: '', category: '' }); }}
            aria-label="Add New Template"
            title="Add New Template"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {/* Category Slider */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ WebkitOverflowScrolling: 'touch' }}>
          {[null,
            CONTRACT_STAGES.BUYER_COMMUNICATION,
            CONTRACT_STAGES.CLOSING,
            CONTRACT_STAGES.CLOSING_WEEK,
            CONTRACT_STAGES.COMPLIANCE_DOCUMENTS,
            CONTRACT_STAGES.CONDO_HOA,
            CONTRACT_STAGES.CONTRACT_BUYER,
            CONTRACT_STAGES.CONTRACT_SELLER,
            CONTRACT_STAGES.DEPOSITS,
            CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
            CONTRACT_STAGES.DUE_DILIGENCE,
            CONTRACT_STAGES.FINANCING,
            CONTRACT_STAGES.LEAD_GENERATION,
            CONTRACT_STAGES.LISTING,
            CONTRACT_STAGES.OFFER_STAGE,
            CONTRACT_STAGES.POST_CLOSING_COMPLETION,
            CONTRACT_STAGES.PRE_CLOSING,
            CONTRACT_STAGES.REACTIVATION_NURTURE,
            CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
            CONTRACT_STAGES.SELLER_COMMUNICATION,
            CONTRACT_STAGES.SOUTH_FLORIDA,
            CONTRACT_STAGES.TC_TOOLS,
            CONTRACT_STAGES.TITLE,
            CONTRACT_STAGES.TITLE_ASSOCIATION
          ].map(category => (
            <button
              key={category || 'All'}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center justify-center px-3 py-1.5 rounded-none border text-xs font-medium transition-colors whitespace-nowrap
                ${selectedCategory === category || (!selectedCategory && !category)
                  ? 'bg-[#161616] border-[#161616] text-white'
                  : 'bg-white border-[#E3E3E3] text-[#505050] hover:bg-[#FBFBFB] hover:text-[#161616] hover:border-[#ABABAB]'}
              `}
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
              aria-pressed={selectedCategory === category || (!selectedCategory && !category)}
            >
              {category || 'All'}
            </button>
          ))}
        </div>
      {/* Search Bar */}
      <div className="mb-6 w-full">
        <div className="relative flex items-center w-full bg-white border border-[#E3E3E3] rounded-2xl shadow-sm hover:shadow-md transition-shadow focus-within:border-[#161616] focus-within:shadow-md h-12">
          <input
            type="text"
            placeholder="Search favorites..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="flex-1 px-5 h-full text-base text-[#161616] placeholder-[#ABABAB] bg-transparent border-none rounded-2xl focus:outline-none"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => { setSearchInput(""); }}
              className="text-[#ABABAB] hover:text-[#505050] text-xl focus:outline-none px-3"
              aria-label="Clear search"
              tabIndex={0}
            >
              ×
            </button>
          )}
        </div>
      </div>
        {Object.keys(groupedFavorites).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-[#ABABAB]">
          <Mail className="w-12 h-12 mb-4 text-[#505050]" />
          <p className="text-base font-medium mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>No favorites yet</p>
          <p className="text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Save emails to your favorites and they'll show up here for quick access.</p>
        </div>
      ) : (
          <div className="space-y-2">
          {Object.entries(groupedFavorites).map(([category, favs]) => (
            <div key={category}>
              {Object.keys(groupedFavorites).length > 1 && (
                <h3 className="text-sm font-medium text-[#505050] mb-2 mt-4 first:mt-0" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>{category}</h3>
              )}
              <ul className="space-y-2">
                {favs.map((fav) => (
            <li
              key={fav.id}
                    className="flex items-center group px-4 py-3 transition hover:bg-[#FBFBFB] cursor-pointer border border-transparent hover:border-[#E3E3E3] rounded-lg"
              onClick={e => {
                if ((e.target as HTMLElement).closest('.copy-btn,.edit-btn,.delete-btn')) return;
                openFavoriteModal(fav);
              }}
            >
              <div className="flex-1 min-w-0">
                      <div className="text-base font-medium text-[#161616] truncate" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>{fav.subject}</div>
                      <div className="text-sm text-[#505050] truncate mt-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>{fav.body}</div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleCopy(fav)}
                        className="w-9 h-9 flex items-center justify-center rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] transition relative copy-btn"
                  aria-label="Copy Email"
                >
                        <Copy className="w-4 h-4 text-[#505050]" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-[#161616] px-2 py-1 text-xs text-white opacity-0 group-hover/copy:opacity-100 pointer-events-none transition-opacity">
                    {copiedId === fav.id ? "Copied!" : "Copy"}
                  </span>
                </button>
                <button
                  onClick={() => handleEdit(fav)}
                        className="w-9 h-9 flex items-center justify-center rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] transition relative edit-btn"
                  aria-label="Edit Email"
                >
                        <Pencil className="w-4 h-4 text-[#505050]" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-[#161616] px-2 py-1 text-xs text-white opacity-0 group-hover/edit:opacity-100 pointer-events-none transition-opacity">
                    Edit
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(fav.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] transition relative delete-btn"
                  aria-label="Delete Email"
                >
                        <Trash2 className="w-4 h-4 text-[#505050]" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-[#161616] px-2 py-1 text-xs text-white opacity-0 group-hover/delete:opacity-100 pointer-events-none transition-opacity">
                    Delete
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
            </div>
          ))}
          </div>
      )}
      {/* Modal for favorite preview */}
      {showModal && selectedFavorite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={closeFavoriteModal}
        >
          <div
              className="bg-white rounded-lg shadow-xl w-full max-w-3xl sm:max-w-lg p-6 relative"
              style={{ maxHeight: '90vh', overflowY: 'auto', fontFamily: 'var(--font-inter-tight), sans-serif' }}
            onClick={e => e.stopPropagation()}
          >
            <button
                className="absolute top-3 right-3 text-[#ABABAB] hover:text-[#505050] text-2xl"
              onClick={closeFavoriteModal}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-6">
                <div className="font-medium text-[#161616] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Subject:</div>
                <div className="mb-4 text-base text-[#161616] whitespace-pre-line" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                {selectedFavorite.subject}
              </div>
                <div className="font-medium text-[#161616] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Body:</div>
                <div className="text-base text-[#161616] whitespace-pre-line" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                {selectedFavorite.body}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleCopy(selectedFavorite)}
                className="flex items-center gap-2 px-4 py-2 rounded-none border border-[#161616] bg-[#161616] text-white hover:bg-[#292929] transition"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={closeFavoriteModal}
                  className="flex items-center gap-2 px-4 py-2 rounded-none border border-[#E3E3E3] bg-white text-[#161616] hover:bg-[#FBFBFB] hover:border-[#ABABAB] transition"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
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
              className="bg-white rounded-lg shadow-xl w-full max-w-xl p-8 relative flex flex-col max-h-[90vh] overflow-y-auto"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', maxWidth: 600 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-[#ABABAB] hover:text-[#505050] text-2xl"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-base font-medium mb-4 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Add New Template</h3>
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
                  <label className="block text-sm font-medium mb-1 text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Title<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newTemplate.subject}
                    onChange={e => setNewTemplate(t => ({ ...t, subject: e.target.value }))}
                    className="w-full px-3 py-2 rounded-none border border-[#E3E3E3] bg-white text-[#161616] placeholder-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-[#161616] focus:border-[#161616]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                    placeholder="Template title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Body<span className="text-red-500">*</span></label>
                  <textarea
                    value={newTemplate.body}
                    onChange={e => setNewTemplate(t => ({ ...t, body: e.target.value }))}
                    className="w-full px-3 py-2 rounded-none border border-[#E3E3E3] bg-white text-[#161616] placeholder-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-[#161616] focus:border-[#161616] resize-y min-h-[120px] max-h-[400px]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                    placeholder="Email body... (drag the bottom-right corner to resize)"
                    required
                    rows={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={e => setNewTemplate(t => ({ ...t, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-none border border-[#E3E3E3] bg-white text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#161616] focus:border-[#161616]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                  >
                    <option value="">Uncategorized</option>
                    {Object.values(CONTRACT_STAGES).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                {addError && <div className="text-red-500 text-sm" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>{addError}</div>}
                {addSuccess && <div className="text-green-600 text-sm" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Template added!</div>}
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 rounded-none border border-[#161616] bg-[#161616] text-white font-medium hover:bg-[#292929] transition-colors"
                  style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                >
                  Save
                </button>
              </form>
              {/* Live Preview */}
              {(newTemplate.subject || newTemplate.body) && (
                <div className="mt-6 p-4 rounded-lg bg-[#FBFBFB] border border-[#E3E3E3] max-h-[200px] overflow-y-auto">
                  <div className="text-xs font-medium text-[#505050] mb-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Preview</div>
                  <div className="text-base font-medium text-[#161616] mb-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>{newTemplate.subject || <span className="italic text-[#ABABAB]">(No title)</span>}</div>
                  <div className="text-sm text-[#505050] whitespace-pre-line" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>{newTemplate.body || <span className="italic text-[#ABABAB]">(No body)</span>}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 