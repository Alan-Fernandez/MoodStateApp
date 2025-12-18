import api from './api'

export default {
  async getRandomJoke() {
    const response = await api.get('/jokes/random')
    return response.data
  }
}
