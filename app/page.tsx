import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Star, Award, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/elegant-restaurant-interior-with-warm-lighting-and.jpg')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
            Le Jardin
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance leading-relaxed">
            Une expérience culinaire exceptionnelle au cœur de Paris
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="/menu">Découvrir le Menu</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Link href="/reservation">Réserver une Table</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">
                Notre Histoire
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Depuis 1985, Le Jardin propose une cuisine française raffinée
                dans un cadre élégant et chaleureux. Notre chef étoilé crée
                des plats exceptionnels à partir d'ingrédients locaux et de
                saison.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Chaque plat raconte une histoire, chaque saveur évoque une
                émotion. Venez découvrir l'art culinaire français dans toute
                sa splendeur.
              </p>
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/menu">Voir Notre Menu</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="/professional-chef-preparing-gourmet-dish-in-elegan.jpg"
                alt="Chef préparant un plat gastronomique"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">
              Pourquoi Choisir Le Jardin
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Une expérience culinaire unique qui allie tradition et innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Chef Étoilé
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Notre chef étoilé Michelin crée des plats d'exception avec
                  passion et créativité.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Ingrédients Premium
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nous sélectionnons uniquement les meilleurs produits locaux
                  et de saison.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Service Exceptionnel
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Notre équipe vous offre un service personnalisé dans une
                  ambiance raffinée.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold mb-6 text-balance">
            Réservez Votre Table Dès Maintenant
          </h2>
          <p className="text-xl mb-8 text-muted-foreground text-balance">
            Vivez une expérience culinaire inoubliable dans notre restaurant
            étoilé
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Link href="/reservation">Faire une Réservation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}