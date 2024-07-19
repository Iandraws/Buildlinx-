'use strict';

/**
 * pumpe service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pumpe.pumpe');
