'use client';
import { useEffect, useState } from 'react';
import {
  Home, User, FolderOpen, Cpu, Briefcase, Trophy, GraduationCap, Mail, GitBranch,
} from 'lucide-react';
import Dock from './Dock';

const sections = [
  { id: 'hero',         label: 'Home',         icon: <Home size={20} /> },
  { id: 'about',        label: 'About',        icon: <User size={20} /> },
  { id: 'projects',     label: 'Projects',     icon: <FolderOpen size={20} /> },
  { id: 'skills',       label: 'Skills',       icon: <Cpu size={20} /> },
  { id: 'experience',   label: 'Experience',   icon: <Briefcase size={20} /> },
  { id: 'achievements', label: 'Achievements', icon: <Trophy size={20} /> },
  { id: 'education',    label: 'Education',    icon: <GraduationCap size={20} /> },
  { id: 'contact',      label: 'Contact',      icon: <Mail size={20} /> },
];

export default function DockNav() {
  const [activeId, setActiveId] = useState('hero');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const dockItems = [
    ...sections.map((s) => ({
      icon: s.icon,
      label: s.label,
      onClick: () => scrollTo(s.id),
      className: activeId === s.id ? 'active-section' : '',
    })),
    // Separator + GitHub
    {
      isSeparator: true,
      icon: null,
      label: '',
    },
    {
      icon: <GitBranch size={20} />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/thirun30-dev', '_blank'),
    },
  ];

  return (
    <Dock
      items={dockItems}
      baseItemSize={46}
      magnification={68}
      panelHeight={62}
      distance={160}
      spring={{ mass: 0.1, stiffness: 180, damping: 14 }}
    />
  );
}
