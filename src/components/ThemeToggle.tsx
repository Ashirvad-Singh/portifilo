import { Moon, Sun, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AnimationVariant = 'circle' | 'circle-blur' | 'bottom-up' | 'gif';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [animationVariant, setAnimationVariant] = useState<AnimationVariant>('circle');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedAnimation = localStorage.getItem('theme-animation') as AnimationVariant | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    
    if (savedAnimation) {
      setAnimationVariant(savedAnimation);
    }
  }, []);

  const toggleTheme = async (newTheme: 'light' | 'dark') => {
    if (newTheme === theme) return;

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transition API
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
      return;
    }

    const transition = document.startViewTransition(async () => {
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
    });

    await transition.ready;

    const { clientX, clientY } = getClickPosition();

    switch (animationVariant) {
      case 'circle':
        applyCircleTransition(clientX, clientY);
        break;
      case 'circle-blur':
        applyCircleBlurTransition(clientX, clientY);
        break;
      case 'bottom-up':
        applyBottomUpTransition();
        break;
      case 'gif':
        applyGifTransition(clientX, clientY);
        break;
    }
  };

  const getClickPosition = () => {
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      const rect = button.getBoundingClientRect();
      return {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      };
    }
    return { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
  };

  const applyCircleTransition = (x: number, y: number) => {
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  const applyCircleBlurTransition = (x: number, y: number) => {
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const animation = document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    );

    // Add blur effect
    document.documentElement.animate(
      {
        filter: ['blur(0px)', 'blur(8px)', 'blur(0px)'],
      },
      {
        duration: 800,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  const applyBottomUpTransition = () => {
    document.documentElement.animate(
      {
        clipPath: [
          'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        ],
      },
      {
        duration: 600,
        easing: 'ease-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  const applyGifTransition = (x: number, y: number) => {
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Pixelated expansion effect
    const steps = 20;
    const keyframes = [];
    
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const radius = endRadius * progress;
      keyframes.push({
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        filter: `blur(${Math.sin(progress * Math.PI) * 4}px)`,
      });
    }

    document.documentElement.animate(keyframes, {
      duration: 900,
      easing: 'steps(20)',
      pseudoElement: '::view-transition-new(root)',
    });
  };

  const changeAnimation = (variant: AnimationVariant) => {
    setAnimationVariant(variant);
    localStorage.setItem('theme-animation', variant);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="glass glass-hover relative"
          data-theme-toggle
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass backdrop-blur-xl border-white/10">
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          Theme
        </div>
        <DropdownMenuItem onClick={() => toggleTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <div className="my-1 h-px bg-white/10" />
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          Animation
        </div>
        <DropdownMenuItem onClick={() => changeAnimation('circle')}>
          <div className={`mr-2 h-3 w-3 rounded-full border-2 ${animationVariant === 'circle' ? 'border-primary bg-primary' : 'border-muted-foreground'}`} />
          Circle
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeAnimation('circle-blur')}>
          <div className={`mr-2 h-3 w-3 rounded-full border-2 ${animationVariant === 'circle-blur' ? 'border-primary bg-primary' : 'border-muted-foreground'}`} />
          Circle Blur
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeAnimation('bottom-up')}>
          <div className={`mr-2 h-3 w-3 rounded-full border-2 ${animationVariant === 'bottom-up' ? 'border-primary bg-primary' : 'border-muted-foreground'}`} />
          Bottom Up
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeAnimation('gif')}>
          <Sparkles className={`mr-2 h-4 w-4 ${animationVariant === 'gif' ? 'text-primary' : 'text-muted-foreground'}`} />
          GIF Effect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;