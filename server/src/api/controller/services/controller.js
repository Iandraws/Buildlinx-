'use strict';

/**
 * controller service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::controller.controller');
