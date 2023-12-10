import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, euler, quat } from '@react-three/rapier'
import { useRef } from 'react'
import * as THREE from 'three'

interface CarStats {
  defaultLinVelDamping: number
  brakingDamping: number
}

const carStats: CarStats = {
  defaultLinVelDamping: 1,
  brakingDamping: 5
}

const Player = () => {
  const playerRef = useRef<RapierRigidBody>(null);
  const [_, getKeys] = useKeyboardControls()

  useFrame((_, delta) => {
    const player = playerRef.current;
    if (player == null) return;

    player.setLinearDamping(carStats.defaultLinVelDamping)

    const keys = getKeys()

    const eulerRot = euler().setFromQuaternion(quat(player.rotation()))
    const forwardVector = new THREE.Vector3(0, 0, 1)
    forwardVector.applyEuler(eulerRot)

    var impulse = new THREE.Vector3(0, 0, 0)
    var torque = new THREE.Vector3(0, 0, 0)

    const forwardStrength = 3 * delta
    const backwardStrength = 2 * delta
    const torqueStrength = 0.2 * delta

    if (keys.forward) {
      impulse.addScaledVector(forwardVector, forwardStrength)
    }

    if (keys.backward) {
      const linearVelocity = new THREE.Vector3(player.linvel().x, player.linvel().y, player.linvel().z)
      
      if (forwardVector.dot(linearVelocity) > 1e-1) {
        player.setLinearDamping(carStats.brakingDamping)
      } else {
        impulse.addScaledVector(forwardVector, -backwardStrength)
      }
    }

    if (keys.turnLeft) {
      torque.y += torqueStrength
    }

    if (keys.turnRight) {
      torque.y -= torqueStrength
    }
    
    player.applyImpulse(impulse, true)
    player.applyTorqueImpulse(torque, true)
  })

  return (
    <>
      <RigidBody 
        ref={playerRef} 
        canSleep={false} 
        colliders='cuboid'
        restitution={0.2}
        friction={0}
        angularDamping={10}
        position={[0, 1, 0]}
      >
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.3, 1]} />
          <meshStandardMaterial flatShading color={'mediumpurple'} />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Player