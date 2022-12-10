module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/artigos/:slug',
        handler: 'artigo.findOne',
        config: {
          auth: false,
        },
      },
      { 
        method: 'GET',
        path: '/artigos/categoria/:slug',
        handler: 'artigo.findByCategory',
      }
    ],
  };