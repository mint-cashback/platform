/**
 * Common emoji mappings for various topics
 */
const EMOJI_MAPPINGS: Record<string, string[]> = {
  // Shopping related
  shop: ["🛍️", "🛒", "🏪"],
  shopping: ["🛍️", "🛒", "🏪"],
  buy: ["💰", "💸", "🛒"],
  purchase: ["💰", "💸", "🛒"],
  store: ["🏪", "🛍️", "🏬"],
  discount: ["💸", "💯", "🏷️"],
  sale: ["🏷️", "💸", "💯"],
  deal: ["🤝", "💰", "🏷️"],
  coupon: ["🏷️", "✂️", "💯"],

  // Money related
  money: ["💰", "💵", "💲"],
  cash: ["💵", "💰", "💲"],
  cashback: ["💸", "💰", "🔄"],
  save: ["💰", "💲", "🔒"],
  savings: ["💰", "💲", "🐖"],
  budget: ["📊", "💰", "📝"],
  finance: ["💹", "📈", "💰"],
  financial: ["💹", "📈", "💰"],
  invest: ["📈", "💰", "🏦"],
  investment: ["📈", "💰", "🏦"],
  bank: ["🏦", "💰", "💳"],
  credit: ["💳", "💰", "🏦"],
  debit: ["💳", "💰", "🏦"],
  card: ["💳", "💰", "🏦"],
  wallet: ["👛", "💰", "💳"],

  // Food related
  food: ["🍕", "🍔", "🍟"],
  restaurant: ["🍽️", "🍴", "🥂"],
  dining: ["🍽️", "🍴", "🥂"],
  grocery: ["🛒", "🥦", "🍎"],
  groceries: ["🛒", "🥦", "🍎"],

  // Travel related
  travel: ["✈️", "🧳", "🌍"],
  vacation: ["🏖️", "✈️", "🧳"],
  flight: ["✈️", "🛫", "🛬"],
  hotel: ["🏨", "🛏️", "🏢"],
  booking: ["📅", "📝", "✅"],

  // Technology related
  tech: ["💻", "📱", "⚙️"],
  technology: ["💻", "📱", "⚙️"],
  computer: ["💻", "🖥️", "⌨️"],
  phone: ["📱", "☎️", "📞"],
  smartphone: ["📱", "📲", "💻"],
  app: ["📱", "💻", "📲"],
  website: ["🌐", "💻", "📱"],
  online: ["🌐", "💻", "📱"],

  // Time related
  time: ["⏰", "⌚", "🕒"],
  now: ["⏰", "⌚", "🕒"],
  quick: ["⚡", "🏃", "⏱️"],
  fast: ["⚡", "🏃", "⏱️"],

  // General positive concepts
  best: ["🏆", "🥇", "✨"],
  awesome: ["🤩", "😍", "✨"],
  great: ["👍", "✨", "🎉"],
  good: ["👍", "✅", "🙂"],
  amazing: ["🤩", "😍", "✨"],
  love: ["❤️", "😍", "💕"],
  perfect: ["💯", "✨", "👌"],
  easy: ["✌️", "👌", "🙂"],
  help: ["🆘", "🔍", "👋"],
  tip: ["💡", "📝", "🔍"],
  guide: ["📋", "🔍", "📝"],
  hack: ["💡", "🔧", "⚙️"],
  secret: ["🤫", "🔐", "🔍"],
  free: ["🆓", "💯", "🎁"],
  top: ["🔝", "🏆", "🥇"],
  new: ["🆕", "✨", "🎁"],

  // Categories/Types
  fashion: ["👗", "👠", "👜"],
  clothing: ["👕", "👗", "👖"],
  electronics: ["💻", "📱", "🎮"],
  home: ["🏠", "🏡", "🛋️"],
  beauty: ["💄", "💅", "👗"],
  health: ["🏥", "💊", "🩺"],
  fitness: ["🏋️", "🧘", "🏃"],
  gift: ["🎁", "🎀", "🎊"],
  holiday: ["🎄", "🎃", "🎅"],

  // Seasonal
  summer: ["☀️", "🏖️", "🏊"],
  winter: ["❄️", "☃️", "🧣"],
  spring: ["🌸", "🌷", "🌱"],
  fall: ["🍂", "🍁", "🎃"],
  christmas: ["🎄", "🎅", "🎁"],
  halloween: ["🎃", "👻", "🦇"],
};

export function getEmojiFromText(text: string): string {
  const normalizedText = text.toLowerCase();

  const matchedEmojis: string[] = [];

  Object.entries(EMOJI_MAPPINGS).forEach(([keyword, emojis]) => {
    if (normalizedText.includes(keyword)) {
      // Add the primary emoji for this keyword
      matchedEmojis.push(emojis[0]);
    }
  });

  // If no matches, return default emoji
  if (matchedEmojis.length === 0) {
    return "📝";
  }

  // If only one match, return that emoji
  if (matchedEmojis.length === 1) {
    return matchedEmojis[0];
  }

  // If multiple matches, return 1-2 emojis randomly
  // Shuffle the array first
  const shuffled = [...matchedEmojis].sort(() => 0.5 - Math.random());

  // Pick either 1 or 2 emojis randomly
  const count = Math.floor(Math.random() * 2) + 1;

  // Take the first 'count' emojis and join them
  return shuffled.slice(0, count).join(" ");
}
