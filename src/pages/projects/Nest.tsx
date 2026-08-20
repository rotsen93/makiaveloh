import { ListTodo, Timer, Brain, Smartphone } from 'lucide-react';
import ProjectLayout from '../../components/project/ProjectLayout';
import ProjectHeader from '../../components/project/ProjectHeader';
import ProjectSection from '../../components/project/ProjectSection';
import ProjectOverview from '../../components/project/ProjectOverview';
import TechStack from '../../components/project/TechStack';
import TechnicalHighlights from '../../components/project/TechnicalHighlights';
import { nestIcon } from '../../assets';
import { socialLinks } from '../../config/socialLinks';

const Nest = () => {
  return (
    <ProjectLayout>
      <ProjectHeader
        icon={nestIcon}
        title="NEST"
        subtitle="ADHD productivity companion — Web + Android"
        githubUrl={socialLinks.repositories.nest}
        liveUrl={socialLinks.repositories.nestLive}
        features={[
          { icon: ListTodo, title: 'Task manager', description: 'Priorities, categories, tags, subtasks, and streak tracking.' },
          { icon: Timer, title: 'Pomodoro & habits', description: 'Focus sessions with soundscapes, plus visual habit tracking and heatmaps.' },
          { icon: Brain, title: 'Cognitive support', description: 'Brain dump, mind maps, and AI-assisted task breakdown.' },
          { icon: Smartphone, title: 'Cross-platform', description: 'Web and Android via Capacitor, offline-first.' },
        ]}
      />
      <ProjectSection title="Overview">
        <ProjectOverview paragraphs={[
          'NEST is a productivity suite designed specifically for ADHD minds. It combines task management, a Pomodoro timer, habit tracking, mood and energy logging, and AI-assisted task breakdown into one calm, minimal interface.',
          'Built with neurodivergent-friendly design principles — low cognitive load, subtle micro-interactions, and full English/Spanish localization — and packaged for both web and Android.',
        ]} />
      </ProjectSection>
      <ProjectSection title="Tech Stack">
        <TechStack technologies={['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Capacitor']} />
      </ProjectSection>
      <ProjectSection title="Highlights">
        <TechnicalHighlights highlights={[
          'Offline-first: all data stored locally for privacy.',
          'Gamified achievement system and Bio-Quest wellness tracking.',
          'Google Calendar two-way sync and smart reminders.',
          'Time estimator and quick summary to prevent time blindness.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
};

export default Nest;
