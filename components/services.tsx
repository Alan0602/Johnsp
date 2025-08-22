import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    title: "Brand Identity",
    description:
      "Creating distinctive visual identities that capture the essence of your brand and resonate with your audience.",
    icon: "🎨",
  },
  {
    title: "Digital Design",
    description:
      "Crafting engaging digital experiences across web, mobile, and interactive platforms with user-centered design.",
    icon: "💻",
  },
  {
    title: "Creative Direction",
    description:
      "Leading creative campaigns from concept to execution, ensuring cohesive visual storytelling across all touchpoints.",
    icon: "🎬",
  },
  {
    title: "Print Design",
    description:
      "Designing impactful print materials that bridge the gap between digital and physical brand experiences.",
    icon: "📄",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary">Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive creative solutions that blend strategic thinking with innovative design to elevate your brand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
