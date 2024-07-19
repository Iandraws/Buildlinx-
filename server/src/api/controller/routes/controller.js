'use strict';

/**
 * controller router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::controller.controller');
