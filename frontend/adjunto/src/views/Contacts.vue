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
            Submeter artigos
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
          <v-card flat color="transparent">
            <v-form>
              <v-row>
                <v-col>
                  <v-text-field name="nome" label="Nome" :rules="[v => !!v || 'Campo obrigatório']"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field name="email" label="Email" :rules="[v => !!v || 'Campo obrigatório']"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-text-field name="telefone" label="Telefone" :rules="[v => !!v || 'Campo obrigatório']"></v-text-field>
                </v-col>
                <v-col>
                </v-col>
              </v-row>
              <v-text-field name="tema" label="Tema" :rules="[v => !!v || 'Campo obrigatório']"></v-text-field>
              <v-textarea name="artigo" label="Artigo" :rules="article_rules"></v-textarea>
              <v-row no-gutters>
                <v-col>
                  <v-file-input name="ficheiro" label="Ficheiro" :rules="file_rules" multiple dense accept="image/png, image/jpeg, image/bmp" type="file" show-size truncate-length="25" ></v-file-input>
                </v-col>
                <v-col>
                </v-col>
              </v-row>
              <v-btn class="ml-2 mb-2 d-flex justify-start" variant="outlined" color="#FF4E48">Envia</v-btn>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="2">
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
        valid: false,
        categories: [],
        article_rules: [
          v => !!v || 'Campo obrigatório',
          v => (v && v.length <= 30) || 'No máximo 1000 caracteres',
        ],
        file_rules: [
            value => !value || value.size < 1000000 || 'Tamanho do ficheiro no máximo com 1 MB!',
          ],
      }
    },
    
    async created() {
      await this.fetch_data()
      this.valid = true
    },
  
    methods: {
      async fetch_data(){
        var categories_aux = await axios('http://localhost:1337/api/categorias')
        this.categories = categories_aux.data.data
      }
    }
  }
  </script>
  
  <style>
  </style>