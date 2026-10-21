import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("3D WebGL render fallback triggered gracefully:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-radial-gradient from-royal/30 to-midnight">
            <div className="w-20 h-20 rounded-full border border-blush/40 flex items-center justify-center bg-rosepink/10 animate-pulse mb-4 shadow-glow-pink">
              <span className="text-3xl">✨</span>
            </div>
            <p className="font-serif text-xl text-dreamwhite">Magical 3D Dreamscape</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

interface CanvasContainerProps {
  children: React.ReactNode;
  className?: string;
  enableControls?: boolean;
  cameraPosition?: [number, number, number];
  fov?: number;
  fallback?: ReactNode;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  children,
  className = "w-full h-full",
  enableControls = true,
  cameraPosition = [0, 1, 5],
  fov = 45,
  fallback,
}) => {
  return (
    <WebGLErrorBoundary fallback={fallback}>
      <div className={`relative ${className}`}>
        <Canvas
          camera={{ position: cameraPosition, fov }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'default',
            preserveDrawingBuffer: false,
          }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            const canvasEl = gl.domElement;
            const onContextLost = (e: Event) => {
              e.preventDefault();
              console.warn("WebGL context lost handled gracefully.");
            };
            canvasEl.addEventListener('webglcontextlost', onContextLost, false);
          }}
        >
          <ambientLight intensity={0.65} color="#FFF8FC" />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFE8B5" />
          <pointLight position={[-4, 3, -2]} intensity={0.8} color="#FFB6D5" />
          <pointLight position={[3, -2, 2]} intensity={0.6} color="#C9B6FF" />

          <Suspense fallback={null}>
            {children}
          </Suspense>

          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 3}
              dampingFactor={0.05}
              rotateSpeed={0.5}
            />
          )}
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};
