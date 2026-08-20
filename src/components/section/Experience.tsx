import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const experiences = [
    {
      title: "Freelance Developer & IT Consultant",
      company: "Independent",
      location: "Santo Domingo, DR",
      period: "2023 - Present",
      description: [
        "Building full-stack applications with React, TypeScript, and Supabase while learning AI-assisted development.",
        "Providing IT support, networking, and infrastructure consulting for local businesses.",
        "Developing three active products: NEST (ADHD productivity), FiaoControl (credit management for corner stores), and Musify Distro."
      ]
    },
    {
      title: "IT Support & Security Analyst",
      company: "Siriux International",
      location: "Santo Domingo, DR",
      period: "2021 - 2023",
      description: [
        "Provided first-line technical support across a nationwide call-center operation serving banking clients.",
        "Managed the domain server and Linux-based dialers, and configured the company's internal IP telephony.",
        "Acted as security analyst, monitoring network traffic and enforcing security policies with zero breaches."
      ]
    },
    {
      title: "Systems & Billing Analyst",
      company: "Excellent Integrity Solutions",
      location: "Santo Domingo, DR (Remote)",
      period: "2018 - 2019",
      description: [
        "Managed 13 billing cycles for Viya (U.S. Virgin Islands), scheduling and monitoring automated billing bots 24/7.",
        "Coordinated with the outsourcing partner that converted invoice files to PDF.",
        "Supported a remote billing system end-to-end, ensuring daily runs completed on schedule."
      ]
    },
    {
      title: "Head of Technical Support & Networking",
      company: "Mobile Gallery",
      location: "Santo Domingo & Santiago, DR",
      period: "2017 - 2018",
      description: [
        "Led systems development and IT operations for an Altice distributor with 41 stores, owning user systems, network, and telephony across two cities.",
        "Reengineered the entire infrastructure — reconfiguring computers, printers, cabling, and network points — turning a failing setup into a stable, failure-free network.",
        "Designed and implemented computer systems and server management, proactively analyzing operations to catch faults before they impacted the business."
      ]
    },
    {
      title: "Field Technical Support",
      company: "LC Solutions Group",
      location: "Santo Domingo, DR",
      period: "2012 - 2013",
      description: [
        "Delivered network engineering and cybersecurity services to a national portfolio of clients — programming, monitoring, and auditing complete network infrastructures.",
        "Deployed and hardened on-site systems end-to-end: firewalls, switches, access points, IP telephony, servers, and security cameras.",
        "Ran database system analysis, backups, and document recovery to protect client data against loss and failure."
      ]
    },
    {
      title: "Technical Support",
      company: "Ministry of Foreign Affairs (MIREX)",
      location: "Santo Domingo, DR",
      period: "2009 - 2011",
      description: [
        "Engineered and maintained the ministry's user systems and network infrastructure, keeping every terminal, printer, and access point operating at full capacity.",
        "Deployed and administered a Windows Server environment with Active Directory, managing domain user accounts, access policies, and password security across the organization.",
        "Strengthened system reliability and security through a structured ticket workflow serving a large user base."
      ]
    }
  ];

  return (
    <section id="experience" className="py-8 relative" style={{
      background: themeColors.background.sections?.experience || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Subtle gradient overlay for top edge blending */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />
      {/* Subtle gradient overlay for bottom edge blending to white divider */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.white} 100%)`,
          zIndex: 1
        }}
      />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-6" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Experience</h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="border-none transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden"
              style={{ backgroundColor: themeColors.card.background }}
            >
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>
                      {exp.title}
                    </CardTitle>
                    <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 shrink-0 mt-1 sm:mt-0 pt-0.5">
                    <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="h-4 w-4 shrink-0" style={{ color: isDarkMode ? themeColors.colors.pink[400] : themeColors.colors.pink[500] }} />
                      <span className="font-medium">{exp.period}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: isDarkMode ? themeColors.colors.pink[400] : themeColors.colors.pink[500] }} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2" style={{ color: themeColors.primary }}>•</span>
                      <span className="text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;