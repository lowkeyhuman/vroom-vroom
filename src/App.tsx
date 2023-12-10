import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/Experience'
import { KeyboardControls } from '@react-three/drei'

function App() {
  return (
    <>
      <KeyboardControls
        map={[
          {name: 'forward', keys: ['ArrowUp', 'KeyW']},
          {name: 'backward', keys: ['ArrowDown', 'KeyS']},
          {name: 'turnLeft', keys: ['ArrowLeft', 'KeyA']},
          {name: 'turnRight', keys: ['ArrowRight', 'KeyD']}
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 60, -1]
          }}
        >
          <Experience />
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default App
