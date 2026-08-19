import { Store, Users, MessageCircle, BarChart3 } from 'lucide-react';
import ProjectLayout from '../../components/project/ProjectLayout';
import ProjectHeader from '../../components/project/ProjectHeader';
import ProjectSection from '../../components/project/ProjectSection';
import ProjectOverview from '../../components/project/ProjectOverview';
import TechStack from '../../components/project/TechStack';
import TechnicalHighlights from '../../components/project/TechnicalHighlights';
import { comingSoon } from '../../assets';
import { socialLinks } from '../../config/socialLinks';

const FiaoControl = () => {
  return (
    <ProjectLayout>
      <ProjectHeader
        icon={comingSoon}
        title="FiaoControl"
        subtitle="Credit and collections for corner stores (colmados)"
        githubUrl={socialLinks.repositories.fiaocontrol}
        features={[
          { icon: Store, title: 'Digital ledger', description: 'Replace the paper notebook for recording fiados and abonos.' },
          { icon: Users, title: 'Customer management', description: 'Track clients and their balances in real time.' },
          { icon: MessageCircle, title: 'WhatsApp statements', description: 'Send debt details directly to customers.' },
          { icon: BarChart3, title: 'Dashboard', description: 'Stats and reports to support collection decisions.' },
        ]}
      />
      <ProjectSection title="Overview">
        <ProjectOverview paragraphs={[
          'FiaoControl digitalizes the way corner stores (colmados) track customer credit. Instead of a paper notebook, owners record fiados, payments, and balances through a fast, friendly interface built for the counter.',
          'It is a cross-platform product: a Next.js web app for management and a Kotlin (Jetpack Compose) Android app for daily use, backed by Supabase for auth and data.',
        ]} />
      </ProjectSection>
      <ProjectSection title="Tech Stack">
        <TechStack technologies={['Next.js', 'TypeScript', 'Supabase', 'Kotlin', 'Jetpack Compose']} />
      </ProjectSection>
      <ProjectSection title="Highlights">
        <TechnicalHighlights highlights={[
          'Built for non-technical users: fast, clear, counter-friendly flow.',
          'Full history of movements (fiao and abono) per customer.',
          'Currently in MVP, iterating on collection flow and data clarity.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
};

export default FiaoControl;
