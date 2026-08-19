import { Music2 } from 'lucide-react';
import ProjectLayout from '../../components/project/ProjectLayout';
import ProjectHeader from '../../components/project/ProjectHeader';
import ProjectSection from '../../components/project/ProjectSection';
import ProjectOverview from '../../components/project/ProjectOverview';
import { comingSoon } from '../../assets';
import { socialLinks } from '../../config/socialLinks';

const Musify = () => {
  return (
    <ProjectLayout>
      <ProjectHeader
        icon={comingSoon}
        title="Musify Distro"
        subtitle="Music distribution application"
        githubUrl={socialLinks.repositories.musify}
        features={[
          { icon: Music2, title: 'In development', description: 'Full details coming soon.' },
        ]}
      />
      <ProjectSection title="Overview">
        <ProjectOverview paragraphs={[
          'Musify Distro is a music distribution application currently in development. Full details coming soon.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
};

export default Musify;
