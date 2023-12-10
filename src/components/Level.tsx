import * as THREE from "three"
import { RigidBody } from '@react-three/rapier'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({color: 'limegreen'})

const Floor = () => {
  return (
    <>
      <RigidBody type='fixed' restitution={0.2} friction={0}>
        <mesh 
          geometry={boxGeometry} material={floor1Material}
          position={[0, -0.1, 0]} scale={[40, 0.2, 40]} 
          receiveShadow />
      </RigidBody>
    </>
  )
}

const FinishTarget = () => {
  return (
    <>
      <mesh position={[15, 0.5, 15]}>
        <boxGeometry />
        <meshNormalMaterial/>
      </mesh>
    </>
  )
}

const Level = () => {
  return (
    <>
      <Floor />
      <FinishTarget />
    </>
  )
}

export default Level