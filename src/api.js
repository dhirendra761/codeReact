import axios from "axios";

export default {
  games: {
    fetchAll: () => axios.get("/api/unsafegames").then((res) => res.data.games),
  },
};
