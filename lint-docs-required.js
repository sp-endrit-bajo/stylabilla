const stylelint = require("stylelint");

const ruleName = "plugin/docs-required";
const requiredDocText = ['Browser support', 'Markup', 'Styleguide'];
const messages = stylelint.utils.ruleMessages(ruleName, {
  error: text => `Documentation is missing a "${text}" section`,
})

function blockIncludesText(commentBlock, docText) {
  return commentBlock.find(comment => {
    return comment.includes(docText)
  })
}

module.exports = stylelint.createPlugin(ruleName, actual => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, { actual });
    if (!validOptions) { return }

    let commentBlock = [];

    root.walkComments(comment => {
      const next = comment.next() && comment.next().text;
      const text = comment.text;

      if (text.includes('stylelint-disable')) return;

      commentBlock.push(text);

      //If we're at the end of the comment block, check the block for the required text and report if missing
      if (next === undefined) {
        requiredDocText.forEach(docText => {
          if (!blockIncludesText(commentBlock, docText)) {
            stylelint.utils.report({ ruleName, result, message: messages.error(docText), node: comment })
          }
        })
        commentBlock = [];
      }
    });
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages
