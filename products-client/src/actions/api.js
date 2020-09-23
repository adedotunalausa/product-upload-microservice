import axios from "axios"

const baseUrl = "http://localhost:4040/"

export default {
  products(url = baseUrl + "products/") {
    return {
      fetchAll: () => axios.get(url),
      fetchById: id => axios.get(url + id),
      create: newRecord => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: id => axios.delete(url + id)
    }
  }
}
