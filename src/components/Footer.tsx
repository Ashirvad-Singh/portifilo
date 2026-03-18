import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ashirvad2912@gmail.com",
      href: "mailto:ashirvad2912@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7817940937",
      href: "tel:+917817940937",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mohali, Punjab, India",
      href: "#",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Web Development", href: "#" },
    { name: "Custom Theme Design", href: "#" },
    { name: "WooCommerce Solutions", href: "#" },
    { name: "Full-Stack Development", href: "#" },
    { name: "SEO Optimization", href: "#" },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/Ashirvad-Singh/",
      color: "hover:text-white",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ashirvad-singh-255491214/",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "#",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <footer id="contact" className="relative pt-20 pb-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-primary">
                  <span className="text-white font-bold text-xl">AS</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gradient">
                    Ashirvad Singh
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Web & Full-Stack Developer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Passionate about creating dynamic digital experiences with
                modern web technologies. Specializing in Web development and
                custom solutions that drive business growth.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-3">
                Get in Touch
              </h4>
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 glass rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <contact.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground/60">
                      {contact.label}
                    </div>
                    <div className="font-medium">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Services</h4>
            <nav className="space-y-3">
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform flex items-center gap-2 group"
                >
                  {service.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Social Links & CTA */}
        <div className="card-glass mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold text-gradient mb-2">
                Let's Work Together
              </h4>
              <p className="text-muted-foreground">
                Ready to bring your next project to life?
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:ashirvad2912@gmail.com"
                className="btn-primary group"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start a Project
              </a>

              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 glass glass-hover rounded-lg flex items-center justify-center ${social.color} transition-all duration-300`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Ashirvad Singh. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>and lots of coffee ☕</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 glass glass-hover rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <div className="w-4 h-4 border-t-2 border-r-2 border-primary transform rotate-[-45deg]" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
