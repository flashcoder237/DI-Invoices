import React from 'react';

const SuccessPage = (props) => {
  const { location } = props;
  const invoice = location.state && location.state.invoice;

  if (!invoice) {
    // Gérer le cas où il n'y a pas de données de facture valides
    return <div>Erreur: Aucune facture n'a été trouvée.</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Facture enregistrée avec succès</h2>
      <div className="mb-4">
        <strong>Numéro de facture:</strong> {invoice.invoiceId}
      </div>

      {/* Afficher d'autres détails de la facture ici */}
      <div>
        {/* Exemple: Afficher les articles de la facture */}
        <h3 className="text-xl font-bold mb-2">Articles de la facture</h3>
        <ul>
          {invoice.items.map((item, index) => (
            <li key={index}>
              {item.name} - Quantité: {item.quantity}, Prix: {item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuccessPage;
