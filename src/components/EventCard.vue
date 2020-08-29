<template>
  <div  >
    <b-col class="px-0">
      <b-card
        @mouseover="hover()" 
        @mouseout="endHover()"
        :title="name"
        :img-src="img"
        
        

        img-width="300px"
        img-height="300px"
        img-alt="Job-info"
        img-top
        tag="article"
        
        class="mb-2"
        :class="hovering"
      >
        <b-card-text>{{shortDesc}}</b-card-text>

        <template v-slot:footer>
          <b-card-text>
            <b>
              <b-row>
                <b-col>{{date}}</b-col>
                <b-col>{{time}}</b-col>
              </b-row>
            </b>
          </b-card-text>
        </template>
      </b-card>
    </b-col>
  </div>
</template>

<script>


export default {
  props: ["name", "img", "shortDesc", "date", "time",],
  data(){
    return{
      hovering: ""
    };
  },
  methods:
  {
    hover()
    {
        this.hovering="border-primary";
    },
    endHover(){
        this.hovering="";
    }
  }
};


</script>


<style lang="scss" scoped>
.card-img-top {
    width: 100%;
    height: 15;
    object-fit: cover;
}


</style>