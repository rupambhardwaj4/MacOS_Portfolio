import React, { useState } from "react";
import { blogPosts } from "#constants/index.js";

const Safari = () => {
  const [url, setUrl] = useState("https://jsmastery.com/blog");

  return (
    <div className="flex flex-col flex-1 h-full select-none">
      {/* Browser Address Bar / Header */}
      <div className="h-12 bg-[#efeff0] border-b border-[#d1d1d6] flex items-center px-4 gap-4 flex-none">
        {/* Navigation arrows (decorative) */}
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400 hover:bg-gray-200/50 rounded" disabled>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 text-gray-400 hover:bg-gray-200/50 rounded" disabled>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex-center">
          <div className="search flex items-center gap-2 w-2/3 max-w-xl bg-white border border-gray-300/60 rounded-lg px-3 py-1 text-xs text-gray-600 shadow-sm">
            {/* Lock Icon */}
            <svg className="w-3 h-3 text-green-600 flex-none" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent outline-none text-center"
            />
          </div>
        </div>

        {/* Settings/Share button */}
        <div className="flex items-center">
          <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Browser Body / Webpage Mock */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="blog py-8 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-pink-600 mb-8 border-b pb-4">Latest Articles</h2>

          <div className="flex flex-col gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => window.open(post.link, "_blank")}
                className="blog-post flex flex-col md:grid md:grid-cols-12 gap-5 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 cursor-pointer transition-all duration-200"
              >
                {/* Post Image */}
                <div className="md:col-span-3 h-32 w-full flex-none overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Post Info */}
                <div className="content md:col-span-9 flex flex-col justify-between py-1">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{post.date}</p>
                    <h3 className="font-bold text-base text-gray-800 leading-snug group-hover:text-pink-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
                      Read Article
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safari;
