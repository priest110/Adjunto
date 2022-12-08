'use strict';

/**
 * artigo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;   

async function get_comments (ids){
    const comments = await strapi.db.query('api::comentario.comentario').findMany({
        where: {
            id:{
                $in: ids
            }
        },
        populate: true
    })
    return comments
}

async function get_authors (ids){
    const authors = await strapi.db.query('api::autor.autor').findMany({
        where: {
            id:{
                $in: ids
            }
        },
        populate: true
    })
    return authors
}

async function get_users (ids){
    const users = await strapi.db.query('plugin::users-permissions.user').findMany({
        where: {
            id:{
                $in: ids
            }
        },
        populate: true
    })
    return users
}

module.exports = createCoreController('api::artigo.artigo', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params

        const entity = await strapi.db.query('api::artigo.artigo').findOne({
            where: { slug },
            populate: true
        })

        const principal_ids = entity['comentarios'].map(x => x.id)
        const principal_comments_entity = await get_comments(principal_ids)
        
        var principal_authors_ids = [], principal_users_ids = [], ids = [], secondary_ids = [], secondary_authors_ids = [], secondary_users_ids = []
        for (let i = 0; i < principal_comments_entity.length; i++){
            var aux = principal_comments_entity[i]['comentarios'].map(x => x.id)
            secondary_ids = secondary_ids.concat(aux)
            ids = ids.concat([aux])
            if (principal_comments_entity[i].autor != null)
                principal_authors_ids.push(principal_comments_entity[i].autor.id)
            else
                principal_users_ids.push(principal_comments_entity[i].users_permissions_user.id)
        }

        const comentarios_secundarios_entity = await get_comments(secondary_ids)

        for (let i = 0; i < comentarios_secundarios_entity.length; i++){
            if (comentarios_secundarios_entity[i].autor != null)
                secondary_authors_ids.push(comentarios_secundarios_entity[i].autor.id)
            else
                secondary_users_ids.push(comentarios_secundarios_entity[i].users_permissions_user.id)
        }

        const ids_autores = [...new Set([...principal_authors_ids, ...secondary_authors_ids])]
        const autores_entity = await get_authors(ids_autores)

        const ids_users = [...new Set([...principal_users_ids, ...secondary_users_ids])]
        const users_entity = await get_users(ids_users)

        var comentarios = []
        for (let i = 0; i < principal_comments_entity.length; i++){
            var comentario = {}
            comentario['descricao'] = principal_comments_entity[i]['descricao']
            if (principal_comments_entity[i].autor != null){
                const autor = autores_entity.filter(x => x.id == principal_comments_entity[i]['autor']['id'])[0]
                comentario['author'] = autor['nome']
                comentario['avatar'] = autor['avatar']['url']
            }
            else{   
                const autor = users_entity.filter(x => x.id == principal_comments_entity[i]['users_permissions_user']['id'])[0]
                comentario['author'] = autor['username']
                comentario['avatar'] = autor['avatar']['url']
            }
            var comentarios_aux = []
            for(let j = 0; j < ids[i].length; j++){
                var comentario_aux = {}
                var aux = comentarios_secundarios_entity.filter(x => x.id == ids[i][j])[0]
                comentario_aux['descricao'] = aux['descricao']
                if (aux.autor != null){
                    const autor = autores_entity.filter(x => x.id == aux['autor']['id'])[0]
                    comentario_aux['author'] = autor['nome']
                    comentario_aux['avatar'] = autor['avatar']['url']
                }
                else{   
                    const autor = users_entity.filter(x => x.id == aux['users_permissions_user']['id'])[0]
                    comentario_aux['author'] = autor['username']
                    comentario_aux['avatar'] = autor['avatar']['url']
                }
                comentarios_aux.push(comentario_aux)
            }
            comentario['comentarios'] = comentarios_aux
            comentarios.push(comentario)
        }
        const sanitizedEntity = await this.sanitizeOutput(entity)
        sanitizedEntity['categoria'] = entity['categoria']
        sanitizedEntity['comentarios'] = comentarios
        sanitizedEntity['autor'] = entity['autor']

        return this.transformResponse(sanitizedEntity)
    }
}));
