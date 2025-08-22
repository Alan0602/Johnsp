import { Card } from "@/components/ui/card"

const clients = [
  { name: "Nike", logo: "/nike-swoosh.png" },
  { name: "Apple", logo: "/apple-logo.png" },
  { name: "Google", logo: "/google-logo.png" },
  { name: "Microsoft", logo: "/microsoft-logo.png" },
  { name: "Adobe", logo: "/adobe-logo.png" },
  { name: "Spotify", logo: "/spotify-logo.png" },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary">About Me</h2>
            <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
              With over 8 years of experience in creative direction and visual design, I bring the same precision and
              flow found in skateboarding to every project. My approach combines strategic thinking with bold creativity
              to deliver impactful visual solutions.
            </p>
            <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
              I specialize in brand identity, digital experiences, and creative campaigns that push boundaries while
              maintaining commercial viability. Every project is an opportunity to create something that moves people.
            </p>
          </div>

          <div className="animate-slide-in">
            <img
              src="/art-director-headshot.png"
              alt="Johnson Varghese"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-16">
          <h3 className="font-heading font-semibold text-2xl text-center mb-8 text-foreground">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {clients.map((client) => (
              <Card key={client.name} className="p-4 hover:shadow-md transition-shadow duration-200">
                <img
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="w-full h-12 object-contain grayscale hover:grayscale-0 transition-all duration-200"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
