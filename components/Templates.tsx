import { useState, useEffect } from "react";
import { Mail, Clipboard, Pencil, Trash2, Filter, Star } from "lucide-react";

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
  }
];

export function Templates() {
  const [search, setSearch] = useState("");
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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
  }

  function handleCopy(template: typeof MOCK_TEMPLATES[0]) {
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
    // Placeholder for edit action
    alert(`Edit template: ${template.title}`);
  }

  function handleDelete(template: typeof MOCK_TEMPLATES[0]) {
    if (window.confirm(`Are you sure you want to delete the template: "${template.title}"? This cannot be undone.`)) {
      setTemplates(prev => prev.filter(t => t.id !== template.id));
    }
  }

  function handleFavorite(templateId: string) {
    setFavorites(favs =>
      favs.includes(templateId)
        ? favs.filter(id => id !== templateId)
        : [...favs, templateId]
    );
  }

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.body.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    const matchesView = view === 'all' || 
      (view === 'favorites' && favorites.includes(t.id)) ||
      (view === 'recent' && recentlyUsed.includes(t.id));
    return matchesSearch && matchesCategory && matchesView;
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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Templates</h2>
      
      {/* View Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${view === 'all' ? 'bg-black text-white' : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-100'}`}
        >
          All Templates
        </button>
        <button
          onClick={() => setView('favorites')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
            ${view === 'favorites' ? 'bg-black text-white' : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-100'}`}
        >
          <Star className="w-4 h-4" fill={view === 'favorites' ? 'white' : 'none'} />
          Favorites
        </button>
        <button
          onClick={() => setView('recent')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${view === 'recent' ? 'bg-black text-white' : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-100'}`}
        >
          Recently Used
        </button>
      </div>

      {/* Category Selector */}
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
                : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'}
            `}
            aria-pressed={selectedCategory === category || (!selectedCategory && !category)}
          >
            {category || 'All'}
          </button>
        ))}
      </div>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center mb-6 relative" style={{ borderRadius: 9999, overflow: 'hidden', background: 'white', border: '1px solid #e5e7eb' }}>
        <input
          type="text"
          placeholder="Search away"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="flex-1 px-5 py-3 text-lg text-zinc-700 placeholder-zinc-400 border-none outline-none bg-transparent"
        />
        {searchInput && (
          <button
            type="button"
            onClick={() => { setSearchInput(""); setSearch(""); }}
            className="absolute text-black hover:text-zinc-700 text-2xl focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Clear search"
            tabIndex={0}
            style={{ left: `calc(16px + ${searchInput.length}ch)`, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="px-8 py-3 bg-black text-white font-bold text-lg rounded-full"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 9999, borderBottomRightRadius: 9999 }}
        >
          SEARCH
        </button>
      </form>
      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400">
          <Mail className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium mb-2">No templates found</p>
          <p className="text-sm">Try a different search or create a new template.</p>
        </div>
      ) : (
        <ul className="divide-y divide-zinc-200">
          {filteredTemplates.map(t => (
            <li
              key={t.id}
              className="flex items-center group px-2 py-4 transition hover:bg-zinc-50 cursor-pointer"
              onClick={() => openTemplateModal(t)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-base font-semibold text-zinc-900 truncate">{t.title}</div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                    {t.category}
                  </span>
                  <button
                    className={`star-btn ml-2 w-6 h-6 flex items-center justify-center rounded-full transition ${favorites.includes(t.id) ? 'text-yellow-400' : 'text-zinc-400 hover:text-yellow-400'}`}
                    onClick={e => { e.stopPropagation(); handleFavorite(t.id); }}
                    aria-label={favorites.includes(t.id) ? 'Unfavorite' : 'Favorite'}
                  >
                    <Star fill={favorites.includes(t.id) ? '#facc15' : 'none'} className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-zinc-500 truncate mt-1">{t.body}</div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={e => { e.stopPropagation(); handleCopy(t); }}
                    className="copy-btn w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 transition relative group/copy"
                    aria-label="Copy Template"
                  >
                    <Clipboard className="w-5 h-5 text-zinc-700" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/copy:opacity-100 pointer-events-none transition-opacity">
                      {copiedId === t.id ? "Copied!" : "Copy"}
                    </span>
                  </button>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(t.title)}&body=${encodeURIComponent(t.body)}`}
                    className="send-btn w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 transition relative group/send"
                    aria-label="Send Template"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                    <Mail className="w-5 h-5 text-zinc-700" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover/send:opacity-100 pointer-events-none transition-opacity">
                      Send
                    </span>
                  </a>
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
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative" 
            style={{ maxHeight: '80vh', overflowY: 'auto' }} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700 text-2xl" 
              onClick={closeTemplateModal} 
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xl font-bold text-zinc-900">{selectedTemplate.title}</div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                {selectedTemplate.category}
              </span>
              <button
                className={`star-btn ml-2 w-6 h-6 flex items-center justify-center rounded-full transition ${
                  favorites.includes(selectedTemplate.id) ? 'text-yellow-400' : 'text-zinc-400 hover:text-yellow-400'
                }`}
                onClick={() => handleFavorite(selectedTemplate.id)}
                aria-label={favorites.includes(selectedTemplate.id) ? 'Unfavorite' : 'Favorite'}
              >
                <Star 
                  fill={favorites.includes(selectedTemplate.id) ? '#facc15' : 'none'} 
                  className="w-5 h-5" 
                />
              </button>
            </div>
            <div className="mb-6">
              <div className="font-semibold text-zinc-800 mb-2">Subject:</div>
              <div className="mb-4 text-base text-zinc-900 whitespace-pre-line">
                {selectedTemplate.title}
              </div>
              <div className="font-semibold text-zinc-800 mb-2">Body:</div>
              <div className="text-base text-zinc-900 whitespace-pre-line">
                {selectedTemplate.body}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleCopy(selectedTemplate)}
                className="flex items-center gap-2 px-4 py-2 rounded bg-black text-white hover:bg-zinc-800 transition"
              >
                <Clipboard className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={closeTemplateModal}
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