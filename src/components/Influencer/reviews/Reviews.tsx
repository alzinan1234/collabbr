"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Eye, Reply, Edit2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ReviewStatus = "Pending" | "Replied";

interface Review {
  id: number;
  date: string;
  business: string;
  businessFull: string;
  rating: number;
  review: string;
  reply: string;
  status: ReviewStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_REVIEWS: Review[] = [
  { id: 1, date: "25 Aug 2025, 11:34 PM", business: "trendify_co", businessFull: "Trendify Co.", rating: 4, review: "Super work!", reply: "", status: "Pending" },
  { id: 2, date: "25 Aug 2025, 11:34 PM", business: "trendify_co", businessFull: "Trendify Co.", rating: 5, review: "Super work!", reply: "Thanks a lot.", status: "Replied" },
  { id: 3, date: "25 Aug 2025, 11:34 PM", business: "trendify_co", businessFull: "Trendify Co.", rating: 5, review: "Super work!", reply: "Thanks for your review, I'm very grateful to you.", status: "Replied" },
  { id: 4, date: "25 Aug 2025, 11:34 PM", business: "trendify_co", businessFull: "Trendify Co.", rating: 5, review: "Super work!", reply: "Thanks", status: "Replied" },
  { id: 5, date: "24 Aug 2025, 10:20 PM", business: "trendify_co", businessFull: "Trendify Co.", rating: 3, review: "Good work", reply: "", status: "Pending" },
  { id: 6, date: "24 Aug 2025, 09:15 PM", business: "trendify_co", businessFull: "Trendify Co.", rating: 5, review: "Excellent!", reply: "Thank you!", status: "Replied" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | null>(null);
  const [openRatingDropdown, setOpenRatingDropdown] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openItemsDropdown, setOpenItemsDropdown] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const ratingOptions: number[] = [1, 2, 3, 4, 5];
  const statusOptions: ReviewStatus[] = ["Pending", "Replied"];
  const itemsOptions: number[] = [10, 20, 50];

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
    setReplyText(review.reply);
  };

  const handleUpdateReply = () => {
    if (!selectedReview) return;
    setReviews(prev => prev.map(r =>
      r.id === selectedReview.id
        ? { ...r, reply: replyText, status: "Replied" as ReviewStatus }
        : r
    ));
    setSelectedReview(null);
  };

  const filteredReviews = reviews.filter(review => {
    if (ratingFilter !== null && review.rating !== ratingFilter) return false;
    if (statusFilter !== null && review.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setOpenItemsDropdown(false);
    setCurrentPage(1);
  };

  return (
    <div className='bg-white'>
      <div className="p-8 mx-auto max-w-[1440px] font-sans text-slate-800 py-10 pb-30 pt-30">
        <h1 className="text-3xl font-bold mb-8">My Reviews</h1>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            Showing
            <div className="relative">
              <button
                onClick={() => setOpenItemsDropdown(!openItemsDropdown)}
                className="flex items-center gap-2 border border-indigo-200 px-3 py-1.5 rounded-lg text-indigo-600 font-medium cursor-pointer hover:bg-indigo-50 transition-colors"
              >
                {itemsPerPage} <ChevronDown size={16} className={`transition-transform ${openItemsDropdown ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openItemsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-40 w-40"
                  >
                    {itemsOptions.map(items => (
                      <button
                        key={items}
                        onClick={() => handleItemsPerPageChange(items)}
                        className={`w-full text-left px-4 py-2 hover:bg-slate-50 text-sm border-b border-slate-100 last:border-b-0 ${
                          itemsPerPage === items ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700'
                        }`}
                      >
                        {items} per page
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex gap-3 relative">
            {/* Rating Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenRatingDropdown(!openRatingDropdown)}
                className="flex items-center gap-2 border border-indigo-200 px-4 py-1.5 rounded-lg text-indigo-600 text-sm cursor-pointer font-medium hover:bg-indigo-50 transition-colors"
              >
                {ratingFilter ? `${ratingFilter} Star${ratingFilter > 1 ? 's' : ''}` : 'Rating'}
                <ChevronDown size={16} className={`transition-transform ${openRatingDropdown ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openRatingDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-40 w-40"
                  >
                    <button
                      onClick={() => { setRatingFilter(null); setOpenRatingDropdown(false); handleFilterChange(); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-100"
                    >
                      All Ratings
                    </button>
                    {ratingOptions.map(rating => (
                      <button
                        key={rating}
                        onClick={() => { setRatingFilter(rating); setOpenRatingDropdown(false); handleFilterChange(); }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm flex items-center gap-2 border-b border-slate-100 last:border-b-0"
                      >
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < rating ? "#7C3AED" : "none"} color={i < rating ? "#7C3AED" : "#CBD5E1"} />
                          ))}
                        </div>
                        {rating} Star{rating > 1 ? 's' : ''}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
                className="flex items-center gap-2 border border-indigo-200 px-4 py-1.5 rounded-lg text-indigo-600 text-sm cursor-pointer font-medium hover:bg-indigo-50 transition-colors"
              >
                {statusFilter ?? 'Status'}
                <ChevronDown size={16} className={`transition-transform ${openStatusDropdown ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openStatusDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-40 w-40"
                  >
                    <button
                      onClick={() => { setStatusFilter(null); setOpenStatusDropdown(false); handleFilterChange(); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-100"
                    >
                      All Status
                    </button>
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        onClick={() => { setStatusFilter(status); setOpenStatusDropdown(false); handleFilterChange(); }}
                        className={`w-full text-left px-4 py-2 hover:bg-slate-50 text-sm border-b border-slate-100 last:border-b-0 font-medium ${
                          status === 'Pending' ? 'text-red-500' : 'text-indigo-600'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(ratingFilter !== null || statusFilter !== null) && (
          <div className="mb-4 flex gap-2">
            {ratingFilter !== null && (
              <button
                onClick={() => { setRatingFilter(null); handleFilterChange(); }}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-200"
              >
                {ratingFilter} Star{ratingFilter > 1 ? 's' : ''} ✕
              </button>
            )}
            {statusFilter !== null && (
              <button
                onClick={() => { setStatusFilter(null); handleFilterChange(); }}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-200"
              >
                {statusFilter} ✕
              </button>
            )}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50/50 text-slate-400 font-medium border-b border-slate-50">
              <tr>
                <th className="px-6 py-4">Review At</th>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review</th>
                <th className="px-6 py-4">Your reply</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedReviews.length > 0 ? (
                paginatedReviews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-5 text-slate-600 leading-tight">
                      {item.date.split(',')[0]},<br />{item.date.split(',')[1]}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-slate-500 block">{item.business}</span>
                      <span className="text-slate-700 font-medium">{item.businessFull}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} fill={i < item.rating ? "#7C3AED" : "none"} color={i < item.rating ? "#7C3AED" : "#CBD5E1"} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-600">{item.review}</td>
                    <td className="px-6 py-5 text-slate-400 italic">
                      {item.reply ? item.reply : "--"}
                    </td>
                    <td className={`px-6 py-5 font-semibold ${item.status === 'Pending' ? 'text-red-500' : 'text-indigo-500'}`}>
                      {item.status}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-4 text-slate-400">
                        <Eye size={18} className="cursor-pointer hover:text-indigo-600 transition-colors" />
                        {item.status === 'Pending' ? (
                          <Reply
                            size={18}
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => handleOpenModal(item)}
                          />
                        ) : (
                          <Edit2
                            size={18}
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => handleOpenModal(item)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No reviews found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-slate-500">
            Showing {Math.min(startIndex + 1, filteredReviews.length)} to {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of {filteredReviews.length} reviews
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Reply Modal */}
        <AnimatePresence>
          {selectedReview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
              >
                <div className="p-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Update your reply</h2>

                  <div className="mb-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < selectedReview.rating ? "#7C3AED" : "none"} color={i < selectedReview.rating ? "#7C3AED" : "#CBD5E1"} />
                      ))}
                    </div>
                    <div className="bg-indigo-50/50 p-4 rounded-xl text-slate-600 text-sm">
                      {selectedReview.review}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Your reply</label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full h-32 p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setSelectedReview(null)}
                      className="flex-1 py-3 border border-red-400 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateReply}
                      className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-sm active:scale-95"
                    >
                      Update Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}