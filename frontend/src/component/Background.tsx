// components/Background.tsx
import DarkVeil from "./DarkVeil";

export default function Background() {
  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw', 
        height: '100vh',
        zIndex: -1
      }} 
    >
      <DarkVeil />
    </div>
  );
}