import { useState, useEffect } from "react";
import { Mail, Clipboard, Pencil, Trash2, Filter, Star } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useUser } from "@clerk/nextjs";
import Fuse from "fuse.js";

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
  TC_TOOLS: "TC Tools",
  DIFFICULT_CONVERSATIONS: "Difficult Conversations",
  LEAD_GENERATION: "Lead Generation & First Contact",
  BUYER_COMMUNICATION: "Buyer Communication",
  SELLER_COMMUNICATION: "Seller Communication",
  TRANSACTION_COORDINATION: "Transaction Coordination",
  REPAIRS_NEGOTIATIONS: "Repairs, Negotiations & Extensions",
  TITLE_ASSOCIATION: "Title, Association & Closing Coordination",
  CLOSING_WEEK: "Closing Week",
  POST_CLOSING_COMPLETION: "Post-Closing & File Completion",
  COMPLIANCE_DOCUMENTS: "Compliance & Document Requests",
  REACTIVATION_NURTURE: "Reactivation & Past Client Nurture"
} as const;

const MOCK_TEMPLATES = [
  {
    id: "t1",
    title: "Inspection Reminder",
    body: "Hi [Recipient], just a reminder that your property inspection is scheduled for [Date]. Please let us know if you have any questions!",
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t2",
    title: "Welcome Email",
    body: "Welcome to your new home! We're excited to help you through this process. Let us know if you need anything.",
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t3",
    title: "Closing Congratulations",
    body: "Congratulations on closing! Wishing you all the best in your new chapter.",
    category: CONTRACT_STAGES.POST_CLOSING,
  },
  {
    id: "t4",
    title: "Post-Showing Thank You Email",
    body: `Hi {{Listing Agent Name}},\n\nJust wanted to thank you for taking the time to show us {{Property Address}} today. We really appreciated the opportunity to walk through and learn more about the home.\n\nI'll be following up with my client shortly, and I'll keep you posted if we decide to move forward.\n\nThanks again for your time and hospitality!\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t5",
    title: "Showing Request",
    body: `Hi {{Listing Agent Name}},\n\nHope you're doing well! I'd like to schedule a showing for {{Property Address}} with my buyer, {{Buyer First Name}}.\n\nWe're aiming for {{Preferred Date}} around {{Preferred Time}}, but we're flexible if another time works better for your sellers.\n\nFor your peace of mind — the buyer has been fully vetted by a lender and is pre-approved, or alternatively, has proof of funds in hand for a cash purchase.\n\nLooking forward to your confirmation.\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t6",
    title: "Withdrawal of Offer",
    body: `Hi {{Listing Agent Name}},\n\nI wanted to let you know that our buyer has decided to formally withdraw their offer on {{Property Address}}, originally submitted on {{Submission Date}}.\n\nWe appreciate your time and consideration throughout the process. Please confirm receipt of this notice for our records.\n\nWishing you and your sellers the very best moving forward.\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t7",
    title: "Counteroffer Submission",
    body: `Hi {{Listing Agent Name}},\n\nThanks for the update. Our buyer has reviewed your seller's counter and would like to submit this revised offer. We've attached the updated contract with changes highlighted.\n\nLooking forward to hearing your thoughts,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t8",
    title: "Offer Summary",
    body: `Hi {{Listing Agent Name}},\n\nThanks again for accommodating the showing — we really appreciate your time.\n\nHere's a quick snapshot of our buyer's offer on {{Property Address}}:\nPrice: \${{Offer Price}}\nClosing: {{Closing Date}}\nInspection Period: {{Inspection Period}}\nFinancing: {{Financing Type}}\nDeposit: \${{Deposit Amount}}\n\nThe full contract and all supporting documents are attached for your review. Please let us know if you have any questions or need anything else.\n\nLooking forward to working together.\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t9",
    title: "Following Up on Offer",
    body: `Hi {{Listing Agent Name}},\n\nJust touching base to see if there's been any feedback from your seller regarding the offer we submitted on {{Submission Date}} for {{Property Address}}.\n\nOur buyer remains very interested and ready to move forward. Please let us know if there's anything we can clarify or adjust to help move things along.\n\nThanks again, and looking forward to your reply.\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t10",
    title: "Excited Buyer for Offer Coming Soon",
    body: `Hi {{Listing Agent Name}},\n\nThanks again for taking the time to show us {{Property Address}} — we truly appreciate it.\n\nI wanted to give you a quick heads-up that we're preparing an offer today. Our buyer, {{Buyer First Name}}, is serious, well-qualified, and excited about the opportunity.\n\nYou'll see everything come through shortly. Looking forward to working together!\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t11",
    title: "Buyer Proof of Funds Submission",
    body: `Hi {{Listing Agent Name}},\n\nAs requested, please find attached the buyer's proof of funds for {{Buyer Name}}. Let us know if you need any clarifications.\n\nWarmly,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t12",
    title: "Buyer Pre-Approval",
    body: `Hi {{Listing Agent Name}},\n\nAttached is the pre-approval letter from {{Lender Name}} for our buyer, {{Buyer Name}}, who is fully vetted and ready to move forward.\n\nThe lender is available should you or the seller have any questions or wish to discuss the loan details directly. We're confident in the strength of this financing and excited about the opportunity to work together on this deal.\n\nPlease don't hesitate to reach out with any questions.\n\nSincerely,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t13",
    title: "Escalation Offer",
    body: `Hi {{Listing Agent Name}},\n\nAttached is our buyer's offer for {{Property Address}}, which includes an escalation clause up to \${{Max Price}}, increasing in increments of \${{Increment}} above any competing offer.\n\nWe've included the escalation addendum for your review. {{Buyer Name}} is highly motivated and prepared to move forward quickly.\n\nPlease don't hesitate to reach out if you have any questions or need anything further.\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t14",
    title: "Offer on Property Attached for Review",
    body: `Hi {{Listing Agent Name}},\n\nAttached is our buyer's offer for {{Property Address}}, along with all required addenda and proof of funds.\n\n{{Buyer Name}} is motivated and well-qualified — we're hopeful this will be a smooth deal for everyone involved.\n\nLooking forward to your seller's feedback. Please don't hesitate to reach out with any questions.\n\nBest regards,`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t15",
    title: "Request for Condo Docs & Association Financials",
    body: `Hi {{Listing Agent Name}},\n\nI'm reaching out on behalf of my buyer who is seriously interested in {{Property Address}} and is preparing to submit an offer. Before doing so, they would like to review the following documents from the association, if available:\n\n- Full set of Condominium Documents (including declaration, bylaws, rules & regs, budget, and FAQ)\n- Current financials (including budget, year end statements and reserves)\n- Any pending or recently approved special assessments\n- The last three board meeting minutes to review for any upcoming changes or discussions relevant to the property or association\n\nHaving access to this information will help the buyer make a fully informed and confident offer. Please let me know what you're able to share and if there's a preferred process for obtaining the documents from the association.\n\nLooking forward to your response.`,
    category: CONTRACT_STAGES.OFFER_STAGE,
  },
  {
    id: "t16",
    title: "We're Under Contract!",
    body: `Hi {{Buyer Name}},\n\nGreat news — we're officially under contract on {{Property Address}}!\n\nHere's what happens next:\n(Include critical dates here)\n\n🔔 Important Note: The dates listed in your contract are not suggestions — they're binding deadlines. Missing a timeline could put your deposit or deal at risk, so it's important we stay on schedule.\n\nThis process takes a full team effort to get across the finish line. You'll be hearing from the title company, your lender (if applicable), and myself throughout the transaction. All official communication will be sent via email, so please keep an eye on your inbox and check your spam folder just in case something gets filtered.\n\nI'll be coordinating everything behind the scenes to keep things running smoothly and will keep you updated every step of the way.\n\nLet me know if you have any questions — I'm here to help!\n\nTalk soon,`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t17",
    title: "Buyer's Agent introducing TC - We're Under Contract!",
    body: `Hi {{Buyer Name}},\n\nGreat news — we're officially under contract on {{Property Address}}! 🎉\n\nI want to introduce you to {{TC Name}}, my trusted Transaction Coordinator, who will be helping us navigate everything from now until closing day.\n\n{{TC Name}} will be your main point of contact for timelines, documents, reminders, and general updates — basically, the person who keeps everything on track behind the scenes.\n\nHere's What Happens Next:\n{{TC Name}} will be sending you a transaction summary shortly with important deadlines, next steps, and contact info for everyone involved (lender, title, etc.).\n\nQuick Reminder:\nThe dates in the contract are not flexible suggestions — they're legal deadlines that must be met to keep the deal secure. {{TC Name}} will help you stay ahead of these, but please be responsive and keep an eye on your inbox. (And yes — check your spam folder just in case.)\n\nTeamwork Makes It Happen:\nBetween me, our TC, your lender, and the title company — it truly takes a team to close a deal. We'll all be communicating primarily via email, so please keep an eye out for anything labeled as "Time-Sensitive" or "Action Required."\n\nWe're excited to get this done for you — reach out if you have any questions along the way!\n\nTalk soon,`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t18",
    title: "Earnest Money Deposit Reminder w/ Wire Safety Tips",
    body: `Hi {{Buyer Name}},\n\nJust a reminder that your earnest money deposit is due by {{Deposit Deadline}} and should be sent directly to the closing agent handling your transaction.\n\nPlease note the following important details when sending your deposit:\n- Always call the closing agent directly to verbally confirm the wire instructions before sending any funds.\n- Do not rely solely on emailed wire details — wire fraud is a real and ongoing issue in real estate transactions.\n\nThe title company's contact information is:\n{{Title Company Name}}\nPhone: {{Title Phone}}\nEmail: {{Title Email}}\n\nWire vs. ACH (Very Important)\nMany banks default to ACH transfers, which are not the same as traditional wires and will not be accepted by most title companies. To avoid delays or rejection of your deposit, we recommend:\n- Speaking with a live representative at your bank\n- Clearly stating that you're initiating a traditional domestic wire transfer, not an ACH\n- Double-checking the transfer method and confirmation receipt before leaving the bank or closing your banking app\n\nOnce your wire has been sent, please reply to this email to let us know and we'll follow up with the title company to confirm receipt.\n\nLet us know if you need anything or if you'd like us to resend the wire instructions for verification.\n\nBest regards,`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t19",
    title: "Request for Lease & Inventory",
    body: `Hi {{Listing Agent Name}},\n\nAs part of our due diligence and in accordance with Section 6 of the AS IS Contract, we kindly request the following for {{Property Address}}:\n- A copy of the current lease agreement(s), if the property is tenant-occupied.\n- A list of inventory that will remain with the property, including any furnishings, fixtures, or personal property included in the lease or agreement. Kindly confirm what items belong to the tenant and which items convey with the property.\n\nThis will help our buyer review all terms related to possession and ensure a smooth transition at closing.\n\nPlease let us know if these documents are readily available, or if there's anything specific we should be aware of regarding the tenant(s).\n\nLooking forward to your response.\n\nBest regards,`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t20",
    title: "Loan Application Status Email to Buyer",
    body: `Hi {{Buyer Name}},\n\nI hope you're doing well!\n\nAs part of the financing timeline outlined in your contract (Section 8 of the Florida AS IS Contract), the buyer is required to submit a loan application within five ( ) days of the effective date.\n\nCan you please confirm that your application has been submitted to your lender? If it has already been completed, no further action is needed — just a quick reply confirming will help us document the file properly.\n\nIf you haven't done so yet, please reach out to your lender as soon as possible to remain compliant with the terms of the contract and avoid any potential delays.\n\nLet us know if you need assistance connecting with your lender or have any questions.\n\nBest regards,`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t21",
    title: "Loan Application Confirmation Email to Lender",
    body: `Hi {{Lender Name}},\n\nI hope you're doing well.\n\nWe're reaching out to confirm that {{Buyer Name}} has officially submitted their loan application for {{Property Address}}. As outlined in Section 8(b) of the Florida AS IS Residential Contract, the buyer is required to apply for financing within five ( ) days of the effective date of the contract.\n\nIf the application has already been completed, please confirm so we can document our file accordingly. If not, we kindly ask that it be completed as soon as possible to keep the transaction compliant and on schedule.\n\nPlease also feel free to share any outstanding items or next steps needed from the buyer on your end.\n\nThanks so much, and we look forward to working with you!\n\nBest regards,`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t22",
    title: "Loan Application Confirmation Email to Lender",
    body: `Hi {{Lender Name}},\n\nI hope you're doing well.\n\nWe're reaching out to confirm that {{Buyer Name}} has officially submitted their loan application for {{Property Address}}. As outlined in Section 8(b) of the Florida AS IS Residential Contract, the buyer is required to apply for financing within five ( ) days of the effective date of the contract.\n\nIf the application has already been completed, please confirm so we can document our file accordingly. If not, we kindly ask that it be completed as soon as possible to keep the transaction compliant and on schedule.\n\nPlease also feel free to share any outstanding items or next steps needed from the buyer on your end.\n\nThanks so much, and we look forward to working with you!\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t23",
    title: "Appraisal Status",
    body: `Hi {{Lender Name}},\n\nI hope you're doing well.\n\nI wanted to check in regarding the appraisal for {{Property Address}}. Has it already been ordered? If so, do you have an estimated completion date?\n\nAlso, please let us know if an appraisal waiver has been issued for this loan, as that would help us plan the next steps on our end.\n\nAppreciate your help — looking forward to your update!\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t24",
    title: "Appraisal Report Status",
    body: `Hi {{Lender Name}},\n\nI wanted to follow up to see if the appraisal report has been completed for {{Property Address}}, and whether it supports the contract sales price in as-is condition.\n\nIf the value came in at or above the contract price, please confirm so we can document our file. If the value came in low or with any lender-required repairs, please advise as soon as possible so we can begin negotiations with the seller and prepare the appropriate addendum if needed.\n\nAppreciate your help and looking forward to your update!\n\nBest regards,`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t25",
    title: "Appraisal Report Status",
    body: `Hi {{Lender Name}},\n\nI wanted to follow up to see if the appraisal report has been completed for {{Property Address}}, and whether it supports the contract sales price in as-is condition.\n\nIf the value came in at or above the contract price, please confirm so we can document our file. If the value came in low or with any lender-required repairs, please advise as soon as possible so we can begin negotiations with the seller and prepare the appropriate addendum if needed.\n\nAppreciate your help and looking forward to your update!\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t26",
    title: "Request for Loan Approval Status",
    body: `Hi {{Lender Name}},\n\nWe're reaching out for an update on the loan approval status for {{Buyer Name}} in connection with the purchase of {{Property Address}}.\n\nPer Section 8 of the Florida AS IS Residential Contract, it's critical that we receive written Loan Approval (and/or Clear to Close, if available) on or before the Loan Approval Period deadline to protect the buyer's deposit and keep the transaction in good standing.\n\nPlease confirm whether:\n- Formal Loan Approval has been issued\n- The file has received Clear to Close (if applicable)\n- Or if there are any outstanding items still needed\n\nIf approval has already been granted, please send a copy or confirmation that we can deliver to the seller's side in compliance with the contract terms.\n\nThank you for your attention and assistance — we appreciate your help keeping everything on track!\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t27",
    title: "Appraisal Inspection Confirmation",
    body: `Hi {{Lender Name}},\n\nI just wanted to confirm the appraisal inspection details for {{Property Address}}.\n\nCan you please confirm the following:\n- Scheduled Date & Time of the Appraisal Inspection\n- Appraiser's Name or Company (if available)\n- Any access instructions or coordination needed on our end\n\nWe'd like to make sure the sellers (or listing agent) are properly informed and that access is ready for the appraiser.\n\nAppreciate your help — looking forward to your confirmation!\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t28",
    title: "Condo Project Approval – Additional Items Needed from Management Company",
    body: `Hi {{Listing Agent Name}},\n\nI hope you're doing well.\n\nThe lender has advised that a few additional items are needed from the condo management company in order to complete the project approval process for {{Property Address}}. I've copied the lending team on this email so they can provide specific details on what's still outstanding.\n\nWe understand the seller may have an established relationship with the association or property manager, and any assistance they can provide in expediting the response would be sincerely appreciated. Timely cooperation here can help us avoid any potential delays in closing.\n\nPlease let us know if the seller is able to assist in following up with the management company, or if there's a best contact person we should direct our request to.\n\nThanks again for your help and collaboration!\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t29",
    title: "Urgent Request: Loan Denial Letter Needed",
    body: `Hi {{Lender Name}},\n\nUnfortunately, it appears the financing cannot be completed on the above mentioned. In order to proceed with cancellation and protect the buyer's escrow deposit, we must deliver a formal loan denial letter to the seller's side within the timelines outlined in the financing contingency of the Florida AS IS Contract.\n\nThis step is crucial — failure to deliver the denial in a timely manner could place the buyer's deposit at risk.\n\nThe denial letter should:\n- Be on lender letterhead\n- Clearly state that financing has been denied\n- Be dated and signed\n\nOnce received, we will submit it along with the Cancellation and Release to initiate return of escrow.\n\nPlease prioritize this request and let us know if anything is needed to complete it. We appreciate your cooperation in helping us close this out properly and protect the buyer's interests.\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t30",
    title: "Notice of Loan Denial",
    body: `Hi {{Listing Agent Name}},\n\nI wanted to inform you that the buyer's loan for {{Property Address}} has unfortunately been formally denied by the lender.\n\nWe will be delivering the signed Release and Cancellation of Contract, along with the lender's loan denial letter, shortly for your records.\n\nThis notice is being provided in accordance with the financing contingency outlined in the AS IS Residential Contract, and within the allowed timeframe in order to protect the buyer's escrow deposit.\n\nWe appreciate your support and cooperation throughout the transaction. Please let us know once your side has had a chance to review the documents once received.\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t31",
    title: "Loan Denial & Release",
    body: `Hi {{Listing Agent Name}},\n\nAttached please find the following documents regarding {{Property Address}}:\n\n- Formal Loan Denial Letter from the lender\n- Signed Release and Cancellation of Contract\n\nThese are being submitted in accordance with the Financing Contingency (Section 8) of the Florida AS IS Residential Contract, and within the required timeframe, to formally terminate the contract and initiate return of the buyer's escrow deposit.\n\nPlease confirm receipt and let us know if your side requires anything further to complete the cancellation.\n\nThank you again for your cooperation throughout the transaction.\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t32",
    title: "Loan Approval Notice & Closing Preparation",
    body: `Hi {{Listing Agent Name}},\n\nI'm pleased to share that the buyer's loan for {{Property Address}} has been formally approved — attached is the Loan Approval Notice in accordance with Section 8 of the AS IS Residential Contract.\n\nAs we move toward closing, we kindly ask that your side review and confirm the status of all seller-side conveyance documents to ensure everything is on track. This typically includes, but may not be limited to:\n\n- Warranty Deed\n- Seller's Affidavit\n- FIRPTA Affidavit (if applicable)\n- Association Estoppel (if applicable)\n- Payoff Statements\n- Any other seller-required documents per title or lender\n\nPlease feel free to coordinate directly with the closing/title agent to confirm what's still outstanding and ensure a smooth path to the finish line.\n\nLet us know once everything has been reviewed, and thank you again for your cooperation!\n\nBest regards,`,
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t33",
    title: "File is Clear to Close Email to Title",
    body: `Hi {{Title Rep Name}},\n\nGreat news — the buyer's loan for {{Property Address}} is officially Clear to Close!\n\nOur next step is to begin preparing the final closing documents and settlement statement so we can move forward with scheduling the closing.\n\nPlease let us know:\n- When the file will be ready for review\n- If you need any final items from our side\n- Once the closing package has been sent to the lender for balancing\n\nWe'll coordinate the final walkthrough and scheduling on our end, but let us know if there's anything you need in the meantime.\n\nLooking forward to wrapping this up smoothly!\n\nBest regards,`,
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t34",
    title: "File is Clear to Close Email to Title",
    body: `Hi {{Title Rep Name}},\n\nGreat news — the buyer's loan for {{Property Address}} is officially Clear to Close!\n\nOur next step is to begin preparing the final closing documents and settlement statement so we can move forward with scheduling the closing.\n\nPlease let us know:\n- When the file will be ready for review\n- If you need any final items from our side\n- Once the closing package has been sent to the lender for balancing\n\nWe'll coordinate the final walkthrough and scheduling on our end, but let us know if there's anything you need in the meantime.\n\nLooking forward to wrapping this up smoothly!\n\nBest regards,`,
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t35",
    title: "Next Step: Property Inspection",
    body: `Hi {{Buyer Name}},\n\nNow that we're officially under contract on {{Property Address}}, the next important step is to schedule your home inspection.\n\nUnder Section 12 of the AS IS Contract, you have the right to conduct any inspections you'd like during the inspection period, which ends on {{Inspection Deadline}}. It's important we get this scheduled as soon as possible to allow time for reviewing results and, if necessary, requesting repairs, estimates, or cancellation before the deadline.\n\nHere are some reputable inspection companies our clients frequently work with:\n\nABC Home Inspections – thorough, great with first-time buyers\n📞 (305) 555-1234 | 🌐 abchomeinspect.com\n123 Inspections – fast turnaround on reports\n📞 (954) 555-9876 | 🌐 protekinspect.com\n321 Property Inspections – full-service (incl. wind, termite, and 4-point if needed)\n📞 (786) 555-4321 | 🌐 sunstateinspections.com\n\nPlease let me know which company you'd like to move forward with so I can coordinate access to the property with the listing agent.\n\nLet me know if you have questions or need help deciding — I'm here to guide you through every step.\n\nBest,`,
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t36",
    title: "Inspection Access Confirmation",
    body: `Hi {{Listing Agent Name}},\n\nWe've scheduled the inspection for {{Property Address}} on {{Inspection Date}} at {{Inspection Time}}.\n\nTo ensure everything goes smoothly, we kindly ask that:\n- Access is available at least 30 minutes prior to the scheduled time, in case the inspector arrives early\n- All utilities (power and water) are turned on so the inspector can thoroughly evaluate all systems, including electrical, plumbing, and appliances\n\nPlease confirm access is arranged or let us know who will be present to allow entry.\n\nThanks so much for your help — looking forward to wrapping this up smoothly!\n\nBest regards,`,
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t37",
    title: "Inspection Reports Delivered",
    body: `Hi {{Buyer Name}},\n\nAll inspection reports for {{Property Address}} have been received and are attached for your review.\n\nPlease take some time to go through the findings carefully and let us know if you have any questions, concerns, or items you'd like us to address with the seller. It's important that we do so before the inspection period ends on {{Inspection Deadline}}, so that we stay within your contractual rights under Section 12 of the AS IS contract.\n\nAs you review, keep in mind your intended use of the property. For example:\n\n- If you're planning to move in right away, you'll want to prioritize anything related to safety, functionality, or major systems (roof, A/C, electrical, plumbing).\n- If this is more of a fixer-upper or investment property, focus on big-ticket items that could affect your renovation budget, permitting timeline, or financing options.\n- Cosmetic or non-urgent repairs can often be addressed later, but structural, mechanical, or permitting issues should be considered now.\n\nWe're happy to walk through the report with you and answer any questions. If there's anything you'd like to negotiate or request in writing, we'll need to do that before your inspection contingency expires.\n\nLooking forward to your feedback!\n\nBest regards,`,
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t38",
    title: "Buyer Proceeding – Acceptance in As-Is Condition",
    body: `Hi {{Listing Agent Name}},\n\nFollowing receipt and review of the inspection reports, the buyer has elected to move forward with the purchase and accept the property in its current, as-is condition, per Section 12 of the AS IS Residential Contract.\n\nNo repair requests or credits will be submitted. Please consider this email as formal notice that the buyer is satisfied and we're continuing toward closing as planned.\n\nLet us know if your side needs anything from us at this time.\n\nBest regards,`,
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t39",
    title: "Request for Credit – Inspection Findings",
    body: `Hi {{Listing Agent Name}},\n\nFollowing our review of the inspection report for {{Property Address}}, the buyer is requesting a credit in the amount of \${{Requested Credit Amount}} to address several items noted during the inspection.\n\nThis credit would be applied toward the buyer's closing costs and would allow us to proceed with the transaction without requesting any repairs.\n\nPlease review this request with the seller and let us know if they agree. Once we have confirmation, we'll prepare and send the corresponding addendum for signature.\n\nThank you in advance, and we appreciate your cooperation in helping us move this forward.\n\nBest regards,`,
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t40",
    title: "Repair Request – Inspection Findings",
    body: `Hi {{Listing Agent Name}},\n\nAfter reviewing the inspection report for {{Property Address}}, the buyer is requesting the following items be addressed prior to closing:\n\nRequested Repairs:\n\n{{Repair Item #1 (e.g., Repair leaking kitchen sink)}}\n{{Repair Item #2 (e.g., Replace broken window in guest bedroom)}}\n{{Repair Item #3 (e.g., Service HVAC unit, not cooling properly)}}\n(Adjust list as needed based on inspection report findings)\n\nThese items are important to the buyer's ability to proceed confidently with the purchase. Please review the request with the seller and let us know if they agree. Once confirmed, we'll prepare the appropriate addendum to reflect the agreement and keep the file on track.\n\nLet us know if there are any questions or if the seller would prefer to offer a credit in lieu of repairs.\n\nLooking forward to your response.\n\nBest regards,`,
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t41",
    title: "Release and Cancellation – Pursuant to Inspection Period",
    body: `Hi {{Listing Agent Name}},\n\nAttached please find the executed Release and Cancellation of Contract for {{Property Address}}, submitted pursuant to the inspection contingency outlined in Section 12 of the Florida AS IS Residential Contract.\n\nAfter careful review of the inspection findings, the buyer has elected to cancel the contract within the allowed timeframe and in accordance with their contractual rights.\n\nPlease confirm receipt, and kindly advise once your side has signed the release so the title company may proceed with disbursing the escrow deposit accordingly.\n\nThank you for your time and professionalism throughout the transaction.\n\nBest regards,`,
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t42",
    title: "Escrow Deposit Confirmed",
    body: `Hi All,\n\nPlease be advised that the buyer has completed the escrow deposit for {{Property Address}}.\n\nAttached is the escrow letter from {{Title Company Name}} confirming receipt of funds in accordance with the contract terms.\n\nWe'll continue to keep everyone updated as we move through the remaining steps.\n\nPlease let us know if anything further is needed at this time.\n\nBest regards,`,
    category: CONTRACT_STAGES.DEPOSITS,
  },
  {
    id: "t43",
    title: "Reminder: Second Deposit Due",
    body: `Hi {{Buyer Name}},\n\nThis is a friendly reminder that your second escrow deposit for {{Property Address}} is due per the terms of your contract.\n\nIf you haven't already sent the funds, please coordinate with the closing agent to ensure the deposit is made on time. I've copied {{Closing Agent Name}} from {{Title Company Name}} here, in case you need updated wire instructions or have any questions about the process.\n\nAs always, please call the title company directly to verbally verify any wire instructions before sending funds, and ensure you're initiating a traditional wire transfer (not ACH) to avoid delays.\n\nLet us know once it's been sent so we can confirm receipt and update the file.\n\nThanks again!`,
    category: CONTRACT_STAGES.DEPOSITS,
  },
  {
    id: "t44",
    title: "Second Escrow Deposit Confirmed",
    body: `Hi All,\n\nPlease be advised that the buyer has completed the second escrow deposit for {{Property Address}}, as required by the contract.\n\nAttached is the updated escrow letter from {{Title Company Name}} confirming receipt of the additional deposit.\n\nWe appreciate everyone's cooperation in keeping the transaction on track. Let us know if you need anything further at this time.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.DEPOSITS,
  },
  {
    id: "t45",
    title: "Contract & Introduction",
    body: `Hi {{Closing Agent Name}},\n\nAttached is the fully executed contract for {{Property Address}}. Please open title and escrow, and confirm receipt at your earliest convenience.\n\nBelow is a summary of the transaction and contact information for all key parties for your records:\nProperty: {{Property Address}}\n🗓️ Closing Date: {{Closing Date}}\n\nBuyer: {{Buyer Name}}\nBuyer's Agent: {{Buyer Agent Name}} – {{Buyer Agent Email}} / {{Phone}}\n\nSeller: {{Seller Name}}\nSeller's Agent: {{Seller Agent Name}} – {{Seller Agent Email}} / {{Phone}}\n\nLender (if applicable): {{Lender Name}} – {{Lender Email}} / {{Phone}}\n\nPlease share your wire instructions directly with the buyer so they can initiate the deposit and stay on track with the timeline outlined in the contract.\n\nLet us know once the file has been opened and if you need anything additional from our side to get started. Looking forward to working with you!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t46",
    title: "Title Search Status",
    body: `Hi {{Closing Agent Name}},\n\nI hope you're doing well.\n\nI wanted to check in to confirm whether the title searches for {{Property Address}} have been ordered. If so, could you please share the estimated turnaround time for receiving the results?\n\nThis will help us ensure we remain on schedule and anticipate any potential issues early on.\n\nThank you in advance, and let us know if you need anything further from our side to keep the file moving.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t47",
    title: "Title Commitment & Lien Search Status",
    body: `Hi {{Closing Agent Name}},\n\nI hope you're doing well.\n\nI wanted to follow up and ask if the title commitment and lien search for {{Property Address}} have been received.\n\nIf so, please confirm whether both have been cleared of any title issues, open permits, or unresolved liens, so we can update our file accordingly and stay ahead of any potential closing delays.\n\nLet us know if any items remain pending or if you need anything from our side to move things along.\n\nThanks so much for your help!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t48",
    title: "Survey Ordered",
    body: `Hi {{Listing Agent Name}},\n\nI wanted to let you know that the survey for {{Property Address}} has been officially ordered.\n\nHere is the surveyor's contact information in case any coordination is needed:\n{{Surveyor Company Name}}\n{{Surveyor Name}}\n📞 {{Phone Number}}\n📧 {{Email Address}}\n\nThe surveyor will only need access to the exterior of the property. That said, to avoid any issues during the visit, please let us know if:\n- There are any gates that may restrict access\n- There are pets on the premises that we should be aware of\n\nOnce we receive the completed survey, we'll circulate it to all parties for review.\n\nThanks in advance for your help, and let us know if you need anything from our side!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t49",
    title: "Survey Ordered",
    body: `Hi {{Listing Agent Name}},\n\nI wanted to let you know that the survey for {{Property Address}} has been officially ordered.\n\nHere is the surveyor's contact information in case any coordination is needed:\n{{Surveyor Company Name}}\n{{Surveyor Name}}\n📞 {{Phone Number}}\n📧 {{Email Address}}\n\nThe surveyor will only need access to the exterior of the property. That said, to avoid any issues during the visit, please let us know if:\n- There are any gates that may restrict access\n- There are pets on the premises that we should be aware of\n\nOnce we receive the completed survey, we'll circulate it to all parties for review.\n\nThanks in advance for your help, and let us know if you need anything from our side!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t50",
    title: "Request to Circulate Tenant Estoppel",
    body: `Hi {{Closing Agent Name}},\n\nI hope you're doing well.\n\nSince the property at {{Property Address}} is tenant-occupied, we'd like to request that a tenant estoppel be circulated to confirm all lease details prior to closing.\n\nThis will help ensure there's clear understanding and agreement on:\n- Lease term and expiration date\n- Monthly rent amount and due date\n- Security deposit held (if any)\n- Any outstanding balances or agreements between the tenant and seller\n\nPlease let us know once the estoppel has been sent to the appropriate party and feel free to share a copy with us once it's completed, so we may review and note our file accordingly.\n\nLet us know if you need anything additional to proceed.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t51",
    title: "Introduction & Title Request Coordination",
    body: `Hi {{Closing Agent Name}},\n\nI hope you're doing well.\n\nI'd like to introduce {{Lender Name}} from {{Lender Company}}, who is handling financing for the buyer on {{Property Address}}. I've copied them here so you both have direct contact as we move forward.\n\n{{Lender Name}}, once you're ready, please forward your title request to {{Closing Agent Name}} so the title team can prepare any lender-specific documentation needed for closing.\n\nPlease keep us copied on correspondence so we can ensure the file stays on track.\n\nLooking forward to working with everyone!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t52",
    title: "Introduction & Title Request Coordination",
    body: `Hi {{Closing Agent Name}},\n\nI hope you're doing well.\n\nI'd like to introduce {{Lender Name}} from {{Lender Company}}, who is handling financing for the buyer on {{Property Address}}. I've copied them here so you both have direct contact as we move forward.\n\n{{Lender Name}}, once you're ready, please forward your title request to {{Closing Agent Name}} so the title team can prepare any lender-specific documentation needed for closing.\n\nPlease keep us copied on correspondence so we can ensure the file stays on track.\n\nLooking forward to working with everyone!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t53",
    title: "Title Commitment Issues – Action Required Prior to Closing",
    body: `Hi {{Listing Agent Name}},\n\nI hope you're doing well.\n\nWe've reviewed the title commitment for {{Property Address}}, and there are a few items that require attention and resolution prior to closing. The title company will be reaching out with full details, but we wanted to make sure your side is aware so the necessary steps can be taken as soon as possible to avoid any delays.\n\nTo help facilitate a smooth resolution, please also share the contact information for the seller's attorney (if not already provided), so the title company can work directly with them on clearing the outstanding items.\n\nLet us know once you've had a chance to review or if we can assist in moving anything forward. We're all working toward a timely and seamless closing.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t54",
    title: "Title Commitment Issues – Action Required Prior to Closing",
    body: `Hi {{Listing Agent Name}},\n\nI hope you're doing well.\n\nWe've reviewed the title commitment for {{Property Address}}, and there are a few items that require attention and resolution prior to closing. The title company will be reaching out with full details, but we wanted to make sure your side is aware so the necessary steps can be taken as soon as possible to avoid any delays.\n\nTo help facilitate a smooth resolution, please also share the contact information for the seller's attorney (if not already provided), so the title company can work directly with them on clearing the outstanding items.\n\nLet us know once you've had a chance to review or if we can assist in moving anything forward. We're all working toward a timely and seamless closing.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t55",
    title: "Request for Seller's Property Disclosure",
    body: `Hi {{Listing Agent Name}},\n\nI hope you're doing well.\n\nWhen you have a moment, can you please provide us with the Seller's Property Disclosure for {{Property Address}}? The buyer would like to review and sign it as part of their due diligence process.\n\nAs we're currently within the inspection period, it's important we receive the disclosure prior to the end of this deadline, to ensure the buyer has all relevant information before making any final decisions.\n\nPlease feel free to send it over as soon as it's available. Let us know if you have any questions or if the seller needs a blank form.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t56",
    title: "Request for Seller's Property Disclosure",
    body: `Hi {{Listing Agent Name}},\n\nI hope you're doing well.\n\nWhen you have a moment, can you please provide us with the Seller's Property Disclosure for {{Property Address}}? The buyer would like to review and sign it as part of their due diligence process.\n\nAs we're currently within the inspection period, it's important we receive the disclosure prior to the end of this deadline, to ensure the buyer has all relevant information before making any final decisions.\n\nPlease feel free to send it over as soon as it's available. Let us know if you have any questions or if the seller needs a blank form.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t57",
    title: "Request for Additional Property Information",
    body: `Hi {{Listing Agent Name}},\n\nI hope you're doing well.\n\nAs part of the buyer's due diligence process for {{Property Address}}, we'd appreciate it if you could provide any additional information the seller is able to share, including:\n\n- A list of recent remodeling or upgrades completed on the property\n- Any warranties (appliances, roof, A/C, etc.) that may be transferrable to the buyer\n- A list of regular service providers (e.g., lawn care, pool service, pest control, etc.) currently used at the property\n\nThis information helps the buyer better understand the home's history, ongoing care, and any added value from improvements or services already in place.\n\nThanks so much for your help, and please let us know if you need anything from our side.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t58",
    title: "Request for Additional Property Information",
    body: `Hi {{Listing Agent Name}},\n\nI hope you're doing well.\n\nAs part of the buyer's due diligence process for {{Property Address}}, we'd appreciate it if you could provide any additional information the seller is able to share, including:\n\n- A list of recent remodeling or upgrades completed on the property\n- Any warranties (appliances, roof, A/C, etc.) that may be transferrable to the buyer\n- A list of regular service providers (e.g., lawn care, pool service, pest control, etc.) currently used at the property\n\nThis information helps the buyer better understand the home's history, ongoing care, and any added value from improvements or services already in place.\n\nThanks so much for your help, and please let us know if you need anything from our side.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t59",
    title: "Welcome Email to Seller After Listing Agreement Signed",
    body: `Hi {{Seller Name}},\n\nWelcome aboard! I'm excited to represent you in the sale of {{Property Address}}.\n\nHere's what happens next:\n\n📸 Photos & Marketing Prep: Scheduled for {{Date/Time}}\n🏠 MLS Listing Launch: Targeting {{Date}}\n🧾 Disclosures & Documents: I'll be sending over required forms for review and signature\n🗓️ Showings: We'll confirm scheduling preferences and lockbox placement\n\nLet me know if you have any questions as we move through the process. I'm here to make this as smooth and successful as possible!\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t60",
    title: "Photography Appointment Confirmation",
    body: `Hi {{Seller Name}},\n\nYour professional photography session for {{Property Address}} is confirmed for {{Date}} at {{Time}}.\n\nTo get the best results:\n\n- Please have the home clean and decluttered\n- Turn on all lights and open blinds for natural light\n- Remove any personal items, pet bowls, or visible clutter\n\nLet me know if you have any questions. Looking forward to showing your property at its best!\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t61",
    title: "MLS Live Notification to Seller",
    body: `Hi {{Seller Name}},\n\nExciting news — your listing for {{Property Address}} is now live on the MLS and syndicated to Zillow, Realtor.com, and other major platforms.\n\nYou can view the listing here: {{MLS Link}}\n\nWe'll begin receiving showing requests shortly. I'll keep you updated on activity and feedback as it comes in.\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t62",
    title: "Showing Feedback Summary",
    body: `Hi {{Seller Name}},\n\nHere's a quick update on feedback from recent showings at {{Property Address}}:\n\nAgent 1: "Buyers liked the layout but were concerned about the age of the roof."\nAgent 2: "Positive response overall, but thought the price was a bit high compared to nearby listings."\n\nWe'll continue collecting feedback to identify any patterns and adjust our strategy if needed. Let's touch base soon to discuss.\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t63",
    title: "Offer Received – Seller Notification",
    body: `Hi {{Seller Name}},\n\nWe've received an offer on {{Property Address}}! I'm reviewing the terms now and will send over a summary shortly.\n\nOnce you've had a chance to review, we can discuss how you'd like to respond. I'll provide my recommendation and options for moving forward.\n\nTalk soon,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t64",
    title: "Open House Scheduling Email to Seller",
    body: `Hi {{Seller Name}},\n\nWe've scheduled an open house for {{Property Address}} on {{Date}} from {{Start Time}} to {{End Time}}.\n\nTo help create a great first impression:\n\n- Please ensure the home is clean, tidy, and well-lit\n- Secure any valuables and remove personal or sensitive items\n- Pets should be removed or safely contained\n\nWe'll be promoting the open house on MLS, social media, and our agent network to attract as many qualified buyers as possible.\n\nLet me know if you have any questions or concerns — we're excited to get more eyes on your home!\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t65",
    title: "Price Reduction Notification to Seller",
    body: `Hi {{Seller Name}},\n\nAs discussed, we've adjusted the list price for {{Property Address}} to \${{New Price}}, effective immediately.\n\nThe MLS and third-party sites (Zillow, Realtor.com, etc.) will update shortly. This change should help refresh interest and reach a wider pool of potential buyers.\n\nWe'll continue to monitor showing activity and buyer feedback closely. I'll keep you posted on any shifts in interest.\n\nThanks again for your flexibility — this move could make all the difference.\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t66",
    title: "Offer Received – Summary & Review Email to Seller",
    body: `Hi {{Seller Name}},\n\nGreat news — we've received an offer on {{Property Address}}. Below is a quick summary of the main terms:\n\nOffer Price: \${{Offer Price}}\nClosing Date: {{Proposed Closing Date}}\nFinancing Type: {{Cash/Conventional/FHA/VA}}\nInspection Period: {{# of Days}}\nAdditional Terms: {{Brief summary – e.g., As-Is, post-occupancy, etc.}}\n\nThe full offer is attached for your review. Once you've had a chance to look it over, let me know your thoughts and I'll walk you through the options — accept, counter, or reject.\n\nLooking forward to discussing next steps!\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t67",
    title: "Listing Expired or Withdrawn – Notice to Seller",
    body: `Hi {{Seller Name}},\n\nAs of {{Expiration Date}}, the listing for {{Property Address}} has officially {{expired / been withdrawn}} from the MLS.\n\nI want to thank you for the opportunity to represent your property and navigate the market together. If you're still considering selling — now or in the future — I'd be happy to revisit strategy, timing, and market conditions with you.\n\nLet me know what you'd like to do next, whether that's relisting, taking a break, or simply staying in touch.\n\nWishing you all the best either way!\n\nWarm regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t68",
    title: "Just Sold Announcement to Sphere",
    body: `Hi {{Name}},\n\nAnother one closed! {{Property Address}} is officially SOLD 🎉\n\nIt was listed at \${{List Price}} and sold for \${{Sale Price}} in just {{#}} days. The market is moving, and pricing + strategy made all the difference here.\n\nIf you've been curious about selling, or if your plans have changed this year, I'd love to help you evaluate your options.\n\nLet's connect when the time is right!\n\nWarmly,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t69",
    title: "Under Contract Social Proof Update (Sphere or Agent-Facing)",
    body: `Hi {{Name}},\n\nWe're officially under contract on {{Property Address}} — and it only took {{#}} days on the market! 🎉\n\nThere was a lot of strong activity, and several serious buyers just missed out. If you're considering selling, this could be a great time to talk about next steps.\n\nWant to know what your home might be worth in this market? Let's chat — no pressure, just strategy.\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t70",
    title: "Price Improvement Notification to Agents",
    body: `Hi {{Agent First Name}},\n\nJust a quick heads-up — we've made a price improvement on {{Property Address}}. The new list price is \${{New Price}}, effective today.\n\nIf your buyer previously showed interest or if this better aligns with their budget, feel free to reach out to schedule a private showing. The home is still available and move-in ready.\n\nMLS has been updated — let me know if you'd like updated comps or showing info.\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.LISTING,
  },
  {
    id: "t71",
    title: "Clear to Close",
    body: `Hi All,\n\nGreat news — the file for {{Property Address}} is officially Clear to Close!\n\nPlease see below for a quick summary as we prepare for the final steps:\n\nClosing Date: {{Closing Date}}\nTitle Company: {{Title Company Name}}\nFinal Walkthrough Scheduled: {{Yes/No – Date/Time if known}}\n\n📌 Next Step:\n{{Title Company Name}}, please proceed with preparing the final closing package and settlement statement. Let us know when the closing disclosure is ready for review and if anything is still pending on your end.\n\nWe're almost there — thank you all for your hard work and coordination. Let's bring this to the finish line!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t72",
    title: "Final Steps Before Closing",
    body: `Hi {{Buyer Name}},\n\nWe're officially in the home stretch! With closing scheduled for {{Closing Date}}, here are your next steps to ensure everything goes smoothly:\n\nClosing Day Details\nDate: {{Closing Date}}\nTime: {{Closing Time}}\nLocation: {{Title Company Name + Address}}\n\nThe final amount due will be provided by the title company once the settlement statement is finalized.\nFunds must be sent via wire transfer — ACH and checks are not accepted.\nCall the title company directly using the phone number below to verify wire instructions verbally before sending any money.\n\nWe'll confirm a date and time for your final walkthrough within 24 hours of closing to ensure the property is in the same condition as when you went under contract.\n\nPlease keep an eye on your inbox for the final numbers and let me know if you have any questions at all — we're here to guide you through the finish line.\n\nSo close!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t73",
    title: "Seller's Closing Instructions",
    body: `Hi {{Seller Name}},\n\nWe're approaching the finish line! With closing scheduled for {{Closing Date}}, here are a few important reminders to help everything go smoothly on your end:\n\nClosing Details\nDate: {{Closing Date}}\nTime: {{Closing Time}}\nLocation: {{Title Company Name + Address}}\n\nIf you're signing remotely, the title company will coordinate directly with you. Friendly reminder to please confirm your preferred account and wiring instructions directly with the title company. Be sure to call them directly to verify instructions verbally for security.\n\nPossession & Walkthrough\nBuyers will complete their final walkthrough within 24 hours of closing. Please ensure:\n- The home is in the agreed-upon condition\n- All personal items are removed\n- Keys, garage remotes, and any access codes are left behind or delivered per instructions.\n\nIf you have an attorney assisting with closing and we haven't received their contact info, please send that over so title can coordinate directly with them.\n\nLet me know if you have any questions — we're almost there!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t74",
    title: "Final Walkthrough Access Request",
    body: `Hi {{Listing Agent Name}},\n\nAs we approach closing on {{Property Address}}, we'd like to schedule the buyer's final walkthrough in accordance with the contract.\n\nWe're aiming to schedule the walkthrough for:\n\nDate: {{Proposed Date}}\nTime: {{Proposed Time}}\n\nPlease confirm if that time works for the sellers or if an alternate time would be better.\n\nThe walkthrough is simply to confirm the property is in substantially the same condition as when the contract was executed and that any agreed-upon items have been removed or completed.\n\nLet us know if there are any pets, alarm codes, or access instructions we should be aware of.\n\nThanks in advance for confirming — we're almost at the finish line!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t75",
    title: "Final Walkthrough Reminder",
    body: `Hi {{Buyer Name}},\n\nJust a quick reminder — your final walkthrough for {{Property Address}} is scheduled for:\n\n🗓️ Date: {{Confirmed Date}}\n🕒 Time: {{Confirmed Time}}\n📍 Location: {{Property Address}}\n\nThis walkthrough is your opportunity to:\n\n- Confirm the property is in the same condition as when you went under contract\n- Check that any agreed-upon repairs have been completed\n- Ensure personal items have been removed (unless included in the sale)\n- Test lights, plumbing, appliances, and major systems one last time\n\nIf you notice anything out of place, let us know right away so we can address it before closing.\n\nLet me know if you have any questions — we're almost there!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t76",
    title: "Final Walkthrough Complete",
    body: `Hi {{Listing Agent Name}} and {{Closing Agent Name}},\n\nThe buyer has completed the final walkthrough for {{Property Address}} on {{Date}}, and we wanted to provide a quick update.\n\n✅ If all is good:\nThe property was found to be in satisfactory condition and consistent with the terms of the contract. No issues were noted, and we are ready to proceed to closing.\n\n⚠️ If issues were found (alternate version):\nThe buyer has completed the walkthrough and noted the following concerns:\n\n{{Briefly describe issue, e.g., missing appliances, repairs not completed, damage found}}\n\nPlease let us know how the seller would like to address this prior to closing so we can coordinate accordingly. We're still aiming to stay on schedule.\n\nThanks again for everyone's cooperation as we wrap this up.\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t77",
    title: "Commission Confirmation",
    body: `Hi {{Closing Agent Name}},\n\nAs we prepare for closing on {{Property Address}}, please see below the confirmed commission breakdown for your records and to be reflected on the final settlement statement:\n\n🧾 Commission Breakdown:\nTotal Commission: {{Total Commission Amount or % of Sale Price}}\nTo Listing Brokerage: {{Listing Broker Name}} – {{% or $}}\nTo Selling Brokerage: {{Buyer Broker Name}} – {{% or $}}\n\nBroker Information:\nBuyer's Broker:\n{{Broker Name}}\n{{Broker Address}}\n{{License Number (if required)}}\n{{Brokerage Phone / Email}}\n\nBuyer's Agent: {{Buyer Agent Name}}\nLicense #: {{Agent License Number}}\n\nPlease let us know once your file reflects these figures, or if you need anything additional to finalize the CD.\n\nThanks for your attention and support as we close this one out!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t78",
    title: "Utility & Mail Setup – Don't Forget Before Closing",
    body: `Hi {{Buyer Name}},\n\nAs we prepare to close on your new home at {{Property Address}}, here are a few important reminders to take care of before move-in:\n\nSet Up Utilities in Your Name\nYou'll want to contact the following providers to transfer or activate service starting on or before your closing date:\n\nElectric: {{Electric Company Name + Phone/Website}}\nWater/Sewer: {{Water Utility Info}}\nGas (if applicable): {{Gas Provider Info}}\nTrash/Recycling: {{Municipality or provider info}}\nInternet/TV: {{ISP Options or recommendation}}\n\nMail Forwarding\nVisit https://www.usps.com to set up mail forwarding and officially change your address with the U.S. Postal Service.\n\nTaking care of this ahead of time will help ensure a smooth and comfortable move-in. Let us know if you need anything else — we're almost to the finish line!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t79",
    title: "Today's the Day! Closing Details",
    body: `Hi {{Buyer Name}},\n\nIt's officially Closing Day — congratulations! 🎉\n\nHere's a quick rundown of what to expect today:\n\nClosing Appointment\nDate: {{Closing Date}}\nTime: {{Closing Time}}\nLocation: {{Title Company Name + Address}}\n\nWhat to Bring:\n- A valid, government-issued photo ID\n- Any final documents your lender or title company may have requested\n- A good pen (just kidding — they'll provide that 😄)\n\nFinal Funds\nIf you haven't already sent your wire for closing funds:\n- Please confirm wire instructions verbally with the title company before sending.\n- Double-check that you're sending a wire transfer (not an ACH or Zelle-style transfer).\n\nTitle Contact:\n{{Title Agent Name}}\n{{Title Email}} | {{Title Phone}}\n\nAfter Closing\nOnce all documents are signed and funding is confirmed, we'll coordinate the release of keys and access to the property — usually later the same day.\n\nIf you have any questions or need anything today, don't hesitate to reach out. We're so excited for you and thrilled to help you make this move happen!\n\nLet's do this!\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t80",
    title: "Congratulations – You're Officially a Homeowner!",
    body: `Hi {{Buyer Name}},\n\nCongratulations — you're officially a homeowner! 🎉\nWe've received confirmation that {{Property Address}} has successfully closed and is now all yours.\n\nHere are a few final things to note as you move in:\n\nKeys & Access\nKeys have been:\n☐ Delivered at closing\n☐ Left at the property\n☐ {{Other instructions, if applicable}}\nLet us know if you have any trouble accessing the property.\n\nPost-Closing Reminders\n- Set up or transfer utilities if you haven't already\n- Schedule a locksmith if you plan to rekey the doors\n- Consider having the home deep cleaned or serviced before fully moving in\n- If this will be your primary residence, remember to file for Homestead Exemption (we'll send you a reminder before the deadline)\n\nFinal Documents\nThe title company will be sending your final settlement statement and recorded deed once they're available. Hang on to those for your records and tax prep.\n\nIt's been a true pleasure helping you through this journey. We're here if you need anything — referrals, questions, future plans — you name it.\n\nWishing you many happy memories in your new home!\n\nWarmly,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CLOSING,
  },
  {
    id: "t81",
    title: "Closing Complete",
    body: `Hi {{Seller Name}},\n\nI'm happy to share that closing is officially complete for {{Property Address}} — congratulations!\n\nProceeds & Documentation\nThe title company has confirmed the transaction has closed and funds have been disbursed to the account you provided.\nYou'll receive a copy of your final closing documents and the fully executed settlement statement directly from the title company for your records.\n\nPost-Closing Notes\n- If the buyer is taking possession today, they now have full access to the property.\n- If any keys, garage remotes, or access codes were not delivered at closing, please let us know so we can coordinate final handoff.\n\nIt's been a pleasure assisting you through this process. If you ever need anything — whether it's a market update, another real estate purchase, or a trusted referral — I'm always just a message away.\n\nWishing you all the best in your next chapter!\n\nWarm regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CLOSING,
  },
  {
    id: "t82",
    title: "Thank You – Closed & Funded!",
    body: `Hi All,\n\nJust a quick note to say thank you to everyone involved in the successful closing of {{Property Address}}.\n\nIt takes a solid team to bring a transaction to the finish line, and your communication and collaboration made all the difference. Whether this deal was smooth or had a few twists (as many do!), we appreciate your professionalism every step of the way.\n\nLooking forward to the next one!\n\nBest regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CLOSING,
  },
  {
    id: "t83",
    title: "Thank You & A Little Something Coming Your Way",
    body: `Hi {{Client First Name}},\n\nNow that everything is officially closed on {{Property Address}}, I just wanted to say thank you again — it's been a true pleasure working with you!\n\nAs a small token of appreciation, I've sent {{describe gift briefly – e.g., a little something for your new home, a gift card, a welcome basket, etc.}} your way. It should arrive within the next few days — keep an eye out!\n\nWhether you ever need help with your next move, want to explore investment opportunities, or just have a question — I'm always here for you.\n\nEnjoy this exciting new chapter, and cheers to what's next! 🥂\n\nWarmly,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CLOSING,
  },
  {
    id: "t84",
    title: "Quick Favor? Share Your Experience",
    body: `Hi {{Client First Name}},\n\nI truly enjoyed working with you on the sale/purchase of {{Property Address}}, and I'm so glad we got it across the finish line together!\n\nIf you have a moment, I'd love it if you could share a quick review of your experience. Your feedback not only helps me grow — it also helps other great clients like you find someone they can trust.\n\n👉 [Insert Review Link – Google, Zillow, Facebook, etc.]\n\nEven just a few sentences would mean a lot!\n\nThank you again for the opportunity to be part of such a big moment. I'm always here if you need anything down the road — real estate or otherwise.\n\nWarmly,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.CLOSING,
  },
  {
    id: "t85",
    title: "Homestead Exemption – Don't Forget to File!",
    body: `Hi {{Buyer Name}},\n\nNow that you've officially closed on {{Property Address}}, here's an important reminder:\n\nIf this home will be your primary residence, you may qualify for the Florida Homestead Exemption, which can significantly reduce your property taxes.\n\nWhat You Need to Know:\n- You must file by March 1st of the year following your purchase\n- The property must be your permanent residence as of January 1st\n- You'll need proof of residency (e.g., FL driver's license, utility bill, voter registration)\n\nHow to File:\nYou can file online through your local property appraiser's office.\nHere's a quick link to get started:\n👉 [Insert link to appropriate county appraiser's website – e.g.,\n\nIf you have any questions or need help finding the right site for your county, just let me know — I'm happy to help.\n\nEnjoy your new home and the tax savings that come with it!\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.POST_CLOSING,
  },
  {
    id: "t86",
    title: "Homestead Exemption – Don't Forget to File!",
    body: `Hi {{Buyer Name}},\n\nNow that you've officially closed on {{Property Address}}, here's an important reminder:\n\nIf this home will be your primary residence, you may qualify for the Florida Homestead Exemption, which can significantly reduce your property taxes.\n\nWhat You Need to Know:\n- You must file by March 1st of the year following your purchase\n- The property must be your permanent residence as of January 1st\n- You'll need proof of residency (e.g., FL driver's license, utility bill, voter registration)\n\nHow to File:\nYou can file online through your local property appraiser's office.\nHere's a quick link to get started:\n👉 [Insert link to appropriate county appraiser's website – e.g.,\n\nIf you have any questions or need help finding the right site for your county, just let me know — I'm happy to help.\n\nEnjoy your new home and the tax savings that come with it!\n\nBest,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t87",
    title: "Need a Hand? Here's My Go-To Home Service Pros",
    body: `Hi {{Buyer Name}},\n\nNow that you're settling into {{Property Address}}, I wanted to share a few of my most trusted service providers in case you need help with anything — from minor repairs to full refreshes.\n\nHere are a few you may find helpful:\n\n🧰 Trusted Vendors:\nLocksmith: {{Company Name}} – {{Phone}}, {{Email}}\nHandyman/Repairs: {{Company Name}} – {{Phone}}, {{Email}}\nAC / HVAC Tech: {{Company Name}} – {{Phone}}, {{Email}}\nCleaning Service: {{Company Name}} – {{Phone}}, {{Email}}\nPest Control: {{Company Name}} – {{Phone}}, {{Email}}\nPool / Lawn Maintenance: {{Company Name}} – {{Phone}}, {{Email}}\n\nNeed something that's not on this list? Just reach out — I've got a network of reliable folks I trust with my own properties.\n\nWishing you a smooth move-in and happy homeownership!\n\nWarmly,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.POST_CLOSING,
  },
  {
    id: "t88",
    title: "Just Checking In",
    body: `Hi {{Buyer Name}},\n\nI just wanted to check in now that it's been a few weeks since closing on {{Property Address}} — I hope you're settling in well and starting to make the place feel like home!\n\nIf you need anything at all — from a rekey recommendation to a local contractor, or even just where to get the best tacos in town 🌮 — I'm always happy to help.\n\nAlso, if you know of any friends, family, or colleagues thinking of buying or selling, I'd be honored to help them too. Most of my business comes from great people like you sharing their experience — and I appreciate it more than you know.\n\nWishing you continued happiness and a smooth transition into your new space!\n\nWarm regards,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.POST_CLOSING,
  },
  {
    id: "t89",
    title: "Storm Alert: Insurance Binding Suspended",
    body: `Hi {{Buyer Name}},\n\nWe want to make you aware of an important update regarding insurance coverage for your upcoming purchase at {{Property Address}}.\n\nDue to Tropical Storm/Hurricane {{Storm Name}}, insurance companies have suspended binding new policies in the state of Florida (or specific counties, if applicable). This means no new insurance coverage can be issued or finalized until the storm has passed and the binding restriction is lifted.\n\nWhat This Means:\n- If your insurance policy has already been bound, no action is needed — you're protected.\n- If your insurance has not been bound yet, you may experience a delay in closing. Lenders require proof of insurance before funding.\n\nTitle and lender teams are monitoring the storm and will keep us updated. We'll adjust your timeline if needed and ensure your escrow deposit is protected per contract timelines.\n\nWe're watching this closely and will keep you informed every step of the way. If you have any questions or need help confirming your insurance status, let us know — we're here to help.\n\nStay safe and talk soon,`,
    date: "2024-06-10",
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_new_lien_delay",
    title: "Municipal Lien Search – Delay Notification",
    body: `Hi [Agent Name],\n\nWe were notified that the lien search for [Property Address] is delayed due to backlogs at the [City Name] records office.\n\nThis is common in [City]—they're notorious for moving at the speed of a sleepy sloth. We'll keep following up, but just wanted you to be aware in case we need to adjust timelines.\n\nThanks,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t_reoccupancy_hialeah_sfla",
    title: "Action Needed – Re-Occupancy Certificate for Hialeah",
    body: `Hi [Agent Name],\n\nJust a quick note to request that the seller initiate the re-occupancy certificate process with the City of Hialeah for [Property Address].\n\nAs you may know, this is a required step prior to closing, and Hialeah can be particular with their inspections and timelines—so the earlier it's submitted, the better.\n\nPlease confirm once the application has been submitted or if it's already in process.\n\nThanks so much,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_reoccupancy_hialeah_tctools",
    title: "Action Needed – Re-Occupancy Certificate for Hialeah",
    body: `Hi [Agent Name],\n\nJust a quick note to request that the seller initiate the re-occupancy certificate process with the City of Hialeah for [Property Address].\n\nAs you may know, this is a required step prior to closing, and Hialeah can be particular with their inspections and timelines—so the earlier it's submitted, the better.\n\nPlease confirm once the application has been submitted or if it's already in process.\n\nThanks so much,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_reoccupancy_nmb_sfla",
    title: "Please Initiate Re-Occupancy Certificate – North Miami Beach",
    body: `Hi [Agent Name],\n\nCould you please have the seller begin the re-occupancy process with the City of North Miami Beach for [Property Address]?\n\nThe city requires this inspection prior to closing, and processing times can vary, so it's best to get it on their calendar as soon as possible.\n\nLet me know once it's been submitted, or if you have confirmation it's already underway.\n\nBest regards,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_reoccupancy_miami_shores_sfla",
    title: "Miami Shores Re-Occupancy Certificate – Required Before Closing",
    body: `Hi [Agent Name],\n\nThis is a friendly reminder to have the seller apply for the re-occupancy inspection with the Village of Miami Shores for [Property Address].\n\nIt's required before closing, and they often note repairs or updates during inspection—so the sooner this is scheduled, the more time we'll have to address anything if needed.\n\nPlease confirm once it's submitted or share any updates you already have.\n\nThank you!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_reoccupancy_miami_gardens_sfla",
    title: "Re-Occupancy Inspection – Action Needed in Miami Gardens",
    body: `Hi [Agent Name],\n\nCan you kindly have the seller begin the re-occupancy certificate process with the City of Miami Gardens for [Property Address]?\n\nIt's a required item before transfer of ownership, and they can take time to process the inspection and issue clearance—so we'd love to get this moving now.\n\nLet me know once submitted or if it's already been handled.\n\nThanks,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_welcome_contract_process_tctools",
    title: "Welcome to the Contract Process – [Property Address]",
    body: `Hi [Buyer First Name],\n\nCongrats again on going under contract for [Property Address]! 🎉 I'll be your transaction coordinator, helping to manage the moving parts and keep everything on track so you can focus on the exciting stuff.\n\nI'll coordinate between all parties (agent, title, lender, etc.) Keep track of important deadlines and documents and ensure everything is signed, sent, and submitted on time.\n\nWe're aiming for a smooth and stress-free closing, and communication is key. If you have questions or aren't sure what something means, just reach out—I'm happy to explain.\n\nLooking forward to working with you!\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_contract_update_week_tctools",
    title: "Contract Update – Week of [Date] | [Property Address]",
    body: `Hi [Agent Name],\n\nHere's the current status for [Property Address]:\n\n✅ Contract Executed – [Date]\n✅ EMD Delivered – [Date or "Waiting on Title Confirmation"]\n✅ Inspection Completed – [Date]\n⏳ Appraisal Scheduled – [Date or "Pending"]\n📄 Title Commitment – [Expected by Date or "Received"]\n💬 Loan Approval – Due by [Date]\n🗓 Closing Date – [Scheduled Date]\n\nLet me know if anything changes or if you need me to follow up with anyone directly.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_missing_signature_tctools",
    title: "Missing Signature – [Document Name] | [Property Address]",
    body: `Hi [Agent Name],\n\nJust a quick heads-up — we're missing a signature from [Buyer/Seller Name] on the attached [Document Name].\n\nPlease have them sign via DocuSign as soon as possible so we can keep everything on schedule. Let me know if they need help or prefer another method.\n\nThanks so much!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_hoa_condo_application",
    title: "Action Needed – HOA/Condo Application | [Property Address]",
    body: `Hi [Buyer First Name],\n\nAs we continue to work through our deadlines, the next step is to complete the association application. This property is located in a community that requires an HOA/Condo Association application prior to closing.\n\nHere's what you'll need to do:\nComplete the application (attached or link provided)\nInclude supporting docs (ID, contract, etc.)\nSubmit the application to: [Contact Info or Association Name]\nPay the application fee of $[Amount]\n🗓 Estimated Processing Time: [#] Business Days\n📢 TIP: Some associations require in-person interviews or approval meetings before an approval is issued.\n\nLet me know once it's submitted or if you need help with any part of the process!\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_complete_info_sheet_title",
    title: "Please Complete Info Sheet – [Property Address]",
    body: `Hi [Buyer/Seller First Name],\n\nTo ensure a smooth closing and proper preparation of documents, please complete the attached Info Sheet with your details and send it directly to the title company:\n\n📩 [Title Contact Name & Email]\n\nSending it directly keeps your personal info secure and ensures the title company has what they need to prepare deed and closing docs correctly.\n\nLet me know once it's sent so I can follow up as needed.\n\nThanks so much!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t_inspection_period_reminder_due_diligence",
    title: "Reminder: Inspection Period Ends Soon – [Property Address]",
    body: `Hi [Agent Name],\n\nJust a friendly reminder—the inspection period for [Property Address] ends on [Deadline Date].\n\nIf your buyer hasn't completed the inspection yet, I recommend getting it scheduled ASAP to avoid last-minute issues or the need to request an extension.\n\nLet me know if it's been completed or if you'd like help coordinating with a vendor.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t_finance_contingency_loan_approval",
    title: "Finance Contingency – Loan Approval Due [Date] | [Property Address]",
    body: `Hi [Agent Name],\n\nQuick reminder that loan approval for [Property Address] is due by [Loan Approval Deadline].\n\nIf you're waiting on final underwriting or have already received a conditional approval, just send me a copy for the file or let me know what stage you're in.\n\nWe want to avoid missing the contingency deadline in case an extension is needed.\n\nThanks!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t_title_commitment_title",
    title: "Title Commitment – [Property Address]",
    body: `Hi [Buyer's Agent Name / Buyer],\n\nAttached is the title commitment for [Property Address], issued by [Title Company Name].\n\nPlease review it and let me know if you have any questions. If your client's attorney will be reviewing the title documents, feel free to forward this along.\n\nLet me know once reviewed or if you'd like me to flag any key items.`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TITLE,
  },
  {
    id: "t_insurance_binder_preclosing",
    title: "Action Needed – Insurance Binder Required for Closing | [Property Address]",
    body: `Hi [Buyer Name],\n\nWe'll need a homeowner's insurance binder for [Property Address] in order to close on time. Please make sure this is selected and sent over to the lender and title company ASAP.\n\nImportant: If there is a storm forming in the area, insurance companies may temporarily suspend issuing new policies ("binding")—so don't delay on this.\n\nLet me know once it's in place or if you need recommendations.\n\nThanks!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t_schedule_final_walkthrough_preclosing",
    title: "Schedule Final Walkthrough – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a quick nudge—it's time to schedule the final walkthrough for [Property Address].\n\nIdeally, this should take place within 24–48 hours of closing so the buyer can verify the property condition and confirm everything is in the agreed-upon state.\n\nLet me know once scheduled so I can coordinate with title and prepare for closing.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.PRE_CLOSING,
  },
  {
    id: "t_congrats_on_closing_postclosing",
    title: "Congrats on Your Closing! 🎉 [Property Address]",
    body: `Hi [Client Name],\n\nCongratulations on officially closing [Property Address]! It's been a pleasure supporting your transaction from contract to close.\n\nAttached to this email, you'll find the executed closing statement and deed. These are important documents you'll want to save—they're often needed when:\n\nConnecting or transferring utilities\nSetting up homeowner services\nProving ownership for tax records or insurance purposes\n\nThank you for trusting our team to guide you through this process. If you ever need anything—whether it's future real estate support, referrals, or just a quick question—we're here for you.\n\nWishing you all the best in this new chapter,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.POST_CLOSING,
  },
  {
    id: "t_release_cancellation_signature_due_diligence",
    title: "Release & Cancellation for Signature – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nPlease see attached the Release and Cancellation, signed by the buyer for [Property Address].\n\nThe cancellation is being made pursuant to the inspection contingency, within the permitted timeframe outlined in the contract.\n\nKindly have the seller sign and return at your earliest convenience so we can finalize and provide a fully executed copy to all parties.\n\nLet me know if you have any questions or if there's anything else needed.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.DUE_DILIGENCE,
  },
  {
    id: "t_release_cancellation_financing_v2",
    title: "Release & Cancellation for Seller Signature – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nAttached is the Release and Cancellation, signed by the buyer for [Property Address].\n\nThis cancellation is being submitted under the finance contingency, as the buyer was unable to secure loan approval within the timeframe required.\n\nPlease have the seller review, sign, and return the document so we can circulate a fully executed version and notify title to proceed accordingly.\n\nAppreciate your help in wrapping this up—let me know if there are any questions.\n\nBest regards,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.FINANCING,
  },
  {
    id: "t_release_cancellation_signature_tctools",
    title: "Release & Cancellation for Signature – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nPlease see attached the Release and Cancellation, signed by the buyer for [Property Address].\n\nThe cancellation is being made pursuant to the inspection contingency, within the permitted timeframe outlined in the contract.\n\nKindly have the seller sign and return at your earliest convenience so we can finalize and provide a fully executed copy to all parties.\n\nLet me know if you have any questions or if there's anything else needed.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_release_cancellation_financing_v2_tctools",
    title: "Release & Cancellation for Seller Signature – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nAttached is the Release and Cancellation, signed by the buyer for [Property Address].\n\nThis cancellation is being submitted under the finance contingency, as the buyer was unable to secure loan approval within the timeframe required.\n\nPlease have the seller review, sign, and return the document so we can circulate a fully executed version and notify title to proceed accordingly.\n\nAppreciate your help in wrapping this up—let me know if there are any questions.\n\nBest regards,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_congrats_on_closing_postclosing_tctools",
    title: "Congrats on Your Closing! 🎉 [Property Address]",
    body: `Hi [Client Name],\n\nCongratulations on officially closing [Property Address]! It's been a pleasure supporting your transaction from contract to close.\n\nAttached to this email, you'll find the executed closing statement and deed. These are important documents you'll want to save—they're often needed when:\n\nConnecting or transferring utilities\nSetting up homeowner services\nProving ownership for tax records or insurance purposes\n\nThank you for trusting our team to guide you through this process. If you ever need anything—whether it's future real estate support, referrals, or just a quick question—we're here for you.\n\nWishing you all the best in this new chapter,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_final_closing_details_closing_tctools",
    title: "Final Closing Details – [Property Address]",
    body: `Hi [Buyer/Seller Name],\n\nWe're all set to close on [Closing Date] at:\n\n📍 [Closing Location]\n🕒 [Time]\n📝 With: [Closer or Title Rep Name]\n\nWhat to bring:\nValid photo ID\nAny outstanding documents (if applicable)\nWire confirmation if funds are being sent\nLet me know if you have any last-minute questions. Looking forward to a smooth finish!\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_hoa_condo_application_tctools",
    title: "Action Needed – HOA/Condo Application | [Property Address]",
    body: `Hi [Buyer First Name],\n\nAs you may be aware, the suject property is located in a community that requires an HOA/Condo Association application prior to closing.\n\nAs we proceed with the rest of our critical dates, your next steps is to complete the association application with the management company. \nHere are the details: Complete the application (attached or link provided)\nInclude supporting docs (ID, contract, etc.)\nSubmit the application to: [Contact Info or Association Name]\nPay the application fee of $[Amount]\n🗓 Estimated Processing Time: [#] Business Days\n📢 TIP: Some associations require in-person interviews or approval meetings prior to delivering the approval letter.\n\nLet me know once it's submitted or if you need help with any part of the process!\n\n`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_complete_info_sheet_tctools",
    title: "Please Complete Info Sheet – [Property Address]",
    body: `Hi [Buyer/Seller First Name],\n\nTo ensure a smooth closing and proper preparation of documents, please complete the attached Info Sheet with your details and send it directly to the title company:\n\n📩 [Title Contact Name & Email]\n\nSending it directly keeps your personal info secure and ensures the title company has what they need to prepare deed and closing docs correctly.\n\nLet me know once it's sent so I can follow up as needed.\n\nThanks so much!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_inspection_period_reminder_tctools",
    title: "Reminder: Inspection Period Ends Soon – [Property Address]",
    body: `Hi [Agent Name],\n\nJust a friendly reminder—the inspection period for [Property Address] ends on [Deadline Date].\n\nIf your buyer hasn't completed the inspection yet, I recommend getting it scheduled ASAP to avoid last-minute issues or the need to request an extension.\n\nLet me know if it's been completed or if you'd like help coordinating with a vendor.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_finance_contingency_loan_approval_tctools_v2",
    title: "Finance Contingency – Loan Approval Due [Date] | [Property Address]",
    body: `Hi [Agent Name],\n\nQuick reminder that loan approval for [Property Address] is due by [Loan Approval Deadline].\n\nIf you're waiting on final underwriting or have already received a conditional approval, just send me a copy for the file or let me know what stage you're in.\n\nWe want to avoid missing the contingency deadline in case an extension is needed.\n\nThanks!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_appraisal_status_tctools_v2",
    title: "Appraisal Status for [Property Address]",
    body: `Hi [Lender Name],\n\nHope you're well—just checking in to see if the appraisal for [Property Address] has been scheduled or completed.\n\nIf it's already done, can you confirm the completion date or expected delivery of the report? If not yet scheduled, let me know if the borrower needs help selecting a vendor or confirming access.\n\nThank you!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_insurance_binder_tctools_v2",
    title: "Action Needed – Insurance Binder Required for Closing | [Property Address]",
    body: `Hi [Buyer Name],\n\nWe'll need a homeowner's insurance binder for [Property Address] in order to close on time. Please make sure this is selected and sent over to the lender and title company ASAP.\n\nImportant: If there is a storm forming in the area, insurance companies may temporarily suspend issuing new policies ("binding")—so don't delay on this.\n\nLet me know once it's in place or if you need recommendations.\n\nThanks!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_clear_to_close_tctools_v2",
    title: "Clear to Close! [Property Address]",
    body: `Hi Team,\n\nWe're officially CLEAR TO CLOSE on [Property Address]! 🎉\n\nNext step is to confirm the closing date/time/location with all parties and send final confirmations. I'll coordinate with title and follow up shortly with final details.\n\nLet's close this out strong!\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_schedule_final_walkthrough_tctools_v2",
    title: "Schedule Final Walkthrough – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a quick nudge—it's time to schedule the final walkthrough for [Property Address].\n\nIdeally, this should take place within 24–48 hours of closing so the buyer can verify the property condition and confirm everything is in the agreed-upon state.\n\nLet me know once scheduled so I can coordinate with title and prepare for closing.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_home_inspection_reports_tctools",
    title: "Home Inspection Reports – [Property Address]",
    body: `Hi [Buyer Name],\n\nAttached are the inspection reports for [Property Address], including the full report and any supplemental findings from the inspectors.\n\nPlease take some time to review them carefully and let us know if you have any questions, concerns, or items you'd like to discuss further. If anything needs clarification, I can help coordinate with the inspector directly or summarize key findings for you.\n\nOnce you've reviewed everything, we can chat about next steps—whether it's moving forward, requesting repairs, or negotiating a credit.\n\nLooking forward to your thoughts!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_buyer_request_for_credit_tctools",
    title: "Buyer Request for Credit – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nPlease see attached the inspection reports for [Property Address], which outline several items in need of repair.\n\nAfter reviewing the findings, the buyer is requesting a credit in lieu of repairs in the amount of $[Dollar Amount]. This would allow the buyer to address the items post-closing with contractors of their choice.\n\nWe believe this is a fair solution that avoids potential delays related to scheduling or completing work prior to closing.\n\nLet us know the seller's response at your earliest convenience. We're happy to provide additional context or clarification on any of the report findings if needed.\n\nBest regards,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_buyers_repair_request_tctools",
    title: "Buyer's Repair Request – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nFollowing the buyer's review of the attached inspection reports for [Property Address], they would like to request that the following items be repaired prior to closing:\n\n[Brief description of item #1]\n[Brief description of item #2]\n[Brief description of item #3]\n(You can expand the list as needed.)\nThe buyer is requesting that licensed professionals complete the work where applicable, and that receipts or invoices be provided for verification prior to closing.\n\nPlease let us know the seller's response or if you'd prefer to discuss alternatives such as a credit or price adjustment. \n\nLooking forward to hearing from you.\nBest regards,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_request_to_extend_inspection_period_tctools",
    title: "Request to Extend Inspection Period – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nWe'd like to request an extension of the inspection period for [Property Address] through [New Deadline Date] to allow the buyer additional time to complete their due diligence.\n\nThe inspection is underway, but the buyer is awaiting results from [e.g., roof specialist, mold assessor, contractor quote] to finalize their decision. We hope to wrap this up quickly and appreciate the seller's flexibility.\n\nPlease let us know if the seller is amenable so we can circulate the appropriate addendum for signature.\n\nBest regards,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_request_to_extend_closing_date_tctools",
    title: "Request to Extend Closing Date – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nWe're requesting a short extension of the closing date for [Property Address] to [Proposed New Closing Date].\n\nThis is due to [insert reason: final loan conditions, appraisal delay, title clearance, etc.], and we're actively working with all parties to keep things moving.\n\nPlease let us know if the seller is agreeable so we can draft and send over an addendum for signatures.\n\nThank you for your understanding,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_wire_fraud_alert_tctools",
    title: "IMPORTANT: Protect Your Funds – Wire Fraud Alert",
    body: `Hi [Buyer Name],\n\nBefore wiring any funds for your home purchase, please read this carefully:\n\n🔐 Wire fraud is real. Scammers have been known to impersonate title companies and send fake wiring instructions.\n\nWhat to do:\nAlways call the title company directly (using a number you trust) to verify wire instructions before sending any money.\nDo not trust email alone. Confirm details by phone—even if the email looks official.\nNever click on wiring links or respond to last-minute wiring changes without verbal confirmation.\nIf you have any doubts, reach out to me or the title company immediately. We want to keep your money safe and your closing secure.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_open_permits_or_liens_tctools",
    title: "Open Permits or Liens – [Property Address]",
    body: `Hi [Listing Agent Name or Title Rep],\n\nWe've been made aware that there are open permits and/or liens associated with [Property Address].\n\nCan you please provide the following:\n\nA summary of the open items\nWhat's needed to resolve them\nEstimated timeline for clearance\nThese issues will need to be addressed and resolved prior to closing to avoid delays or post-closing liability. Let me know how we can help move this along.\n\nBest regards,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_escrow_deposit_status_tctools",
    title: "Escrow Deposit Status – [Property Address]",
    body: `Hi [Buyer Name],\n\nJust checking in to confirm whether the escrow deposit has been sent for [Property Address].\n\nIf you've already sent it:\n\nPlease confirm the date, amount, and method of delivery (wire/check).\nLet me know if you received a confirmation from the title company.\nIf you haven't sent it yet, please do so as soon as possible. The deposit is due by [Contract Deadline], and timely delivery helps us stay in compliance with the terms.\n\nLet me know if you need wire instructions or help coordinating with title.\n\nThank you!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_closing_delay_tctools",
    title: "Closing Delay – [Property Address]",
    body: `Hi [All Parties or Agent Name],\n\nI wanted to let you know that the closing for [Property Address], originally scheduled for [Original Date], will need to be rescheduled due to [insert reason – e.g., lender delay, title clearance, funding issue, etc.].\n\nWe're actively working with all parties to resolve the issue and will confirm the new closing date as soon as it's finalized.\n\nThanks for your patience and flexibility—we'll keep you posted with any updates.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_urgent_party_did_not_appear_at_closing_tctools",
    title: "Urgent: Party Did Not Appear at Closing – [Property Address]",
    body: `Hi [Agent Name],\n\nWe've been notified that [Buyer/Seller] did not appear at the scheduled closing for [Property Address] today at [Time].\n\nWe're currently trying to get in touch with them to confirm what happened and whether we need to:\n\nReschedule\nPrepare for cancellation\nTake legal or contractual next steps\nI'll keep you posted as soon as we have more clarity. Please let me know if you've heard anything on your end or have another contact method to reach them.\n\nThanks,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_repair_and_credit_summary_tctools",
    title: "Repair & Credit Summary – [Property Address]",
    body: `Hi [Buyer Name],\n\nAs we finalize preparations for closing on [Property Address], here's a summary of what's been agreed upon following the inspection:\n\nRepairs Completed by Seller:\n\n[Item 1]\n[Item 2]\n[Item 3]\nCredit to Buyer at Closing:\n💵 $[Amount] to be reflected on the final Closing Disclosure\n\nLet me know if you have any questions or if there's anything else you'd like me to verify before closing day.\n\nAlmost there!`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_seller_request_post_occupancy_tctools",
    title: "Seller Request for Post-Occupancy – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nThe seller of [Property Address] has requested to remain in the property after closing for a short period. In order to proceed, we'll need a formal Post-Occupancy Agreement outlining the terms.\n\nPlease confirm if your buyer is open to this arrangement, and if so, we recommend including the following in the agreement:\n\nDuration of post-occupancy period (e.g., 3 days after closing)\nDaily rental rate or escrow holdback amount\nSecurity deposit, if any\nUtility responsibilities\nInsurance coverage/liability language\nOnce agreed, we can circulate the appropriate document for signatures and ensure title is aware.\n\nLet me know how you'd like to proceed.\n\nBest,`,
    date: new Date().toISOString().slice(0, 10),
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_hoa_approval_request",
    title: "Request for Information on Association Approval Requirements",
    body: `Hi [Manager's Name],\n\nI hope this message finds you well.\n\nI'm reaching out to confirm whether association approval is required for the upcoming sale at [Property Address]. If so, could you kindly share the application and any relevant instructions or requirements to initiate the process?\n\nPlease also let me know if there are any associated fees or timelines we should be aware of.\n\nThank you in advance for your assistance!\n\nBest regards,`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_hoa_application_followup",
    title: "Follow-Up on Association Application – [Property Address]",
    body: `Hi [Manager's Name],\n\nI hope you're doing well.\n\nI wanted to follow up on the status of the association application submitted for [Property Address]. Could you kindly confirm if all required documents have been received and if anything else is needed to move forward?\n\nWe appreciate your help and just want to ensure everything is on track.\n\nThank you again,`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_hoa_approval_status",
    title: "Request for Update on Association Approval – [Property Address]",
    body: `Hi [Manager's Name],\n\nI hope you're having a great day.\n\nI'm reaching out to check on the status of the association approval for [Property Address]. Has a decision been made, or is there an estimated timeframe we should plan around?\n\nPlease let us know if anything further is needed on our end to help expedite the process.\n\nThanks so much,`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_new_contract_seller_side_1",
    title: "We're Under Contract — Here's What's Next",
    body: `Hi [Seller Name],\n\nWe're officially under contract — congratulations! I'll be your point of contact from now through closing to help manage timelines, documents, and all the behind-the-scenes details that keep us on track.\n\nAttached is a copy of the executed contract for your records. I'll follow up soon with next steps and any items needed from you.\n\nLet's get this to the finish line.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_disclosure_followup",
    title: "Quick Reminder – Property Disclosure Needed",
    body: `Hi [Seller Name],\n\nJust a friendly nudge — we still need your completed Seller's Property Disclosure. This is required for the buyer's review and must be signed and submitted promptly to stay on schedule.\n\nLet me know if you need help locating the form or have any questions before signing.\n\nThanks!\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_escrow_confirmed",
    title: "Escrow Deposit Confirmed – Letter Attached",
    body: `Hi [Seller Name],\n\nJust a quick update — we've received confirmation that the buyer's escrow deposit has been made as outlined in the contract.\n\nAttached is the escrow letter for your records. This confirms the funds were delivered to the escrow agent and are being held in accordance with the agreement.\n\nLet me know if you have any questions. \n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_inspection_scheduled",
    title: "Buyer's Inspection Scheduled",
    body: `Hi [Seller Name],\n\nJust confirming that the buyer's general inspection has been scheduled for:\n\n🗓 [Date]\n🕘 [Time Range]\n\nThe inspector will need access to the property, including any areas like the garage, attic, or utility closets. If there are pets at home, please secure them or let me know how you'd like to handle that.\n\nI'll follow up afterward with any updates or requests from the buyer's side.\n\nThanks!\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_inspection_reports_delivered",
    title: "Inspection Reports Received",
    body: `Hi [Seller Name],\n\nThe buyer's agent has delivered the inspection reports for your review. No action is required yet, but I wanted to keep you in the loop. If the buyer requests any repairs or credits, I'll be sure to send you the details promptly.\n\nLet me know if you'd like to review the reports or have any questions.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_repair_request",
    title: "Buyer's Request for Repairs",
    body: `Hi [Seller Name],\n\nFollowing the inspection, the buyer has submitted a request for the following repairs:\n– [Insert Summary of Repairs]\n\nPlease review and let me know how you'd like to proceed — approve, counter, or decline. We're still within the inspection period, so timing is key here.\n\nThe inspection reports are attached for context.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_credit_request",
    title: "Buyer Requesting Credit in Lieu of Repairs",
    body: `Hi [Seller Name],\n\nInstead of asking for repairs, the buyer is requesting a credit of $[amount] toward closing costs to address inspection items.\n\nLet me know your thoughts — I'm happy to discuss options or prepare a formal response. Inspection reports are attached for your review.\n\nThanks,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_extension_request",
    title: "Request for Extension",
    body: `Hi [Seller Name],\n\nThe buyer has requested a short extension to the [inspection/appraisal] deadline due to [brief explanation, e.g., scheduling delays].\n\nAttached is the addendum extending the deadline to [new date]. Please review and let me know if you're okay with signing, or if you'd like to discuss it first.\n\nAppreciate your flexibility as we keep things moving.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_executed_contract_attorney",
    title: "Executed Contract for Review – [Property Address]",
    body: `Hi [Attorney Name],\n\nAttached is the fully executed contract for [Seller Name] regarding the sale of [Property Address]. Please review at your convenience and let us know if you need anything additional from our side.\n\nWe'll be coordinating key dates and deliverables, and I'll keep you posted as the file progresses.\n\nLooking forward to working together on this closing.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_connect_attorney_closing_agent",
    title: "Introductions – Closing Team for [Property Address]",
    body: `Hi [Attorney Name] and [Closing Agent Name],\n\nLooping everyone in here to get the ball rolling on [Property Address].\n\n– [Attorney Name] is representing the seller, [Seller Name]\n– [Closing Agent Name] is handling the closing on the buyer's side\n\n[Attorney Name], please feel free to reach out to [Closing Agent Name] directly with any requests, and vice versa. I'll stay copied and help coordinate as needed.\n\nThanks,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_loan_approval_notice",
    title: "Buyer's Loan Approval – [Property Address]",
    body: `Hi [Seller Name],\n\nJust keeping you in the loop — we've received formal loan approval from the buyer's lender for [Property Address].\n\nThat's a major milestone in the process and a good sign that everything is on track for closing. I'll continue monitoring all dates and will reach out if anything else is needed from you.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_second_deposit_escrow",
    title: "Second Deposit Received – [Property Address]",
    body: `Hi [Seller Name],\n\nJust a quick update — the buyer's second deposit has been received and is now being held in escrow as per the contract terms.\n\nAttached is the escrow letter confirming receipt for your records.\n\nLet me know if you have any questions. I'll keep you posted as we move toward closing.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_loan_application_completed",
    title: "Buyer's Loan Application Completed – [Property Address]",
    body: `Hi [Seller Name],\n\nJust a quick update — the buyer has completed their loan application for the purchase of [Property Address]. This keeps us on track with the financing timeline outlined in the contract.\n\nNext up: appraisal and loan approval. I'll continue to monitor and keep you posted on any important milestones.\n\nLet me know if you have any questions in the meantime.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_appraisal_ordered",
    title: "Appraisal Ordered – [Property Address]",
    body: `Hi [Seller Name],\n\nJust a heads-up — the buyer's lender has officially ordered the appraisal for [Property Address]. This is the next step in the loan process and typically takes a few business days to complete.\n\nI'll follow up once we receive confirmation of the appointment and share the results as soon as they're available.\n\nWe're moving right along!\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_appraisal_report_received",
    title: "Appraisal Report In – [Property Address]",
    body: `Hi [Seller Name],\n\nWe've received confirmation that the appraisal for [Property Address] has been completed and returned to the lender.\n\n[If it met or exceeded contract price:]\nThe property appraised at or above the contract price — great news! We're clear on that front and can keep moving forward.\n\n[If appraisal came in low or additional review is needed:]\nThe appraisal came in below contract price / with conditions — I'll be in touch shortly to discuss options once we get full details from the lender.\n\nAs always, I'll keep you updated every step of the way.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_title_work_received",
    title: "Title Work Received – [Property Address]",
    body: `Hi [Seller Name],\n\nJust a quick update — the title company has completed the title search for [Property Address]. No major issues have been flagged, and they'll be moving forward with final title commitment and prep for closing.\n\nIf anything unexpected comes up, I'll let you know right away. Otherwise, we're in good shape.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_survey_scheduled",
    title: "Survey Scheduled – [Property Address]",
    body: `Hi [Seller Name],\n\nThe property survey for [Property Address] has been scheduled for [Date] at [Time]. The surveyor will coordinate access directly if needed.\n\nOnce the survey is completed and delivered, I'll share a copy with you for your records and confirm everything is in line with the contract.\n\nLet me know if you have any questions in the meantime.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_closing_date_extension",
    title: "Buyer Requesting Extension to Closing Date – [Property Address]",
    body: `Hi [Seller Name],\n\nThe buyer's team has requested an extension to the closing date for [Property Address], citing [brief reason if known, e.g., loan processing delays, final underwriting, etc.].\n\nThey're proposing a new closing date of [New Date], and I've attached the corresponding extension addendum for your review and signature.\n\nPlease let me know how you'd like to proceed or if you'd like to discuss before signing. I'm here to help navigate whatever works best for you.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_preparing_closing_docs",
    title: "Preparing Closing Documents & Scheduling Seller Signing – [Property Address]",
    body: `Hi [Seller Name],\n\nAs we approach the finish line for [Property Address], the next step is for the closing team to prepare the conveyance documents (deed, affidavits, etc.) and coordinate your signing appointment.\n\nPlease confirm how you'd prefer to sign:\n– In person at the title office, or\n– With a mobile notary (we can help arrange this for your convenience)\n\nOnce your preference is confirmed, the closing team will coordinate the final signing logistics and share any remaining instructions.\n\nLet me know what works best for you so we can get everything scheduled smoothly.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_clear_to_close",
    title: "We're Clear to Close! – [Property Address]",
    body: `Hi [Seller Name],\n\nGreat news — the buyer's lender has issued the Clear to Close for [Property Address]. This means all financing conditions have been satisfied, and we're officially moving forward to set up the closing.\n\nThe title team will be coordinating signing and confirming final details shortly. I'll keep you posted as soon as we have the exact date and time.\n\nWe're almost there!\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_payoff_info_request",
    title: "Final Payoff/Mortgage Info Needed – [Property Address]",
    body: `Hi [Seller Name],\n\nTo prepare for closing, the title company will need your mortgage payoff information. If you haven't already provided it, please send:\n– Your loan servicer's name and contact info\n– Loan number (if available)\n– Written authorization to request the payoff\n\nIf you need help drafting the authorization, I've got a template ready. Just let me know.\n\nThanks!\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_final_walkthrough_notice",
    title: "Buyer's Final Walkthrough Scheduled – [Property Address]",
    body: `Hi [Seller Name],\n\nThe buyer's final walkthrough has been scheduled for [Date] at [Time]. This is a standard part of the process where they'll confirm the property's condition prior to closing.\n\nPlease make sure the home is accessible and any agreed-upon repairs (if applicable) have been completed.\n\nLet me know if you need help coordinating anything ahead of the walkthrough.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_post_closing_checkin",
    title: "You Did It — Congratulations on Closing!",
    body: `Hi [Seller Name],\n\nCongratulations on the successful closing of [Property Address]!\n\nAttached you'll find your final closing documents, including the executed Closing Statement and recorded Deed for your records.\n\nIt's been a pleasure working with you. If you need anything in the future — referrals, questions, or just a friendly face in real estate — don't hesitate to reach out.\n\nCheers to what's next,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_contract_seller_cancel_utilities_reminder",
    title: "Friendly Reminder: Cancel Utilities Before Closing – [Property Address]",
    body: `Hi [Seller Name],\n\nAs we head into the final stretch, just a quick reminder to contact your utility providers and cancel services effective [Closing Date]. This includes electricity, water, gas, internet, lawn service, pool service, etc.\n\nIf you're leaving behind any service records or info for the buyer, feel free to send them over — I'm happy to pass it along.\n\nLet me know if you need a sample list or assistance with anything.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_south_florida_flood_disclosure_request",
    title: "Flood Disclosure Needed for Compliance – [Property Address]",
    body: `Hi [Seller Name],\n\nAs part of the required disclosures for the sale at [Property Address], we'll need the attached Flood Disclosure form completed and signed. This helps the buyer understand whether the property is located in a flood zone and whether flood insurance has been previously carried.\n\nIt's a compliance requirement and part of the standard disclosure package in South Florida — especially given how frequently properties fall within FEMA-designated zones.\n\nI've attached the form here for your convenience. Please have the seller complete, sign, and send it back at your earliest convenience so we can keep the file moving.\n\nLet me know if you have any questions — happy to walk you through it.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_south_florida_condo_docs_request",
    title: "Request for Condominium Documents – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nPer the executed contract and attached Condominium Rider, the buyer is entitled to receive the following items:\n\nDeclaration of Condominium\nArticles of Incorporation\nBylaws and Rules/Regulations\nFAQ Sheet\nMost Recent Year-End Financials\nAssociation Budget\nGovernance Form\nPlease provide these items at your earliest convenience so we can remain in compliance with the contract timeline. \n\nLet me know if any of these documents are not available or need to come directly from the association.\n\nThank you,\n[Your Name]`,
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_condo_hoa_condo_docs_request",
    title: "Request for Condominium Documents – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nPer the executed contract and attached Condominium Rider, the buyer is entitled to receive the following items:\n\nDeclaration of Condominium\nArticles of Incorporation\nBylaws and Rules/Regulations\nFAQ Sheet\nMost Recent Year-End Financials\nAssociation Budget\nGovernance Form\nPlease provide these items at your earliest convenience so we can remain in compliance with the contract timeline. \n\nLet me know if any of these documents are not available or need to come directly from the association.\n\nThank you,\n[Your Name]`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_required_condo_disclosures_south_florida",
    title: "Required Condo Disclosures – [Property Address]",
    body: `Hi [Seller Name],\n\nAs part of the executed contract for your unit at [Property Address], we'll need the following condominium documents provided to the buyer:\n✔ Declaration of Condominium\n✔ Budget ✔ Articles of Incorporation\n✔ Bylaws and Rules/Regulations\n✔ FAQ Sheet\n✔ Most Recent Year-End Financials\n✔ Current Association Budget\n✔ Condominium Governance Form\n\nIf you already have these on hand or can access them via the association's online portal, please forward them as soon as possible. Otherwise, let me know and I'll help coordinate with the management company.\n\nThese are required for compliance and must be delivered before the buyer's 3-day review period begins.\n\nThanks so much,\n[Your Name]`,
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_required_condo_disclosures_condo_hoa",
    title: "Required Condo Disclosures – [Property Address]",
    body: `Hi [Seller Name],\n\nAs part of the executed contract for your unit at [Property Address], we'll need the following condominium documents provided to the buyer:\n✔ Declaration of Condominium\n✔ Budget ✔ Articles of Incorporation\n✔ Bylaws and Rules/Regulations\n✔ FAQ Sheet\n✔ Most Recent Year-End Financials\n✔ Current Association Budget\n✔ Condominium Governance Form\n\nIf you already have these on hand or can access them via the association's online portal, please forward them as soon as possible. Otherwise, let me know and I'll help coordinate with the management company.\n\nThese are required for compliance and must be delivered before the buyer's 3-day review period begins.\n\nThanks so much,\n[Your Name]`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_required_condo_disclosures_contract_seller",
    title: "Required Condo Disclosures – [Property Address]",
    body: `Hi [Seller Name],\n\nAs part of the executed contract for your unit at [Property Address], we'll need the following condominium documents provided to the buyer:\n✔ Declaration of Condominium\n✔ Budget ✔ Articles of Incorporation\n✔ Bylaws and Rules/Regulations\n✔ FAQ Sheet\n✔ Most Recent Year-End Financials\n✔ Current Association Budget\n✔ Condominium Governance Form\n\nIf you already have these on hand or can access them via the association's online portal, please forward them as soon as possible. Otherwise, let me know and I'll help coordinate with the management company.\n\nThese are required for compliance and must be delivered before the buyer's 3-day review period begins.\n\nThanks so much,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_request_condo_docs_all_categories",
    title: "Request for Condominium Documents – [Property Address]",
    body: `Hello,\n\nWe're requesting the following condominium documents for a pending sale at [Property Address] on behalf of the unit owner, [Seller Name]. These are required under the Florida Condominium Act and the executed purchase agreement:\n– Declaration of Condominium\n– Articles of Incorporation\n– Bylaws and Rules/Regulations\n– Frequently Asked Questions (FAQ) Sheet\n– Most Recent Year-End Financials\n– Current Budget\n– Condominium Governance Form (718.504, F.S.)\n\nPlease let us know the cost (if any) and estimated turnaround time. If possible, a digital copy sent via email is preferred.\n\nThank you in advance,\n[Your Name]`,
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_request_condo_docs_all_categories_condo_hoa",
    title: "Request for Condominium Documents – [Property Address]",
    body: `Hello,\n\nWe're requesting the following condominium documents for a pending sale at [Property Address] on behalf of the unit owner, [Seller Name]. These are required under the Florida Condominium Act and the executed purchase agreement:\n– Declaration of Condominium\n– Articles of Incorporation\n– Bylaws and Rules/Regulations\n– Frequently Asked Questions (FAQ) Sheet\n– Most Recent Year-End Financials\n– Current Budget\n– Condominium Governance Form (718.504, F.S.)\n\nPlease let us know the cost (if any) and estimated turnaround time. If possible, a digital copy sent via email is preferred.\n\nThank you in advance,\n[Your Name]`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_request_condo_docs_all_categories_contract_seller",
    title: "Request for Condominium Documents – [Property Address]",
    body: `Hello,\n\nWe're requesting the following condominium documents for a pending sale at [Property Address] on behalf of the unit owner, [Seller Name]. These are required under the Florida Condominium Act and the executed purchase agreement:\n– Declaration of Condominium\n– Articles of Incorporation\n– Bylaws and Rules/Regulations\n– Frequently Asked Questions (FAQ) Sheet\n– Most Recent Year-End Financials\n– Current Budget\n– Condominium Governance Form (718.504, F.S.)\n\nPlease let us know the cost (if any) and estimated turnaround time. If possible, a digital copy sent via email is preferred.\n\nThank you in advance,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_followup_condo_docs_pending_condo_hoa",
    title: "Follow-Up: Condo Documents Pending – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nJust a quick follow-up — as of today, we have not received the full set of condominium documents required by the contract. This includes the Declaration, Bylaws, Budget, and related items outlined in the Condominium Rider.\n\nPlease confirm when we can expect delivery so we can properly track the buyer's 3-day review window and avoid delays.\n\nThanks again,\n[Your Name]`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_followup_condo_docs_pending_contract_seller",
    title: "Follow-Up: Condo Documents Pending – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nJust a quick follow-up — as of today, we have not received the full set of condominium documents required by the contract. This includes the Declaration, Bylaws, Budget, and related items outlined in the Condominium Rider.\n\nPlease confirm when we can expect delivery so we can properly track the buyer's 3-day review window and avoid delays.\n\nThanks again,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_followup_condo_docs_pending_contract_buyer",
    title: "Follow-Up: Condo Documents Pending – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nJust a quick follow-up — as of today, we have not received the full set of condominium documents required by the contract. This includes the Declaration, Bylaws, Budget, and related items outlined in the Condominium Rider.\n\nPlease confirm when we can expect delivery so we can properly track the buyer's 3-day review window and avoid delays.\n\nThanks again,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t_followup_condo_docs_pending_south_florida",
    title: "Follow-Up: Condo Documents Pending – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nJust a quick follow-up — as of today, we have not received the full set of condominium documents required by the contract. This includes the Declaration, Bylaws, Budget, and related items outlined in the Condominium Rider.\n\nPlease confirm when we can expect delivery so we can properly track the buyer's 3-day review window and avoid delays.\n\nThanks again,\n[Your Name]`,
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_followup_condo_docs_pending_tc_tools",
    title: "Follow-Up: Condo Documents Pending – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nJust a quick follow-up — as of today, we have not received the full set of condominium documents required by the contract. This includes the Declaration, Bylaws, Budget, and related items outlined in the Condominium Rider.\n\nPlease confirm when we can expect delivery so we can properly track the buyer's 3-day review window and avoid delays.\n\nThanks again,\n[Your Name]`,
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_request_milestone_sirs_turnover_reports_condo_hoa",
    title: "Request for Milestone Inspection, SIRS & Turnover Reports – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nIn accordance with Section 10 of the Condominium Rider, please provide copies of the following documents for [Property Address], as applicable:\n\n– Milestone Inspection Report (if one has been performed pursuant to §553.899, Florida Statutes)\n– Structural Integrity Reserve Study (SIRS) as required under §718.112(2)(g), F.S.\n– Turnover Inspection Report, if the developer has turned over control to the association\n\nThese documents are now part of Florida's statutory disclosure requirements and must be shared with the buyer for review. If any of the above are not applicable, please confirm in writing for compliance purposes.\n\nLet me know if you need help obtaining these from the association or if they'll be provided directly from management.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_request_milestone_sirs_turnover_reports_contract_seller",
    title: "Request for Milestone Inspection, SIRS & Turnover Reports – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nIn accordance with Section 10 of the Condominium Rider, please provide copies of the following documents for [Property Address], as applicable:\n\n– Milestone Inspection Report (if one has been performed pursuant to §553.899, Florida Statutes)\n– Structural Integrity Reserve Study (SIRS) as required under §718.112(2)(g), F.S.\n– Turnover Inspection Report, if the developer has turned over control to the association\n\nThese documents are now part of Florida's statutory disclosure requirements and must be shared with the buyer for review. If any of the above are not applicable, please confirm in writing for compliance purposes.\n\nLet me know if you need help obtaining these from the association or if they'll be provided directly from management.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_request_milestone_sirs_turnover_reports_contract_buyer",
    title: "Request for Milestone Inspection, SIRS & Turnover Reports – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nIn accordance with Section 10 of the Condominium Rider, please provide copies of the following documents for [Property Address], as applicable:\n\n– Milestone Inspection Report (if one has been performed pursuant to §553.899, Florida Statutes)\n– Structural Integrity Reserve Study (SIRS) as required under §718.112(2)(g), F.S.\n– Turnover Inspection Report, if the developer has turned over control to the association\n\nThese documents are now part of Florida's statutory disclosure requirements and must be shared with the buyer for review. If any of the above are not applicable, please confirm in writing for compliance purposes.\n\nLet me know if you need help obtaining these from the association or if they'll be provided directly from management.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t_request_milestone_sirs_turnover_reports_south_florida",
    title: "Request for Milestone Inspection, SIRS & Turnover Reports – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nIn accordance with Section 10 of the Condominium Rider, please provide copies of the following documents for [Property Address], as applicable:\n\n– Milestone Inspection Report (if one has been performed pursuant to §553.899, Florida Statutes)\n– Structural Integrity Reserve Study (SIRS) as required under §718.112(2)(g), F.S.\n– Turnover Inspection Report, if the developer has turned over control to the association\n\nThese documents are now part of Florida's statutory disclosure requirements and must be shared with the buyer for review. If any of the above are not applicable, please confirm in writing for compliance purposes.\n\nLet me know if you need help obtaining these from the association or if they'll be provided directly from management.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_request_milestone_sirs_turnover_reports_tc_tools",
    title: "Request for Milestone Inspection, SIRS & Turnover Reports – [Property Address]",
    body: `Hi [Listing Agent Name],\n\nIn accordance with Section 10 of the Condominium Rider, please provide copies of the following documents for [Property Address], as applicable:\n\n– Milestone Inspection Report (if one has been performed pursuant to §553.899, Florida Statutes)\n– Structural Integrity Reserve Study (SIRS) as required under §718.112(2)(g), F.S.\n– Turnover Inspection Report, if the developer has turned over control to the association\n\nThese documents are now part of Florida's statutory disclosure requirements and must be shared with the buyer for review. If any of the above are not applicable, please confirm in writing for compliance purposes.\n\nLet me know if you need help obtaining these from the association or if they'll be provided directly from management.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_followup_pending_section10_condo_hoa",
    title: "Follow-Up: Milestone, SIRS, and Turnover Reports Still Needed",
    body: `Hi [Listing Agent Name],\n\nJust following up regarding the outstanding disclosures required under Section 10 of the Condominium Rider for [Property Address]. We're still awaiting:\n\n– Milestone Inspection Report (if applicable)\n– Structural Integrity Reserve Study (SIRS)\n– Turnover Inspection Report (if applicable)\n\nThese are now part of Florida's mandated disclosures, and the buyer is entitled to review them prior to closing. If any of these items do not exist or are not applicable to this association, written confirmation will suffice for compliance.\n\nAppreciate your help in getting these addressed as soon as possible to avoid delays in the timeline. Let me know if I can assist in reaching out to the association.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONDO_HOA,
  },
  {
    id: "t_followup_pending_section10_contract_seller",
    title: "Follow-Up: Milestone, SIRS, and Turnover Reports Still Needed",
    body: `Hi [Listing Agent Name],\n\nJust following up regarding the outstanding disclosures required under Section 10 of the Condominium Rider for [Property Address]. We're still awaiting:\n\n– Milestone Inspection Report (if applicable)\n– Structural Integrity Reserve Study (SIRS)\n– Turnover Inspection Report (if applicable)\n\nThese are now part of Florida's mandated disclosures, and the buyer is entitled to review them prior to closing. If any of these items do not exist or are not applicable to this association, written confirmation will suffice for compliance.\n\nAppreciate your help in getting these addressed as soon as possible to avoid delays in the timeline. Let me know if I can assist in reaching out to the association.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_SELLER,
  },
  {
    id: "t_followup_pending_section10_contract_buyer",
    title: "Follow-Up: Milestone, SIRS, and Turnover Reports Still Needed",
    body: `Hi [Listing Agent Name],\n\nJust following up regarding the outstanding disclosures required under Section 10 of the Condominium Rider for [Property Address]. We're still awaiting:\n\n– Milestone Inspection Report (if applicable)\n– Structural Integrity Reserve Study (SIRS)\n– Turnover Inspection Report (if applicable)\n\nThese are now part of Florida's mandated disclosures, and the buyer is entitled to review them prior to closing. If any of these items do not exist or are not applicable to this association, written confirmation will suffice for compliance.\n\nAppreciate your help in getting these addressed as soon as possible to avoid delays in the timeline. Let me know if I can assist in reaching out to the association.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t_followup_pending_section10_south_florida",
    title: "Follow-Up: Milestone, SIRS, and Turnover Reports Still Needed",
    body: `Hi [Listing Agent Name],\n\nJust following up regarding the outstanding disclosures required under Section 10 of the Condominium Rider for [Property Address]. We're still awaiting:\n\n– Milestone Inspection Report (if applicable)\n– Structural Integrity Reserve Study (SIRS)\n– Turnover Inspection Report (if applicable)\n\nThese are now part of Florida's mandated disclosures, and the buyer is entitled to review them prior to closing. If any of these items do not exist or are not applicable to this association, written confirmation will suffice for compliance.\n\nAppreciate your help in getting these addressed as soon as possible to avoid delays in the timeline. Let me know if I can assist in reaching out to the association.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.SOUTH_FLORIDA,
  },
  {
    id: "t_followup_pending_section10_tc_tools",
    title: "Follow-Up: Milestone, SIRS, and Turnover Reports Still Needed",
    body: `Hi [Listing Agent Name],\n\nJust following up regarding the outstanding disclosures required under Section 10 of the Condominium Rider for [Property Address]. We're still awaiting:\n\n– Milestone Inspection Report (if applicable)\n– Structural Integrity Reserve Study (SIRS)\n– Turnover Inspection Report (if applicable)\n\nThese are now part of Florida's mandated disclosures, and the buyer is entitled to review them prior to closing. If any of these items do not exist or are not applicable to this association, written confirmation will suffice for compliance.\n\nAppreciate your help in getting these addressed as soon as possible to avoid delays in the timeline. Let me know if I can assist in reaching out to the association.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_initial_deposit_reminder_deposits",
    title: "Initial Deposit Due – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a reminder that the initial deposit for [Property Address] is due by [Deposit Due Date] as outlined in the contract.\n\nPlease confirm once it has been sent and provide the escrow letter or proof of wire so we can update the file accordingly. Let me know if there are any issues or delays.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.DEPOSITS,
  },
  {
    id: "t_initial_deposit_reminder_contract_buyer",
    title: "Initial Deposit Due – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a reminder that the initial deposit for [Property Address] is due by [Deposit Due Date] as outlined in the contract.\n\nPlease confirm once it has been sent and provide the escrow letter or proof of wire so we can update the file accordingly. Let me know if there are any issues or delays.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t_initial_deposit_reminder_tc_tools",
    title: "Initial Deposit Due – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a reminder that the initial deposit for [Property Address] is due by [Deposit Due Date] as outlined in the contract.\n\nPlease confirm once it has been sent and provide the escrow letter or proof of wire so we can update the file accordingly. Let me know if there are any issues or delays.\n\nBest,\n[Your Name]`,
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  {
    id: "t_buyer_missed_deposit_deadline_deposits",
    title: "Deposit Deadline Passed – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a quick heads-up — the deposit deadline for [Property Address] has passed as of [Date], and we have not yet received confirmation or an escrow letter.\n\nPlease provide an update as soon as possible so we can avoid any contractual issues. Let me know if there was a delay or if a wire confirmation is pending.\n\nThanks,\n[Your Name]`,
    category: CONTRACT_STAGES.DEPOSITS,
  },
  {
    id: "t_buyer_missed_deposit_deadline_contract_buyer",
    title: "Deposit Deadline Passed – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a quick heads-up — the deposit deadline for [Property Address] has passed as of [Date], and we have not yet received confirmation or an escrow letter.\n\nPlease provide an update as soon as possible so we can avoid any contractual issues. Let me know if there was a delay or if a wire confirmation is pending.\n\nThanks,\n[Your Name]`,
    category: CONTRACT_STAGES.CONTRACT_BUYER,
  },
  {
    id: "t_buyer_missed_deposit_deadline_tc_tools",
    title: "Deposit Deadline Passed – [Property Address]",
    body: `Hi [Buyer's Agent Name],\n\nJust a quick heads-up — the deposit deadline for [Property Address] has passed as of [Date], and we have not yet received confirmation or an escrow letter.\n\nPlease provide an update as soon as possible so we can avoid any contractual issues. Let me know if there was a delay or if a wire confirmation is pending.\n\nThanks,\n[Your Name]`,
    category: CONTRACT_STAGES.TC_TOOLS,
  },
  // Difficult Conversations Templates
  {
    id: "dc_unresponsive_agent",
    title: "Unresponsive Agent or Party",
    body: `Subject: Gentle reminder – pending item for [Property Address]\n\nHi [Name],\n\nI wanted to follow up on [specific item] for [Property Address] — we're still pending your confirmation before we can move forward.\n\nPlease confirm receipt and let me know if you need anything from our side to keep this on track. Even a quick "received" helps.\n\nThank you,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_deadline_approaching",
    title: "Deadline Approaching (No Response)",
    body: `Subject: Time-sensitive – contract deadline approaching\n\nHi [Name],\n\nWe're approaching the [deadline name] for [Property Address], which is due [Date].\n\nPlease confirm your client's position or forward the necessary document today so we can remain in compliance.\n\nIf you anticipate a delay, please let me know so we can prepare an extension request.\n\nThank you for your prompt response,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_angry_rude_communication",
    title: "Angry or Rude Communication",
    body: `Subject: Clarifying next steps for [Property Address]\n\nHi [Name],\n\nI understand this process can be stressful, and I appreciate everyone's efforts in keeping things moving. My only goal is to make sure communication remains clear and productive so we can close on time.\n\nTo recap where things stand:\n[Insert short summary of facts, not opinions.]\n\nPlease confirm if there's any part you'd like me to clarify further.\n\nThank you,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_boundary_reset",
    title: "Boundary Reset (Too Many Calls or Messages)",
    body: `Subject: Streamlining communication for [Property Address]\n\nHi [Client First Name],\n\nI completely understand how important this transaction is to you, and I want to make sure everything continues running smoothly.\n\nTo keep updates consistent and accurate, I'll be sharing all key milestones and documents as soon as they're available. If anything requires immediate action, you'll hear from me directly.\n\nThis helps keep communication organized and ensures nothing gets missed.\n\nThank you for your understanding and trust — I've got you covered.\n\nWarmly,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_title_lender_delay",
    title: "Title or Lender Delay",
    body: `Subject: Update on title/lender status – [Property Address]\n\nHi [Client First Name],\n\nI wanted to let you know that [title/lender] is working through a brief delay on [specific item, e.g., payoff, clearance, or document].\n\nThey've assured us it's being addressed and should be resolved shortly.\n\nAt this stage, no action is needed from your side — I'll update you as soon as we have confirmation.\n\nWe're keeping everything moving and will adjust timelines as needed.\n\nThank you for your patience,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_loan_denied",
    title: "Loan Denied or Financing Issue",
    body: `Subject: Loan status update – [Property Address]\n\nHi [Client First Name],\n\nI wanted to reach out right away to share that the lender was unable to issue final approval on your file for [Property Address].\n\nThis doesn't necessarily mean the deal can't move forward — sometimes it's a matter of documentation, timing, or switching loan programs.\n\nI recommend connecting directly with your lender to understand what's needed, and we'll coordinate with the agent on next steps (extension, new program, or backup plan).\n\nWe're in this with you and will support whatever direction you choose.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_seller_refusing_repairs",
    title: "Seller Refusing Repairs",
    body: `Subject: Update – seller response to repair request\n\nHi [Buyer First Name],\n\nThe seller has reviewed your inspection request and has decided not to proceed with the requested repairs.\n\nYou have the following options under your contract:\n1. Proceed as-is and continue toward closing.\n2. Request a credit or renegotiate price.\n3. Cancel under the inspection contingency (before [date]).\n\nPlease let me know how you'd like to proceed so we can take the next steps promptly.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_buyer_missing_deadlines",
    title: "Buyer Missing Deadlines",
    body: `Subject: Time-sensitive reminder – contract timeline\n\nHi [Buyer First Name],\n\nJust a quick reminder that your [inspection/loan/HOA application] deadline is [date].\n\nStaying on track with these dates helps protect your deposit and keep closing smooth.\n\nPlease confirm once it's complete so we can update the file accordingly.\n\nThank you!`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_client_escalating",
    title: "Client Escalating Emotionally",
    body: `Subject: Let's review this together\n\nHi [Client First Name],\n\nI completely understand that this process can feel overwhelming — especially when timing and communication overlap between multiple parties.\n\nLet's take a moment to review what's actually pending and what's already been completed so we can focus on next steps.\n\nHere's what's currently in progress:\n[Insert factual status points]\n\nWe'll get through this step-by-step, together.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_agent_vendor_mistake",
    title: "Agent or Vendor Mistake (Diplomatic Approach)",
    body: `Subject: Clarifying file details for [Property Address]\n\nHi [Name],\n\nI wanted to touch base regarding [specific issue] on [Property Address] — it looks like there may have been a misunderstanding or oversight.\n\nHere's what we're seeing:\n[Fact summary only, no blame]\n\nIf you could take a moment to review and confirm, I'll make sure the correction reflects across the file so everything stays accurate.\n\nAppreciate your attention to this,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_deposit_release_dispute",
    title: "Dispute Over Deposit Release",
    body: `Subject: Escrow release update – [Property Address]\n\nHi [Title Rep Name],\n\nPlease hold all escrow funds until written authorization has been received from both parties.\n\nOnce both sides execute the release, we'll forward it for disbursement.\n\nThis ensures the process stays fully compliant with contract terms.\n\nThank you,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_appraisal_below_price",
    title: "Appraisal Below Contract Price",
    body: `Subject: Appraisal results and next steps\n\nHi [Agent Name],\n\nThe appraisal for [Property Address] came in at [$value], below the contract price of [$contract amount].\n\nOptions moving forward:\n1. Negotiate a price reduction\n2. Buyer pays the difference in cash\n3. Cancel under the appraisal contingency\n\nPlease confirm how your client wishes to proceed so we can prepare the appropriate addendum.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_unhappy_seller_post_closing",
    title: "Unhappy Seller After Closing",
    body: `Subject: Regarding your recent sale – [Property Address]\n\nHi [Seller First Name],\n\nI understand you have concerns regarding the closing outcome. I want to make sure your feedback is heard and properly documented.\n\nIf you'd like, we can set a quick call to review the details together — sometimes a 10-minute conversation can resolve everything.\n\nMy goal is always to maintain professionalism and clarity, even when things don't go exactly as planned.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_documentation_recap",
    title: "We Did Everything Right Recap (Post-Issue Documentation)",
    body: `Subject: Recap of communication and contract timelines\n\nHi [Broker or Manager],\n\nHere's a summary of the communication and milestones for [Property Address] in reference to the recent concern:\n[List key dates, emails, and actions taken]\n\nAll actions were taken within contract timelines and in accordance with procedure.\n\nThis is for documentation purposes only — no further action required unless otherwise advised.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_boundary_professionalism",
    title: "Boundary + Professionalism Reminder (Polite but Firm)",
    body: `Subject: Quick note about communication\n\nHi [Name],\n\nI value open communication and professionalism in every transaction, and I want to make sure we both stay aligned toward closing successfully.\n\nLet's keep our communication respectful and focused on resolving next steps efficiently — I'm happy to collaborate as long as we stay solution-oriented.\n\nThank you for understanding,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_overinvolved_relative",
    title: "The Overinvolved Relative",
    body: `Subject: Clarifying communication moving forward\n\nHi [Name],\n\nI completely understand you want to stay informed — it's clear how much you care about this process.\n\nTo make sure there's no confusion and everything stays accurate, I'll continue sending all updates directly to [Buyer/Seller Name] (as they're the contractual party).\n\nOf course, you're welcome to stay copied for awareness. I'll just ensure all key information flows through the primary client to maintain consistency.\n\nThank you for your understanding,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_unrealistic_expectations",
    title: "Unrealistic Expectations",
    body: `Subject: Let's align expectations for the next phase\n\nHi [Client First Name],\n\nI wanted to take a moment to make sure we're on the same page regarding next steps and timelines.\n\nWhile we always aim to move things quickly, some steps (like lender underwriting, HOA review, or title clearance) are dependent on third parties and can take a few extra days.\n\nI promise to keep you informed as soon as there's an update, but I don't want you to feel something's wrong just because we're waiting on a standard process.\n\nYou're in good hands — and we're still fully on track.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_agent_wont_read_emails",
    title: "The Agent Who Won't Read Emails",
    body: `Subject: Recap for clarity – [Property Address]\n\nHi [Agent Name],\n\nJust to make sure we're aligned, here's a summary of what's already been communicated:\n[Item 1]\n[Item 2]\n[Item 3]\n\nI know how quickly these details can get buried in threads, so I wanted to consolidate everything for easy reference.\n\nPlease confirm if there's anything else you need from me to keep your side updated.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_lender_drops_ball",
    title: "When the Lender Drops the Ball",
    body: `Subject: Urgent: lender delay update – [Property Address]\n\nHi [Agent/Lender Name],\n\nWe've been informed of a delay on [specific item, e.g., loan docs, wire, or CD approval]. Please confirm the updated completion timeline so we can communicate realistic expectations to all parties.\n\nWe understand unexpected delays happen — we just need to ensure everyone's aligned and proactive on the next steps.\n\nThank you for clarifying this ASAP,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_buyer_demanding_repairs",
    title: "Buyer Demanding Repairs Outside Contract",
    body: `Subject: Clarifying repair obligations under contract\n\nHi [Buyer First Name],\n\nI reviewed your request regarding [specific item]. Unfortunately, that item falls outside the scope of what's contractually required of the seller.\n\nThat said, we can always request the repair or discuss a credit, but it would need to be mutually agreed upon through a signed addendum.\n\nPlease let me know how you'd like to proceed so we can keep your file moving forward smoothly.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_seller_feels_underpaid",
    title: "Seller Feels Underpaid or Misled About Net",
    body: `Subject: Clarifying closing statement details\n\nHi [Seller First Name],\n\nI understand the final numbers can feel confusing at first glance, so I wanted to walk you through what each line item represents.\n\nThe Closing Disclosure includes prorations, title fees, and payoffs that reflect standard closing costs. Nothing has been deducted without clear documentation or authorization.\n\nIf you'd like, we can schedule a quick call to go over it together line by line.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_overpromising_agent",
    title: "The Overpromising Agent",
    body: `Subject: Clarifying client expectations for [Property Address]\n\nHi [Agent Name],\n\nJust wanted to touch base to ensure we're aligned on client expectations — they mentioned [specific promise], and I wanted to verify if that's something you've confirmed or if we need to clarify with them.\n\nI always like to make sure everyone's on the same page before timelines get tight.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_hoa_nightmare",
    title: "HOA Nightmare Situation",
    body: `Subject: HOA delay update – [Property Address]\n\nHi [Client First Name],\n\nI wanted to let you know the [HOA/Condo Association] is running behind on processing applications. We've been following up regularly and will continue doing so until approval is confirmed.\n\nAt this point, we may need to extend the approval or closing date slightly to stay in compliance. I'll advise as soon as we have an update.\n\nYou're not alone in this — we're staying on top of it daily.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_broker_manager_escalation",
    title: "The Broker or Manager Escalation",
    body: `Subject: Summary for broker review – [Property Address]\n\nHi [Broker/Manager Name],\n\nHere's a quick summary of the situation on [Property Address] for your awareness:\n[Factual recap: issue, timeline, communications, resolution attempt]\n\nAll communication has remained professional and within compliance. I'm looping you in so you're fully aware of what's been handled so far in case further escalation is needed.\n\nThank you for your time,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_client_combative",
    title: "When the Client Becomes Combative",
    body: `Subject: Keeping our communication productive\n\nHi [Client First Name],\n\nI understand you're frustrated, and I truly want to help. For us to move forward efficiently, let's focus on actionable next steps and confirmed facts — not assumptions or frustration.\n\nI'll continue updating you as soon as I have verified information from title and lender.\n\nWe'll get through this — together and professionally.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_deal_falls_apart",
    title: "When a Deal Falls Apart",
    body: `Subject: Update – [Property Address]\n\nHi [Client First Name],\n\nUnfortunately, it looks like the deal for [Property Address] won't be moving forward at this time.\n\nI know this isn't the outcome we hoped for, but we handled every step correctly, and your file remains in full compliance.\n\nIf you'd like, we can discuss re-listing, new opportunities, or strategies for next time once the dust settles. You're not starting from zero — we've learned a lot from this process.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_post_closing_complaints",
    title: "Post-Closing Issues or Complaints",
    body: `Subject: Post-closing concern – [Property Address]\n\nHi [Client First Name],\n\nThank you for reaching out. Once a transaction closes, title and legal ownership transfer to the new buyer, which means any property-related concerns (maintenance, appliances, etc.) fall under post-closing matters.\n\nHowever, I'm happy to help you get in touch with the right party (warranty provider, vendor, or title contact).\n\nLet's get you pointed in the right direction.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_tc_blamed_unfairly",
    title: "When the TC Is Blamed Unfairly",
    body: `Subject: Clarifying TC role and communication flow\n\nHi [Agent or Manager Name],\n\nI wanted to address the concern raised regarding [specific issue]. I've reviewed the file and confirmed that all communication, reminders, and documentation were handled within scope and deadlines.\n\nThe TC role is to facilitate documentation and compliance, not decision-making — but I always make every effort to keep all parties aligned.\n\nPlease let me know if you'd like me to forward the documentation trail for your records.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_setting_expectations_new_agent",
    title: "Setting Expectations with a New Agent Partner",
    body: `Subject: How we'll communicate for smooth closings\n\nHi [Agent Name],\n\nI'm excited to work with you on [Property Address]. Just to make sure things run smoothly from the start, here's how I typically handle files:\n\nI provide weekly updates and milestone check-ins.\nAll official docs should flow through me for compliance tracking.\nI copy you and title on all key correspondence.\n\nThis keeps communication clear and avoids duplicate requests from multiple directions.\n\nLooking forward to a smooth and well-coordinated closing!`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_clarifying_communication_flow",
    title: "Clarifying Who Communicates What",
    body: `Subject: Quick clarification on communication flow\n\nHi [Agent Name],\n\nJust to confirm — I'll continue handling all file updates, document tracking, and compliance items, while you focus on client-facing communication and negotiations.\n\nThat balance keeps everything streamlined and ensures nothing gets missed.\n\nDoes that work for you?`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_client_copying_everyone",
    title: "When the Client Is Copying Everyone",
    body: `Subject: Keeping email threads efficient\n\nHi [Client First Name],\n\nTo make sure nothing gets buried in threads, I'll keep replies limited to the key parties handling your file (agent, title, and lender). That helps avoid delays and duplicate responses.\n\nIf you ever have a direct question, feel free to email me separately — I'll respond quickly and make sure the right people are looped in.\n\nThank you for understanding!`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_wire_fraud_prevention",
    title: "Preventing Wire Fraud Confusion (Preemptive)",
    body: `Subject: Secure communication reminder\n\nHi [Client First Name],\n\nAs we get closer to closing, please remember:\n\nWe'll never email you new or updated wire instructions.\nAlways verify directly with the title company by phone before sending funds.\nIf you ever receive an unexpected message about wiring money — stop and call me first.\n\nWe take your security seriously.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_professional_conduct_reminder",
    title: "Reminding Parties About Professional Conduct",
    body: `Subject: Quick reminder – maintaining professionalism\n\nHi Everyone,\n\nWe're all working toward the same goal — a smooth, on-time closing for [Property Address]. Let's continue keeping communication professional and solutions-oriented as we finalize the last steps.\n\nAppreciate everyone's cooperation and teamwork!`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_vendor_not_following_instructions",
    title: "When a Vendor or Partner Isn't Following Instructions",
    body: `Subject: Alignment on file protocol – [Property Address]\n\nHi [Vendor Name],\n\nJust to keep everything consistent, please make sure all documents and updates for [Property Address] are sent directly to me and [Title Rep] so we can log and distribute them properly.\n\nThis helps ensure accuracy across the file and keeps everyone informed.\n\nAppreciate your help keeping the workflow clean,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_preemptive_delay_alert",
    title: "Preemptive Delay Alert to Prevent Panic",
    body: `Subject: Quick heads-up on minor delay\n\nHi [Client First Name],\n\nJust a quick note — [title/lender/vendor] mentioned there may be a small delay on [specific item], but it shouldn't affect our overall closing timeline.\n\nI wanted to let you know early so it doesn't come as a surprise later.\n\nI'll update you as soon as it clears.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_preemptive_compliance_notice",
    title: "Preemptive Compliance Notice (Soft Enforcement)",
    body: `Subject: Upcoming deadline reminder – [Property Address]\n\nHi [Agent Name],\n\nJust a friendly heads-up that the [inspection/loan/HOA] deadline is coming up on [Date].\n\nI'll follow up after that to confirm completion so we stay compliant for audit.\n\nAppreciate you keeping this one tight!`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_reputation_protection",
    title: "Reputation Protection After an Escalation",
    body: `Subject: Appreciation for teamwork on [Property Address]\n\nHi [Broker/Manager Name],\n\nI wanted to thank everyone for navigating that last file so professionally — even with some bumps, we kept it constructive and on schedule.\n\nI always make a point to document every major step for transparency, and I appreciate your support in ensuring our standards stay consistent across all files.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_client_wants_fire_vendor",
    title: "When the Client Wants to Fire the Lender/Title Mid-File",
    body: `Subject: Changing vendors mid-transaction\n\nHi [Client First Name],\n\nI understand you're considering switching [lenders/title companies].\n\nWhile that's possible, it could restart certain processes (like appraisal or title work), which might delay closing.\n\nIf you'd like, I can outline what the transition would look like and any costs or timing impacts before you decide.\n\nThat way, you can make an informed choice.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_push_back_own_agent",
    title: "When You Have to Push Back on Your Own Agent",
    body: `Subject: Clarifying priorities for [Property Address]\n\nHi [Agent Name],\n\nI completely understand you want this file to move quickly — I do too.\n\nSome steps (like title clearance or lender funding) just can't be expedited without compliance risk.\n\nI'll make sure we move as efficiently as possible within those limits, and I'll update you the moment it's clear to proceed.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_post_closing_praise",
    title: "Post-Closing Praise with a Purpose",
    body: `Subject: Thank you for your professionalism\n\nHi [Agent/Title Rep/Lender],\n\nThank you for being so easy to work with on [Property Address] — truly appreciate your professionalism and communication throughout the process.\n\nPlease feel free to send future files my way — we run a clean, compliant, and stress-free process every time.`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  {
    id: "dc_speed_vs_accuracy",
    title: "Speed vs. Accuracy – Working the File in Order",
    body: `Subject: Working efficiently and accurately – [Property Address]\n\nHi [Agent Name / Team / Client],\n\nI wanted to take a moment to emphasize something that's easy to overlook in the rush to close — speed means nothing without accuracy.\n\nIn real estate, every step builds on the one before it. When things are handled out of order — even with the best intentions — it can create delays, compliance issues, or last-minute surprises that take more time to fix later.\n\nMy goal is always to keep the file moving fast and clean:\nEach milestone completed in sequence.\nDocuments reviewed before submission.\nCommunication logged and confirmed before the next action.\n\nThis is how we stay efficient and protect everyone involved.\n\nI'll continue managing the process in order to avoid rework, missed signatures, or compliance flags that could impact closing.\n\nThank you for trusting the process — I promise it's built to save time, not waste it.\n\nWarm regards,`,
    category: CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
  },
  // Lead Generation & First Contact Templates
  {
    id: "lg_new_buyer_inquiry",
    title: "New Buyer Inquiry Response",
    body: `Subject: Thanks for reaching out — let's find your next home\n\nHi [First Name],\n\nThanks for your message about [property address or neighborhood]. I'd love to help you explore your options and get a sense of what fits your goals best.\n\nAre you available [insert day/time] for a quick call or text chat? I can walk you through next steps and current market trends so we can move efficiently.\n\nTalk soon,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_zillow_realtor_followup",
    title: "Zillow / Realtor.com Inquiry Follow-Up",
    body: `Subject: Let's make sure you get the full details on [property name]\n\nHi [First Name],\n\nI received your inquiry on [platform name] about [address]. That home is [still available / currently pending], but I can share similar listings that match your criteria — often before they hit the market.\n\nWould you like me to send a few options?\nJust share your price range and preferred areas.\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_still_looking_check",
    title: "Are You Still Looking?",
    body: `Subject: Still house-hunting or taking a break?\n\nHey [First Name],\n\nJust checking in — are you still on the hunt, or have your plans shifted a bit?\n\nIf you're still exploring, I can send a quick market update with new listings that match what you were looking for.\n\nIf not, no pressure — I just want to make sure I'm respecting your inbox (and your time).\n\nWarmly,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_open_house_followup",
    title: "Open House Follow-Up",
    body: `Subject: Thanks for stopping by [property address]\n\nHi [First Name],\n\nIt was great meeting you at the open house this weekend. What did you think of the space?\n\nIf you're comparing a few homes, I can share a quick side-by-side analysis of this one vs. similar listings — it really helps clarify options before you write an offer.\n\nWould you like me to send that over?\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_buyer_qualification_prep",
    title: "Buyer Qualification Prep",
    body: `Subject: Let's get your search ready to go\n\nHi [First Name],\n\nBefore we start scheduling showings, I like to make sure my buyers are fully prepared — it saves time and gives you a stronger position when making an offer.\n\nHave you already been pre-approved with a lender? If not, I can connect you with one of my trusted contacts who works quickly and keeps deals smooth.\n\nOnce we have that, we can hit the ground running.\n\nTalk soon,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_new_seller_lead",
    title: "New Seller Lead Response",
    body: `Subject: Ready to talk about your home's value?\n\nHi [First Name],\n\nThanks for reaching out about selling your home at [address]. I'd love to schedule a quick consultation to discuss pricing, marketing strategy, and timing.\n\nI'll run a full market analysis so you can see exactly where your property stands — no pressure, just clarity.\n\nWould [insert day/time] work for a quick call or Zoom?\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_website_lead_welcome",
    title: "Website Lead Welcome",
    body: `Subject: Welcome — let's make your home search easier\n\nHi [First Name],\n\nThanks for registering on my website! I'll make sure your listing alerts are personalized — no spam, just properties that actually fit your criteria.\n\nWould you like to focus on [area] or explore [secondary area]? That'll help me fine-tune your matches.\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_before_showing_confirmation",
    title: "Before We Schedule Your Showing...",
    body: `Subject: Quick note before we confirm your showing\n\nHi [First Name],\n\nBefore we schedule your showing for [property address], I just want to confirm your financing plan — are you paying cash or using a lender?\n\nSome properties require pre-approval proof to confirm appointments. I just want to make sure we're ready to move quickly if you love it.\n\nAppreciate it!`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_cold_lead_reconnect",
    title: "Cold Lead Reconnect",
    body: `Subject: Wanted to check in before I archive your file (kidding… sort of)\n\nHi [First Name],\n\nI realized we haven't talked in a while — I wanted to check in before I assume you've found your dream home without me. 😉\n\nIf you're still in the market, I'd love to help. Things have changed a lot recently — new inventory, new programs, and better deals in some neighborhoods.\n\nShould I send you a quick update?\n\nCheers,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_home_value_inquiry",
    title: "Home Value Inquiry Response",
    body: `Subject: Your home value report is ready\n\nHi [First Name],\n\nI pulled a quick analysis of your property at [address]. Based on current comps, your estimated value is in the range of [$X–$Y].\n\nI'd love to set up a quick strategy call to review what affects your price (condition, upgrades, and timing).\n\nWould [insert day/time] work?\n\nWarm regards,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_quick_chat_request",
    title: "Quick 5-Minute Chat?",
    body: `Subject: Let's make your search simple\n\nHey [First Name],\n\nInstead of endless back-and-forth emails, how about a quick five-minute chat? I can save you hours of scrolling through listings that don't fit your goals.\n\nWhat's better — a quick call today or tomorrow?\n\nCheers,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_just_listed_area",
    title: "Just Listed in Your Area",
    body: `Subject: New listings just hit [neighborhood]\n\nHi [First Name],\n\nThree new properties just hit the market in [area] that might interest you — all under [price point].\n\nWould you like me to send the details or set up a preview?\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_browsing_notice",
    title: "I Noticed You Were Browsing...",
    body: `Subject: Want to see [property address] in person?\n\nHi [First Name],\n\nI saw you were checking out homes in [neighborhood] recently — one of them just dropped in price by [amount].\n\nIf you'd like, I can schedule a showing this week before it's gone.\n\nLet me know what works best for you.\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_market_update",
    title: "Quick Market Update (Lead Nurture)",
    body: `Subject: The latest scoop on [local market name]\n\nHi [First Name],\n\nHere's a quick market snapshot for [month]:\n📈 Average sale price: $___\n🏡 Average days on market: ___\n💰 Inventory trend: [up/down]\n\nIf you'd like a custom breakdown for your area or budget, I can send that over in minutes.\n\nTalk soon,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_before_searching",
    title: "Before You Start Searching...",
    body: `Subject: Save time (and heartbreak) before you start searching\n\nHi [First Name],\n\nBefore diving into listings, let's narrow your must-haves vs. nice-to-haves — it makes finding "the one" faster and stress-free.\n\nI have a quick checklist I use with my clients — want me to send it over?\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_when_ready",
    title: "When You're Ready, I'm Here",
    body: `Subject: No rush — just here when you're ready\n\nHi [First Name],\n\nIf now's not the right time, that's completely fine. I'll be here when it is.\n\nIn the meantime, I can send quarterly market updates so you stay informed — would that be helpful?\n\nWarm regards,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_we_missed_you",
    title: "We Missed You Follow-Up",
    body: `Subject: Did we lose you to Zillow again? 😉\n\nHi [First Name],\n\nWe noticed you haven't opened your recent property alerts — wanted to make sure you're still interested in [area] or if your plans changed.\n\nIf you're just browsing casually, no problem — I can adjust your alerts so you only see the good stuff.\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_before_sell_prelisting",
    title: "Before You Sell Pre-Listing Lead",
    body: `Subject: Thinking about selling soon? Here's what to know first\n\nHi [First Name],\n\nIf you're planning to list your home in the next 3–6 months, timing and prep make all the difference.\n\nI can send you my quick "Pre-Listing Checklist" — a simple guide to maximize value before you even call a photographer.\n\nWant me to send it?\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_agent_introduction",
    title: "Agent Introduction",
    body: `Subject: Let's make this easy — I'm your contact from here\n\nHi [First Name],\n\nI'll be your main point of contact moving forward — I handle everything from scheduling showings to guiding you through closing.\n\nFeel free to text or email me directly anytime — my goal is to make this process smooth, transparent, and stress-free.\n\nBest,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  {
    id: "lg_thank_you_reaching_out",
    title: "Thank You for Reaching Out",
    body: `Subject: Thank you for reaching out — let's make it happen\n\nHi [First Name],\n\nJust wanted to say thanks for reaching out — I'm looking forward to helping you achieve your next move.\n\nI'll send over a quick intro package and a few questions to get started.\n\nTalk soon,`,
    category: CONTRACT_STAGES.LEAD_GENERATION,
  },
  // Buyer Communication Templates
  {
    id: "bc_showing_confirmation",
    title: "Showing Confirmation",
    body: `Subject: Your showing for [Property Address] is confirmed\n\nHi [First Name],\n\nWe're confirmed for [property address] on [date/time]. Please plan to arrive a few minutes early so we can start on time.\n\nIf you'd like, I can send a quick list of questions to help you evaluate the property during the tour — it's a great way to stay objective while you're excited.\n\nSee you soon,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_showing_feedback_request",
    title: "Showing Feedback Request",
    body: `Subject: Thoughts on the homes we toured?\n\nHi [First Name],\n\nI wanted to check in and hear your thoughts on the homes we toured. What stood out, and what didn't feel like a fit?\n\nYour feedback helps me narrow the search so we only see properties that check every box.\n\nTalk soon,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_offer_prep_checklist",
    title: "Offer Prep Checklist",
    body: `Subject: Before we write your offer — quick checklist\n\nHi [First Name],\n\nHere's what I'll need before drafting your offer on [property address]:\nPre-approval letter (updated)\nProof of funds for your deposit\nPreferred closing date\nAny contingencies or special requests\n\nOnce I have those, we can write and submit within the hour.\n\nBest,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_offer_submitted",
    title: "Offer Submitted",
    body: `Subject: Offer submitted — here's what happens next\n\nHi [First Name],\n\nYour offer on [property address] has been submitted to the listing agent.\n\nTypical response time is 24–48 hours. I'll update you as soon as I hear back. In the meantime, keep an eye on your email in case any counter offers or requests come through.\n\nFingers crossed 🤞,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_offer_accepted",
    title: "Offer Accepted",
    body: `Subject: Offer accepted — congratulations! 🎉\n\nHi [First Name],\n\nCongratulations — your offer on [property address] has been accepted!\n\nNext steps:\n1. Deposit due by [date].\n2. Schedule inspection within [#] days.\n3. I'll coordinate with title/lender to keep timelines on track.\n\nI'll send a full summary of key dates and next steps shortly.\n\nLet's celebrate soon!`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_offer_not_accepted",
    title: "Offer Not Accepted",
    body: `Subject: Update on your offer for [property address]\n\nHi [First Name],\n\nWe just heard back — the seller accepted another offer.\n\nIt's always tough to hear, but we'll regroup and find the right one. The good news: your paperwork and pre-approval are ready to go, so we can act quickly on the next opportunity.\n\nI'm already watching a few similar homes I think you'll love.\n\nBest,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_under_contract_overview",
    title: "Under Contract Overview",
    body: `Subject: You're under contract — here are the next steps\n\nHi [First Name],\n\nCongratulations — your offer on [Property Address] is officially executed! 🎉\n\nNow that we're under contract, I want to outline what happens next and how we'll keep everything on schedule.\n\nThis part of the process is all about deadlines and clear communication. Every date in the contract matters — so is important all steps are completed in a timely manner.\n\nHere's a quick overview of your next steps:\n1. Effective Date –[date].\n2. Deposit – [date].\n3. Loan Application Deadline – [date]\n4. Inspection Period – [date].\n5. Appraisal / Loan Approval – [date]\n6. Closing Date – [date].\n\nI'll be your main point of contact throughout the transaction. My job is to make sure communication flows where it needs to go — that means I'll coordinate with title, lender, and the listing agent on your behalf and step in the moment something needs your attention.\n\nTo make this process seamless, please:\nRespond quickly to emails or document requests from me, title, and your lender.\nAvoid scheduling travel or big commitments during inspection or closing week.\nLet me know immediately if your availability changes — timelines move fast.\n\nYou've got a strong team on your side, and I'll make sure every moving part stays aligned from now until the keys are in your hand.\n\nWelcome to the next stage — we've got this.`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_inspection_reminder",
    title: "Inspection Reminder",
    body: `Subject: Your home inspection is scheduled for [date/time]\n\nHi [First Name],\n\nYour inspection for [property address] is confirmed for [date/time].\n\nYou're welcome to attend — it's a great chance to ask questions and learn about your new home.\n\nOnce the report is in, I'll review it with you and help draft any repair or credit requests if needed.\n\nTalk soon,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_inspection_report_review",
    title: "Inspection Report Review",
    body: `Subject: Inspection results + next steps\n\nHi [First Name],\n\nThe inspection report is in — Please take some time to read through it carefully and note any questions or concerns you may have.\n\nAs your agent, I can help guide the next steps in terms of communicating with the seller, but I'm not qualified to interpret or evaluate the findings. If there are items you'd like further clarity on, I recommend reaching out directly to the inspector for additional details or professional recommendations.\n\nOnce you've reviewed the report, please let me know if there are specific items you'd like us to address with the seller — such as repair requests or credits — so I can prepare the appropriate addendum for your consideration.\n\nWe'll need to stay mindful of your inspection period deadline, which ends on [Date], to ensure we have time to negotiate any requests before it expires.\n\nLooking forward to your feedback,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_appraisal_ordered",
    title: "Appraisal Ordered",
    body: `Subject: Appraisal ordered for [property address]\n\nHi [First Name],\n\nYour lender has ordered the appraisal. This typically takes 5–7 days for scheduling and results.\n\nOnce it's completed, I'll share the report and confirm it meets or exceeds your purchase price.\n\nNo action needed for now — just a heads-up we're on schedule.\n\nBest,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_appraisal_good_news",
    title: "Appraisal Result – Good News",
    body: `Subject: Appraisal in! 🎉\n\nHi [First Name],\n\nGreat news — your appraisal came in at or above value. No further negotiations are needed.\n\nWe're one big step closer to closing! Next up: loan approval and final underwriting.\n\nTalk soon,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_appraisal_shortfall",
    title: "Appraisal Shortfall",
    body: `Subject: Appraisal came in low — here's what we can do\n\nHi [First Name],\n\nThe appraisal for [property address] came in at [$amount], slightly below the contract price.\n\nPer the contract terms, have a few options:\n1. Negotiate a price reduction.\n2. Discuss a release and cancellation.\n3. Bridge the difference with cash.\n\nI'll guide you through what makes the most sense based on your comfort level and loan type.\n\nWe'll navigate this smoothly — I've got you.`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_loan_approval_update",
    title: "Loan Approval Update",
    body: `Subject: Loan approval is in — we're clear to move forward\n\nHi [First Name],\n\nGreat news — your lender has issued the loan approval for [Property Address]!\n\nThe next step is for us to deliver notice of loan approval to the listing agent. This is an important milestone because once that notice is sent, it officially satisfies your financing contingency — meaning we've met the loan requirement outlined in your contract.\n\nPlease reply to confirm that I can deliver this notice on your behalf. Once I have your approval, I'll notify the listing side right away so we stay in compliance with the contract timeline.\n\nFrom here, we'll focus on final underwriting, preparing for closing, and making sure all final documents and wire instructions are in order.\n\nLet me know once you've confirmed,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_loan_delay_update",
    title: "Loan Delay or Update",
    body: `Subject: Quick update on loan progress\n\nHi [First Name],\n\nI spoke with your lender today — they're waiting on [document/item].\n\nNo need to worry, but please send it as soon as possible to avoid delays. Once received, we'll move right back on track.\n\nI'll keep you posted on every update.\n\nThanks for staying on top of it,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_clear_to_close",
    title: "Clear to Close",
    body: `Subject: 🎉 Clear to Close on [Property Address]!\n\nHi [First Name],\n\nWe're officially Clear to Close!\n\nYour closing date is [date], and I'll confirm final time and location soon.\n\nTitle will send wire instructions directly — always verify by phone before sending funds.\n\nAlmost there!`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_final_walkthrough_reminder",
    title: "Final Walkthrough Reminder",
    body: `Subject: Final walkthrough details for [property address]\n\nHi [First Name],\n\nYour final walkthrough is set for [date/time]. Bring your inspection list and check that agreed repairs were completed.\n\nI'll meet you there and bring a copy of the walkthrough form for signatures.\n\nSee you soon,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_closing_day_email",
    title: "Closing Day Email",
    body: `Subject: It's closing day! 🥂\n\nHi [First Name],\n\nHappy closing day! You did it.\n\nToday you'll sign your documents at [location/time]. Please be sure to follow the closing agent's instructions on what items to have avialable at the time of signing.\n\nAfter funding, I'll coordinate key handoff and final confirmations.\n\nCongratulations on your new home — you earned this!`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_key_delivery_possession",
    title: "Key Delivery / Possession",
    body: `Subject: Keys to your new home 🏡\n\nHi [First Name],\n\nWelcome home! Here are your next steps:\nKeys are ready for pickup at [location/time].\nUtility transfer confirmation attached.\nHOA contact info below.\n\nWishing you a smooth move and many happy memories ahead!\n\nWarm regards,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_after_closing_followup",
    title: "After Closing Follow-Up",
    body: `Subject: Checking in — how's the new place?\n\nHi [First Name],\n\nJust wanted to check in after closing — how's everything settling in?\n\nIf you need contractor recommendations or help with anything post-closing, I'm always happy to share my trusted vendors.\n\nCongrats again!`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  {
    id: "bc_closing_day_email_detailed",
    title: "CLOSING DAY EMAIL",
    body: `Subject: Congratulations — it's officially closing day! 🎉\n\nHi [First Name],\n\nCongratulations — today's the big day! Your purchase of [Property Address] is officially closing, and I wanted to take a moment to say thank you for allowing us to assist you throughout this process.\n\nIt truly takes a village to close a real estate transaction — from your lender and title team to the inspectors and coordinators who keep everything moving behind the scenes.\n\nWe take great pride in what we do, and it's been an honor to help you reach this milestone.\n\nAttached you'll find:\nClosing Statement (Settlement Statement): itemized record of all funds.\nRecorded Deed: official proof of ownership transfer.\n\nPlease review and keep these documents for your records.\n\nNow that closing is complete, here are a few important next steps to make your new home officially yours:\n1. Connect or transfer utilities to your name (electric, water, gas, internet).\n2. Change the locks and access codes for your security and peace of mind.\n3. File for Homestead Exemption if this is your primary residence (check your county's website for deadlines).\n4. Save your documents — your settlement statement and deed will be useful for taxes and insurance.\n\nThank you again for trusting us to guide you through your purchase — it's been a pleasure working with you. Wishing you many happy memories in your new home!\n\nWarm regards,`,
    category: CONTRACT_STAGES.BUYER_COMMUNICATION,
  },
  // Seller Communication Templates
  {
    id: "sc_listing_launch",
    title: "Listing Launch Announcement",
    body: `Subject: Your listing is live — here's what happens next\n\nHi [First Name],\n\nYour home at [Address] is officially live on the MLS! It's now syndicated to all major sites including Zillow, Realtor.com, and Redfin.\n\nIn the next 24–48 hours, you'll see activity start to build — showings, calls, and online inquiries. I'll keep you updated on feedback and interest levels.\n\nPlease keep the property showing-ready at all times; we'll schedule with as much notice as possible.\n\nExcited to see momentum build!`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_showing_schedule_confirmation",
    title: "Showing Schedule Confirmation",
    body: `Subject: Upcoming showings for [Property Address]\n\nHi [First Name],\n\nHere's the showing schedule for the next few days:\n[Date/Time] – [Agent Name / Brokerage]\n[Date/Time] – [Agent Name / Brokerage]\n\nI'll confirm once each showing has taken place and share any feedback as soon as it's received.\n\nThanks for helping us keep the home presentable and flexible for showings — it truly makes a difference.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_showing_feedback_summary",
    title: "Showing Feedback Summary",
    body: `Subject: Feedback from recent showings\n\nHi [First Name],\n\nHere's a quick summary of feedback from this week's showings:\n"Great layout, buyers considering another property."\n"Loved the kitchen, thought price might be a little high."\n"Nice condition, not ideal location."\n\nOverall, interest is solid — we're seeing consistent traffic. I'll continue tracking buyer reactions closely and suggest adjustments if the trend shifts.\n\nBest,`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_offer_received",
    title: "Offer Received",
    body: `Subject: Offer received on your property — summary below\n\nHi [First Name],\n\nWe've received an offer on your home! Here's a quick overview:\nPrice: $___\nClosing Date: ___\nDeposit: ___\nFinancing: ___\nContingencies: ___\n\nI've attached the full offer and my summary sheet for your review. Let's schedule a time today to go over terms and decide how to respond.\n\nTalk soon,`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_counter_offer_sent",
    title: "Counter Offer Sent",
    body: `Subject: Counter offer sent — awaiting buyer response\n\nHi [First Name],\n\nYour counter offer was sent to the buyer's agent. Typical response time is within 24 hours, though it can vary depending on buyer availability.\n\nAs soon as we receive a reply, I'll update you immediately.\n\nIn the meantime, keep the property available for showings in case new interest arises.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_multiple_offers",
    title: "Multiple Offers Received",
    body: `Subject: We've received multiple offers — next steps\n\nHi [First Name],\n\nWe now have multiple offers on your property — great position to be in!\n\nI'll prepare a side-by-side comparison outlining price, contingencies, financing, and timing so you can make a clear decision.\n\nOnce you've reviewed, we'll discuss strategy — whether to call for "highest and best" or negotiate directly with the strongest offer.\n\nTalk soon,`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_offer_accepted_under_contract",
    title: "Offer Accepted – Under Contract",
    body: `Subject: Offer accepted — congratulations, we're under contract!\n\nHi [First Name],\n\nCongratulations! We're officially under contract on [Property Address].\n\nI'll send a summary of key dates shortly — inspection, appraisal, and closing — so you know exactly what to expect.\n\nWe'll keep everything organized and on schedule. I'll also stay in touch with the buyer's agent, title company, and lender to make sure all communication flows where it needs to go.\n\nWell done — we're one step closer to closing day!`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_inspection_scheduled",
    title: "Inspection Scheduled",
    body: `Subject: Buyer inspection scheduled for [Date/Time]\n\nHi [First Name],\n\nThe buyer's home inspection is scheduled for [date/time]. They'll be accompanied by their inspector and buyer's agent.\n\nYou don't need to attend, but please ensure the property is accessible and systems (A/C, electric, water) are on.\n\nI'll follow up once the inspection is complete and share any feedback or requests that come through.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_repair_request_received",
    title: "Repair Request Received",
    body: `Subject: Buyer has submitted repair or credit requests\n\nHi [First Name],\n\nThe buyer has submitted their inspection-related requests. I've attached a summary for review.\n\nPlease look them over and let me know how you'd like to proceed — we can respond with repairs, credits, or deny their requests.\n\nOnce you decide, I'll prepare the formal response via email.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_appraisal_ordered",
    title: "Appraisal Ordered",
    body: `Subject: Appraisal scheduled for [Date]\n\nHi [First Name],\n\nThe buyer's lender has ordered the appraisal. The appraiser will contact us or the showing service to confirm access.\n\nThis step verifies value for the lender and usually takes about a week for results. I'll notify you as soon as the report is in.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_appraisal_at_value",
    title: "Appraisal Completed – At Value",
    body: `Subject: Appraisal complete — property valued at contract price\n\nHi [First Name],\n\nGood news — the appraisal came in at value, so we're clear to move forward with no adjustments.\n\nNext milestones are final loan approval and scheduling closing.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_appraisal_shortfall",
    title: "Appraisal Shortfall",
    body: `Subject: Appraisal came in below contract price — here's what it means\n\nHi [First Name],\n\nThe appraisal came in slightly below the contract price at [$amount].\n\nWe'll wait for the buyer's agent to send a formal request or proposal for how they'd like to address it — price adjustment, cancellation, or cash difference.\n\nI'll advise as soon as I have their response so we can decide the best next step.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_loan_approval_notice",
    title: "Loan Approval Notice Delivered",
    body: `Subject: Buyer's loan approved — contingency satisfied\n\nHi [First Name],\n\nThe buyer's lender has issued full loan approval, and we've received formal notice of approval from the buyer's agent.\n\nThis satisfies the financing contingency in the contract — a major milestone toward closing.\n\nWe'll now focus on final preparations, walkthrough scheduling, and confirming the closing details.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_clear_to_close",
    title: "Clear to Close",
    body: `Subject: We're clear to close!\n\nHi [First Name],\n\nGreat news — the buyer's loan is officially Clear to Close! 🎉\n\nAt this stage, your title company or closing attorney will coordinate the signing on the seller side. They'll reach out directly to confirm the date, time, and method of signing (in person or remote).\n\nOnce your documents are signed and the buyer's funds have been received, the transaction will close and fund — that's when proceeds are released to you, typically the same or next business day depending on your bank.\n\nNext step: title will send closing instructions and settlement statements for review. Once you've looked them over, confirm that all figures align with your expectations.\n\nWe're almost there!`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_final_walkthrough_notice",
    title: "Final Walkthrough Notice",
    body: `Subject: Buyer walkthrough scheduled for [Date/Time]\n\nHi [First Name],\n\nThe buyer's final walkthrough is set for [date/time]. This is the buyer's opportunity to verify the property's condition before closing.\n\nPlease make sure the home is clean, utilities are on, and all agreed repairs (if any) are complete.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_closing_day_instructions",
    title: "Closing Day Instructions",
    body: `Subject: It's closing day! 🎉\n\nHi [Seller First Name],\n\nToday's the day! Thank you again for allowing us to assist with the sale of [Property Address].\n\nHere's what to expect today:\n1. Signing: Your documents will be signed either in-office or via mobile notary.\n2. Funding: Once the buyer's funds clear and the deed records, proceeds will be released (usually same or next business day).\n3. Next Steps: Cancel utilities, forward mail, and retain your closing statement for taxes.\n\nAttached:\nFinal Settlement Statement\nRecorded Deed (once available)\n\nWe're proud to have guided you through this transaction — congratulations on a successful closing!\n\nWarm regards,`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_closing_confirmation",
    title: "Closing Confirmation",
    body: `Subject: Closing confirmed — congratulations!\n\nHi [First Name],\n\nClosing has been completed successfully! The deed has been recorded, and your proceeds have been released or are in process.\n\nThank you again for the opportunity to represent you — it's been a pleasure working together.`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_post_closing_followup",
    title: "Post-Closing Follow-Up",
    body: `Subject: Congratulations again — how was your experience?\n\nHi [First Name],\n\nNow that everything's finalized, I just wanted to thank you again and make sure everything went smoothly at closing.\n\nIf you're comfortable sharing, I'd love your feedback or a quick review — it helps us continue improving and supporting future clients.\n\nGratefully,`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_still_here_for_you",
    title: "We're Still Here for You",
    body: `Subject: Here if you ever need us\n\nHi [First Name],\n\nJust a quick note — even though your sale is complete, we're still here if you need anything in the future: referrals, market updates, or help with your next move.\n\nStay in touch anytime!`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  {
    id: "sc_anniversary_message",
    title: "Anniversary Message",
    body: `Subject: One year since your closing — congratulations again!\n\nHi [First Name],\n\nCan you believe it's been a year since you closed on [Property Address]?\n\nI hope everything's been great since then. If you ever want an updated market analysis or are considering another move, I'd be happy to help.\n\nWishing you continued success!`,
    category: CONTRACT_STAGES.SELLER_COMMUNICATION,
  },
  // Transaction Coordination Templates
  {
    id: "tc_intro_title_company",
    title: "INTRODUCTION TO TITLE COMPANY (Buyer Side)",
    body: `Subject: Introduction – Title Company for [Property Address]\n\nHi [First Name],\n\nI'd like to introduce you to [Title Rep Name] with [Title Company Name], who will be handling the title and closing process for your purchase of [Property Address].\n\n[Title Rep First Name] and their team will coordinate:\nTitle searches and insurance\nEscrow and earnest money deposits\nSettlement statement and closing documents\nRecording of the deed and ownership transfer\n\nThey'll reach out soon to confirm receipt of your escrow deposit and request any documents they may need along the way.\n\nPlease make sure to:\nSave their contact information for all wire or escrow correspondence.\nAlways verify any wire instructions directly by phone before sending funds.\n\nI'll stay looped in on all communication to ensure everything stays organized and on track through closing.\n\n[Title Rep First Name] — meet [Buyer First Name], our buyer on [Property Address].\n\nWe're excited to work with you all the way to closing!\n\nWarm regards,`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_intro_lender",
    title: "INTRODUCTION TO LENDER (from Transaction Coordinator)",
    body: `Subject: Introduction – Transaction Coordination for [Property Address]\n\nHi [Lender First Name],\n\nMy name is [Your Name], and I'll be the transaction coordinator assisting [Buyer's Agent Name] and our buyer, [Buyer Name], on the purchase of [Property Address].\n\nI'll be your main point of contact for all contract-related documentation, timelines, and coordination between the buyer's side, title, and the listing agent.\n\nTo keep everything running smoothly, I'll:\nTrack and confirm all contract milestones (deposit, inspection, loan commitment, closing).\nEnsure that all lender documents are shared promptly with title and the appropriate parties.\nKeep everyone updated on key dates to help us stay compliant with the contract.\n\nAttached for your records:\nExecuted Contract\nBuyer Contact Information\nTitle Company Details\n\nPlease feel free to loop me in on any communication regarding the file. My goal is to make the process as efficient and transparent as possible for all parties.\n\nThank you in advance for your partnership — I look forward to working with you to ensure a smooth closing.\n\nWarm regards,`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_intro_listing_agent",
    title: "INTRO EMAIL – TC → LISTING AGENT (Buyer-Side Transaction)",
    body: `Subject: Introduction – Transaction Coordination for [Property Address]\n\nHi [Listing Agent First Name],\n\nMy name is [Your Name], and I'll be the Transaction Coordinator assisting [Buyer's Agent Name] and our buyer, [Buyer Name], for the purchase of [Property Address].\n\nI'll be your main point of contact for all contract-related documentation, timeline tracking, and coordination between our side, title, and the lender. My goal is to make sure communication stays organized and we meet every critical deadline smoothly.\n\nAttached for your records:\nExecuted Contract\nBuyer Contact Information\nTitle Company Details\n\nPlease confirm the effective date for this contract as [Date] so I can ensure all key deadlines are calculated correctly.\n\nOnce confirmed, I'll circulate a timeline summary to all parties for consistency.\n\nLooking forward to working together for a smooth closing.\n\nBest regards,`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_intro_seller_agent",
    title: "INTRO EMAIL – TC → SELLER'S AGENT (Listing-Side Transaction)",
    body: `Subject: Introduction – Transaction Coordination for [Property Address]\n\nHi [Buyer's Agent First Name],\n\nMy name is [Your Name], and I'll be the Transaction Coordinator assisting [Listing Agent Name] and our seller, [Seller Name], for the sale of [Property Address].\n\nI'll be your main point of contact for all documentation, contract milestones, and communication between our side, title, and the buyer's lender. My role is to keep everything moving efficiently and ensure compliance with all contractual deadlines.\n\nTo get started, could you please confirm the effective date for the executed contract? Once confirmed, I'll distribute the timeline to all parties for reference.\n\nIf available, please also send:\nEscrow Deposit Confirmation Letter\nAssociation Application (if applicable)\nBuyer's Contact Information\nLender Details\n\nI've attached a copy of the executed contract and title company contact for your convenience.\n\nThank you — looking forward to working together for a seamless closing.\n\nWarm regards,`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_timeline_confirmation",
    title: "TIMELINE CONFIRMATION EMAIL",
    body: `Subject: Contract Timeline Confirmation – [Property Address]\n\nHi Everyone,\n\nThank you for confirming the effective date of [Effective Date] for the contract on [Property Address].\n\nBelow is the summary of all key contract dates based on that effective date. Please review and confirm that everything aligns with your records:\n\nMilestone Due Date Notes\nEffective Date [Date] The date the contract was executed\nInitial Deposit [Date] Payable to [Title Company Name]\nLoan Application [Date] Completed by the lender\nInspection Deadline [Date] All reports must be submitted in writing before this date\nSecond Deposit [Date] Payable to [Title Company Name]\nAppraisal Deadline [Date] Ordered by lender once inspections are complete\nLoan Approval Deadline [Date] Buyer's lender to issue loan approval notice\nTitle Evidence Deadline [Date] Completed by [Title Company Name]\nClosing Date [Date] Scheduled at [Title Company Name / Location]\n\nI've attached a copy of the executed contract for easy reference.\n\nIf there are any discrepancies or changes, please reply so we can make adjustments now — it's much easier to correct early than to chase later.\n\nFrom this point forward, I'll monitor these deadlines closely and send reminders as each milestone approaches to help keep the transaction on track.\n\nThank you all — looking forward to a smooth and well-coordinated closing!\n\nWarm regards,`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_contract_received",
    title: "Contract Received – Next Steps",
    body: `Subject: Contract received — here's what happens next\n\nHi [First Name],\n\nWe've received the fully executed contract for [Property Address] — congratulations!\n\nHere's what happens next:\n1. Deposit is due by [date] to [title company].\n2. Inspection period runs through [date].\n3. Appraisal will be ordered once inspections are complete.\n4. Closing is scheduled for [date].\n\nI'll keep you updated on every milestone to make sure we meet all deadlines.\n\nPlease keep an eye on your email — timing is everything in this stage.\n\nBest,`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_deposit_reminder",
    title: "Deposit Reminder",
    body: `Subject: Reminder — escrow deposit due by [Date]\n\nHi [First Name],\n\nJust a quick reminder that your escrow deposit for [Property Address] is due by [Date] to [Title Company Name].\n\nWires are typically same-day, but it's best to initiate early to avoid delays. Once completed, please forward the confirmation or wire receipt so we can document the file.\n\nThank you for staying on top of this — it keeps us compliant and moving smoothly.`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_hoa_application_instructions",
    title: "HOA / CONDO APPLICATION INSTRUCTIONS",
    body: `Subject: Next step — complete and submit your association application\n\nHi [First Name],\n\nNow that we're under contract on [Property Address], the next step is to submit your association application to [Association Name] for approval.\n\nPlease review the attached application instructions and follow them carefully — each association has its own process, fees, and required documents.\n\nI've also attached a copy of your executed contract, which the association may request as part of the application package.\n\nTo stay on schedule, please make sure the application is submitted as soon as possible, since association approval is often required before closing can proceed.\n\nOnce you've submitted, send me or the title company a quick confirmation email so we can document it in your file.\n\nWe're making great progress — thank you for staying on top of these important details.\n\nBest regards,`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_escrow_deposit_confirmation",
    title: "Escrow Deposit Confirmation",
    body: `Subject: Escrow deposit received and confirmed\n\nHi [First Name],\n\nGood news — the escrow/title company has confirmed receipt of your deposit for [Property Address].\n\nThat officially satisfies the deposit requirement in your contract. Our next milestone will be the home inspection, which must be completed by [Date].\n\nWe're off to a strong start!`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  {
    id: "tc_hoa_application_sent",
    title: "HOA / Condo Application Sent",
    body: `Subject: HOA/Condo application submitted for [Property Address]\n\nHi [First Name],\n\nYour completed application has been submitted to the [Association Name] for approval.\n\nMost associations require up to [X] business days for processing. Once approval is issued, they'll send written confirmation to the title company.\n\nNo further action is needed for now — I'll update you the moment we receive their response.`,
    category: CONTRACT_STAGES.TRANSACTION_COORDINATION,
  },
  // Repairs, Negotiations & Extensions Templates
  {
    id: "rn_inspection_results_buyer",
    title: "Inspection Results – Buyer Review",
    body: `Subject: Inspection report received — please review and share feedback\n\nHi [Buyer First Name],\n\nAttached is your inspection report for [Property Address].\n\nPlease review it carefully and let us know if you have any questions or concerns.\n\nAs a reminder, your agent cannot interpret or make representations regarding the report's findings — however, we can help coordinate next steps if you'd like to request repairs or credits.\n\nYour inspection period ends on [Date], so please share any requests before then to remain in compliance with the contract.\n\nBest regards,`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_buyer_repair_request",
    title: "Buyer Repair Request Submitted",
    body: `Subject: Buyer repair/credit request sent – [Property Address]\n\nHi [Listing Agent First Name],\n\nPlease find attached the buyer's repair and/or credit request for [Property Address], submitted within the inspection period.\n\nLet me know when you've had a chance to review with your seller, and we'll coordinate next steps or counter proposals promptly to stay within our contingency timeline.\n\nBest,`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_seller_response_repair",
    title: "Seller Response to Repair Request",
    body: `Subject: Seller's response to buyer's request – [Property Address]\n\nHi [Buyer Agent First Name],\n\nAttached is the seller's written response to the buyer's repair/credit request.\n\nPlease review with your buyer and let us know how they wish to proceed.\n\nOnce both sides are in agreement, we'll prepare the appropriate addendum for signatures.\n\nThank you for the teamwork,`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_addendum_executed",
    title: "Addendum Fully Executed",
    body: `Subject: Addendum fully executed – [Property Address]\n\nHi Everyone,\n\nThe attached addendum has been fully executed and incorporated into the contract for [Property Address].\n\nThe updated terms are now part of the agreement and have been shared with title and lender for their records.\n\nPlease confirm receipt on your end.`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_appraisal_below_price",
    title: "Appraisal Below Contract Price",
    body: `Subject: Appraisal came in low – next steps\n\nHi [Buyer First Name],\n\nThe appraisal for [Property Address] came in below the contract price at [$Appraised Value].\n\nYour options may include:\n1. Renegotiating the price with the seller.\n2. Paying the difference in cash (subject to lender approval).\n3. Cancelling under the appraisal contingency (if applicable).\n\nPlease review with your agent and lender to determine the best approach. Once you decide, we'll prepare and deliver the necessary documentation.\n\nWe'll continue to track the loan and contingency timelines while this is addressed.`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_price_reduction_addendum",
    title: "Price Reduction Addendum Sent",
    body: `Subject: Price reduction addendum sent for signature\n\nHi [Client First Name],\n\nAttached is the price reduction addendum reflecting the agreed changes to your contract on [Property Address].\n\nPlease review and sign at your earliest convenience so we can circulate to all parties and update the lender and title.\n\nOnce fully executed, I'll confirm receipt and update all timelines if needed.`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_extension_request_buyer",
    title: "Extension Request – Buyer Side",
    body: `Subject: Request to extend [contingency or closing] deadline\n\nHi [Listing Agent First Name],\n\nWe're requesting an extension of the [specific deadline — loan commitment / closing / inspection period] to [new date] for [Property Address].\n\nThe lender/title team is working diligently, and this brief extension will allow us to finalize the remaining items without impacting the closing outcome.\n\nPlease let me know if your seller is amenable so I can prepare the addendum for signatures right away.`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_extension_request_seller",
    title: "Extension Request – Seller Side",
    body: `Subject: Seller requests extension of [specific deadline]\n\nHi [Buyer Agent First Name],\n\nOur seller is requesting an extension of the [specific deadline — closing / repair completion / association approval] to [new date].\n\nThis brief extension will ensure all required items are completed properly and avoid any delays at closing.\n\nPlease confirm if your buyer agrees so we can prepare the appropriate addendum for execution.`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_fully_executed_extension",
    title: "Fully Executed Extension",
    body: `Subject: Extension addendum executed – [Property Address]\n\nHi Everyone,\n\nThe extension addendum for [Property Address] has been fully executed and incorporated into the contract.\n\nThe new [contingency or closing] date is [new date]. I've notified title and lender accordingly.\n\nPlease confirm receipt and note the updated timeline in your file.`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  {
    id: "rn_repair_completion_confirmation",
    title: "Repair Completion Confirmation",
    body: `Subject: Repairs completed – confirmation attached\n\nHi [Buyer First Name],\n\nThe seller has confirmed that all agreed repairs have been completed for [Property Address].\n\nAttached you'll find receipts or contractor invoices for your records. Please review and confirm you're satisfied prior to your final walkthrough.\n\nIf you'd like to schedule re-inspection or walkthrough adjustments, let me know and I'll coordinate.`,
    category: CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
  },
  // Closing Week Templates
  {
    id: "cw_closing_week_kickoff",
    title: "Closing Week Kickoff",
    body: `Subject: Welcome to closing week – [Property Address]\n\nHi [Client First Name],\n\nWe've officially entered closing week for your transaction at [Property Address] — congratulations! 🎉\n\nHere's a quick overview of what to expect over the next few days:\n1. Final Closing Disclosure (CD): Your lender will send this for review and signature.\n2. Wire Instructions: Title will provide these securely (always verify by phone).\n3. Walkthrough: We'll confirm the property condition and any agreed repairs.\n4. Signing Appointment: You'll sign final documents with title or a mobile notary.\n5. Funding & Recording: Once funds clear, ownership officially transfers!\n\nWe're almost there — please keep an eye on your inbox for any final requests from your lender or title company.\n\nIf anything feels unclear, I'm here to walk you through it.\n\nWarm regards,`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_final_walkthrough_reminder",
    title: "Final Walkthrough Reminder",
    body: `Subject: Final walkthrough scheduled for [Date/Time]\n\nHi [Buyer First Name],\n\nYour final walkthrough for [Property Address] is confirmed for [Date] at [Time].\n\nThis is your opportunity to verify that:\nThe property is in the same condition as when you went under contract.\nAny agreed repairs or credits have been completed.\nAll fixtures and appliances remain in place.\n\nIf you notice anything unexpected during the walkthrough, please let us know immediately so we can address it before closing.\n\nAlmost there — this is your last look before the keys are officially yours!`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_wire_instructions_reminder",
    title: "Wire Instructions Reminder (Fraud Warning)",
    body: `Subject: Important: Verify wire instructions before sending funds\n\nHi [Buyer First Name],\n\nAs you prepare to send your closing funds, please take a moment to review this important wire security reminder:\n\nWire fraud is real and increasingly common in real estate transactions.\n\nTo protect your funds:\n✅ Only use wire instructions provided directly by your title company.\n✅ Always call the title office using a verified number from the contract or commitment before sending any money.\n🚫 Never rely on emailed or texted wire instructions without verifying them by phone.\n\nIf you receive revised or last-minute wire instructions, contact me or your title company immediately before sending funds.\n\nThank you for staying vigilant — your security is our priority.`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_final_cd_review",
    title: "Final CD/Settlement Statement Review",
    body: `Subject: Review your final closing statement – [Property Address]\n\nHi [Client First Name],\n\nAttached is your final Closing Disclosure / Settlement Statement for [Property Address].\n\nPlease review the following carefully:\nBuyer/Seller credits and adjustments\nProrations for taxes and HOA dues\nTitle and lender fees\nWire or proceeds amounts\n\nIf anything looks unclear or unexpected, let me know right away so we can confirm with title before signing.\n\nOnce reviewed, please sign and return promptly to keep your closing on schedule.`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_signing_appointment_confirmation",
    title: "Signing Appointment Confirmation",
    body: `Subject: Signing appointment confirmed – [Property Address]\n\nHi [Client First Name],\n\nYour signing appointment has been scheduled for:\n📅 Date: [Date]\n⏰ Time: [Time]\n📍 Location: [Title Company / Mobile Notary Address]\n\nIf you'll be wiring funds, be sure to complete that before your signing to avoid delays in funding.\n\nOnce your documents are signed, title will handle recording and disbursement.\n\nWe'll notify you as soon as it's officially closed and funded!\n\nExcited to wrap this one up with you!`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_pre_closing_checklist",
    title: "Pre-Closing Checklist",
    body: `Subject: Quick pre-closing checklist – [Property Address]\n\nHi [Client First Name],\n\nHere's a quick checklist to make your closing smooth and stress-free:\n✅ Wire funds using verified instructions only\n✅ Bring a valid photo ID to your signing\n✅ Confirm homeowners insurance is active (buyers)\n✅ Cancel utilities effective after closing (sellers)\n✅ Gather garage remotes, keys, fobs, and gate access\n✅ Review your final settlement statement for accuracy\n\nIf you've already completed these, great — you're ahead of the game!\n\nSee you at the finish line,`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_closing_day_buyer",
    title: "Closing Day Instructions (Buyer)",
    body: `Subject: It's closing day! 🎉\n\nHi [Buyer First Name],\n\nToday's the big day — closing day!\n\nHere's what to expect:\n1. Signing: You'll complete final documents with title or your mobile notary.\n2. Funding: Once your wire clears, title will fund and record the sale.\n3. Keys: The agent will release keys after confirmation of funding.\n\nAttached:\nFinal Settlement Statement\nRecorded Deed (if available)\n\nThank you again for trusting us through this process. It's been a pleasure helping you reach this milestone — and remember, we're here for you even after closing.\n\nWarm regards,`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_closing_day_seller",
    title: "Closing Day Instructions (Seller)",
    body: `Subject: Closing day details – [Property Address]\n\nHi [Seller First Name],\n\nToday's the day! Thank you again for allowing us to assist with the sale of [Property Address].\n\nHere's what to expect today:\n1. Signing: Your documents will be signed either in-office or via mobile notary.\n2. Funding: Once the buyer's funds clear and the deed records, proceeds will be released (usually same or next business day).\n3. Next Steps: Cancel utilities, forward mail, and retain your closing statement for taxes.\n\nAttached:\nFinal Settlement Statement\nRecorded Deed (once available)\n\nWe're proud to have guided you through this transaction — congratulations on a successful closing!\n\nWarm regards,`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_closing_funded_confirmation",
    title: "Closing Funded Confirmation (All Parties)",
    body: `Subject: Closed & funded – [Property Address]\n\nHi Everyone,\n\nI'm pleased to confirm that [Property Address] has officially closed and funded as of [Date].\n\nTitle has confirmed recording and disbursement — this file is now complete.\n\nThank you to everyone involved for the teamwork and collaboration that made this a smooth closing.\n\nI'll send final docs shortly once title issues the recorded deed.\n\nWarm regards,`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  },
  {
    id: "cw_congratulations_next_steps",
    title: "Congratulations + Next Steps (Buyer Wrap-Up)",
    body: `Subject: Congratulations on your new home! 🏡\n\nHi [Buyer First Name],\n\nCongratulations — your closing is complete and you're officially a homeowner!\n\nAttached are your final documents for safekeeping.\n\nHere's a quick list of recommended next steps:\nChange locks and security codes\nConnect or transfer utilities\nFile for homestead exemption (if primary residence)\nSave your closing statement for taxes and insurance\n\nIt's been an absolute pleasure working with you — and remember, we're still here if you ever need help or have questions.\n\nWishing you all the best in your new home,`,
    category: CONTRACT_STAGES.CLOSING_WEEK,
  }
];

const fuse = new Fuse(MOCK_TEMPLATES, {
  keys: ["title", "body"],
  threshold: 0.35, // adjust for fuzziness
});

export function Templates() {
  const { subscription } = useSubscription();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin === true;
  const isRoyalty = subscription?.priceId === 'price_1SMfAgEApsNPWe3P2oUBGwvg';
  const hasFullAccess = isRoyalty || isAdmin;

  const [searchInput, setSearchInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const [view, setView] = useState<'all' | 'favorites' | 'recent'>('all');

  // Load favorites and recently used from localStorage
  useEffect(() => {
    const favs = localStorage.getItem("bossyemail_favorites");
    const recent = localStorage.getItem("bossyemail_recently_used");
    if (favs) setFavorites(JSON.parse(favs));
    if (recent) setRecentlyUsed(JSON.parse(recent));
  }, []);

  // Save favorites and recently used to localStorage
  useEffect(() => {
    localStorage.setItem("bossyemail_favorites", JSON.stringify(favorites));
    localStorage.setItem("bossyemail_recently_used", JSON.stringify(recentlyUsed));
  }, [favorites, recentlyUsed]);

  function handleCopy(template: typeof MOCK_TEMPLATES[0]) {
    if (!hasFullAccess) {
      alert("This action is only available for Inbox Royalty subscribers.");
      return;
    }
    navigator.clipboard.writeText(`Subject: ${template.title}\n\n${template.body}`);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 1200);
    
    // Add to recently used
    setRecentlyUsed(prev => {
      const newRecent = [template.id, ...prev.filter(id => id !== template.id)].slice(0, 10);
      return newRecent;
    });
  }

  function handleEdit(template: typeof MOCK_TEMPLATES[0]) {
    if (!hasFullAccess) {
      alert("This action is only available for Inbox Royalty subscribers.");
      return;
    }
    // Placeholder for edit action
    alert(`Edit template: ${template.title}`);
  }

  function handleDelete(template: typeof MOCK_TEMPLATES[0]) {
    if (!hasFullAccess) {
      alert("This action is only available for Inbox Royalty subscribers.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete the template: "${template.title}"? This cannot be undone.`)) {
      setTemplates(prev => prev.filter(t => t.id !== template.id));
    }
  }

  function handleFavorite(templateId: string) {
    if (!hasFullAccess) {
      alert("This action is only available for Inbox Royalty subscribers.");
      return;
    }
    setFavorites(favs =>
      favs.includes(templateId)
        ? favs.filter(id => id !== templateId)
        : [...favs, templateId]
    );
  }

  const filteredTemplates = searchInput.trim()
    ? fuse.search(searchInput).map(result => result.item)
    : templates.filter(t => {
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    const matchesView = view === 'all' || 
      (view === 'favorites' && favorites.includes(t.id)) ||
      (view === 'recent' && recentlyUsed.includes(t.id));
        return matchesCategory && matchesView;
  });

  function openTemplateModal(template: any) {
    console.log("openTemplateModal called", template);
    setSelectedTemplate(template);
    setShowModal(true);
  }

  function closeTemplateModal() {
    setShowModal(false);
    setSelectedTemplate(null);
  }

  return (
    <div className="w-full font-sans pl-32 pr-32 sm:pl-8 sm:pr-8 xs:pl-2 xs:pr-2 dark:bg-[#424242] dark:text-[#e0e0e0]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 dark:text-[#f5f5f5]">Templates</h2>
      {/* View Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${view === 'all' ? 'bg-black text-white' : 'bg-white dark:bg-[#616161] text-zinc-700 dark:text-[#e0e0e0] border border-zinc-300 dark:border-[#757575] hover:bg-zinc-100 dark:hover:bg-[#757575]'}`}
        >
          All Templates
        </button>
        <button
          onClick={() => setView('favorites')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
              ${view === 'favorites' ? 'bg-black text-white' : 'bg-white dark:bg-[#616161] text-zinc-700 dark:text-[#e0e0e0] border border-zinc-300 dark:border-[#757575] hover:bg-zinc-100 dark:hover:bg-[#757575]'}`}
        >
          <Star className="w-4 h-4" fill={view === 'favorites' ? 'white' : 'none'} />
          Favorites
        </button>
        <button
          onClick={() => setView('recent')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${view === 'recent' ? 'bg-black text-white' : 'bg-white dark:bg-[#616161] text-zinc-700 dark:text-[#e0e0e0] border border-zinc-300 dark:border-[#757575] hover:bg-zinc-100 dark:hover:bg-[#757575]'}`}
        >
          Recently Used
        </button>
      </div>
      {/* Category Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
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
          CONTRACT_STAGES.TC_TOOLS,
          CONTRACT_STAGES.DIFFICULT_CONVERSATIONS,
          CONTRACT_STAGES.LEAD_GENERATION,
          CONTRACT_STAGES.BUYER_COMMUNICATION,
          CONTRACT_STAGES.SELLER_COMMUNICATION,
          CONTRACT_STAGES.TRANSACTION_COORDINATION,
          CONTRACT_STAGES.REPAIRS_NEGOTIATIONS,
          CONTRACT_STAGES.TITLE_ASSOCIATION,
          CONTRACT_STAGES.CLOSING_WEEK,
          CONTRACT_STAGES.POST_CLOSING_COMPLETION,
          CONTRACT_STAGES.COMPLIANCE_DOCUMENTS,
          CONTRACT_STAGES.REACTIVATION_NURTURE
        ].map(category => (
          <button
            key={category || 'All'}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center justify-center px-6 py-2 rounded border text-sm font-medium transition-colors whitespace-nowrap
              ${selectedCategory === category || (!selectedCategory && !category)
                  ? 'bg-black text-white'
                  : 'bg-white dark:bg-[#616161] text-zinc-700 dark:text-[#e0e0e0] border border-zinc-300 dark:border-[#757575] hover:bg-zinc-100 dark:hover:bg-[#757575]'}
            `}
            aria-pressed={selectedCategory === category || (!selectedCategory && !category)}
          >
            {category || 'All'}
          </button>
        ))}
      </div>
      {/* Search Bar */}
        <div className="mb-6 w-full">
          <div className="flex items-center w-full border border-zinc-300 bg-white dark:bg-[#616161] rounded-full h-12">
        <input
          type="text"
          placeholder="Search away"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="flex-1 px-5 h-full text-lg text-zinc-700 dark:text-[#e0e0e0] placeholder-zinc-400 dark:placeholder-[#bdbdbd] bg-transparent border-none rounded-l-full focus:outline-none focus:ring-0"
          style={{ borderRight: 'none' }}
        />
        {searchInput && (
          <button
            type="button"
            onClick={() => { setSearchInput(""); }}
                className="text-black dark:text-[#e0e0e0] hover:text-zinc-700 dark:hover:text-[#f5f5f5] text-2xl focus:outline-none focus:ring-2 focus:ring-primary px-2"
            aria-label="Clear search"
            tabIndex={0}
                style={{ background: 'none', border: 'none', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
          >
            ×
          </button>
        )}
        <span
          className="h-full px-6 font-bold text-lg text-white bg-black rounded-r-full border-none flex items-center"
          style={{ borderLeft: 'none', cursor: 'default', opacity: 0.5 }}
        >
          SEARCH
        </span>
          </div>
      </div>
      {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400 dark:text-[#bdbdbd]">
          <Mail className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium mb-2">No templates found</p>
          <p className="text-sm">Try a different search or create a new template.</p>
        </div>
      ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-[#616161]">
          {filteredTemplates.map(t => (
            <li
              key={t.id}
                className="flex items-center group px-2 py-4 transition hover:bg-zinc-50 dark:hover:bg-[#616161] cursor-pointer"
              onClick={() => openTemplateModal(t)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <div className="text-base font-semibold text-zinc-900 dark:text-[#e0e0e0] truncate">{t.title}</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-[#616161] text-zinc-600 dark:text-[#bdbdbd]">
                    {t.category}
                  </span>
                  {hasFullAccess && (
                  <button
                      className={`star-btn ml-2 w-6 h-6 flex items-center justify-center rounded-full transition ${favorites.includes(t.id) ? 'text-yellow-400' : 'text-zinc-400 dark:text-[#bdbdbd] hover:text-yellow-400'}`}
                    onClick={e => { e.stopPropagation(); handleFavorite(t.id); }}
                    aria-label={favorites.includes(t.id) ? 'Unfavorite' : 'Favorite'}
                  >
                    <Star fill={favorites.includes(t.id) ? '#facc15' : 'none'} className="w-5 h-5" />
                  </button>
                  )}
                </div>
                  <div className="text-sm text-zinc-500 dark:text-[#bdbdbd] truncate mt-1" style={!hasFullAccess ? { userSelect: 'none' } : {}}>
                    <span style={!hasFullAccess ? { pointerEvents: 'none', filter: 'blur(1.5px)', opacity: 0.7 } : {}}>{t.body}</span>
                    {!hasFullAccess && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(255,255,255,0.7)',
                          color: '#222',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '0.95em',
                          borderRadius: '0.5em',
                          zIndex: 2,
                          pointerEvents: 'auto',
                        }}
                      >
                        Upgrade to copy
                      </span>
                    )}
                  </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="flex items-center gap-1">
                  {hasFullAccess && (
                  <button
                    onClick={e => { e.stopPropagation(); handleCopy(t); }}
                      className="copy-btn w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-[#757575] transition relative group/copy"
                    aria-label="Copy Template"
                  >
                      <Clipboard className="w-5 h-5 text-zinc-700 dark:text-[#e0e0e0]" />
                      <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 dark:bg-[#616161] px-2 py-1 text-xs text-white dark:text-[#e0e0e0] opacity-0 group-hover/copy:opacity-100 pointer-events-none transition-opacity">
                      {copiedId === t.id ? "Copied!" : "Copy"}
                    </span>
                  </button>
                  )}
                  {hasFullAccess && (
                  <a
                    href={`mailto:?subject=${encodeURIComponent(t.title)}&body=${encodeURIComponent(t.body)}`}
                      className="send-btn w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-[#757575] transition relative group/send"
                    aria-label="Send Template"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                      <Mail className="w-5 h-5 text-zinc-700 dark:text-[#e0e0e0]" />
                      <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 dark:bg-[#616161] px-2 py-1 text-xs text-white dark:text-[#e0e0e0] opacity-0 group-hover/send:opacity-100 pointer-events-none transition-opacity">
                      Send
                    </span>
                  </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Modal for template preview */}
      {showModal && selectedTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" 
          onClick={closeTemplateModal}
        >
          <div 
              className="bg-white dark:bg-[#424242] rounded-xl shadow-xl w-full max-w-3xl p-6 relative" 
            style={{ maxHeight: '80vh', overflowY: 'auto' }} 
            onClick={e => e.stopPropagation()}
          >
            <button 
                className="absolute top-3 right-3 text-zinc-400 dark:text-[#bdbdbd] hover:text-zinc-700 dark:hover:text-[#e0e0e0] text-2xl" 
              onClick={closeTemplateModal} 
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center gap-2 mb-2">
                <div className="text-base font-bold text-zinc-900 dark:text-[#e0e0e0]">{selectedTemplate.title}</div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-[#616161] text-zinc-600 dark:text-[#bdbdbd]">
                {selectedTemplate.category}
              </span>
              {hasFullAccess && (
              <button
                className={`star-btn ml-2 w-6 h-6 flex items-center justify-center rounded-full transition ${
                      favorites.includes(selectedTemplate.id) ? 'text-yellow-400' : 'text-zinc-400 dark:text-[#bdbdbd] hover:text-yellow-400'
                }`}
                onClick={() => handleFavorite(selectedTemplate.id)}
                aria-label={favorites.includes(selectedTemplate.id) ? 'Unfavorite' : 'Favorite'}
              >
                <Star 
                  fill={favorites.includes(selectedTemplate.id) ? '#facc15' : 'none'} 
                  className="w-5 h-5" 
                />
              </button>
              )}
            </div>
            <div className="mb-6">
                <div className="font-semibold text-zinc-800 dark:text-[#e0e0e0] mb-2">Subject:</div>
                <div className="mb-4 text-base text-zinc-900 dark:text-[#e0e0e0] whitespace-pre-line" style={!hasFullAccess ? { userSelect: 'none' } : {}}>
                    <span style={!hasFullAccess ? { pointerEvents: 'none', filter: 'blur(1.5px)', opacity: 0.7 } : {}}>{selectedTemplate.title}</span>
                    {!hasFullAccess && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(255,255,255,0.7)',
                          color: '#222',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '1.1em',
                          borderRadius: '0.5em',
                          zIndex: 2,
                          pointerEvents: 'auto',
                        }}
                      >
                        Upgrade to copy
                      </span>
                    )}
              </div>
                <div className="font-semibold text-zinc-800 dark:text-[#e0e0e0] mb-2">Body:</div>
                <div className="text-base text-zinc-900 dark:text-[#e0e0e0] whitespace-pre-line" style={!hasFullAccess ? { userSelect: 'none' } : {}}>
                    <span style={!hasFullAccess ? { pointerEvents: 'none', filter: 'blur(1.5px)', opacity: 0.7 } : {}}>{selectedTemplate.body}</span>
                    {!hasFullAccess && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(255,255,255,0.7)',
                          color: '#222',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '1.1em',
                          borderRadius: '0.5em',
                          zIndex: 2,
                          pointerEvents: 'auto',
                        }}
                      >
                        Upgrade to copy
                      </span>
                    )}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              {hasFullAccess && (
              <button
                onClick={() => handleCopy(selectedTemplate)}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-black text-white hover:bg-zinc-800 dark:hover:bg-[#757575] transition"
              >
                <Clipboard className="w-4 h-4" /> Copy
              </button>
              )}
              <button
                onClick={closeTemplateModal}
                className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-200 dark:bg-[#616161] text-zinc-700 dark:text-[#e0e0e0] hover:bg-zinc-300 dark:hover:bg-[#757575] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
} 