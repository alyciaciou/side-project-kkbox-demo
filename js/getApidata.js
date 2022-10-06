
import { kkboxConfig } from "./configs.js"

const hitsResponse = await axios.get("https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW&limit=4",kkboxConfig)

const sessionResponse = await axios.get("https://api.kkbox.com/v1.1/session-playlists?territory=TW&limit=4",kkboxConfig)

export{hitsResponse,sessionResponse}
