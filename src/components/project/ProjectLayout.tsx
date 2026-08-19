import React from 'react';
import BackButton from '../BackButton';

interface ProjectLayoutProps {
  children: React.ReactNode;
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ children }) => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main 
      aria-label="Project details" 
      className="min-h-screen py-20 transition-colors duration-300" 
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <BackButton />
        {children}
      </div>
    </main>
  );
};

export default ProjectLayout;