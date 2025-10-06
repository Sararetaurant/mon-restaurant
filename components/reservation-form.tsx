"use client"

import { useState } from "react"

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    date: "",
    heure: "",
    nombrePersonnes: 2,
    message: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "nombrePersonnes" ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      console.log("📤 Envoi des données:", formData)
      
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log("📨 Réponse API:", result)

      if (result.success) {
        setMessage("✅ Réservation envoyée avec succès !")
        setFormData({
          nom: "",
          email: "",
          telephone: "",
          date: "",
          heure: "",
          nombrePersonnes: 2,
          message: ""
        })
      } else {
        setMessage(`❌ ${result.error || "Erreur lors de la réservation"}`)
      }
    } catch (error) {
      console.error("❌ Erreur:", error)
      setMessage("❌ Erreur de connexion au serveur")
    } finally {
      setIsLoading(false)
    }
  }

  const heures = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00"]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Nom */}
        <div className="space-y-2">
          <label htmlFor="nom" className="block text-sm font-medium">
            Nom complet *
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre nom"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="votre@email.com"
          />
        </div>

        {/* Téléphone */}
        <div className="space-y-2">
          <label htmlFor="telephone" className="block text-sm font-medium">
            Téléphone *
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="01 23 45 67 89"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Heure */}
        <div className="space-y-2">
          <label htmlFor="heure" className="block text-sm font-medium">
            Heure *
          </label>
          <select
            id="heure"
            name="heure"
            value={formData.heure}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choisir une heure</option>
            {heures.map((heure) => (
              <option key={heure} value={heure}>
                {heure}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre de personnes */}
        <div className="space-y-2">
          <label htmlFor="nombrePersonnes" className="block text-sm font-medium">
            Nombre de personnes *
          </label>
          <select
            id="nombrePersonnes"
            name="nombrePersonnes"
            value={formData.nombrePersonnes}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} personne{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message spécial (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Demandes particulières, allergies..."
        />
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 font-medium text-lg"
      >
        {isLoading ? "📤 Envoi en cours..." : "🍽️ Réserver maintenant"}
      </button>

      {/* Message de statut */}
      {message && (
        <div className={`p-4 rounded-md text-center ${
          message.includes("✅") 
            ? "bg-green-100 text-green-700 border border-green-200" 
            : "bg-red-100 text-red-700 border border-red-200"
        }`}>
          {message}
        </div>
      )}
    </form>
  )
}