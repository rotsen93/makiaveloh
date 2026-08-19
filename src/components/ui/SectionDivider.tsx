import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Cpu } from 'lucide-react';

interface SectionDividerProps {
  label?: string;
  moduleName?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label = 'SYS_MODULE // 04',
  moduleName = 'SKILLS & INFRASTRUCTURE',
}) => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  return (
    <div
      className="w-full py-12 relative flex items-center justify-center overflow-hidden select-none"
      style={{
        background: 'transparent',
        transition: 'background 0.3s ease-in-out',
      }}
    >
      {/* Top gradient blend */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.white} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      />

      {/* Bottom gradient blend */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
          zIndex: 1,
        }}
      />

      {/* Technical Line & Center Badge */}
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 flex items-center justify-center">
        {/* Left Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-neutral-600/40 to-neutral-500/60 dark:via-neutral-700/60 dark:to-neutral-500/40" />

        {/* Center Technical Node / Chip */}
        <div
          className="mx-4 px-3.5 py-1 rounded-md border flex items-center gap-2 font-mono text-xs shadow-sm backdrop-blur-sm"
          style={{
            backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
            color: isDarkMode ? '#e5e7eb' : '#374151',
          }}
        >
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px] tracking-wider">{label}</span>
          </div>
          <span className="text-neutral-500 dark:text-neutral-600">|</span>
          <span className="text-neutral-400 dark:text-neutral-300 text-[11px] tracking-wide font-medium">
            {moduleName}
          </span>
        </div>

        {/* Right Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-neutral-600/40 to-neutral-500/60 dark:via-neutral-700/60 dark:to-neutral-500/40" />
      </div>
    </div>
  );
};

export default SectionDivider;
