"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Car, Train } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Votre message a été envoyé ! Nous vous répondrons dans les plus brefs délais.")
    console.log("Contact form data:", formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Nous sommes à votre écoute pour toute question ou demande particulière
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-serif text-3xl">Nous Contacter</CardTitle>
              </CardHeader>
              <CardContent>
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
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Votre message..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="mt-1"
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Envoyer le Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Adresse</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-lg">123 Rue de la Paix</p>
                    <p className="text-lg">75001 Paris, France</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Téléphone</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-lg">01 23 45 67 89</p>
                    <p className="text-sm">Réservations et renseignements</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Email</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-lg">contact@lejardin.fr</p>
                    <p className="text-lg">reservation@lejardin.fr</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Horaires</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Lundi - Vendredi:</strong>
                    </p>
                    <p>12h00 - 14h00, 19h00 - 22h00</p>
                    <p>
                      <strong>Samedi - Dimanche:</strong>
                    </p>
                    <p>19h00 - 23h00</p>
                    <p className="text-sm text-destructive mt-2">Fermé le dimanche midi et le lundi soir</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Access */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">Comment Nous Trouver</h2>
            <p className="text-xl text-muted-foreground">Situé au cœur de Paris, facilement accessible</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Carte Google Maps intégrée
                  <br />
                  123 Rue de la Paix, 75001 Paris
                </p>
              </div>
            </div>

            {/* Access Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Train className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-xl font-bold">Transports en Commun</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Métro:</strong> Ligne 1, 7, 14 - Station Châtelet
                    </p>
                    <p>
                      <strong>RER:</strong> RER A, B, D - Châtelet-Les Halles
                    </p>
                    <p>
                      <strong>Bus:</strong> Lignes 21, 27, 38, 85
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Car className="h-6 w-6 text-accent" />
                    <h3 className="font-serif text-xl font-bold">En Voiture</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Parking:</strong> Parking Rivoli-Châtelet (5 min à pied)
                    </p>
                    <p>
                      <strong>Valet:</strong> Service voiturier disponible sur demande
                    </p>
                    <p className="text-sm">Réservation du service voiturier recommandée</p>
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
