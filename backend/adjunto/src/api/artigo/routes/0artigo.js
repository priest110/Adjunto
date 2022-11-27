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
    ],
  };