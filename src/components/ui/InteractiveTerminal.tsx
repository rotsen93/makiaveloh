import React, { useState, useRef, useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

interface InteractiveTerminalProps {
  onOpenPhotos?: () => void;
  className?: string;
}

const SYSTEM_BANNER = {
  user: 'makiaveloh',
  host: 'workstation',
  os: 'Arch Linux x86_64 (Kernel 6.12-zen)',
  uptime: '15+ years across Systems, Security & Full-Stack',
  stack: 'TypeScript, React, Node.js, Python, Linux, AI Workflows',
  location: 'Santo Domingo, Dominican Republic',
  status: 'Available for select engineering & AI projects',
};

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  onOpenPhotos,
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialOutputs: CommandOutput[] = [
    {
      id: 'init-neofetch',
      command: 'fastfetch',
      output: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-2 text-xs md:text-sm font-mono leading-relaxed">
          <div className="md:col-span-4 text-emerald-400 select-none whitespace-pre leading-none font-bold">
{`    /\\
   /  \\
  /\\   \\
 /      \\
/   ,,   \\
/   |  |  -\\
/_-''    ''-_\\`}
          </div>
          <div className="md:col-span-8 space-y-1">
            <div className="text-emerald-400 font-bold border-b border-neutral-700/60 pb-1 mb-1">
              {SYSTEM_BANNER.user}@{SYSTEM_BANNER.host}
            </div>
            <div>
              <span className="text-neutral-400">OS: </span>
              <span className="text-neutral-200">{SYSTEM_BANNER.os}</span>
            </div>
            <div>
              <span className="text-neutral-400">Experience: </span>
              <span className="text-neutral-200">{SYSTEM_BANNER.uptime}</span>
            </div>
            <div>
              <span className="text-neutral-400">Core Stack: </span>
              <span className="text-teal-300">{SYSTEM_BANNER.stack}</span>
            </div>
            <div>
              <span className="text-neutral-400">Location: </span>
              <span className="text-neutral-200">{SYSTEM_BANNER.location}</span>
            </div>
            <div>
              <span className="text-neutral-400">Status: </span>
              <span className="text-emerald-300 font-semibold">{SYSTEM_BANNER.status}</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const [history, setHistory] = useState<CommandOutput[]>(initialOutputs);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);

    const parts = trimmed.split(' ');
    const mainCommand = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let outputNode: React.ReactNode = null;

    switch (mainCommand) {
      case 'help':
        outputNode = (
          <div className="text-neutral-300 text-xs md:text-sm space-y-1 py-1 font-mono">
            <p className="text-emerald-400 font-semibold mb-1">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-teal-300 font-bold">about / bio</span> - Developer summary</div>
              <div><span className="text-teal-300 font-bold">skills</span> - Technical competencies</div>
              <div><span className="text-teal-300 font-bold">fastfetch / sysinfo</span> - System metrics</div>
              <div><span className="text-teal-300 font-bold">contact</span> - Communication channels</div>
              <div><span className="text-teal-300 font-bold">photos</span> - View gallery modal</div>
              <div><span className="text-teal-300 font-bold">whoami</span> - Current user info</div>
              <div><span className="text-teal-300 font-bold">clear</span> - Clear terminal screen</div>
              <div><span className="text-teal-300 font-bold">help</span> - Show this help manual</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
      case 'cat':
        if (mainCommand === 'cat' && args && !args.includes('bio') && !args.includes('about')) {
          outputNode = <div className="text-rose-400 font-mono text-xs md:text-sm">cat: {args}: No such file or directory</div>;
        } else {
          outputNode = (
            <div className="text-neutral-200 text-xs md:text-sm space-y-2 py-1 font-mono leading-relaxed">
              <p>
                Freelance full-stack developer and IT professional based in Santo Domingo, Dominican Republic.
              </p>
              <p className="text-neutral-400">
                15+ years navigating infrastructure, networking, and cybersecurity, now focused on crafting high-performance web applications and AI-integrated architectures.
              </p>
            </div>
          );
        }
        break;

      case 'skills':
        outputNode = (
          <div className="text-neutral-200 text-xs md:text-sm space-y-2 py-1 font-mono">
            <div>
              <span className="text-emerald-400 font-bold">[Frontend]</span> React, TypeScript, Tailwind CSS, Next.js, Framer Motion
            </div>
            <div>
              <span className="text-teal-300 font-bold">[Backend]</span> Node.js, Express, Python, REST APIs, PostgreSQL, Redis
            </div>
            <div>
              <span className="text-sky-300 font-bold">[DevOps & IT]</span> Arch/Debian Linux, Docker, Bash/Zsh, Networking, Security Hardening
            </div>
            <div>
              <span className="text-purple-300 font-bold">[AI & Automation]</span> LLM Orchestration, Prompt Engineering, Agentic Workflows
            </div>
          </div>
        );
        break;

      case 'fastfetch':
      case 'neofetch':
      case 'sysinfo':
        outputNode = initialOutputs[0].output;
        break;

      case 'contact':
        outputNode = (
          <div className="text-neutral-200 text-xs md:text-sm space-y-1 py-1 font-mono">
            <div>Email: <a href="mailto:rotse93@gmail.com" className="text-emerald-400 underline hover:text-emerald-300">rotse93@gmail.com</a></div>
            <div>GitHub: <a href="https://github.com/makiaveloh" target="_blank" rel="noopener noreferrer" className="text-teal-300 underline hover:text-teal-200">github.com/makiaveloh</a></div>
            <div>Location: <span className="text-neutral-300">Santo Domingo, Dominican Republic (GMT-4)</span></div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = <div className="text-emerald-300 font-mono text-xs md:text-sm">makiaveloh (uid=1000 gid=1000 groups=wheel,storage,power,docker)</div>;
        break;

      case 'photos':
      case 'gallery':
        if (onOpenPhotos) {
          onOpenPhotos();
          outputNode = <div className="text-teal-300 font-mono text-xs md:text-sm">Opening profile gallery modal...</div>;
        } else {
          outputNode = <div className="text-neutral-400 font-mono text-xs md:text-sm">Gallery is available in profile view.</div>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        outputNode = <div className="text-rose-400 font-mono text-xs md:text-sm">makiaveloh is already in the sudoers file. This incident will be reported to nobody.</div>;
        break;

      case 'ls':
        outputNode = (
          <div className="flex gap-4 font-mono text-xs md:text-sm text-teal-300 font-semibold py-1">
            <span>bio.txt</span>
            <span>skills.md</span>
            <span className="text-purple-300">projects/</span>
            <span className="text-emerald-300">gallery.app</span>
          </div>
        );
        break;

      default:
        outputNode = (
          <div className="text-rose-400 font-mono text-xs md:text-sm">
            zsh: command not found: {mainCommand}. Type <span className="text-emerald-400 font-semibold">help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        command: trimmed,
        output: outputNode,
      },
    ]);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  const quickActions = [
    { label: 'fastfetch', cmd: 'fastfetch' },
    { label: 'cat bio.txt', cmd: 'cat bio.txt' },
    { label: 'skills', cmd: 'skills' },
    { label: 'contact', cmd: 'contact' },
    { label: 'photos', cmd: 'photos' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-xl border overflow-hidden shadow-2xl transition-all font-mono backdrop-blur-md ${className}`}
      style={{
        backgroundColor: isDarkMode ? 'rgba(13, 17, 23, 0.95)' : 'rgba(24, 24, 27, 0.96)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.18)',
        boxShadow: isDarkMode
          ? '0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(64, 201, 162, 0.08)'
          : '0 20px 45px -10px rgba(0, 0, 0, 0.4)',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
        </div>
        <div className="text-xs text-neutral-400 font-medium tracking-wide flex items-center gap-2">
          <span className="text-emerald-400 font-semibold">makiaveloh@workstation</span>
          <span className="text-neutral-600">:</span>
          <span className="text-neutral-400">~/about (zsh)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>live</span>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-neutral-950/60 border-b border-neutral-800/60 overflow-x-auto scrollbar-none text-[11px]">
        <span className="text-neutral-500 select-none mr-1 font-mono text-[10px]">PRESETS:</span>
        {quickActions.map((action) => (
          <button
            key={action.cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(action.cmd);
            }}
            className="px-2 py-0.5 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-emerald-300 border border-neutral-700/60 hover:border-emerald-500/40 transition-all cursor-pointer whitespace-nowrap"
          >
            $ {action.label}
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div
        ref={terminalBodyRef}
        className="p-4 md:p-6 space-y-3 max-h-[380px] md:max-h-[460px] overflow-y-auto text-left scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-emerald-400 font-bold select-none">makiaveloh@workstation:~$</span>
              <span className="text-neutral-100 font-semibold">{item.command}</span>
            </div>
            <div className="pl-0 md:pl-2">{item.output}</div>
          </div>
        ))}

        {/* Current Active Prompt */}
        <div className="flex items-center gap-2 text-xs md:text-sm pt-1">
          <span className="text-emerald-400 font-bold select-none shrink-0">
            makiaveloh@workstation:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-neutral-100 focus:outline-none font-mono caret-emerald-400"
            placeholder="type 'help' or click presets above..."
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
