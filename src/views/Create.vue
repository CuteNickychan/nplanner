<template>
  <div
    class="create pt-5 pb-5"
    :style="{'background-image':'url(https://cdn.discordapp.com/attachments/476737014780264448/749210280453603378/unknown.png)'}"
    style="min-height:100vh"
  >
    <b-container align-v="center" class="bg-light rounded">
      <b-form-row class="pt-3">
        <b-form-row class="col-md-6 col-lg-8 col-xl-9 justify-content-start">
          <b-container
            class="col-xs-12 col-lg-8 justify-content-start mx-0 mb-3"
            :class="centerClass"
          >
            <b-form-group id="input-group-1" label-for="input-1">
              <b-form-input id="input-1" type="text" required placeholder="Title" v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label-for="input-2" label="Kurzbeschreibung">
              <b-form-textarea
                id="input-2"
                v-model="shortDesc"
                placeholder="Beschreibe das Event in 1-2 Sätzen"
                max-rows="2"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group id="input-group-3" label-for="input-3" label="Beschreibung">
              <b-form-textarea
                id="input-3"
                v-model="Desc"
                placeholder="Beschreibe das Event ausführlich"
                rows="4"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group id="input-group-4">
              <b-row>
                <div class="col-sm-6">
                  <b-form-group id="input-group-4-1" label-for="datepicker" label="Datum">
                    <b-form-datepicker id="datepicker" v-model="date"></b-form-datepicker>
                  </b-form-group>
                </div>
                <div class="col-sm-6">
                  <b-form-group id="input-group-4-2" label-for="timepicker" label="Zeit">
                    <b-form-timepicker id="timepicker" v-model="time" locale="de"></b-form-timepicker>
                  </b-form-group>
                </div>
              </b-row>
            </b-form-group>
            <b-button variant="primary" class="col-12" @click="validateAndSave()">Apply</b-button>
          </b-container>
        </b-form-row>
        <b-form-row class="justify-content-end col-md-6 col-lg-4 col-xl-3" :class="centerClass">
          <event-card :img="img" :name="name" :shortDesc="shortDesc" :date="date" :time="time"></event-card>
        </b-form-row>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";

export default {
  components: { "event-card": EventCard },
  data() {
    return {
      centerClass: "",
      Desc: "",
      events: [],
      text: "",
      name: "",
      shortDesc: "",
      date: "",
      time: "",
      img:
        "https://cdn.discordapp.com/attachments/743104050744262797/748929414607405197/IMG_20200828_173755.jpg"
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },
  methods: {
    getWindowWidth() {
      if (document.documentElement.clientWidth < 768) {
        this.centerClass = "justify-content-center";
      } else {
        this.centerClass = "";
      }
    },
    async validateAndSave() {
        alert("SAVED");
      const res = await fetch("events.json");
      this.events = await res.json();
      console.log(this.events);
      this.events.push({
        name: this.name,
        date: this.date,
        start: this.time,
        img:
          "https://cdn.discordapp.com/attachments/743104050744262797/748929414607405197/IMG_20200828_173755.jpg",
        shortDesc: this.shortDesc,
        id: this.events.length
      });
      var fs = require("fs");
      fs.writeFile("myjsonfile.json", this.events, "utf8");
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
}
</style>