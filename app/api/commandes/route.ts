import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📦 Commande reçue:', body);
    
    const { nom, email, telephone, adresse, articles, typeCommande, commentaires } = body;
    
    // Validation simple
    if (!nom || !email || !telephone || !articles || articles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Informations manquantes' },
        { status: 400 }
      );
    }

    // Calcul du total
    const total = articles.reduce((sum: number, article: any) => {
      return sum + (article.prix * article.quantite);
    }, 0);

    // Envoi de l'email (simulation)
    await sendOrderEmail({
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      adresseLivraison: typeCommande === 'livraison' ? { rue: adresse } : undefined,
      typeCommande,
      items: articles,
      total,
      message: commentaires || ''
    });

    return NextResponse.json({
      success: true,
      message: 'Commande envoyée avec succès ! Nous vous contacterons rapidement.',
      total: total.toFixed(2)
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erreur commande:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la commande' },
      { status: 500 }
    );
  }
}