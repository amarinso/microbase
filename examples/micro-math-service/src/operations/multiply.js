module.exports = (base) => ({
  handler: (msg, reply) => {
        var result = msg.left * msg.right;
        return reply(base.utils.genericResponse({ answer: result, host: process.env.HOSTNAME }));
    }
});