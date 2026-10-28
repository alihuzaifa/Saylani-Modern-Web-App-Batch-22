// Design preview data, shared by identify.js and chat.js, used only while config.js
// is still a placeholder (no real Supabase project attached yet).
export const DEMO_PEOPLE = [
  { id: "1", full_name: "Ayesha Khan", email: "ayesha@batch22.pk" },
  { id: "2", full_name: "Bilal Ahmed", email: "bilal@batch22.pk" },
  { id: "3", full_name: "Usman Tariq", email: "usman@batch22.pk" },
];

export const DEMO_MESSAGES = {
  1: [
    { from: "them", content: "Salam! Kal ka assignment submit kar diya?" },
    { from: "me", content: "Haan bhej diya tha, aapne check kiya?" },
    { from: "them", content: "Haan, theek laga. Supabase wala part thora dekhna" },
    { from: "me", content: "Theek hai, abhi dekh leta hoon" },
  ],
  2: [{ from: "them", content: "Group project ka part kab tak bhejna hai?" }],
  3: [],
};
