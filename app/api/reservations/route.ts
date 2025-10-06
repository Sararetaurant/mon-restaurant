import { NextRequest, NextResponse } from 'next/server';
import { sendReservationEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📅 Réservation reçue:', body);
    
    const { nom, email, telephone, date, heure, nombrePersonnes, message } = body;
    
    // Validation simple
    if (!nom || !email || !telephone || !date || !heure || !nombrePersonnes) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Envoi de l'email (simulation)
    await sendReservationEmail({
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      date,
      heure,
      nombrePersonnes: parseInt(nombrePersonnes),
      message: message || ''
    });

    return NextResponse.json({
      success: true,
      message: 'Réservation envoyée avec succès ! Nous vous contacterons rapidement.'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erreur réservation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la réservation' },
      { status: 500 }
    );
  }
}