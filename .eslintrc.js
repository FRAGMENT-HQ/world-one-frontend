
module.exports = {
  // Other ESLint configurations...
  plugins: [
    // Other plugins...
    "react-hooks"
  ],
  rules: {
    // Other rules...
    "react-hooks/rules-of-hooks": "off", // Disable the rule for enforcing rules of hooks
    "react-hooks/exhaustive-deps": "off" // Disable the rule for checking dependencies
  }
};