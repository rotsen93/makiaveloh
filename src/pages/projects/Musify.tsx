import { UploadCloud, CreditCard, Smartphone, Bell } from 'lucide-react';
import ProjectLayout from '../../components/project/ProjectLayout';
import ProjectHeader from '../../components/project/ProjectHeader';
import ProjectSection from '../../components/project/ProjectSection';
import ProjectOverview from '../../components/project/ProjectOverview';
import TechStack from '../../components/project/TechStack';
import TechnicalHighlights from '../../components/project/TechnicalHighlights';
import { musifyIcon } from '../../assets';
import { socialLinks } from '../../config/socialLinks';

const Musify = () => {
  return (
    <ProjectLayout>
      <ProjectHeader
        icon={musifyIcon}
        title="Musify Distro"
        subtitle="Mobile music distribution & creator dashboard — iOS + Android"
        githubUrl={socialLinks.repositories.musify}
        features={[
          { icon: UploadCloud, title: 'Music upload & releases', description: 'Streamlined in-app workflow for uploading tracks, artwork, and release metadata.' },
          { icon: CreditCard, title: 'Plans & subscriptions', description: 'Access tier management, plan status, and premium creator features.' },
          { icon: Bell, title: 'Notifications & alerts', description: 'Updates on release progress, store approvals, and account activities.' },
          { icon: Smartphone, title: 'Cross-platform native', description: 'Built with React Native, Expo Router, and Reanimated for iOS and Android.' },
        ]}
      />
      <ProjectSection title="Overview">
        <ProjectOverview paragraphs={[
          'Musify Distro is a mobile application built for independent artists and creators to manage their music distribution directly from their phones. It provides a centralized dashboard for release workflows, plan consultation, and operational notifications.',
          'Built with modern mobile UX patterns using Expo and React Native, the application combines high-performance native navigation with in-app WebView integration for rich distribution flows.',
        ]} />
      </ProjectSection>
      <ProjectSection title="Tech Stack">
        <TechStack technologies={['React Native', 'Expo', 'Expo Router', 'TypeScript', 'Reanimated', 'AsyncStorage', 'WebView']} />
      </ProjectSection>
      <ProjectSection title="Highlights">
        <TechnicalHighlights highlights={[
          'File-based navigation with Expo Router and custom gradient UI themes.',
          'In-app web integration for smooth music upload and subscription management.',
          'AsyncStorage local state persistence for sessions and notification tracking.',
          'Prepared architecture ready for live backend API and streaming analytics integration.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
};

export default Musify;
