function generateId() {
  return Math.floor(Math.random() * 0x10000).toString(16);
}

const ONE_HOUR = 1000 * 60 * 60;

module.exports = { generateId, ONE_HOUR };
