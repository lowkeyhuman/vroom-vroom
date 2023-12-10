import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Level from './Level'
import Player from './Player'
import Lights from './Lights'

const Experience = () => {
  return (
    <>
      <Physics debug>
        <Level />
        <Player />
        <Lights />
        
        <OrbitControls makeDefault />
      </Physics>
    </>
  )
}

export default Experience