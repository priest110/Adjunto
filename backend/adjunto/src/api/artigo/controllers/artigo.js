'use strict';

/**
 * artigo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::artigo.artigo', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params

        const entity = await strapi.db.query('api::artigo.artigo').findOne({
            where: { slug },
            populate: true
        })
        const sanitizedEntity = await this.sanitizeOutput(entity)
        sanitizedEntity['categoria'] = entity['categoria']
        sanitizedEntity['autor'] = entity['autor']

        return this.transformResponse(sanitizedEntity)
    }
}));
