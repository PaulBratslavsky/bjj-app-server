'use strict';

/**
 * user-bio service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-bio.user-bio');
