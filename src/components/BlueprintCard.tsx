// components/BlueprintCard.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { Project, Idea } from '../../types';
import Button from './Button'; 
import { StarIcon, EyeIcon, DocumentTextIcon, PlusCircleIcon, TrashIcon, EyeSlashIcon } from './icons'; 

interface BlueprintCardProps {
  item: Project | Idea;
  type: 'project' | 'idea';
  onSelect?: (item: Project | Idea) => void;
  onQuickNewIdea?: (project: Project) => void; 
  onDelete?: (item: Project | Idea) => void;
  onToggleFavorite?: (projectId: string) => void; 
  className?: string;
}

const BlueprintCard: React.FC<BlueprintCardProps> = ({
  item,
  type,
  onSelect,
  onQuickNewIdea,
  onDelete,
  onToggleFavorite,
  className,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25, mass: 0.7 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], prefersReducedMotion ? ['0deg', '0deg'] : ['7deg', '-7deg']); 
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], prefersReducedMotion ? ['0deg', '0deg'] : ['-7deg', '7deg']); 

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  }, [prefersReducedMotion]);

  const handleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation(); 
    if (type === 'idea') { 
      setIsFlipped(!isFlipped);
    } else if (onSelect) {
      onSelect(item); 
    }
  };

  const project = type === 'project' ? (item as Project) : null;
  const idea = type === 'idea' ? (item as Idea) : null;

  const cardMotionVariants: Variants = {
    initial: { scale: 1, boxShadow: 'var(--shadow-card)'}, // Use CSS var
    hover: prefersReducedMotion ? {} : { 
      scale: 1.03, 
      boxShadow: 'var(--shadow-card-hover)', // Use CSS var
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    },
    glitchInitial: { opacity: 0, filter: 'blur(2px) contrast(0.9)' },
    glitchAnimate: { 
      opacity: 1, 
      filter: 'blur(0px) contrast(1)',
      transition: { duration: 0.3, delay: Math.random() * 0.15 + 0.05 } 
    },
  };
  
  const flipContainerVariants: Variants = {
    initial: { rotateY: 0 },
    flipped: { rotateY: 180 },
  };

  const titleText = type === 'project' && project ? project.name : type === 'idea' && idea ? idea.title : '';
  const cardBG = project?.isFavorite ? 'bg-theme-bg-accent shadow-glow-accent-md' : 'bg-theme-bg-secondary';

  const renderFront = () => (
    <motion.div
      className={`absolute inset-0 w-full h-full p-space-sm sm:p-space-xs_md rounded-card flex flex-col justify-between backface-hidden border border-theme-border-primary/70 ${cardBG} transition-colors duration-300`}
      style={{ WebkitBackfaceVisibility: 'hidden', MozBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
    >
      <div>
        <div className="flex justify-between items-start mb-space-xs">
          <div className="flex items-center min-w-0"> 
            {(project?.logo || idea?.logo) ? (
              <img src={project?.logo || idea?.logo} alt={`${titleText} logo`} className="w-8 h-8 object-cover rounded-sm mr-space-xs flex-shrink-0 border border-theme-accent-primary/30" />
            ) : (
              <DocumentTextIcon className="w-8 h-8 text-theme-accent-primary/60 mr-space-xs flex-shrink-0" />
            )}
            <h3 
              className="text-lg sm:text-xl font-display font-semibold text-theme-accent-primary truncate cursor-pointer hover:text-opacity-80 transition-opacity"
              onClick={(e) => { e.stopPropagation(); if(onSelect) onSelect(item); }}
              title={type === 'project' && project ? `Open Constellation: ${project.name}` : type === 'idea' && idea ? `Edit Blueprint: ${idea.title}` : ''}
            >
              {titleText}
            </h3>
          </div>
          {project && onToggleFavorite && (
            <Button
              variant="icon"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(project.id); }}
              className={`!p-1 ml-space-xs ${project.isFavorite ? 'text-theme-accent-primary shadow-glow-accent-sm' : 'text-theme-text-secondary hover:text-theme-accent-primary'}`}
              aria-label={project.isFavorite ? "Unmark as favorite" : "Mark as favorite"}
              prefersReducedMotion={prefersReducedMotion}
            >
              <StarIcon className="w-5 h-5" isFilled={project.isFavorite} />
            </Button>
          )}
        </div>
        {idea && (
          <p className="text-xs sm:text-sm text-theme-text-secondary mb-1 line-clamp-2" title={idea.problemSolved}>
            Challenge: {idea.problemSolved || "Not specified"}
          </p>
        )}
        {project && (
          <p className="text-xs sm:text-sm text-theme-text-secondary">
            Blueprints: {project.ideas.length}
          </p>
        )}
      </div>
      <div className="mt-auto pt-space-xs">
        <p className="text-xs text-theme-text-secondary/70">
          {type === 'project' ? 'Ignited' : 'Forged'}: {new Date(type === 'project' ? item.createdAt : (item as Idea).updatedAt).toLocaleDateString()}
        </p>
        <div className="flex items-center justify-end space-x-space-xs mt-space-xs">
          {type === 'idea' && (
            <Button variant="icon" size="sm" onClick={handleFlip} title={isFlipped ? "Close Preview" : "Preview Blueprint"} prefersReducedMotion={prefersReducedMotion}>
              {isFlipped ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
            </Button>
          )}
          {project && onQuickNewIdea && (
             <Button variant="icon" size="sm" onClick={(e) => {e.stopPropagation(); onQuickNewIdea(project);}} title="New Blueprint in Constellation" prefersReducedMotion={prefersReducedMotion}>
              <PlusCircleIcon className="w-5 h-5"/>
            </Button>
          )}
          {onSelect && (
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onSelect(item); }} title={type === 'project' ? 'Open Constellation' : 'Edit Blueprint'} prefersReducedMotion={prefersReducedMotion}>
              {type === 'project' ? 'Open' : 'Edit'}
            </Button>
          )}
          {onDelete && (
             <Button variant="icon" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(item); }} title={`Disassemble ${type}`} className="text-status-error hover:bg-status-error/10" prefersReducedMotion={prefersReducedMotion}>
              <TrashIcon className="w-5 h-5"/>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderBack = () => (
    idea && (
    <motion.div
      className="absolute inset-0 w-full h-full bg-theme-bg-accent p-space-sm sm:p-space-xs_md rounded-card flex flex-col justify-between backface-hidden border border-theme-border-primary shadow-card overflow-y-auto custom-scrollbar"
      style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden', MozBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
    >
      <div className="space-y-space-xs text-theme-text-primary font-body"> 
        <div className="flex items-center border-b border-theme-accent-primary/30 pb-space-xxs mb-space-xs">
          {idea.logo && <img src={idea.logo} alt="Blueprint logo" className="w-10 h-10 object-cover rounded-sm mr-space-xs border border-theme-accent-primary/20"/>}
          <h4 className="text-md font-display font-semibold text-theme-accent-primary">Preview: {idea.title}</h4>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-theme-text-secondary">Problem:</h5>
          <p className="text-xs whitespace-pre-wrap line-clamp-3 custom-scrollbar">{idea.problemSolved || "N/A"}</p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-theme-text-secondary">Solution:</h5>
          <p className="text-xs whitespace-pre-wrap line-clamp-3 custom-scrollbar">{idea.coreSolution || "N/A"}</p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-theme-text-secondary">Key Features:</h5>
          <p className="text-xs whitespace-pre-wrap line-clamp-3 custom-scrollbar">{idea.keyFeatures || "N/A"}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={handleFlip} className="mt-auto self-end" prefersReducedMotion={prefersReducedMotion}>Close Preview</Button>
    </motion.div>
    )
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX, 
        rotateY: prefersReducedMotion ? 0 : rotateY, 
        transformStyle: 'preserve-3d', 
        perspective: '1000px', 
      }}
      className={`relative w-full aspect-[3/2] sm:aspect-[4/2.5] min-h-[190px] sm:min-h-[210px] cursor-default ${className || ''}`}
      variants={cardMotionVariants} 
      initial="glitchInitial" 
      animate="glitchAnimate" 
      whileHover={prefersReducedMotion ? undefined : "hover"} 
      onClick={type === 'project' && !prefersReducedMotion ? (e) => { e.stopPropagation(); if (onSelect) onSelect(item); } : undefined} 
      layout 
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        variants={flipContainerVariants}
        animate={isFlipped ? 'flipped' : 'initial'}
        transition={prefersReducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 120, damping: 18 }}
      >
        {renderFront()}
        {type === 'idea' && renderBack()}
      </motion.div>
    </motion.div>
  );
};

export default BlueprintCard;
