"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, Phone, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.name,
          email: formData.email,
          telephone: formData.phone,
          date: formData.date,
          heure: formData.time,
          nombrePersonnes: parseInt(formData.guests),
          commentaires: formData.message
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Demande de réservation envoyée avec succès ! Vous recevrez un email de confirmation et nous vous contacterons rapidement pour finaliser votre réservation.'
        })
        
        // Réinitialiser le formulaire
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          message: "",
        })
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Erreur lors de l\'envoi de la demande de réservation'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erreur de connexion. Veuillez réessayer ou nous contacter directement.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Date minimum (aujourd'hui)
  const today = new Date().toISOString().split('T')[0]

  // Générer les heures disponibles
  const generateTimeOptions = () => {
    const times = []
    // Midi
    for (let hour = 12; hour <= 14; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 14 && minute > 0) break // Arrêter à 14h00
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(timeString)
      }
    }
    // Soir
    for (let hour = 19; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute > 0) break // Arrêter à 22h00
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(timeString)
      }
    }
    return times
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold mb-6">Réservation</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Réservez votre table pour une expérience culinaire inoubliable
          </p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-serif text-3xl">Formulaire de Réservation</CardTitle>
                <p className="text-muted-foreground">
                  Votre demande sera envoyée directement au restaurant
                </p>
              </CardHeader>
              <CardContent>
                {message && (
                  <Alert className={`mb-6 ${
                    message.type === 'success' 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={
                      message.type === 'success' ? 'text-green-700' : 'text-red-700'
                    }>
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="mt-1"
                        placeholder="Votre nom complet"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-1"
                        placeholder="votre@email.com"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="mt-1"
                      placeholder="01 23 45 67 89"
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        className="mt-1"
                        min={today}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Heure *</Label>
                      <Select 
                        onValueChange={(value) => handleChange("time", value)}
                        value={formData.time}
                        disabled={loading}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choisir l'heure" />
                        </SelectTrigger>
                        <SelectContent>
                          {generateTimeOptions().map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guests">Nombre de personnes *</Label>
                      <Select 
                        onValueChange={(value) => handleChange("guests", value)}
                        value={formData.guests}
                        disabled={loading}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Personnes" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(20)].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} {i === 0 ? 'personne' : 'personnes'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message (optionnel)</Label>
                    <Textarea
                      id="message"
                      placeholder="Allergies, demandes spéciales, occasion particulière..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="mt-1"
                      rows={4}
                      disabled={loading}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      '📧 Envoyer la demande de réservation'
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    💡 Votre demande sera envoyée directement au restaurant. <br />
                    Nous vous contacterons rapidement pour confirmer votre réservation.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-8">
              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Horaires d'Ouverture</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Lundi - Vendredi:</strong> 12h00 - 14h00, 19h00 - 22h00
                    </p>
                    <p>
                      <strong>Samedi - Dimanche:</strong> 19h00 - 23h00
                    </p>
                    <p className="text-sm mt-4 text-destructive">* Fermé le dimanche midi et le lundi soir</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Informations</h3>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>• Réservation recommandée</p>
                    <p>• Groupes de plus de 8 personnes : nous contacter</p>
                    <p>• Annulation gratuite jusqu'à 24h avant</p>
                    <p>• Tenue correcte exigée</p>
                    <p className="text-accent font-medium">• Confirmation rapide par téléphone</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Contact Direct</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Téléphone:</strong> <a href="tel:0123456789" className="text-accent hover:underline">01 23 45 67 89</a>
                    </p>
                    <p>
                      <strong>Email:</strong> <a href="mailto:contact@lejardin-restaurant.com" className="text-accent hover:underline">contact@lejardin-restaurant.com</a>
                    </p>
                    <p className="text-sm mt-4">
                      Pour les réservations de dernière minute ou les demandes spéciales, n'hésitez pas à nous appeler
                      directement.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Nouvelle section : Comment ça marche */}
              <Card className="p-6 bg-accent/5 border-accent/20">
                <CardContent className="pt-0">
                  <h3 className="font-serif text-xl font-bold mb-4 text-accent">📧 Comment ça marche ?</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>1. <strong>Vous envoyez</strong> votre demande via ce formulaire</p>
                    <p>2. <strong>Vous recevez</strong> un email de confirmation automatique</p>
                    <p>3. <strong>Nous vous contactons</strong> rapidement pour finaliser</p>
                    <p>4. <strong>Votre table est réservée</strong> !</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}