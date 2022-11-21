<template>
    <v-container fluid class="mb-16">
      <v-row>
        <v-card color="black" flat tile  width="100%" height="150px">
          <v-row class="parent">
              <v-col cols="4" >
                <v-img gradient="rgba(0,0,0,0.7), rgba(0,0,0,0.7)" class="d-inline-block" width="80%" height="150px" src="http://localhost:1337/uploads/Logo_Background_22cf4a31e9.svg"></v-img>
              </v-col>
              <v-col cols="4">
                <v-img class="d-inline-block mt-5" width="50%" alt="user" src="http://localhost:1337/uploads/Logo_adjunto_79a46c3032.svg"></v-img>
              </v-col>
              <v-col cols="4">
                <v-btn color="white" href="https://www.adjunto.pt/contact" class="mt-15" text>+ Submeter artigos</v-btn>
                <v-divider class="button_divider"></v-divider>
              </v-col>
            </v-row>
        </v-card>
      </v-row>
    </v-container>
  </template>
  
  <style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  h1, h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
  
  .button_divider{
    border-color: #FF4E48 !important;
    width: 29%;
    margin-left: 221px;
  }
  
  .first_color{
    color: #FF4E48 !important;
  }
  
  .out_of_margins{
    width: 113.5% !important;
  }
  
  .facebook_tag{
    color: #0C88EF;
  }
  
  .child { /* This is the item to center... */
    display: inline-block;
  }
  .parent { /* ...and this is its parent container. */
    text-align: center;
  }
  
  </style>