import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Le Jardin</h3>
            <p className="text-muted-foreground leading-relaxed">
              Une expérience culinaire raffinée dans un cadre élégant et chaleureux.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-accent transition-colors">
                Accueil
              </Link>
              <Link href="/menu" className="block text-muted-foreground hover:text-accent transition-colors">
                Menu
              </Link>
              <Link href="/reservation" className="block text-muted-foreground hover:text-accent transition-colors">
                Réservation
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Rue de la Paix, Paris</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@lejardin.fr</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Horaires</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <div>
                  <p>Lun-Ven: 12h-14h, 19h-22h</p>
                  <p>Sam-Dim: 19h-23h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Le Jardin. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
