'use strict';

/**
 *  event controller
 */
 const { createCoreController } = require('@strapi/strapi').factories;

 module.exports = createCoreController('api::event.event', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async create(ctx) {
    // some logic here
    const response = await super.create(ctx);
    // some more logic
  
    return response;
  }
}));


