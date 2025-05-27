import Link from "next/link";

const sections = [
  {
    title: "Company",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t bg-background">
      <div className="container px-6 py-12 mx-auto max-w-7xl">
        <div className="flex flex-wrap max-w-3xl gap-8">
          <div className="flex flex-wrap w-full gap-12 md:w-auto">
            {sections.map((section) => (
              <div key={section.title} className="min-w-[100px]">
                <h3 className="mb-3 font-bold text-md">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-semibold transition-colors text-md text-muted-foreground hover:text-primary"
                        target={
                          link.href.startsWith("/info/") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("/info/")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 mt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-lg font-medium text-muted-foreground">
            © {currentYear} Mint CashBack LLC. All rights reserved.
          </p>
          <div className="text-md text-muted-foreground text-right">
            <div>8 The Green STE B, Dover, DE 19901 United States</div>
            <div>
              <a href="mailto:team@mintcashback.com" className="hover:text-primary underline transition-colors">team@mintcashback.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
