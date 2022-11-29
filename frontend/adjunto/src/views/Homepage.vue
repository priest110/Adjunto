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
              Última Hora
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
            <v-carousel hide-delimiter-background hide-delimiters show-arrows="hover" class="carousel_principal">
              <v-carousel-item v-for="(article, i) in articles" :key="i" >
                <router-link :to="'artigo/' + article.attributes.slug">
                  <v-card>
                    <v-img height="500" cover class="rounded-lg" v-if="article.attributes.media != null" :src="'http://localhost:1337' + article.attributes.media.data[0].attributes.url" gradient="to top, rgba(10,0,0,.8), rgba(0,0,0,0)" >
                      <v-card-title class="text-h4 text-white">
                        <v-row align="end" style="height: 500px;">
                          <v-col>
                            <div>
                              <p class="text-body-1 text-left" color="#E9E9E9">
                                <v-icon small color="#E9E9E9">
                                  mdi-calendar
                                </v-icon>
                                {{ article.attributes.createdAt.substr(0,10) }}
                                <v-icon small color="#E9E9E9">
                                  mdi-account
                                </v-icon>
                                {{ article.attributes.autor.data.attributes.nome }}
                              </p>
                            </div>
                            <p class="title_article my-2 text-left font-weight-bold">
                              {{ article.attributes.titulo }}
                            </p>
                            <div class="text-body-1 text-left" color="#E9E9E9">
                              <v-icon small color="#E9E9E9">
                                mdi-tag
                              </v-icon>
                              {{ article.attributes.categoria.data.attributes.tipo }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-title>
                    </v-img>
                  </v-card>
                </router-link>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="2" >
            <v-expansion-panels v-model="plane">
              <v-expansion-panel style="background-color:black;" >
                <v-expansion-panel-title disable-icon-rotate>
                  <p class="text-h5 text-white">Mercado</p>
                  <template v-slot:actions>
                    <v-icon color="white" icon="mdi-window-minimize"></v-icon>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="out_of_margins ml-n5">
                  <v-carousel hide-delimiter-background color="white" :show-arrows="false" height="410" class="rounded">
                    <v-carousel-item v-for="(article,i) in articles" :key="i" >
                      <v-card color="black">
                        <v-img v-if="article.attributes.media != null" :src="'http://localhost:1337' + article.attributes.media.data[0].attributes.url" height="220" cover></v-img>
                        <v-card-title class="text-h6 white--text mt-3 ml-3">
                          <v-row class="fill-height flex-column" justify="space-between">
                            <div>
                              <p class="text-body-1 text-left" color="#E9E9E9">
                                <v-icon small color="#E9E9E9">
                                  mdi-calendar
                                </v-icon>
                                {{ article.attributes.createdAt.substr(0,10) }}
                              </p>
                            </div>
                            <p class="text-left font-weight-bold" style="white-space:initial;">
                                {{ article.attributes.titulo.substring(0,50) }}
                            </p>
                          </v-row>
                        </v-card-title>
                        <v-card-actions class="text-h6 mt-2 white--text justify-center">
                          <v-btn  @click.stop="dialog = true" variant="outlined" color="#FF4E48">
                            <v-icon>mdi-plus</v-icon>
                            Ler mais
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                      <v-dialog v-model="dialog" max-width="790">
                        <v-card >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="#FF4E48" @click="dialog = false" icon="mdi-close"></v-btn>
                          </v-card-actions>
                          
                          <div class="d-flex justify-center">
                            <v-img class="rounded-lg" max-width="690" max-height="350" v-if="article.attributes.media != null" :src="'http://localhost:1337' + article.attributes.media.data[0].attributes.url"></v-img>
                          </div>

                          <v-card-title class="text-body-1 ml-6 my-3">
                            <span class="text-body-1">
                              <v-icon small>
                                mdi-calendar
                              </v-icon>
                              {{ article.attributes.createdAt.substr(0,10) }}&nbsp;&nbsp;&nbsp;
                            </span>
                            <span class="text-body-1 first_color">
                              <v-icon small color="#FF4E48">
                                mdi-tag
                              </v-icon>
                              {{ article.attributes.categoria.data.attributes.tipo }}
                            </span>
                          </v-card-title>

                          <v-card-title class="text-h4 ml-6">
                            {{ article.attributes.titulo }}
                          </v-card-title>

                          <v-card-text class="text-h6 ml-5 text-grey">
                            {{ article.attributes.descricao }}
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-carousel-item>
                  </v-carousel>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>        
          </v-col>
        </v-row>
        <v-row class="justify-center mb-3">
          <v-col cols="6">
          <v-card flat class="transparent_color">
            <v-tabs v-model="tab" color="#FF4E48" class="transparent_color">
              <v-tab class="text-body-1 transparent_color" v-for="(category, index) in categories" :key="index" :value="'tab-' + index">
                {{ category.attributes.tipo }}
              </v-tab>
            </v-tabs>
  
            <v-window v-model="tab" class="transparent_color">
              <v-window-item v-for="(category, index) in categories" :key="index" :value="'tab-' + index">
                <v-card class="my-5 mx-2"  v-for="(article, i) in articles.filter(art => art.attributes.categoria.data.attributes.tipo == category.attributes.tipo).slice(10*(page-1),10*page)" :key="i">
                  <router-link :to="'artigo/' + article.attributes.slug">
                    <v-img height="500" cover class="rounded-lg" :src="'http://localhost:1337' + article.attributes.media.data[0].attributes.url"></v-img>
                  </router-link>

                  <!--<iframe v-if="(typeof article.acf.url !== 'undefined')" style="width:100%;height:500px" :src="'https://youtube.com/embed/' + article.acf.url.split('/')[3]" frameborder="0" allowfullscreen></iframe> -->
                  <v-card-text class="text-body-1 text-left">
                    <v-icon small>
                      mdi-calendar
                    </v-icon>
                    {{ article.attributes.createdAt.substr(0,10) }}
                    <v-icon small>
                      mdi-account
                    </v-icon>
                    {{ article.attributes.autor.data.attributes.nome }}
                  </v-card-text>
                  
                    <v-card-title class="title_article mt-n3 font-weight-black text-h4 text-left">
                      <router-link :to="'artigo/' + article.attributes.slug">
                        {{ article.attributes.titulo }}
                      </router-link>
                    </v-card-title>
  
                  <v-card-subtitle class="text-h6 text-left">
                    {{ article.attributes.descricao }}
                  </v-card-subtitle>
  
                  <v-card-text class="text-body-1 text-left first_color">
                    <v-row>
                      <v-col>
                        <v-icon small color="#FF4E48">
                          mdi-tag
                        </v-icon>
                        {{ article.attributes.categoria.data.attributes.tipo }}
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="2">
                        <v-btn :href="'http://localhost:3000/artigo/' + article.attributes.slug" color="#FF4E48" class="justify-start ml-n5 text-white">
                          <v-icon>mdi-plus</v-icon>
                          Ler mais
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="text-center">
                  <v-pagination v-model="page" :length="Math.floor(articles.filter(art => art.attributes.categoria.data.attributes.tipo == category.attributes.tipo).length / 10) + 1" class="first_color rounded"></v-pagination>
                </div>
              </v-window-item>
            </v-window>
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
        var articles_aux = await axios('http://localhost:1337/api/artigos?populate=*')
        this.articles = articles_aux.data.data
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
  