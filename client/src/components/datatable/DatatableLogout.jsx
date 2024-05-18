import React, { useEffect } from 'react';
import axios from 'axios';

const DatatableLogout = () => {
  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Appeler la route de déconnexion du serveur
        const response = await axios.get('http://localhost:5000/logout');
        console.log(response.data); // Vérifier la réponse du serveur
        // Supprimer les données de l'utilisateur dans le localStorage ou dans l'état global si nécessaire
        localStorage.removeItem('token');
        // Rediriger l'utilisateur vers le tableau de bord ou une autre page appropriée
        window.location.href = '/'; // Redirection vers le tableau de bord
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      }
    };

    logoutUser(); // Appeler la fonction de déconnexion au chargement du composant
  }, []); // Utiliser un tableau vide pour s'assurer que cette fonction est exécutée une seule fois après le rendu initial

  return (
    <div>
      <p>Vous êtes en train de vous déconnecter...</p>
      {/* Vous pouvez également ajouter une animation de chargement ou un message */}
    </div>
  );
};

export default DatatableLogout;

