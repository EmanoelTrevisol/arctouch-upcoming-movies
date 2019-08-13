import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  position: "bottom-center",
  iconPack: "material",
  duration: 5000
});

Vue.toasted.register(
  "error",
  msg => {
    return typeof msg === "string" ? msg : "Algo deu errado, tente novamente.";
  },
  {
    type: "error",
    icon: "close"
  }
);
