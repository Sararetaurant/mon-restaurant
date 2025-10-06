import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const menuCategories = [
  {
    title: "Entrées",
    items: [
      {
        name: "Foie Gras Poêlé",
        description: "Foie gras de canard poêlé, chutney de figues et pain brioche toasté",
        price: "28€",
        image: "/elegant-foie-gras-dish-with-figs.jpg",
      },
      {
        name: "Tartare de Saint-Jacques",
        description: "Saint-Jacques fraîches, avocat, citron vert et huile d'olive vierge",
        price: "24€",
        image: "/scallop-tartare-with-avocado-elegant-presentation.jpg",
      },
      {
        name: "Velouté de Châtaignes",
        description: "Crème de châtaignes, truffe noire et croutons à l'ail",
        price: "18€",
        image: "/chestnut-soup-with-truffle-elegant-bowl.jpg",
      },
    ],
  },
  {
    title: "Plats Principaux",
    items: [
      {
        name: "Bœuf de Kobe Grillé",
        description: "Filet de bœuf de Kobe, légumes de saison et jus de viande aux herbes",
        price: "65€",
        image: "/grilled-kobe-beef-with-seasonal-vegetables-fine-di.jpg",
      },
      {
        name: "Homard Thermidor",
        description: "Homard breton, sauce thermidor et gratin de pommes de terre",
        price: "48€",
        image: "/lobster-thermidor-elegant-plating.jpg",
      },
      {
        name: "Canard Laqué",
        description: "Magret de canard laqué au miel, purée de patates douces et sauce aux cerises",
        price: "32€",
        image: "/glazed-duck-breast-with-sweet-potato-puree.jpg",
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Soufflé au Grand Marnier",
        description: "Soufflé chaud au Grand Marnier, glace vanille Bourbon",
        price: "16€",
        image: "/grand-marnier-souffle-with-vanilla-ice-cream.jpg",
      },
      {
        name: "Tarte Tatin Revisitée",
        description: "Tarte aux pommes caramélisées, glace cannelle et tuile aux amandes",
        price: "14€",
        image: "/modern-tarte-tatin-with-cinnamon-ice-cream.jpg",
      },
      {
        name: "Chocolat Noir Intense",
        description: "Fondant au chocolat noir 70%, cœur coulant et sorbet framboise",
        price: "15€",
        image: "/dark-chocolate-fondant-with-raspberry-sorbet.jpg",
      },
    ],
  },
]

export default function MenuPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold mb-6">Notre Menu</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Découvrez notre sélection de plats raffinés, préparés avec passion par notre chef étoilé
          </p>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="font-serif text-4xl font-bold text-center mb-12 text-foreground">{category.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-video relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-serif text-xl">{item.name}</CardTitle>
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">
                          {item.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wine Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">Carte des Vins</h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Notre sommelier a sélectionné une carte de vins exceptionnelle pour accompagner parfaitement chaque plat de
            notre menu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <Card className="p-6">
              <CardContent className="pt-0">
                <h3 className="font-serif text-2xl font-bold mb-4">Vins Rouges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Château Margaux 2015</span>
                    <span className="text-accent font-semibold">180€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Côtes du Rhône Villages</span>
                    <span className="text-accent font-semibold">45€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bourgogne Pinot Noir</span>
                    <span className="text-accent font-semibold">65€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <h3 className="font-serif text-2xl font-bold mb-4">Vins Blancs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Chablis Premier Cru</span>
                    <span className="text-accent font-semibold">75€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sancerre Loire Valley</span>
                    <span className="text-accent font-semibold">55€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Champagne Dom Pérignon</span>
                    <span className="text-accent font-semibold">220€</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
