"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Truck, 
  Package, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Trash2
} from "lucide-react"

interface MenuItem {
  id: string
  nom: string
  prix: number
  description: string
  categorie: string
}

interface ArticlePanier {
  id: string
  nom: string
  prix: number
  quantite: number
  description?: string
}

interface FormData {
  nom: string
  email: string
  telephone: string
  adresse: string
  typeCommande: 'livraison' | 'emporter'
  commentaires: string
}

// Menu du restaurant (à adapter selon vos plats)
const MENU_ITEMS: MenuItem[] = [
  // Entrées
  {
    id: '1',
    nom: 'Salade César au Poulet',
    prix: 14.50,
    description: 'Salade verte, poulet grillé, croûtons, parmesan, sauce César maison',
    categorie: 'Entrées'
  },
  {
    id: '2',
    nom: 'Carpaccio de Bœuf',
    prix: 16.00,
    description: 'Fines lamelles de bœuf, roquette, copeaux de parmesan, huile de truffe',
    categorie: 'Entrées'
  },
  {
    id: '3',
    nom: 'Velouté de Champignons',
    prix: 12.00,
    description: 'Crème de champignons de Paris, croutons à l\'ail, crème fraîche',
    categorie: 'Entrées'
  },

  // Plats principaux
  {
    id: '4',
    nom: 'Saumon Grillé aux Légumes',
    prix: 24.00,
    description: 'Filet de saumon norvégien, légumes de saison, riz basmati, sauce hollandaise',
    categorie: 'Plats Principaux'
  },
  {
    id: '5',
    nom: 'Risotto aux Champignons',
    prix: 19.50,
    description: 'Risotto crémeux aux champignons de Paris et cèpes, parmesan râpé',
    categorie: 'Plats Principaux'
  },
  {
    id: '6',
    nom: 'Magret de Canard',
    prix: 26.50,
    description: 'Magret de canard laqué au miel, purée de patates douces, sauce aux figues',
    categorie: 'Plats Principaux'
  },
  {
    id: '7',
    nom: 'Côte de Bœuf (2 pers.)',
    prix: 45.00,
    description: 'Côte de bœuf grillée, frites maison, salade verte, sauce au poivre',
    categorie: 'Plats Principaux'
  },

  // Desserts
  {
    id: '8',
    nom: 'Tiramisu Maison',
    prix: 8.50,
    description: 'Tiramisu traditionnel aux biscuits de Savoie, mascarpone, café',
    categorie: 'Desserts'
  },
  {
    id: '9',
    nom: 'Tarte Tatin',
    prix: 9.00,
    description: 'Tarte aux pommes caramélisées, pâte feuilletée, glace vanille',
    categorie: 'Desserts'
  },
  {
    id: '10',
    nom: 'Fondant au Chocolat',
    prix: 9.50,
    description: 'Fondant au chocolat noir, cœur coulant, glace vanille, coulis de fruits rouges',
    categorie: 'Desserts'
  },

  // Boissons
  {
    id: '11',
    nom: 'Eau Minérale (50cl)',
    prix: 4.00,
    description: 'Eau minérale plate ou gazeuse',
    categorie: 'Boissons'
  },
  {
    id: '12',
    nom: 'Vin Rouge (Bouteille)',
    prix: 25.00,
    description: 'Côtes du Rhône, sélection du chef',
    categorie: 'Boissons'
  },
  {
    id: '13',
    nom: 'Café Gourmand',
    prix: 12.00,
    description: 'Expresso avec assortiment de mignardises',
    categorie: 'Boissons'
  }
]

export default function CommandePage() {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    typeCommande: 'emporter',
    commentaires: ''
  })
  
  const [panier, setPanier] = useState<ArticlePanier[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const ajouterAuPanier = (item: MenuItem) => {
    const existant = panier.find(article => article.id === item.id)
    
    if (existant) {
      setPanier(prev => prev.map(article => 
        article.id === item.id 
          ? { ...article, quantite: article.quantite + 1 }
          : article
      ))
    } else {
      setPanier(prev => [...prev, {
        id: item.id,
        nom: item.nom,
        prix: item.prix,
        quantite: 1,
        description: item.description
      }])
    }
  }

  const modifierQuantite = (id: string, nouvelleQuantite: number) => {
    if (nouvelleQuantite <= 0) {
      setPanier(prev => prev.filter(article => article.id !== id))
    } else {
      setPanier(prev => prev.map(article => 
        article.id === id 
          ? { ...article, quantite: nouvelleQuantite }
          : article
      ))
    }
  }

  const viderPanier = () => {
    setPanier([])
  }

  const calculerTotal = () => {
    return panier.reduce((total, article) => total + (article.prix * article.quantite), 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (panier.length === 0) {
      setMessage({
        type: 'error',
        text: 'Veuillez ajouter des articles à votre commande'
      })
      return
    }
    
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          articles: panier
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Commande envoyée avec succès ! Total : ${data.total}€. ${data.details}`
        })
        
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          adresse: '',
          typeCommande: 'emporter',
          commentaires: ''
        })
        setPanier([])
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Erreur lors de l\'envoi de la commande'
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

  const groupedMenu = MENU_ITEMS.reduce((acc, item) => {
    if (!acc[item.categorie]) {
      acc[item.categorie] = []
    }
    acc[item.categorie].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  const totalArticles = panier.reduce((total, article) => total + article.quantite, 0)

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold mb-6">Commander en Ligne</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Découvrez notre menu et commandez vos plats préférés
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Menu */}
            <div className="lg:col-span-2 space-y-8">
              {Object.entries(groupedMenu).map(([categorie, items]) => (
                <Card key={categorie} className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl text-accent">
                      {categorie}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {items.map(item => (
                        <div 
                          key={item.id} 
                          className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{item.nom}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            <p className="text-lg font-bold text-accent mt-2">{item.prix.toFixed(2)}€</p>
                          </div>
                          <Button
                            onClick={() => ajouterAuPanier(item)}
                            className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Panier et Formulaire */}
            <div className="lg:col-span-1">
              <Card className="shadow-xl sticky top-6">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-2xl flex items-center">
                    <ShoppingCart className="w-6 h-6 mr-2 text-accent" />
                    Votre Commande
                    {totalArticles > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {totalArticles}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {panier.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Votre panier est vide</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                        {panier.map(article => (
                          <div key={article.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{article.nom}</h4>
                              <p className="text-accent font-semibold">{article.prix.toFixed(2)}€</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => modifierQuantite(article.id, article.quantite - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-sm">{article.quantite}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => modifierQuantite(article.id, article.quantite + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={viderPanier}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Vider
                        </Button>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-accent">{calculerTotal().toFixed(2)}€</p>
                        </div>
                      </div>
                    </>
                  )}

                  {message && (
                    <Alert className={`mb-4 ${
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

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nom" className="text-sm">Nom complet *</Label>
                      <Input
                        id="nom"
                        type="text"
                        value={formData.nom}
                        onChange={(e) => handleChange('nom', e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Votre nom"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="mt-1"
                        placeholder="votre@email.com"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="telephone" className="text-sm">Téléphone *</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleChange('telephone', e.target.value)}
                        required
                        className="mt-1"
                        placeholder="01 23 45 67 89"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="typeCommande" className="text-sm">Type de commande *</Label>
                      <Select 
                        onValueChange={(value: 'livraison' | 'emporter') => handleChange('typeCommande', value)}
                        value={formData.typeCommande}
                        disabled={loading}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emporter">
                            <div className="flex items-center">
                              <Package className="w-4 h-4 mr-2" />
                              À emporter
                            </div>
                          </SelectItem>
                          <SelectItem value="livraison">
                            <div className="flex items-center">
                              <Truck className="w-4 h-4 mr-2" />
                              Livraison
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.typeCommande === 'livraison' && (
                      <div>
                        <Label htmlFor="adresse" className="text-sm">Adresse de livraison *</Label>
                        <Textarea
                          id="adresse"
                          value={formData.adresse}
                          onChange={(e) => handleChange('adresse', e.target.value)}
                          required={formData.typeCommande === 'livraison'}
                          className="mt-1"
                          rows={2}
                          placeholder="Votre adresse complète"
                          disabled={loading}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="commentaires" className="text-sm">Commentaires</Label>
                      <Textarea
                        id="commentaires"
                        value={formData.commentaires}
                        onChange={(e) => handleChange('commentaires', e.target.value)}
                        className="mt-1"
                        rows={2}
                        placeholder="Demandes spéciales, allergies..."
                        disabled={loading}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || panier.length === 0}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          📧 Commander ({calculerTotal().toFixed(2)}€)
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      💡 Votre commande sera envoyée au restaurant.<br />
                      Nous vous contacterons pour confirmer et vous indiquer le délai.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}