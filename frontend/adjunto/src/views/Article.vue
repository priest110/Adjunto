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
          <v-card class="mb-5" >
            <v-card-title>
              &nbsp;
              <v-icon>
                mdi-calendar
              </v-icon>
              {{ article.attributes.createdAt.substr(0,10) }}
              &nbsp;&nbsp;&nbsp;
              <v-icon color="#FF4E48">
                mdi-tag
              </v-icon> 
              <span class="first_color">
                {{ article.attributes.categoria.data.attributes.tipo }}
              </span>
              <v-spacer></v-spacer>
              <v-btn :disabled="disabled_active" :input-value="like_active" plain @click="change_likes()">
                <v-icon class="first_color">
                  mdi-heart-outline
                </v-icon>
              </v-btn>
              &nbsp;
              <span class="text-h5 ml-n5">
                {{ article.attributes.likes }}
              </span>
              &nbsp;
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text class="text-left text-h5">
              &nbsp; {{ article.attributes.descricao }}
            </v-card-text>
          
            <v-divider v-if="(hashtags != null)"></v-divider>

            <v-card-title v-if="hashtags != null">
              &nbsp;
              <span v-for="(tag, i) in hashtags" :key="i" class="first_color">
                #{{tag}}&nbsp;
              </span>
            </v-card-title> 
          </v-card>

          <v-card class="mb-5">
            <v-expansion-panels v-model="plane" flat>
              <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                  <p class="text-h5 mb-1">Comentários</p>
                  <template v-slot:actions>
                    <v-icon color="">
                      mdi-window-minimize
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row class="mx-n6">
                    <v-divider class="mb-7"></v-divider>
                  </v-row>
                  <v-row class="mt-2">
                    <v-col cols="2">
                      <v-avatar tile v-if="autor.attributes.avatar != null" :image="'http://localhost:1337' + autor.attributes.avatar.data.attributes.url" size="80" class="ml-2 mt-3 rounded-lg"></v-avatar>
                    </v-col>
                    <v-col class="ml-n4">
                      <v-card-title class="mt-n5 first_color">
                        Autor
                      </v-card-title>
                      <v-card-title class="mt-n10 text-h6 text-left">
                        {{ autor.attributes.nome }}
                      </v-card-title>
                    </v-col>
                  </v-row>
                  <v-card-text class="text-left mt-n8">
                    {{ autor.attributes.descricao }}
                  </v-card-text>
                  <v-card-actions  v-if="!answer_active" class="my-n3">
                    <v-btn text color="#FF4E48" class="mr-n4" @click="change">
                      Responder 
                      <v-icon> mdi-android-messages </v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-form v-else id="form_answer">
                    <v-row>
                      <v-col>
                        <v-text-field name="nome" color="#FF4E48" outlined label="Nome"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field name="email" color="#FF4E48" outlined label="Email"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-textarea counter :rules="comment_rules" name="comentario" color="#FF4E48" outlined label="Escreve o teu comentário"></v-textarea>
                    <v-row class="justify-start">
                      <v-btn text color="#FF4E48" class="ml-3 mb-3" >
                        Comentar 
                        <v-icon>mdi-android-messages</v-icon>
                      </v-btn>
                      <v-btn text class="ml-3 mb-3" @click="change()">
                        Cancelar
                        <v-icon>mdi-exit</v-icon>
                      </v-btn>
                    </v-row>                
                  </v-form>
                  <v-list v-if="article.attributes.comentarios > 0">
                    <v-list-item v-for="(comment, i) in article.attributes.comentarios" :key="i">
                      <v-card flat> 
                        <v-row class="mt-2">
                          <v-col cols="2">
                            <v-avatar tile height="50" width="50" class="ml-4 rounded-lg">
                              <v-img v-if="post.acf != 'false'" :src="post.acf.imagem.url"></v-img>
                            </v-avatar>
                          </v-col>
                          <v-col class="ml-n4">
                            <v-card-title class="mt-n5 first_color">
                              Autor
                            </v-card-title>
                            <v-card-title class="mt-n10 text-h6 text-left">
                              {{ autor.attributes.nome }}
                            </v-card-title>
                          </v-col>
                        </v-row>
                        <v-row class="ml-0 mt-n7">
                          <v-card-text class="text-left ">
                            {{ autor.attributes.descricao }}
                          </v-card-text>
                        </v-row>
                      </v-card>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <v-card class="mb-5">
            <v-expansion-panels v-model="plane2" flat>
              <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                  <p class="text-h5 mb-1">Adicionar comentário</p>
                  <template v-slot:actions>
                    <v-icon color="">
                      mdi-window-minimize
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row class="mx-n6">
                  <v-divider class="mb-7"></v-divider>
                  </v-row>
                  <v-form id="form_comment">
                    <v-row>
                      <v-col>
                        <v-text-field name="nome" color="#FF4E48" outlined label="Nome"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field name="email" color="#FF4E48" outlined label="Email"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-textarea counter :rules="comment_rules" name="comentario" color="#FF4E48" outlined label="Escreve o teu comentário"></v-textarea>
                    <v-row class="justify-start">
                      <v-btn text color="#FF4E48" class="ml-3 mb-3" >
                        Comentar 
                        <v-icon>mdi-android-messages</v-icon>
                      </v-btn>
                    </v-row>                
                  </v-form>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <v-card class="mb-5">
            <v-card-title class="first_color">
              <v-btn icon class="rounded" outlined color="#FF4E48">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              &nbsp; Artigo anterior
              <v-spacer></v-spacer>
              Artigo seguinte &nbsp; 
              <v-btn icon class="rounded" outlined color="#FF4E48">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
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
      tab: null,
      dialog: false,
      valid: false,
      plane: 0,
      plane2: 0,
      comment_rules: [
        v => !!v || 'Campo obrigatório',
        v => (v && v.length <= 30) || 'No máximo 1000 caracteres',
      ],
      answer_active: false,
      like_active: false,
      disabled_active: false,
      type: 'guest',
    }
  },
  
  created() {
    this.fetch_data()
  },

  methods: {
    async fetch_data(){
      var categories_aux = await axios('http://localhost:1337/api/categorias')
      this.categories = categories_aux.data.data
      var article_aux = await axios('http://localhost:1337/api/artigos/' + this.$route.path.substring(1).split('/').pop())
      this.article = article_aux.data.data
      var autor_aux = await axios('http://localhost:1337/api/autors/' + this.article.attributes.autor.data.id + '?populate=*')
      this.autor = autor_aux.data.data
      this.hashtags = this.article.attributes.hashtags.map(obj => obj.hashtag)
      console.log(this.autor.attrib)
      this.valid = true
    },

    async fetch_likes(like_active){
      const article = this.post

      if(!like_active)
        article['acf']['gostos'] = parseInt(article['acf']['gostos']) + 1
      if(like_active)
        article['acf']['gostos'] = parseInt(article['acf']['gostos']) - 1
      
      const response = await axios.post("https://adjunto.pt/wp-json/artigos/v1/post", article);
      console.log("Response" + response.data)
    },

    change(){
      this.answer_active = !this.answer_active
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

/* Change to default site color */
.v-window-item .v-card-title:hover, .first_color{
  color: #FF4E48 !important;
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
