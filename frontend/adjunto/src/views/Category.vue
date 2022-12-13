<template>
  <div>
    <div v-if="!valid" class="text-center">
      <v-progress-circular indeterminate color="#FF4E48"></v-progress-circular>
    </div>
    <div v-else>
      <v-row class="justify-center">
        <v-col cols="2">
        </v-col>
        <v-col cols="6" >
          <p class="text-h3 text-left">
            {{ category.attributes.tipo }}
          </p>
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="2">
          <v-card height="100%" flat class="transparent_color">
            <v-list  v-for="(category, index) in categories" :key="index" flat width="240">
              <v-list-item v-if="!(category.attributes.tipo === 'NBA')"  class="mt-n3 text-left" :href='"http://localhost:3000/categoria/" + category.attributes.slug' >
                <v-icon>
                  mdi-circle-medium
                </v-icon>
                <v-list-item-content>
                  {{ category.attributes.tipo }}
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="!(category.attributes.tipo === 'NBA')" class="categories_divider"></v-divider>
            </v-list>
            <v-btn  x-large href="https://www.nba.com/" target="_blank" class="nba_button">
              <v-img src="http://localhost:1337/uploads/Logo_NBA_4f76b11c8c.svg" width="100px"></v-img>
            </v-btn>
          </v-card>
        </v-col>
        <v-col cols="6" >
          <router-link :to="'artigo/' + articles[0].attributes.slug">
            <v-card>
              <v-img height="500" cover class="rounded-lg" v-if="articles[0].attributes.media != null" :src="'http://localhost:1337' + articles[0].attributes.media.data[0].attributes.url" gradient="to top, rgba(10,0,0,.8), rgba(0,0,0,0)" >
                <v-card-title class="text-h4 text-white">
                  <v-row align="end" style="height: 500px;">
                    <v-col>
                      <div>
                        <p class="text-body-1 text-left" color="#E9E9E9">
                          <v-icon small color="#E9E9E9">
                            mdi-calendar
                          </v-icon>
                          {{ articles[0].attributes.createdAt.substr(0,10) }}
                          <v-icon small color="#E9E9E9">
                            mdi-account
                          </v-icon>
                          {{ articles[0].attributes.autor.data.attributes.nome }}
                        </p>
                      </div>
                      <p class="title_article my-2 text-left font-weight-bold">
                        {{ articles[0].attributes.titulo }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </router-link>
        </v-col>
        <v-col cols="2"/>
      </v-row>
      <v-row class="justify-center mb-3" v-for="i in Math.ceil((articles.length - 1)/3)">
        <v-col cols="2" v-for="(article, index) in articles.slice(Math.floor(articles.length/3) * i + 1, Math.floor(articles.length/3) * i + 1 + 3)" :key="index">
          <v-card  height="400" flat>
            <v-img height="250" cover class="rounded-lg" v-if="articles[0].attributes.media != null" :src="'http://localhost:1337' + article.attributes.media.data[0].attributes.url" gradient="to top, rgba(10,0,0,.8), rgba(0,0,0,0)" >       
              <v-card-title style="height:100%;" class="d-flex align-end text-body-1 text-left text-white">
                <p>
                  <v-icon small>
                    mdi-calendar
                  </v-icon>
                  {{ article.attributes.createdAt.substr(0,10) }}
                  <v-icon small>
                    mdi-account
                  </v-icon>
                  {{ article.attributes.autor.data.attributes.nome }}
                </p>
              </v-card-title>
            </v-img>
            <router-link :to="'../artigo/' + article.attributes.slug">
              <v-card-title class="text-h5 title_article mt-2 text-left font-weight-bold" style="white-space:initial; overflow-wrap:anywhere;">
                {{ article.attributes.titulo }}
              </v-card-title>
            </router-link>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      categories: [],
      category: {},
      articles: [],
      plane: 0,
      tab: null,
      dialog: false,
      valid: false,
      page:1,
    }
  },
  
  created() {
    this.fetch_data()
  },

  methods: {
    async fetch_data(){
      var categories_aux = await axios('http://localhost:1337/api/categorias')
      this.categories = categories_aux.data.data
      this.category = this.categories.find(x => x.attributes.slug == this.$route.path.substring(1).split('/').pop())
      var articles_aux = await axios('http://localhost:1337/api/artigos/categoria/' + this.category.attributes.slug)
      this.articles = articles_aux.data.data.reverse()
      this.valid = true
    }
  }
}
</script>

<style>

/* Clean router link */
a{
  text-decoration: none; 
  color: inherit !important;
}

/* Change to default site color */
.title_article:hover, .carousel_principal:hover .title_article,  .first_color{
  color: #FF4E48 !important;
}

.categories_divider{
  border-color: #FF4E48 !important;
}

.v-application .primary, .carousel_principal .v-window__right, .carousel_principal .v-window__left{
  background-color: #FF4E48 !important;
}

.out_of_margins{
  width: 113.5% !important;
}

.nba_button{
  height: 50px !important;
  width: 80%;
  left: 0;
  position: absolute;
  background-color: red;
  border-radius:12px;
}

.v-tabs-bar, .transparent_color{
  background-color: transparent !important;
}

</style>
