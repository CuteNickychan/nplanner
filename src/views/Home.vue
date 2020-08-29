<template>
  <b-container  align-v="center ">
    <b-row class="justify-content-center pt-4 pb-1">

      <event-card
      
        :img="event.img"
        :name="event.name"
        :shortDesc="event.shortDesc"
        :date="event.date"
        :time="event.start"
        v-for="event in displayEvents"
        :key="event.id"
        class="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-2"
      ></event-card>

    </b-row>
   
        
        
        

    <b-pagination
      class="pb-4"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      align="fill"
      @input="paginate(currentPage)"
    ></b-pagination>
   
  </b-container>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { "event-card": EventCard },
  computed: {
    ...mapGetters(["events", "displayEvents", "rows"])
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 12
    };
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchEvents",{perPage: this.perPage});
    },
    paginate(currentPage) {
      this.$store.dispatch("paginate", { currentPage, perPage: this.perPage });
    }
  }
};
</script>
