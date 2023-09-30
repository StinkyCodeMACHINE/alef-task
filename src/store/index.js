import { createStore } from "vuex";

export default createStore({
  state: {
    isPreview: false,
    data: {
      parent: {
        name: {
          value: "",
          isEmpty: false,
        },
        age: {
          value: "",
          isEmpty: false,
        },
      },
      kids: [
        
      ],
    },
  },
  mutations: {
    changeIsPreview(state, payload) {
      state.isPreview = state.data ? payload : state.isPreview;
    },
    saveData(state, payload) {
      state.data = payload;
      state.isPreview = true;
    },
  },
});
