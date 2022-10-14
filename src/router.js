import { createRouter, createWebHistory } from "vue-router";

//Pages
import HomePage from "./pages/HomePage.vue";
import ProfileSearch from "./pages/ProfileSearch.vue";
import TaskSearch from "./pages/TaskSearch.vue";
import PlayerProfile from "./pages/PlayerProfile.vue";
import PlayerTasksOverview from "./pages/PlayerTasksOverview.vue";
import RevosectBenchmarksPage from "./pages/RevosectBenchmarksPage.vue";
import VoltaicBenchmarksPage from "./pages/VoltaicBenchmarksPage.vue";
import TaskView from "./pages/TaskView.vue";
// import TaskLeaderboard from "./pages/TaskLeaderboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    {
      path: "/profile",
      component: ProfileSearch,
      beforeEnter: (_, from) => {
        if (from.name == "profile-overview") {
          sessionStorage.removeItem("currentPlayer");
        }
        if (sessionStorage.getItem("currentPlayer")) {
          router.push("/profile/" + sessionStorage.getItem("currentPlayer"));
        }
      },
    },
    {
      path: "/profile/:username",
      component: PlayerProfile,
      props: true,
      children: [
        {
          path: "",
          redirect: { name: "profile-overview" },
        },
        {
          name: "profile-overview",
          path: "overview",
          component: PlayerTasksOverview,
        },
        {
          name: "vt-benches",
          path: "voltaic",
          component: VoltaicBenchmarksPage,
        },
        {
          name: "ra-benches",
          path: "revosect",
          component: RevosectBenchmarksPage,
        },
      ],
    },
    {
      path: "/tasks",
      component: TaskSearch,
      beforeEnter: (_, from) => {
        if (from.name == "task-view") {
          sessionStorage.removeItem("currentTask");
        }
        if (sessionStorage.getItem("currentTask")) {
          router.push("/tasks/" + sessionStorage.getItem("currentTask"));
        }
      },
    },
    {
      path: "/tasks/:taskId",
      redirect: { name: "task-view" },
    },
    {
      name: "task-view",
      path: "/tasks/:taskId/leaderboard",
      component: TaskView,
      props: true,
    },

    // { path: "/:notFound(.*)", component: null },
  ],
});

export default router;
