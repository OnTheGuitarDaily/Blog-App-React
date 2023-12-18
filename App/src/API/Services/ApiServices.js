import apiService from "../axios";

export const fetchData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    const data = response.data;
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const postData = async(endpoint, data) => {
    try {
      const response = await apiService.post(endpoint, data);
      console.log('Data posted successfully:', response);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
export const deleteData = async (endpoint) => {
    try {
      const response = await apiService.delete(endpoint);
      console.log('Data deleted successfully:', response);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

export const putData = async (endpoint, data) => {
  try {
    const response = await apiService.edit(endpoint, data);
    console.log('Data updated successfully:', response);
  } catch (error) {
    console.error('Error updating data:', error);
  }
}



  