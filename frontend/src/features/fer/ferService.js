import axios from "axios";

const API_URL = "/api/fer/";

// Get emotions
const getEmotions = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const goalService = { getEmotions };

export default goalService;
