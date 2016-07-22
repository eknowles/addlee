module.exports = {
  log: function (msg) {
    console.log(msg);
  },
  exit: function (_code) {
    this.log(`Exit with code '${code}'`);
    process.exit(_code);
  }
};
