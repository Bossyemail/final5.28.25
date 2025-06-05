import { useState } from 'react';
import EmailGeneratorShowcase from './EmailGeneratorShowcase';

function TemplateLibraryPreviewHero() {
  // Copied from EmailGeneratorShowcase.tsx for direct use
  const templatePreviewData = [
    {
      category: "Contract Buyer Side",
      title: "We're Under Contract!",
      snippet: "Hi {{Buyer Name}}, Great news — we're officially under contract on {{Property Address}}..."
    },
    {
      category: "Contract Buyer Side",
      title: "Buyer's Agent introducing TC - We're Under Contract",
      snippet: "Hi {{Buyer Name}}, Great news — we're officially under contract on {{Property Address}}..."
    },
    {
      category: "Deposits",
      title: "Earnest Money Deposit Reminder w/ Wire Safety",
      snippet: "Hi {{Buyer Name}}, Just a reminder that your earnest money deposit is due by {{Deadline}}..."
    },
    {
      category: "Contract Buyer Side",
      title: "Request for Lease & Inventory",
      snippet: "Hi {{Listing Agent Name}}, As part of our due diligence and in accordance with Section 10..."
    },
    {
      category: "Financing",
      title: "Loan Application Status Email to Buyer",
      snippet: "Hi {{Buyer Name}}, I hope you're doing well! As part of the financing timeline outlined..."
    },
    {
      category: "Financing",
      title: "Loan Application Confirmation Email to Lender",
      snippet: "Hi {{Lender Name}}, I hope you're doing well. We're reaching out to confirm that {{Buyer Name}}..."
    },
    {
      category: "Contract Buyer Side",
      title: "Appraisal Report Status",
      snippet: "Hi {{Lender Name}}, I wanted to follow up to see if the appraisal report has been completed..."
    },
    {
      category: "Condo / HOA",
      title: "HOA Questionnaire Request",
      snippet: "Hi {{HOA Contact}}, Could you send over the completed HOA questionnaire for {{Property Address}}?"
    },
    {
      category: "Closing",
      title: "Closing Disclosure Review",
      snippet: "Hi {{Buyer Name}}, Please review the attached Closing Disclosure and let me know if you have questions..."
    },
    {
      category: "Listing",
      title: "Listing Feedback Request",
      snippet: "Hi {{Agent Name}}, Do you have any feedback from your recent showing at {{Property Address}}?"
    },
    {
      category: "Offer",
      title: "Offer Submission Confirmation",
      snippet: "Hi {{Buyer Name}}, Your offer for {{Property Address}} has been submitted. I'll update you as soon as I hear back..."
    },
  ];
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-xl border border-zinc-200 shadow-sm bg-white px-5 py-6 flex flex-col justify-center h-[360px] overflow-hidden">
        <div className="mb-4 text-left">
          <span className="text-xs font-normal text-zinc-500 uppercase tracking-wider">Time-Saving Templates</span>
          <div className="text-zinc-700 text-lg font-normal mt-1 mb-2">Browse 100+ plug-and-play templates</div>
        </div>
        <div className="divide-y divide-zinc-200 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-y-auto" style={{ maxHeight: 180 }}>
          {templatePreviewData.map((tpl, idx) => (
            <div key={idx} className="flex items-center px-5 py-3 hover:bg-zinc-50 transition group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-normal text-zinc-900 truncate">{tpl.title}</span>
                  <span className="text-xs bg-zinc-100 text-zinc-700 rounded px-2 py-0.5 border border-zinc-200 font-normal ml-1">{tpl.category}</span>
                </div>
                <div className="text-sm text-zinc-600 truncate">{tpl.snippet}</div>
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition">
                <button className="hover:text-[#734b6d]" title="Copy"><svg className="w-4 h-4" /></button>
                <button className="hover:text-[#734b6d]" title="Favorite"><svg className="w-4 h-4" /></button>
                <button className="hover:text-[#734b6d]" title="Send"><svg className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-xs text-zinc-500">...and many more templates inside BossyEmail</span>
        </div>
      </div>
    </div>
  );
}

export default function EmailGeneratorShowcaseTabs() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-zinc-200 mb-6">
        <button className={`flex-1 px-0 py-2 text-sm font-medium border-b-2 focus:outline-none ${activeTab === 0 ? 'border-black text-black' : 'border-transparent text-zinc-400'}`} onClick={() => setActiveTab(0)}>Smart Email Generator</button>
        <button className={`flex-1 px-0 py-2 text-sm font-medium border-b-2 focus:outline-none ${activeTab === 1 ? 'border-black text-black' : 'border-transparent text-zinc-400'}`} onClick={() => setActiveTab(1)}>Time-Saving Templates</button>
      </div>
      {/* Card Container */}
      <div className="w-full">
        {activeTab === 0 ? (
          <div className="h-[360px]">
            <EmailGeneratorShowcase />
          </div>
        ) : (
          <TemplateLibraryPreviewHero />
        )}
      </div>
    </div>
  );
} 