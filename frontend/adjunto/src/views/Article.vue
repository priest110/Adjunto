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
            {{ article.attributes.titulo }}
          </p>
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="2">
          <v-card height="100%" flat class="transparent_color">
            <v-list v-for="(category, index) in categories" :key="index" flat width="240">
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
          <v-img height="500" cover class="rounded-lg" v-if=" article.attributes.media != null" :src="'http://localhost:1337' + article.attributes.media.data[0].attributes.url"></v-img>
        </v-col>
        <v-col cols="2" >
          <v-card rounded="3" class="mt-3">
            <v-row>
              <v-col cols="5">
                <v-avatar tile v-if="autor.attributes.avatar != null" :image="'http://localhost:1337' + autor.attributes.avatar.data.attributes.url" size="80" class="ml-2 mt-3 rounded-lg"></v-avatar>
              </v-col>
              <v-col cols="7">
                <v-card-title class="text-h6 ml-n10 first_color text-left">
                  Autor
                </v-card-title>
                <v-card-subtitle class="text-h5 ml-n10 text-left">
                  {{ autor.attributes.nome }}
                  </v-card-subtitle>
              </v-col>
            </v-row>

            <v-card-text class="text-left">
              {{ autor.attributes.bio }}
            </v-card-text>

            <v-card-text class="text-left">
              <v-btn :href="autor.attributes.facebook" class="mt-n6" target="_blank">
                <v-icon color="#0C88EF">mdi-facebook</v-icon> 
                <span class="facebook_tag">Facebook</span>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="6">
          <v-card class="mb-5 text-left" >
            <v-card-title class="d-flex align-center">
              &nbsp;
              <v-icon>
                mdi-calendar
              </v-icon>
              &nbsp;
              {{ article.attributes.createdAt.substr(0,10) }}
              &nbsp;&nbsp;&nbsp;
              <v-icon color="#FF4E48">
                mdi-tag
              </v-icon> 
              &nbsp;
              <span class="first_color">
                {{ article.attributes.categoria.data.attributes.tipo }}
              </span>
              <v-spacer></v-spacer>
              <span>
                <v-btn :disabled="disabled_active" :active="like_active" icon="mdi-heart-outline" class="first_color mr-n1 mt-n1" variant="text" @click="change_likes()"></v-btn>
                {{ article.attributes.likes }}
              </span>
              &nbsp;
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text class="text-left text-h5">
              {{ article.attributes.descricao }}
            </v-card-text>
          
            <v-divider v-if="(article.attributes.hashtags != null)"></v-divider>

            <v-card-title v-if="article.attributes.hashtags != null">
              &nbsp;
              <span v-for="(tag, i) in article.attributes.hashtags.split(',')" :key="i" class="first_color">
                #{{tag}}
              </span>
            </v-card-title> 
          </v-card>

          <v-card class="mb-5 text-left">
            <v-expansion-panels v-model="plane" flat>
              <v-expansion-panel>
                <v-expansion-panel-title color="#FF4E48" disable-icon-rotate>
                  <p class="text-h5 text-white">Comentários</p>
                  <template v-slot:actions>
                    <v-icon color="white">
                      mdi-window-minimize
                    </v-icon>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div v-if="article.attributes.comentarios.data.length > 0" v-for="(comment, i) in article.attributes.comentarios.data" :key="i">
                    <v-row class="mt-2" >
                      <v-col cols="1">
                        <v-avatar tile :image="'http://localhost:1337' + comment.attributes.avatar" size="60" class="rounded-lg"></v-avatar>
                      </v-col>
                      <v-col class="pt-0 pl-0">
                        <v-card-title class="text-h6">
                          {{ comment.attributes.author }}
                        </v-card-title>
                        <v-card-text>
                          {{ comment.attributes.descricao }}
                        </v-card-text>
                      </v-col>
                    </v-row>
                    <v-card-actions v-if="(answer_active[i] == null || !answer_active[i])" class="my-n3">
                      <v-btn color="#FF4E48" class="mr-n4" @click="change(i)">
                        Responder 
                        &nbsp;
                        <v-icon> mdi-message-text-outline </v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-form v-else id="form_answer" class="my-5">
                      <v-row>
                        <v-col>
                          <v-text-field name="nome" outlined label="Nome"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field name="email" outlined label="Email"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-textarea counter :rules="comment_rules" name="comentario" outlined label="Escreve o teu comentário"></v-textarea>
                      <v-row class="justify-start">
                        <v-btn color="#FF4E48" class="ml-3" >
                          <span class="text-white">Comentar</span> 
                          &nbsp;
                          <v-icon color="white"> mdi-message-text-outline </v-icon>
                        </v-btn>
                        <v-btn text class="ml-3" @click="change(i)">
                          Cancelar
                          <v-icon>mdi-exit</v-icon>
                        </v-btn>
                      </v-row>                
                    </v-form>
                    <v-list v-if="comment.attributes.comentarios.data.length > 0">
                      <v-list-item v-for="(secundary_comment, i) in comment.attributes.comentarios.data" :key="i">
                        <v-card flat class="ml-10"> 
                          <v-row>
                            <v-col cols="1">
                              <v-avatar tile :image="('http://localhost:1337' + secundary_comment.attributes.avatar)" size="60" class="rounded-lg"></v-avatar>
                            </v-col>
                            <v-col class="pt-0 pl-1">
                              <v-card-title class="text-h6">
                                {{ secundary_comment.attributes.author }}
                              </v-card-title>
                              <v-card-text>
                                <p style="white-space:initial; overflow-wrap:anywhere;">{{secundary_comment.attributes.descricao}}</p>
                              </v-card-text>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <v-card class="mb-5">
            <v-expansion-panels v-model="plane2" flat>
              <v-expansion-panel>
                <v-expansion-panel-title color="#FF4E48" disable-icon-rotate>
                  <p class="text-h5 mb-1 text-white">Adicionar comentário</p>
                  <template v-slot:actions>
                    <v-icon color="white">
                      mdi-window-minimize
                    </v-icon>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row class="mx-n6">
                  <v-divider class="mb-7"></v-divider>
                  </v-row>
                  <v-form id="form_comment">
                    <v-row>
                      <v-col>
                        <v-text-field name="nome" outlined label="Nome"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field name="email" outlined label="Email"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-textarea counter :rules="comment_rules" name="comentario" outlined label="Escreve o teu comentário"></v-textarea>
                    <v-row class="justify-start">
                      <v-btn variant="text" color="#FF4E48" class="mr-n4" @click="change">
                        Comentar
                        &nbsp;
                        <v-icon> mdi-message-text-outline </v-icon>
                      </v-btn>
                    </v-row>                
                  </v-form>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <v-card class="mb-5">
            <v-card-title class="d-flex align-center text-white">
              <router-link v-if="previous_article != null" :to="previous_article.attributes.slug">
                <v-btn :disabled="!pagination_active" icon="mdi-arrow-left" class="rounded" color="#FF4E48"></v-btn>
              </router-link>
              &nbsp; <span class="first_color">Artigo anterior</span>
              <v-spacer></v-spacer>
              <span class="first_color">Artigo seguinte</span> &nbsp; 
              <router-link v-if="previous_article != null" :to="next_article.attributes.slug">
                <v-btn :disabled="!pagination_active" icon="mdi-arrow-right" class="rounded" color="#FF4E48"></v-btn>
              </router-link>
            </v-card-title>
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
      article: {},
      autor: {},
      hashtags: [],
      next_article: null,
      previous_article: null,
      tab: null,
      dialog: false,
      valid: false,
      plane: 0,
      plane2: 0,
      comment_rules: [
        v => !!v || 'Campo obrigatório',
        v => (v && v.length <= 30) || 'No máximo 1000 caracteres',
      ],
      answer_active: [],
      like_active: false,
      disabled_active: false,
      pagination_active: false
    }
  },
  
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetch_data()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },

  methods: {
    async fetch_data(){
      this.valid = false
      var categories_aux = await axios('http://localhost:1337/api/categorias')
      this.categories = categories_aux.data.data
      var article_aux = await axios('http://localhost:1337/api/artigos/' + this.$route.path.substring(1).split('/').pop())
      this.article = article_aux.data.data
      console.log(this.article)
      var autor_aux = await axios('http://localhost:1337/api/autors/' + this.article.attributes.autor.data.id + '?populate=*')
      this.autor = autor_aux.data.data
      this.valid = true
      var articles_by_category = await axios('http://localhost:1337/api/artigos/categoria/' + this.article.attributes.categoria.data.attributes.tipo)
      articles_by_category = articles_by_category.data.data
      const index = articles_by_category.map(x => x.id).indexOf(this.article.id)
      if (index < articles_by_category.length - 1){
        if(index > 0)
          this.previous_article = articles_by_category[index - 1]
        else
          this.previous_article = articles_by_category[articles_by_category.length - 1]
        this.next_article = articles_by_category[index + 1]
        this.pagination_active = true
      }
      else if (index == articles_by_category.length - 1 && articles_by_category.length > 1 ){
        this.previous_article = articles_by_category[index - 1]
        this.next_article = articles_by_category[0]
        this.pagination_active = true
      }
    },

    async fetch_likes(like_active){
      const article = {}
      var likes

      if(!like_active)
        likes = parseInt(this.article['attributes']['likes']) + 1
      if(like_active)
        likes = parseInt(this.article['attributes']['likes']) - 1

      article['data'] = {"likes": likes}
      
      const response = await axios.put("http://localhost:1337/api/artigos/" + this.article['id'], article)
      this.article['attributes']['likes'] = response['data']['data']['attributes']['likes']
    },

    change(i){
      if(this.answer_active[i] == null)
        this.answer_active.push(false)
      this.answer_active[i] = !this.answer_active[i]
    },

    async change_likes(){
      if(this.disabled_active)
        return false
      this.disabled_active = !this.disabled_active
      await this.fetch_likes(this.like_active)
      this.like_active = !this.like_active
      this.disabled_active = !this.disabled_active
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

.categories_divider{
  border-color: #FF4E48 !important;
}

.v-application .primary{
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
