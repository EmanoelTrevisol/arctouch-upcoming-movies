## Dependencies

- Node ^10
- Npm ^6 or Yarn ^1

## Architecture

### App Logic

This application collects information from TMDB API using a cron job and stores it in it's own database. This way, there always is information stored in the db and the app is not dependent on the TMDB API for it's usage. In other words, the ultimate user will be able to see and search for the upcoming movies even if the TMDB API is unavailable.

### Application

For this application I used the MEVN stack which uses MongoDB, Express.js, Vue.js and NodeJS. The root directory of the application has two main directories: `backend/` and `frontend/`.

#### Backend

Within this directory backend of the application. The APIs, database connection and data persistence logic are written here.

There are three special directories: `_config/`, `_crons/` and `public/`.

The directory`_config/` has the configuration files for the backend, such as database connection, TMDB API key, app bootstraping and general configuration.

The directory `_crons/` has the `index.js` file which starts all the cronjobs in the app. I will give more details about the cron later. Inside the `_crons` directory there is also the `CronLogManager.js` file, `model` directory and it's `CronLogModel.js` and `CronLogStatics.js` files. These files are responsible for the logs of the crons. Each time a cronjob runs, it is created a log in the database to save it's informations such as init time, finish time and it's results, of course. Each of these files has a specific role that we will dig a little deeper soon.

Last but not least, the `cronFiles` directory. This directory contains the `syncTMDB.js` file which is the cronjob itself to synchronize data with TMDB. It's exports contains a string, which is the cron name and it's configuration, such as, the time pattern to run ([this will help](https://www.npmjs.com/package/cron#cron-ranges)), and the action to perform when that time comes.

This cron itself is very simple. It makes a request to TMDB upcoming movies API, parses the first results and keeps on requesting all its pages (which is returned by the API) and then, sanitizes/adds some data and stores it in the database. There is an assumption made in the logic that will be discussed in the assumptions section.

The `public/` directory has the `html`, `js` and `css` served to the user when the site is accessed.

As for the others (most of them) directories in the app, it follows a pattern. The application is organized by feature, which means that a certain feature will have all it's related logic and files within that directory. The best (and basically only) example in this application is the `movies` directory. The basic structure is the `MovieApi.js` file which declares the APIs; `MovieManager.js` is responsible for the business logic (database fetch, save, etc...); `model/MovieModel.js` which is the mongoose schema; `model/MovieStatics.js` contains some static information used in the logic, in this case is the statuses enum options to save in the database; `services/TMDBService.js` is responsible for fetching data from the TMDB API. `model/Movie.js` is a class Movie which is used to parse and sanitize the data fetched from the TMDB API.

When scaling this application, this is the structure that should be followed. Note that the required files and name patterns are only the `model/*Model.js` and `*Api.js` which should follow this pattern. The application is configured to scan all it's directories and read the API and Model files accordingly to facilitate setup, mainly for the APIs.

#### Frontend

This directory contains the user interface logic. It is used for development only and when built, has it's dist files moved to the `../backend/public` directory for public access.

To start this project I used the `vue-cli` tool which gives me a simple boilerplate.

The directory structure here is different, but just as simple as the backend's: The `frontend/` directory contains some (way more than the backend) configuration files such as `jsconfig.json` and `vue.config.js` which are very important, but I will let you dive into the [documentation](https://cli.vuejs.org/guide/creating-a-project.html) for more detail.

The main directory is the `src`. It contains the interfaces, navigation and connectino to the API files. Firstly, let's talk about the `main.js` file which sets up the application by consuming configuration files in the `config/` directory, `router.js` file for [Vue Router](https://router.vuejs.org/) configuration, `store.js` for the [Vuex](https://vuex.vuejs.org/) configuration and bootstraps a VueJS instance, which is the frontend application itself.

The `App.vue` contains the root component, but this can be changed since it is not a rule, but it is the default, so I didn't change it.

The `modules` directory contains the modules of the application. In this app, I only created the `movies` directory since this is the only interface in the application, for now. It's structure is very simple: `api/` contains the logic for fetching data from the (our, not TMDB) API; `components/` has some general components to this module. Note that in the `src/` directory there is also a `components/` directory, but I only created system wide components there (such as a spinner). The `routes/` directory contains the module's routes information. FOr this application we only used two: The list `mmovies/` and detail `movies/<movieId>`. In this file contains the routes config, such as, the path, route name and component that will be rendered to the user when the route is accessed. The `store/` directory contains all the store logic. [Here](https://vuex.vuejs.org/) you can read more about how the store works and the files within this directory. The `views/` directory has the components that will be rendered to the user, ie, the interface. For this module there are only two files: `List.vue` which is the list interface and the `Detail.vue` which renders the detail page interface. Lastly, the `index.js` file exports in a single file the routes and store config for so the root `routes.js` and `store.js` can import and use the module information.

## Assumptions

Tao assumptions were made during the development.

### #1

I assumed that the movies that are no longer 'upcoming' will simply be removed from the API. This way, everytime the cronjob runs the app compares the movies it has stored with (all) the movies returned from the TMDB API. If the movie is store in our database but it is not present in the API results, this particular movie will have it's `status` set to `DELETED` and will not be shown to the user anymore, since it's not in the API results.

### #2

Since the API does not return any information about when a particular movie has it's information updated, everytime the cronjob runs, all movies are updated. I know this may seem costly but, with the [Model.bulkWrite()](https://mongoosejs.com/docs/api.html#model_Model.bulkWrite) method, this operation is fast and very light, thus, all movies are updated when the cronjob runs in case the movie had it's information updated.

## Run instructions

While in development, I recommend you start the application with two separate terminal instances.

In the first one:

```
cd backend/
yarn
yarn run dev
```

And in the second:

```
cd frontend/
yarn
yarn run serve
```

Instructions on how to access the running instance will appear in each terminal window.

## Build instructions

To build the application, there is only one command that you'll need to run. First `cd frontend/` and simply run `yarn run build`. This command build the frontend application and move it to the `server/public/` directory as mentioned in the backend architecture section.

When the build finishes, your application is ready to be shiped.

## Third Party Libs

- [axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and node.js. Used to access TMDB API and the application api from the frontand as well.
- [boom](https://www.npmjs.com/package/@hapi/boom): HTTP-friendly error objects. Used to facilitate error creation and management.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Comes by default with the Express.js boilerplate
- [cors](https://www.npmjs.com/package/cors): Node.js CORS middleware. This package provides configs for the express.js server. With this package `http://localhost:3000` (frontend) can access `http://localhost:8888` (backend apis).
- [cron](https://www.npmjs.com/package/cron): Cron jobs for your node. Package responsible for the CronJobs in this project.
- [express](https://www.npmjs.com/package/express): Web framework. Used to create the backend logic
- [glob](https://www.npmjs.com/package/glob): Scans projects directory for file names matching a pattern.
- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for node.js. Comes by default with the Express.js boilerplate
- [mongoose](https://www.npmjs.com/package/mongoose): Mongoose MongoDB ODM.
- [moment](https://www.npmjs.com/package/moment): Date manipulator
- [qs](https://www.npmjs.com/package/qs): Lib to parse and stringify querystring objects.
- [nodemon](https://www.npmjs.com/package/nodemon): Runs the node app while watching for file changes and restarts it automatically.
- @fortawesome/fontawesome-svg-core, @fortawesomefree-solid-svg-icons, @fortawesome/vue-fontawesome: Fontawesome icons and component for VueJS.
- [bootstrap-vue](https://www.npmjs.com/package/bootstrap-vue): Bootstrap ready and adapted to VueJS.
- [vue](https://vuejs.org/): Javascript framework. Used to build rich, interactive interfaces
- [vue-router](https://router.vuejs.org/):
- [vue-toasted](https://www.npmjs.com/package/vue-toasted): Toast plugin
- [vue-wait](https://www.npmjs.com/package/vue-wait): Vue plugin for loading management
- [vuex](https://vuex.vuejs.org/): State management for VueJS
- [lodash](https://lodash.com/): Utility library
