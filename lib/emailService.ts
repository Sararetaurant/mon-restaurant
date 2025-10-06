import nodemailer from 'nodemailer';

// Configuration SIMPLE - utilisez votre Gmail normal
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'votre.email@gmail.com',
    pass: process.env.EMAIL_PASS || 'votre-mot-de-passe-gmail'
  }
});

export async function sendReservationEmail(reservationData: any) {
  try {
    // 1. Afficher dans la console (pour voir immédiatement)
    console.log('🎯 RÉSERVATION REÇUE - À APPELER:', reservationData.telephone);
    
    // 2. Envoyer un email réel
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `📅 Réservation - ${reservationData.nom} - ${reservationData.date} ${reservationData.heure}`,
      text: `
NOUVELLE RÉSERVATION

Client: ${reservationData.nom}
Téléphone: ${reservationData.telephone}
Email: ${reservationData.email}

Date: ${reservationData.date}
Heure: ${reservationData.heure}
Personnes: ${reservationData.nombrePersonnes}

Message: ${reservationData.message || 'Aucun'}

À appeler rapidement !
      `
    });

    console.log('✅ Email envoyé !');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Erreur email, mais affichage console:', error);
    // Même en cas d'erreur email, on affiche dans la console
    console.log('📞 APPELER IMMÉDIATEMENT:', reservationData.telephone);
    return { success: true }; // On retourne quand même success pour le client
  }
}

export async function sendOrderEmail(orderData: any) {
  try {
    console.log('🎯 COMMANDE REÇUE - À APPELER:', orderData.telephone);
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `📦 Commande - ${orderData.nom} - ${orderData.total}€`,
      text: `
NOUVELLE COMMANDE

Client: ${orderData.nom}
Téléphone: ${orderData.telephone}
Email: ${orderData.email}

Type: ${orderData.typeCommande}
Total: ${orderData.total}€

Articles:
${orderData.items.map((item: any) => `- ${item.nom} (${item.quantite}x ${item.prix}€)`).join('\n')}

Message: ${orderData.message || 'Aucun'}

À appeler rapidement !
      `
    });

    console.log('✅ Email commande envoyé !');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Erreur email commande:', error);
    console.log('📞 APPELER COMMANDE:', orderData.telephone);
    return { success: true };
  }
}