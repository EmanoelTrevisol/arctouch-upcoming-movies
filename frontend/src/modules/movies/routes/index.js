export default [
  {
    path: "/movies",
    name: "movies-list",
    component: () =>
      import(/* webpackChunkName: "movies" */ "../views/List.vue")
  },
  {
    path: "/movies/:movieId",
    name: "movie-detail",
    component: () =>
      import(/* webpackChunkName: "movies" */ "../views/Detail.vue"),
    props: true
  }
];
