import { useEffect, useRef, useState } from "react";
import DomeGallery from "../ui/domegallery";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors } from "../../hooks/useThemeColors";
import { withAlpha } from "../../hooks/useThemeColors";

const skillCategories = [
  {
    title: 'Systems & Infrastructure',
    skills: [
      'Active Directory',
      'Windows Server 2008/2012',
      'Linux (CentOS, Fedora, RHEL, Ubuntu, SUSE, OpenSUSE)',
      'Virtualization (VirtualBox, GNOME Boxes, VMware)',
      'IP Telephony (Asterisk, ViciBox, Vicidial)',
      'VPN',
      'Remote Desktop (RDP)',
      'Access Control',
    ],
  },
  {
    title: 'Security & Monitoring',
    skills: [
      'Network traffic monitoring',
      'Security policy enforcement',
      'Firewall support',
      'Security cameras & access points',
      '24/7 systems monitoring',
    ],
  },
  {
    title: 'Cloud & Databases',
    skills: [
      'AWS (S3, Lambda, EC2)',
      'Google Cloud',
      'MySQL',
      'Microsoft Office',
    ],
  },
  {
    title: 'Creative & Design',
    skills: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe After Effects',
      'Adobe Premiere',
      'Graphic design',
      'Video editing & mastering',
      'Photography',
      'Filmography',
    ],
  },
];

const Skills = () => {
  const [scale, setScale] = useState(0.5);
  const sectionRef = useRef<HTMLDivElement>(null);
  const domeContainerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate visibility based on how centered the section is
      let visibilityRatio = 0;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const sectionHeight = rect.height;
        const sectionCenter = rect.top + sectionHeight / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - windowCenter);
        const maxDistance = windowHeight / 2 + sectionHeight / 2;

        // Smooth curve that peaks when section is centered
        visibilityRatio = 1 - (distanceFromCenter / maxDistance);
        visibilityRatio = Math.max(0, Math.min(1, visibilityRatio));

        // Apply easing curve for more natural growth
        visibilityRatio = visibilityRatio * visibilityRatio * (3 - 2 * visibilityRatio);
      }

      // Scale from 0.5 to 1 instead of 0 to 1 for better starting size
      const minScale = 0.5;
      const maxScale = 1;
      const finalScale = minScale + (maxScale - minScale) * visibilityRatio;
      setScale(finalScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-20 relative" style={{
      background: themeColors.background.sections?.skills || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Gradient overlay for smooth transition from previous section */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '300px',
          background: isDarkMode 
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Skills</h2>
        <div
          ref={domeContainerRef}
          className="relative w-full"
          style={{
            height: '600px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <DomeGallery />
          {/* Faded edges overlay with performance-optimized blending */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDarkMode
                ? `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.dark[900], 0.1)} 70%, ${withAlpha(themeColors.colors.dark[900], 0.6)} 90%, ${withAlpha(themeColors.colors.dark[900], 0.8)} 100%)`
                : `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.pink[50], 0.1)} 70%, ${withAlpha(themeColors.colors.pink[50], 0.6)} 90%, ${withAlpha(themeColors.colors.pink[50], 0.8)} 100%)`,
              maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="rounded-lg p-6" style={{ backgroundColor: themeColors.card.background }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: isDarkMode ? withAlpha(themeColors.colors.pink[300], 0.15) : themeColors.colors.pink[50], color: isDarkMode ? themeColors.colors.pink[300] : themeColors.text.pink, border: `1px solid ${withAlpha(themeColors.colors.pink[300], 0.3)}` }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;