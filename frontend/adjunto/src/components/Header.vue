<template>
    <v-container fluid class="mb-16 pa-0">
      <v-row>
        <v-card color="black" flat tile  width="100%" height="150px">
          <v-row class="parent">
              <v-col cols="4" >
                <v-img gradient="rgba(0,0,0,0.7), rgba(0,0,0,0.7)" class="d-inline-block" width="90%" style="margin-top:-15%;" src="http://localhost:1337/uploads/logo_137a28036a.png"></v-img>
              </v-col>
              <v-col cols="4">
                <v-img class="d-inline-block mt-5" width="300px" alt="user" src="http://localhost:1337/uploads/Logo_adjunto_79a46c3032.svg"></v-img>
              </v-col>
              <v-col cols="4">
                <v-btn max-width="300px" color="white" href="https://www.adjunto.pt/contact" class="text-center mt-15" variant="plain">+ Submeter artigos</v-btn>
                <v-divider class="button_divider"></v-divider>
              </v-col>
            </v-row>
        </v-card>
      </v-row>
    </v-container>
  </template>
  
  <style>

  .button_divider{
    border-color: #FF4E48 !important;
    margin-left: 36%;
    margin-right: 36%;
  }
  </style>