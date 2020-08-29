import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events:[],
    displayEvents:[],
    rows:0
  },
  mutations: {
    SET_EVENTS(state,events){
      state.events=events;
    },
    SET_ROWS(state,rows){
      state.rows=rows;
    },
    SET_DISPLAY_EVENTS(state,displayEvents){
      state.displayEvents = displayEvents;
    }
  },
  actions: {
    async fetchData(){
      return new Promise(resolve=> {
        setTimeout(async () => {
          const res = await fetch("events.json");
          const val = await res.json();
          resolve(val);
        },1);
      });
    },
    async fetchEvents({dispatch,commit},{perPage})
    {
      const myJson = await dispatch("fetchData");
      commit("SET_EVENTS", myJson);
      commit("SET_ROWS", myJson.length );
      const displayEvents = myJson.slice(0,perPage);
      commit("SET_DISPLAY_EVENTS",displayEvents);
      commit("SET_ROWS" , myJson.length);
    },
    async paginate({commit,state},{currentPage,perPage})
    {
      const start = (currentPage-1) * perPage;
      const events = state.events.slice(start,start+perPage);
      commit("SET_DISPLAY_EVENTS",events);
    },
    updatePagination({commit,dispatch},{myJson,currentPage,perPage}){
      commit("SET_EVENTS",myJson);
      commit("SET_ROWS",myJson.length);
      dispatch("paginate",{currentPage,perPage});
    },
    async search({dispatch},{text})
    {
      const myJson = await this.dispatch("fetchData");
      const values = myJson.filter(val => 
        val.name.toLowerCase().includes(text.toLowerCase()));
      dispatch("updatePagination",{myJson:values,currentPage:1,perPage:12})
    }
  },
  getters: {
    events(state){
      return state.events;
    },
    rows(state){
      return state.rows;
    },
    displayEvents(state){
      return state.displayEvents;
    }
  },
  modules: {}
});
