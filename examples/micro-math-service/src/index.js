const base = require('microbase')();

// Add operations
base.services.addOperations('operations', base);

module.exports = base;