import { Card, CardContent } from "@/components/ui/card"

const hobbies = [
  {
    title: "Skateboarding",
    description:
      "The foundation of my creative philosophy - finding flow, pushing boundaries, and embracing the process of continuous improvement.",
    image: "/skateboarding-action.png",
  },
  {
    title: "Street Photography",
    description:
      "Capturing authentic moments and urban culture, which directly influences my approach to visual storytelling in design.",
    image: "/urban-art-street.png",
  },
  {
    title: "Vinyl Collecting",
    description:
      "Appreciating the art of album covers and the tactile experience of physical media in our digital world.",
    image: "/placeholder-pgwd4.png",
  },
]

export function Hobbies() {
  return (
    <section id="hobbies" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary">Beyond Design</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The passions that fuel my creativity and shape my perspective on design and life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <Card
              key={hobby.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={hobby.image || "/placeholder.svg"}
                    alt={hobby.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-4 text-foreground">{hobby.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{hobby.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
