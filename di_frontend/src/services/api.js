import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';  // Url vers les API DI-Backend

// Fonction générique pour effectuer des requêtes GET
export const get = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Fonction générique pour effectuer des requêtes POST
export const post = async (url, body) => {
  try {
    const response = await axios.post(`${BASE_URL}${url}`, body);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Fonction générique pour effectuer des requêtes PUT
export const put = async (url, body) => {
  try {
    const response = await axios.put(`${BASE_URL}${url}`, body);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Fonction générique pour effectuer des requêtes DELETE
export const remove = async (url) => {
  try {
    const response = await axios.delete(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

// invoiceService.js
export const deleteInvoice = async (invoiceId) => {
  try {
    // Effectuer la requête pour supprimer la facture avec l'ID donné
    const response = await fetch(`/api/invoices/delete${invoiceId}`, {
      method: 'DELETE',
      // Autres options de requête (headers, body, etc.) si nécessaire
    });

    // Vérifier si la suppression a réussi (statut 204 No Content)
    if (response.status === 204) {
      return true; // Succès
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
};
